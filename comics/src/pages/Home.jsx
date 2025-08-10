// import React, { useEffect, useState } from "react";
// import { fetchComics } from "../api/marvelClient";
// import ComicCard from "../components/ComicCard";
// import Pagination from "../components/Pagination";
// import {useNavigate} from 'react-router-dom';
// import { useCart } from "../context/CartProvider";

// export default function Home() {
//  const LIMIT = 3;
//  const [page, setPage] = useState(0);
//  const [data, setData] = useState({ results: [], total: 0, offset: 0, limit: LIMIT });
//  const [loading, setLoading] = useState(false);
//  const navigate = useNavigate();
//  const {addItem} = useCart();

//  useEffect(() => {
//   setLoading(true);
//   const offset = page * LIMIT;
//   fetchComics({ limit: LIMIT, offset })
//    .then(d => setData(d))
//    .catch(err => console.error(err))
//    .finally(() => setLoading(false));

//  }, [page]);

//  const totalPages = Math.ceil((data.total || 0) / LIMIT);

//  return (
//   <main className="container">
//     <header className="topbar">
//    <h1>Loja de quadrinhos</h1>
//    </header>
//    {loading ? <p>Carregando...</p> : (
//       <>
//           <div className="grid">
//             {data.results.map(c => (
//               <ComicCard key={c.id} comic={c} onOpen={(id)=>navigate(`/comics/${id}`)} onAdd={(item)=>addItem(item)} />
//             ))}
//           </div>
//           <Pagination page={page} totalPages={totalPages} onChange={p => setPage(Math.max(0, p))} />
//         </>
//       )}
//     </main>
//  );
// }

// dados mockados

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartProvider";

// Importar cliente mockado
import { fetchComics, getStats } from "../api/mockMarvelClient";
import ComicCard from "../components/ComicCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const LIMIT = 6; // Mostrar 6 comics por página
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ results: [], total: 0, offset: 0, limit: LIMIT });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Carregar estatísticas na inicialização
  useEffect(() => {
    const statsData = getStats();
    setStats(statsData);
    console.log('Estatísticas dos dados mockados:', statsData);
  }, []);

  // Carregar comics quando página ou termo de busca mudam
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const offset = page * LIMIT;
    const searchParams = { limit: LIMIT, offset };
    
    // Adicionar filtro de busca se houver termo
    if (searchTerm.trim()) {
      searchParams.titleStartsWith = searchTerm.trim();
    }

    console.log('Carregando comics com parâmetros:', searchParams);

    fetchComics(searchParams)
      .then(responseData => {
        console.log('Comics carregados:', responseData);
        setData(responseData);
      })
      .catch(err => {
        console.error("Erro ao carregar comics:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [page, searchTerm]);

  // Resetar página quando buscar
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0); // Voltar para primeira página
  };

  const totalPages = Math.ceil((data.total || 0) / LIMIT);

  // Função para adicionar ao carrinho com feedback
  const handleAddToCart = (item) => {
    addItem(item);
    console.log('Item adicionado ao carrinho:', item.title);
    
    // Feedback visual simples
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
        
        {/* Badge indicando uso de dados mockados */}
        <div style={{
          background: '#e3f2fd',
          border: '1px solid #2196f3',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          margin: '1rem 0',
          fontSize: '0.9rem',
          color: '#1565c0'
        }}>
          <strong>Modo Demonstração</strong> - Usando dados de exemplo
          {stats && (
            <span style={{ marginLeft: '1rem', fontSize: '0.8rem' }}>
              ({stats.totalComics} comics • {stats.uniqueSeries} séries • Preço médio: R$ {stats.averagePrice})
            </span>
          )}
        </div>

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
                key={comic.id} 
                comic={comic} 
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