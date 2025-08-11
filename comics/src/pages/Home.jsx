import {getComicsData} from "../api/marvelClient"
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartProvider";
import ComicCard from "../components/ComicCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const LIMIT = 6; 
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ results: [], total: 0, offset: 0, limit: LIMIT });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { addItem } = useCart();

  

 useEffect(() => {
  setLoading(true);
  setError(null);

  const offset = page * LIMIT;
  const searchParams = { limit: LIMIT, offset };

  if (searchTerm.trim()) {
    searchParams.titleStartsWith = searchTerm.trim();
  }

  getComicsData(searchParams)
    .then(response => {
      setData(response);
      console.log("Conteúdo do data:", response); 
    })
    .catch(err => {
      setError("Não foi possível carregar os dados da API da Marvel.");
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });

}, [page, searchTerm]);

  
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); 
  };

  const totalPages = Math.ceil((data.total || 0) / LIMIT);

  
  const handleAddToCart = (item) => {
    addItem(item);
    console.log('Item adicionado ao carrinho:', item.title);
    
    
    const button = document.activeElement;
    const originalText = button.textContent;
    button.textContent = 'Adicionado!';
    button.style.backgroundColor = '#28a745';
    
    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
    }, 1000);
  };

  return (
    <main className="container">
      <header className="topbar">
        <h1>Marvel Comics Store</h1>
        
        

        {/* Barra de busca */}
        <form onSubmit={handleSearch} style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '1rem',
          maxWidth: '400px'
        }}>
          <input
            type="text"
            placeholder="Buscar comics (ex: Spider-Man, Avengers...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            Buscar
          </button>
          {searchTerm && (
            <button 
              type="button"
              onClick={() => setSearchTerm('')}
              className="btn"
              style={{ whiteSpace: 'nowrap' }}
            >
              Limpar
            </button>
          )}
        </form>
      </header>
      
      {/* Indicador de busca ativa */}
      {searchTerm && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}>
          Buscando por: <strong>"{searchTerm}"</strong> 
          {data.total > 0 && ` • ${data.total} resultado(s) encontrado(s)`}
        </div>
      )}

      {/* Conteúdo principal */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ 
            fontSize: '2rem', 
            animation: 'spin 1s linear infinite',
            display: 'inline-block'
          }}>
          
          </div>
          <p>Carregando comics incríveis...</p>
        </div>
      ) : error ? (
        <div style={{ 
          padding: '2rem', 
          background: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Oops! Algo deu errado</h3>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Tentar Novamente
          </button>
        </div>
      ) : data.results.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3>Nenhum comic encontrado</h3>
          <p>
            {searchTerm 
              ? `Não encontramos comics com "${searchTerm}". Tente outro termo!`
              : 'Nenhum comic disponível no momento.'
            }
          </p>
          {searchTerm && (
            <button 
              className="btn btn-primary"
              onClick={() => setSearchTerm('')}
            >
              Ver Todos os Comics
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grid de comics */}
          <div className="grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {data.results.map(comic => (
              <ComicCard 
              key={comic.id} comic={comic} 
                onOpen={(id) => navigate(`/comics/${id}`)} 
                onAdd={handleAddToCart}
              />
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              onChange={(newPage) => setPage(Math.max(0, Math.min(newPage, totalPages - 1)))} 
            />
          )}

          {/* Info da página atual */}
          <div style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            Mostrando {data.results.length} de {data.total} comics
            {searchTerm && ` para "${searchTerm}"`}
          </div>
        </>
      )}

      
    </main>
  );
}