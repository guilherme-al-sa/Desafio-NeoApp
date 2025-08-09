import React from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import comicDetail from "./pages/ComicDetail";
import {CartProvider, useCart} from './context/CartProvider';

function CartButton(){
  const { items, total } = useCart();
  return (
    <div className="cart-button">
      <Link to="/cart">Carrinho ({items.length}) - R$ {total.toFixed(2)}</Link>
    </div>
  );
}

function CartPage(){
  const { items, updateQty, removeItem, clearCart, total } = useCart();
  return (
    <main className="container">
      <h2>Carrinho</h2>
      {items.length === 0 ? <p>Carrinho vazio</p> : (
        <>
          <ul className="cart-list">
            {items.map(i => (
              <li key={i.id} className="cart-item">
                <img src={i.thumb} alt={i.title} />
                <div>
                  <h4>{i.title}</h4>
                  <p>R$ { (i.price || 0).toFixed(2) }</p>
                  <input type="number" min="1" value={i.qty} onChange={(e)=>updateQty(i.id, Number(e.target.value)||1)} />
                  <button onClick={()=>removeItem(i.id)}>Remover</button>
                </div>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> R$ {total.toFixed(2)}</p>
          <button className="btn primary" onClick={()=>{ alert('Checkout simulado — sem pagamento real'); clearCart(); }}>Finalizar</button>
        </>
      )}
    </main>
  );
}

export default function App(){
  return (
    <CartProvider>
      <BrowserRouter>
        <header className="site-header">
          <Link to="/"><h1>Marvel Shop</h1></Link>
          <CartButton />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics/:id" element={<ComicDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}