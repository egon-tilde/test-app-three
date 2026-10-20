import { NextResponse } from 'next/server';
import { products } from '@/lib/data';

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get('q')?.toLowerCase() ?? '';
  await new Promise((r) => setTimeout(r, 300)); // feel like a real API
  return NextResponse.json(products.filter((p) => p.name.toLowerCase().includes(q)));
}
