import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.email || !String(body.email).includes('@')) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 422 });
  }
  return NextResponse.json({ ok: true, ticket: 'T-' + Math.floor(Math.random() * 9000 + 1000) });
}
