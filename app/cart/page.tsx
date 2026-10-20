import type { Metadata } from 'next';
import CartView from '@/components/CartView';

// Only a title: Page check will flag the missing description, canonical and Open Graph tags.
export const metadata: Metadata = {
  title: 'Cart',
};

export default function CartPage() {
  return (
    <>
      <h1>Your cart</h1>
      <CartView />
    </>
  );
}
