import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { getComicById } from "../api/marvelClient";
import './ComicDetail.css';

export default function ComicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('ID do comic não fornecido');
      return;
    }

    setLoading(true);
    setError(null);

    getComicById(id)
      .then(comicData => {
        if (comicData) {
          setComic(comicData);
        } else {
          setError('Comic não encontrado');
        }
      })
      .catch(err => setError(err.message || 'Erro ao carregar o comic'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="comic-detail-container">
        <div className="loading-container">
          <p>Carregando...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="comic-detail-container">
        <div className="error-box">
          <p>Erro: {error}</p>
          <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
        </div>
      </main>
    );
  }

  if (!comic) {
    return (
      <main className="comic-detail-container">
        <p>Comic não encontrado.</p>
        <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
      </main>
    );
  }

  const thumb = comic.thumbnail
    ? `${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`
    : '/placeholder-comic.png';

  const price = comic.prices && comic.prices.length > 0 && comic.prices[0].price
    ? comic.prices[0].price
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: comic.id,
      title: comic.title,
      price,
      thumb: comic.thumbnail ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}` : '/placeholder-comic.png'
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="comic-detail-container">
      <button onClick={() => navigate('/')} className="back-button" style={{ marginBottom: '1rem' }}>
        ← Voltar
      </button>

      <div className="comic-detail-grid">
        <div className="comic-image-section">
          <img
            className="comic-thumbnail"
            src={thumb}
            alt={comic.title}
            onError={e => { e.target.src = '/placeholder-comic.png'; }}
          />
          <button
            className={`mobile-add-button ${addedToCart ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            {addedToCart ? 'Adicionado!' : `Adicionar ao Carrinho${price > 0 ? ` - R$ ${price.toFixed(2)}` : ''}`}
          </button>
        </div>

        <div className="comic-info-section">
          <h2 className="comic-title">{comic.title}</h2>
          <p>{comic.description || 'Sem descrição disponível.'}</p>

          {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
            <div className="creators-section">
              <h4 className="section-title">Criadores:</h4>
              <ul className="creators-grid">
                {comic.creators.items.map((creator, idx) => (
                  <li key={idx} className="creator-card">
                    <span className="creator-name">{creator.name}</span> (<span className="creator-role">{creator.role}</span>)
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p>
            <strong>Preço:</strong>{' '}
            <span className={price > 0 ? "info-value price" : "info-value free"}>
              {price > 0 ? `R$ ${price.toFixed(2)}` : 'Grátis'}
            </span>
          </p>

          <div className="action-buttons">
            <button
              className={`add-to-cart-button ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={addedToCart}
            >
              {addedToCart ? 'Adicionado!' : 'Adicionar ao Carrinho'}
            </button>

            <button className="continue-shopping-button" onClick={() => navigate('/')}>
              Continuar Comprando
            </button>
          </div>

          <div className="warranty-card">
            <h4 className="warranty-title">Garantia Marvel Comics Store</h4>
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
