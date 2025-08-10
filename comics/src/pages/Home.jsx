import React, { useEffect, useState } from "react";
import { fetchComics } from "../api/marvelClient";
import ComicCard from "../components/ComicCard";
import Pagination from "../components/Pagination";
import {useNavigate} from 'react-router-dom';
import { useCart } from "../context/CartProvider";

export default function Home() {
 const LIMIT = 3;
 const [page, setPage] = useState(0);
 const [data, setData] = useState({ results: [], total: 0, offset: 0, limit: LIMIT });
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const {addItem} = useCart();

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
    <header className="topbar">
   <h1>Loja de quadrinhos</h1>
   </header>
   {loading ? <p>Carregando...</p> : (
      <>
          <div className="grid">
            {data.results.map(c => (
              <ComicCard key={c.id} comic={c} onOpen={(id)=>navigate(`/comics/${id}`)} onAdd={(item)=>addItem(item)} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={p => setPage(Math.max(0, p))} />
        </>
      )}
    </main>
 );
}