'use client';

import { useEffect, useState } from 'react';
import { addToCart, getProducts } from '@/lib/api';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshes, setRefreshes] = useState(0);
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let alive = true;
    setError(null);
    getProducts(query).then(
      (list) => alive && setProducts(list),
      (err) => alive && setError(String(err.message || err))
    );
    return () => {
      alive = false;
    };
  }, [query, refreshes]);

  async function handleAdd(id: number, qty: number) {
    try {
      const cart = await addToCart(id, qty);
      setMessage(`Added — cart total ${cart.total} EUR`);
    } catch (err) {
      setMessage(String((err as Error).message));
    }
  }

  return (
    <section>
      <div className="toolbar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" />
        {/* Re-renders every card without changing their props: watch "rendered, nothing changed" in Renders & state */}
        <button className="btn btn--ghost" onClick={() => setRefreshes((n) => n + 1)}>
          Refresh ({refreshes})
        </button>
        <button className="btn btn--ghost" onClick={() => setHighlightId((id) => (id === 2 ? null : 2))}>
          Highlight the stool
        </button>
        {message && <span className="muted">{message}</span>}
      </div>
      {error && <p className="error">{error}</p>}
      {!products && !error && <p className="muted">Loading…</p>}
      <div className="grid">
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} highlighted={highlightId === p.id} onAdd={(qty) => handleAdd(p.id, qty)} />
        ))}
      </div>
    </section>
  );
}
