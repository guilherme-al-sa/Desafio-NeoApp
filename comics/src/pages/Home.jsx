import React, { useEffect, useState } from "react";
import { fetchComics } from "../api/marvelClient";
import ComicCard from "../components/ComicCard";
import Pagination from "../components/Pagination";

export default function Home() {
 const LIMIT = 12;
 const [page, setPage] = useState(0);
 const [data, setData] = useState({ results: [], total: 0, offset: 0, limit: LIMIT });
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  setLoading(true);
  const offset = page * LIMIT;
  fetchComics({ limit: LIMIT, offset })
   .then(d => setData(d))
   .catch(err => console.error(err))
   .finally(() => setLoading(false));

 }, [page]);

 const totalPages = Math.ceil((data.total || 0) / LIMIT);

 return (
  <main className="container">
   <h1>Loja de quadrinhos</h1>
   {loading ? <p>Carregando...</p> : (
    <div className="grid">
     {data.results.map(c => <ComicCard key={c.id} comic={c} onOpen={() => {/* navegar para detalhe */ }} onAdd={() => {/* adicionar ao carrinho */ }} />)}
    </div>
   )}
   <Pagination page={page} totalPages={totalPages} onChange={p =>setPage(p)} />
  </main>
 );
}