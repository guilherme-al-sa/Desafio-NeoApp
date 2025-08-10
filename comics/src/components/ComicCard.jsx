import React, { useState } from "react";

export default function ComicCard({ comic, onOpen, onAdd }) {
  const [imageError, setImageError] = useState(false);

  // Verificar se thumbnail existe
  if (!comic.thumbnail) {
    console.warn('Comic sem thumbnail:', comic);
    return null;
  }

  // Construir URL da thumbnail - tentar diferentes formatos
  let thumb;
  if (imageError) {
    // Usar uma imagem de placeholder do Unsplash ou similar
    thumb = `https://via.placeholder.com/300x400/cccccc/666666?text=${encodeURIComponent(comic.title.slice(0, 20))}`;
  } else {
    // Tentar a URL original primeiro
    thumb = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
  }
  
  // Corrigir a obtenção do preço
  const price = comic.prices && comic.prices.length > 0 && comic.prices[0].price 
    ? comic.prices[0].price 
    : 0;

  const handleImageError = (e) => {
    console.warn('Erro ao carregar imagem:', thumb);
    setImageError(true);
    
    // Tentar formatos alternativos da Marvel API
    const alternatives = [
      `${comic.thumbnail.path}/standard_medium.${comic.thumbnail.extension}`,
      `${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`,
      `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      // Placeholder final
      `https://via.placeholder.com/300x400/cccccc/666666?text=${encodeURIComponent(comic.title.slice(0, 20))}`
    ];
    
    // Se ainda não tentamos alternativas, tentar a próxima
    const currentIndex = alternatives.findIndex(alt => alt === e.target.src);
    if (currentIndex < alternatives.length - 1) {
      e.target.src = alternatives[currentIndex + 1];
    }
  };

  return (
    <article className="comic-card">
      <img 
        src={thumb} 
        alt={comic.title}
        onError={handleImageError}
        style={{
          backgroundColor: '#f0f0f0', // Cor de fundo enquanto carrega
          transition: 'opacity 0.3s ease'
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
            thumb: imageError ? `https://via.placeholder.com/300x400/cccccc/666666?text=${encodeURIComponent(comic.title.slice(0, 20))}` : thumb
          })}
        >
          Adicionar
        </button>
      </div>
    </article>
  );
}