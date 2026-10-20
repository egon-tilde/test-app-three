import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import Sourcepeek from "sourcepeek/react";

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Hearth & Grain — small home goods',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Hearth &amp; Grain
          </Link>
          <nav className="nav">
            <Link href="/">Shop</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/hihi">hihi</Link>
          </nav>
        </header>
        <main className="page">{children}<Sourcepeek /></main>
      </body>
    </html>
  );
}
