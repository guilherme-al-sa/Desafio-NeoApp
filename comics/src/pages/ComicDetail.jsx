// import React, { useEffect, useState } from "react";
// import { fetchComicById } from "../api/marvelClient";
// import { useParams } from 'react-router-dom';
// import { useCart } from "../context/CartProvider";

// export default function ComicDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [comic, setComic] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { addItem } = useCart();

//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);
//     setError(null);

//     fetchComicById(id)
//       .then(data => {
//         if (data && data.results && data.results.length > 0) {
//           setComic(data.results[0]);
//         } else {
//           setError('Comic não encontrado');
//         }
//       })
//       .catch(err => {
//         console.error('Erro ao carregar comic:', err);
//         setError(err.message || 'Erro ao carregar comic');
//       })
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div className="container"><p>Carregando...</p></div>;
//   if (error) return <div className="container"><p>Erro: {error}</p></div>;
//   if (!comic) return <div className="container"><p>Comic não encontrado.</p></div>;

//   const thumb = comic.thumbnail
//     ? `${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`
//     : '/placeholder-comic.png';

//   const price = comic.prices && comic.prices.length > 0 && comic.prices[0].price
//     ? comic.prices[0].price
//     : 0;

//   const handleAddToCart = () => {
//     addItem({
//       id: comic.id,
//       title: comic.title,
//       price,
//       thumb: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
//     });
//   };

//   return (
//     <main className="container detail">
//       <button onClick={() => navigate('/')} className="btn" style={{ marginBottom: '1rem' }}>
//         ← Voltar
//       </button>

//       <img
//         className="detail-thumb"
//         src={thumb}
//         alt={comic.title}
//         onError={(e) => {
//           e.target.src = '/placeholder-comic.png';
//         }}
//       />

//       <div className="detail-info">
//         <h2>{comic.title}</h2>
//         <p>{comic.description || 'Sem descrição disponível.'}</p>

//         {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
//           <div>
//             <h4>Criadores:</h4>
//             <ul>
//               {comic.creators.items.map((creator, index) => (
//                 <li key={index}>{creator.name} ({creator.role})</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <p><strong>Preço:</strong> {price > 0 ? `R$ ${price.toFixed(2)}` : 'Grátis'}</p>

//         <button className="btn btn-primary" onClick={handleAddToCart}>
//           Adicionar ao Carrinho
//         </button>
//       </div>
//     </main>
//   );
// }

// dados mockados 

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartProvider";
import { fetchComicById } from "../api/mockMarvelClient";

