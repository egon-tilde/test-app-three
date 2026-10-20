import type { Cart, Product } from './types';

export const products: Product[] = [
  { id: 1, name: 'Paper lamp', price: 120, discount: 0, image: '/lamp.svg', inStock: true },
  { id: 2, name: 'Oak stool', price: 89, discount: 10, image: '/stool.svg', inStock: true },
  { id: 3, name: 'Linen throw', price: 54, discount: 0, image: '/throw.svg', inStock: false },
  { id: 4, name: 'Clay vase', price: 36, discount: 15, image: '/vase.svg', inStock: true },
];

// In-memory cart for the demo (resets when the dev server restarts).
const g = globalThis as unknown as { __demoCart?: Cart };
export function cart(): Cart {
  if (!g.__demoCart) g.__demoCart = { items: [], total: 0 };
  return g.__demoCart;
}

export function recalc(c: Cart) {
  c.total = c.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return c;
}
