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
import './ComicDetail.css'; // Importar o CSS

export default function ComicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
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
        console.error('Erro ao carregar detalhes:', err);
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
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // Estado de loading
  if (loading) {
    return (
      <main className="comic-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Carregando detalhes do comic...</p>
        </div>
      </main>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <main className="comic-detail-container">
        <div className="error-container">
          <div className="error-box">
            <h3 className="error-title">Comic não encontrado</h3>
            <p className="error-message">{error}</p>
            <div className="error-actions">
              <button 
                className="add-to-cart-button"
                onClick={() => navigate('/')}
              >
                Voltar ao Início
              </button>
              <button 
                className="continue-shopping-button"
                onClick={() => window.location.reload()}
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Comic não encontrado
  if (!comic) {
    return (
      <main className="comic-detail-container">
        <p>Comic não encontrado.</p>
        <button onClick={() => navigate('/')} className="back-button">
          ← Voltar
        </button>
      </main>
    );
  }

  const thumb = `${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`;
  const portraitThumb = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
  const price = comic.prices && comic.prices[0] ? comic.prices[0].price : 0;

  return (
    <main className="comic-detail-container">
      {/* Navegação */}
      <button 
        onClick={() => navigate('/')} 
        className="back-button"
      >
        ← Voltar à Loja
      </button>

      {/* Badge de demo */}
      <div className="demo-badge">
        <strong>Dados de Demonstração</strong> - Este é um comic de exemplo
      </div>

      <div className="comic-detail-grid">
        {/* Imagem do comic */}
        <div className="comic-image-section">
          <img 
            className="comic-thumbnail" 
            src={thumb}
            alt={comic.title}
            onError={(e) => {
              e.target.src = portraitThumb;
            }}
          />
          
          {/* Botão de adicionar principal (móvel) */}
          <button 
            className={`mobile-add-button ${addedToCart ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {addedToCart 
              ? 'Adicionado!' 
              : `Adicionar ao Carrinho - R$ ${price.toFixed(2)}`
            }
          </button>
        </div>

        {/* Informações do comic */}
        <div className="comic-info-section">
          <h1 className="comic-title">
            {comic.title}
          </h1>

          {/* Preço e informações básicas */}
          <div className="price-info-card">
            <div className="info-item">
              <div className="info-label">Preço</div>
              <div className={`info-value ${price > 0 ? 'price' : 'free'}`}>
                {price > 0 ? `R$ ${price.toFixed(2)}` : 'GRÁTIS'}
              </div>
            </div>
            
            {comic.pageCount && (
              <div className="info-item">
                <div className="info-label">Páginas</div>
                <div className="info-value regular">
                  {comic.pageCount}
                </div>
              </div>
            )}

            <div className="info-item">
              <div className="info-label">Série</div>
              <div className="info-value regular">
                {comic.series?.name || 'N/A'}
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="synopsis-section">
            <h3 className="section-title"> Sinopse</h3>
            <p className={`synopsis-text ${!comic.description ? 'empty' : ''}`}>
              {comic.description || 'Sinopse não disponível para este comic.'}
            </p>
          </div>

          {/* Criadores */}
          {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
            <div className="creators-section">
              <h3 className="section-title">Equipe Criativa</h3>
              <div className="creators-grid">
                {comic.creators.items.map((creator, index) => (
                  <div key={index} className="creator-card">
                    <div className="creator-name">
                      {creator.name}
                    </div>
                    <div className="creator-role">
                      {creator.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botões de ação */}
          <div className="action-buttons">
            <button 
              className={`add-to-cart-button ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {addedToCart 
                ? 'Adicionado ao Carrinho!' 
                : 'Adicionar ao Carrinho'
              }
            </button>
            
            <button 
              className="continue-shopping-button"
              onClick={() => navigate('/')}
            >
              Continuar Comprando
            </button>
          </div>

          {/* Informações adicionais */}
          <div className="warranty-card">
            <h4 className="warranty-title">
              Garantia Marvel Comics Store
            </h4>
            <ul className="warranty-list">
              <li>✓ Produto original Marvel</li>
              <li>✓ Entrega rápida e segura</li>
              <li>✓ 30 dias para trocas e devoluções</li>
              <li>✓ Atendimento especializado</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}