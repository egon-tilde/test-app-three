import { NextResponse } from 'next/server';
import { cart, products, recalc } from '@/lib/data';

export async function GET() {
  return NextResponse.json(cart());
}

export async function POST(req: Request) {
  const { productId, qty = 1 } = await req.json();
  const p = products.find((x) => x.id === productId);
  if (!p) return NextResponse.json({ error: 'Unknown product' }, { status: 404 });
  if (!p.inStock) return NextResponse.json({ error: 'Out of stock' }, { status: 409 });
  const c = cart();
  const line = c.items.find((i) => i.productId === productId);
  if (line) line.qty += qty;
  else c.items.push({ productId, name: p.name, price: Math.round(p.price * (1 - p.discount / 100)), qty });
  return NextResponse.json(recalc(c));
}

export async function DELETE(req: Request) {
  const id = Number(new URL(req.url).searchParams.get('productId'));
  const c = cart();
  c.items = c.items.filter((i) => i.productId !== id);
  return NextResponse.json(recalc(c));
}