export default function ComicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) {
      setError('ID do comic não fornecido');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    console.log('Carregando detalhes do comic ID:', id);

    fetchComicById(id)
      .then(data => {
        console.log('Detalhes do comic carregados:', data);
        if (data && data.results && data.results.length > 0) {
          setComic(data.results[0]);
        } else {
          setError('Comic não encontrado');
        }
      })
      .catch(err => {
        console.error('❌ Erro ao carregar detalhes:', err);
        setError(err.message || 'Erro ao carregar comic');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!comic) return;

    const thumb = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
    const price = comic.prices && comic.prices[0] ? comic.prices[0].price : 0;

    const item = {
      id: comic.id,
      title: comic.title,
      price: price,
      thumb: thumb
    };

    addItem(item);
    console.log('Comic adicionado ao carrinho:', comic.title);

    // Feedback visual
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Adicionado!';
      button.style.backgroundColor = '#28a745';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    }
  };

  if (loading) {
    return (
      <main className="container">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            animation: 'spin 1s linear infinite',
            display: 'inline-block'
          }}>
            
          </div>
          <p>Carregando detalhes do comic...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <div style={{
          padding: '2rem',
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Comic não encontrado</h3>
          <p>{error}</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
               Voltar ao Início
            </button>
            <button 
              className="btn"
              onClick={() => window.location.reload()}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!comic) {
    return (
      <main className="container">
        <p>Comic não encontrado.</p>
        <button onClick={() => navigate('/')} className="btn">
          ← Voltar
        </button>
      </main>
    );
  }

  const thumb = `${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`;
  const portraitThumb = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
  const price = comic.prices && comic.prices[0] ? comic.prices[0].price : 0;

  return (
    <main className="container detail">
      {/* Navegação */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/')} 
          className="btn"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem' 
          }}
        >
          ← Voltar à Loja
        </button>
      </div>

      {/* Badge de demo */}
      <div style={{
        background: '#e3f2fd',
        border: '1px solid #2196f3',
        borderRadius: '8px',
        padding: '0.5rem 1rem',
        marginBottom: '2rem',
        fontSize: '0.9rem',
        color: '#1565c0'
      }}>
        <strong>Dados de Demonstração</strong> - Este é um comic de exemplo
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr', 
        gap: '2rem',
        alignItems: 'start'
      }}>
        {/* Imagem do comic */}
        <div style={{ maxWidth: '300px' }}>
          <img 
            className="detail-thumb" 
            src={thumb}
            alt={comic.title}
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s ease'
            }}
            onError={(e) => {
              e.target.src = portraitThumb;
            }}
          />
          
          {/* Botão de adicionar principal (móvel) */}
          <button 
            className="btn btn-primary add-to-cart-btn"
            onClick={handleAddToCart}
            style={{ 
              width: '100%', 
              marginTop: '1rem',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
          >
            Adicionar ao Carrinho - R$ {price.toFixed(2)}
          </button>
        </div>

        {/* Informações do comic */}
        <div className="detail-info" style={{ 
          background: 'var(--card)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 6px 14px rgba(20, 20, 50, 0.04)'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            marginBottom: '1rem',
            color: 'var(--text)',
            lineHeight: '1.2'
          }}>
            {comic.title}
          </h1>

          {/* Preço e informações básicas */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Preço</span>
              <div style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold',
                color: price > 0 ? 'var(--accent)' : '#28a745'
              }}>
                {price > 0 ? `R$ ${price.toFixed(2)}` : 'GRÁTIS'}
              </div>
            </div>
            
            {comic.pageCount && (
              <div>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Páginas</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {comic.pageCount}
                </div>
              </div>
            )}

            <div>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Série</span>
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                {comic.series?.name || 'N/A'}
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>
              Sinopse
            </h3>
            <p style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'var(--muted)',
              fontStyle: comic.description ? 'normal' : 'italic'
            }}>
              {comic.description || 'Sinopse não disponível para este comic.'}
            </p>
          </div>

          {/* Criadores */}
          {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>
                Equipe Criativa
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {comic.creators.items.map((creator, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '1rem',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                      {creator.name}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#666',
                      textTransform: 'capitalize'
                    }}>
                      {creator.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn btn-primary add-to-cart-btn"
              onClick={handleAddToCart}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              Adicionar ao Carrinho
            </button>
            
            <button 
              className="btn"
              onClick={() => navigate('/')}
              style={{
                padding: '1rem 2rem',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
               Continuar Comprando
            </button>
          </div>

          {/* Informações adicionais */}
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: '#e8f5e8',
            borderRadius: '8px',
            border: '1px solid #c3e6c3'
          }}>
            <h4 style={{ marginBottom: '1rem', color: '#2d5a2d' }}>
              Garantia Marvel Comics Store
            </h4>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.5rem',
              color: '#2d5a2d',
              lineHeight: '1.6'
            }}>
              <li>Produto original Marvel</li>
              <li>Entrega rápida e segura</li>
              <li>30 dias para trocas e devoluções</li>
              <li>Atendimento especializado</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CSS para animações */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .detail-thumb:hover {
          transform: scale(1.02);
        }
        
        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .container.detail > div {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          
          .detail-info {
            padding: 1rem !important;
          }
          
          .detail-info h1 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </main>
  );
}