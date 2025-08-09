import React,{useEffect, useState} from "react";
import { fetchComicsById } from "../api/marvelClient";
import {useParams} from 'react-router-dom';
import { useCart } from "../context/CartProvider";

export default function comicDetail(){
 const {id} = useParams();
 const [comic, setComic] = useState(null);
 const [loading, setLoading] = useState(false);
 const {addItem} = useCart();

  useEffect(() => {
    setLoading(true);
    fetchComicsById(id)
      .then(d => setComic(d.results ? d.results[0] : null))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  },[id]);

  if (loading) return <p>Carregando...</p>;
  if (!comic) return <p>Não encontrado.</p>;

  const thumb = `${comic.thumbnail.path}/detail.${comic.thumbnail.extension}`;
  const price = (comic.prices && comic.prices[0] && comic.prices[0].price) || 0;

  return (
    <main className="container detail">
      <img className="detail-thumb" src={thumb} alt={comic.title} />
      <div className="detail-info">
        <h2>{comic.title}</h2>
        <p>{comic.description || 'Sem descrição disponível.'}</p>
        <p><strong>Preço:</strong> {price ? `R$ ${price.toFixed(2)}` : 'Grátis'}</p>
        <button className="btn primary" onClick={() => addItem({ id: comic.id, title: comic.title, price, thumb })}>Adicionar ao carrinho</button>
      </div>
    </main>
  );

 }