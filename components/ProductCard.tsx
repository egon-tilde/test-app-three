'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';

type Props = {
  product: Product;
  highlighted: boolean;
  onAdd: (qty: number) => void;
};

export default function ProductCard({ product, highlighted, onAdd }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const finalPrice = Math.round(product.price * (1 - product.discount / 100));

  return (
    <article className={'card' + (highlighted ? ' card--hl' : '')}>
      {/* Accessibility: the stool image has no alt text */}
      {product.id === 2 ? <img src={product.image} /> : <img src={product.image} alt={product.name} />}
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <div>
          <span className="price">{finalPrice} EUR</span>
          {product.discount > 0 && <span className="price-was">{product.price} EUR</span>}
        </div>
        {!product.inStock && <span className="badge">Out of stock</span>}
        <div className="qty">
          <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span>{qty}</span>
          <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>
            +
          </button>
        </div>
        <button
          className="btn"
          disabled={!product.inStock}
          onClick={() => {
            setAdded(true);
            onAdd(qty);
          }}
        >
          {added ? 'Added ✓' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}
