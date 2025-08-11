import React from "react";

export default function ComicCard({ comic, onOpen, onAdd }) {
 
  if (!comic.thumbnail) {
    console.warn('Comic sem thumbnail:', comic);
    return null;
  }

  const thumb = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
  
  
  const price = comic.prices && comic.prices.length > 0 && comic.prices[0].price 
    ? comic.prices[0].price 
    : 0;

  return (
    <article className="comic-card">
      <img 
        src={thumb} 
        alt={comic.title}
        onError={(e) => {
          e.target.src = '/placeholder-comic.png'; 
        }}
      />
      <h3 className="comic-title">{comic.title}</h3>
      <p className="comic-price">
        {price > 0 ? `R$ ${price.toFixed(2)}` : "Grátis"}
      </p>
      <div className="comic-actions">
        <button className="btn" onClick={() => onOpen(comic.id)}>
          Ver Detalhes
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => onAdd({
            id: comic.id, 
            title: comic.title, 
            price,
            thumb
          })}
        >
          Adicionar
        </button>
      </div>
    </article>
  );
}