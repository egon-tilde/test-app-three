'use client';

import { useState } from 'react';
import { sendContact } from '@/lib/api';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await sendContact({ name, email, message });
      setStatus('sent');
      setResult(`Thanks! Your ticket is ${res.ticket}.`);
    } catch (err) {
      setStatus('error');
      setResult((err as Error).message);
      console.error('Contact form failed', err);
    }
  }

  return (
    <>
      {/* Accessibility: image without alt text */}
      <img className="hero" src="/throw.svg" />
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {/* Accessibility: textarea without a label */}
        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" />
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'sent' && <p className="success">{result}</p>}
        {status === 'error' && <p className="error">{result}</p>}
      </form>

      <div className="danger-zone">
        <p className="muted">For the Report section: makes a failed request and a console error.</p>
        <button
          className="btn btn--ghost"
          onClick={() => {
            fetch('/api/does-not-exist');
            console.error('Demo error: something went wrong in ContactForm');
          }}
        >
          Break something
        </button>
      </div>
    </>
  );
}
