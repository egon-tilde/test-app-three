'use client';

import { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '@/lib/api';
import type { Cart } from '@/lib/types';

const COUPONS: Record<string, number> = { CALM10: 10, HEARTH20: 20 };

export default function CartView() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    getCart().then(setCart);
  }, []);

  if (!cart) return <p className="muted">Loading cart…</p>;
  if (!cart.items.length) return <p className="muted">Your cart is empty. Add something on the Shop page first.</p>;

  const total = Math.round(cart.total * (1 - discount / 100));

  return (
    <>
      {cart.items.map((item) => (
        <div key={item.productId} className="cart-row">
          <span className="name">{item.name}</span>
          <span>
            {item.qty} × {item.price} EUR
          </span>
          {/* Accessibility: icon-only button with no accessible name */}
          <button className="icon-btn" onClick={() => removeFromCart(item.productId).then(setCart)}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      ))}

      <section className="summary">
        {/* Accessibility: h4 straight after the page's h1 skips two levels */}
        <h4>Order summary</h4>
        <div className="coupon">
          {/* Accessibility: placeholder only, no label */}
          <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code" />
          <button className="btn btn--ghost" onClick={() => setDiscount(COUPONS[coupon] ?? 0)}>
            Apply
          </button>
        </div>
        {discount > 0 && <p className="success">{discount}% off applied</p>}
        <p className="price">Total: {total} EUR</p>
        {/* Accessibility: clickable div, not reachable with the keyboard */}
        <div className="fake-link" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide' : 'Show'} delivery details
        </div>
        {showDetails && <p className="muted">Ships in 2–3 days. Free over 100 EUR.</p>}
      </section>
    </>
  );
}
