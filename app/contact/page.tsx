import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact the workshop | Hearth & Grain',
  description: 'Questions about an order, a custom piece or a return? Write to the workshop and we answer within one working day.',
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      {/* SEO: a second h1 on the page — Page check warns about it */}
      <h1 className="muted">We answer within a day</h1>
      <ContactForm />
    </>
  );
}
