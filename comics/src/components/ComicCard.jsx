import React from "react";

export default function ComicCard({comic,onOpen,onAdd}){
 const thumb = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
 const price =  comic.prices?.[0]?.price ?? 0;
 return (
  <article className="comic-card">
   <img src={thumb} alt={comic.title} />
   <h3>{comic.title}</h3>
   <p>{price ? `R${price.toFixed(2)}` : "Grátis"}</p>
   <div className="comic-actions">
    <button onClick={() =>onOpen(ComicCard.id)}>Ver</button>
    <button onClick={()=>onAdd({id: comic.id, title: comic.title, price,thumb})}>Adicionar</button>
   </div>
  </article>
 )
}