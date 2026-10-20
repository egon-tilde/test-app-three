import type { Cart, ContactRequest, ContactResponse, Product } from './types';

export async function getProducts(query = ''): Promise<Product[]> {
  const res = await fetch(`/api/products${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  if (!res.ok) throw new Error(`Products failed: ${res.status}`);
  return res.json() as Promise<Product[]>;
}

export async function getCart(): Promise<Cart> {
  const res = await fetch('/api/cart');
  return res.json() as Promise<Cart>;
}

export async function addToCart(productId: number, qty = 1): Promise<Cart> {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty }),
  });
  if (!res.ok) throw new Error(`Add to cart failed: ${res.status}`);
  return res.json() as Promise<Cart>;
}

export async function removeFromCart(productId: number): Promise<Cart> {
  const res = await fetch(`/api/cart?productId=${productId}`, { method: 'DELETE' });
  return res.json() as Promise<Cart>;
}

export async function sendContact(body: ContactRequest): Promise<ContactResponse> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Contact failed: ${res.status}`);
  return res.json() as Promise<ContactResponse>;
}
