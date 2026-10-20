import type { Metadata } from 'next';
import ProductList from '@/components/ProductList';

// Full SEO metadata: Page check should be (almost) all green here.
export const metadata: Metadata = {
  title: 'Shop handmade home goods | Hearth & Grain',
  description: 'Lamps, stools, throws and vases made by small workshops. Free shipping over 100 EUR and 30-day returns on every order.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Shop handmade home goods',
    description: 'Lamps, stools, throws and vases made by small workshops.',
    url: '/',
    type: 'website',
    images: ['/lamp.svg'],
  },
};

export default function ShopPage() {
  return (
    <>
      <h1>Shop</h1>
      <p className="intro">Small things for a calm home. Search and add to cart.</p>
      <ProductList />
    </>
  );
}
