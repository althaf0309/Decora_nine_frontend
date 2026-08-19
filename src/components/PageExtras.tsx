import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';
import '../styles/PageExtras.css';

export interface QA { q: string; a: string; }

export const faqJsonLd = (items: QA[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(it => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
});

export const FAQ = ({ items, eyebrow = 'FAQ' }: { items: QA[]; eyebrow?: string }) => {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section">
      <div className="container">
        <div className="about-sec-head">
          <span className="eyebrow center reveal">{eyebrow}</span>
          <h2 className="fancy-h center about-fh reveal d1">
            <span className="fh-italic">Frequently Asked</span>&nbsp;<span className="fh-bold">Questions</span>
            <span className="fh-dash" />
          </h2>
        </div>
        <div className="faq-list reveal">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button type="button" className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                {open === i ? <FiMinus /> : <FiPlus />}
              </button>
              <div className="faq-a"><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface CTABandProps {
  heading: string;
  text: string;
  to?: string;
  label?: string;
}

export const CTABand = ({ heading, text, to = '/contact', label = 'Book Free Consultation' }: CTABandProps) => (
  <section className="cta-band">
    <div className="container cta-band-inner reveal">
      <div className="cta-band-text">
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
      <Link to={to} className="btn btn-accent btn-lg">{label}</Link>
    </div>
  </section>
);
