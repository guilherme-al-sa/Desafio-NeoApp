import React, { useEffect, useState } from "react";
import { fetchComicById } from "../api/marvelClient";
import { useParams } from 'react-router-dom';
import { useCart } from "../context/CartProvider";

export default function ComicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchComicById(id)
      .then(data => {
        if (data && data.results && data.results.length > 0) {
          setComic(data.results[0]);
        } else {
          setError('Comic não encontrado');
        }
      })
      .catch(err => {
        console.error('Erro ao carregar comic:', err);
        setError(err.message || 'Erro ao carregar comic');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container"><p>Carregando...</p></div>;
  if (error) return <div className="container"><p>Erro: {error}</p></div>;
  if (!comic) return <div className="container"><p>Comic não encontrado.</p></div>;

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
      thumb: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
    });
  };

  return (
    <main className="container detail">
      <button onClick={() => navigate('/')} className="btn" style={{ marginBottom: '1rem' }}>
        ← Voltar
      </button>

      <img
        className="detail-thumb"
        src={thumb}
        alt={comic.title}
        onError={(e) => {
          e.target.src = '/placeholder-comic.png';
        }}
      />

      <div className="detail-info">
        <h2>{comic.title}</h2>
        <p>{comic.description || 'Sem descrição disponível.'}</p>

        {comic.creators && comic.creators.items && comic.creators.items.length > 0 && (
          <div>
            <h4>Criadores:</h4>
            <ul>
              {comic.creators.items.map((creator, index) => (
                <li key={index}>{creator.name} ({creator.role})</li>
              ))}
            </ul>
          </div>
        )}

        <p><strong>Preço:</strong> {price > 0 ? `R$ ${price.toFixed(2)}` : 'Grátis'}</p>

        <button className="btn btn-primary" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </main>
  );
}