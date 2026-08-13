import { useEffect, useState } from 'react';
import { FiPhone, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SiteSettings } from '../types';
import apiClient from '../api/client';
import '../styles/FloatingActions.css';

export const FloatingActions = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    apiClient.getSiteSettings().then(setSettings).catch(console.error);
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const phone = settings?.phone || '6366876887';
  const whatsapp = settings?.whatsapp_number || '6366876887';
  const waText = encodeURIComponent(
    "Hi Decora Nine Interiors, I'd like to know more about your interior design services."
  );

  return (
    <div className="fab-stack">
      {showTop && (
        <button
          className="fab fab-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FiArrowUp />
        </button>
      )}
      <a
        className="fab fab-call"
        href={`tel:${phone}`}
        aria-label="Call us"
      >
        <span className="fab-icon"><FiPhone /></span>
        <span className="fab-label">Call</span>
      </a>
      <a
        className="fab fab-wa"
        href={`https://wa.me/91${whatsapp}?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="fab-icon"><FaWhatsapp /></span>
        <span className="fab-label">WhatsApp</span>
      </a>
    </div>
  );
};
