import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { SiteSettings } from '../types';
import apiClient from '../api/client';
import '../styles/Footer.css';

const SERVICES = [
  ['Restaurants & Café Interiors', '/services/restaurant-cafe-interiors'],
  ['Home Interiors & Modular Kitchen', '/services/home-interiors-modular-kitchen'],
  ['ACP & Glass Structure Glazing', '/services/acp-glass-structure-glazing'],
  ['Office Interiors', '/services/office-interiors'],
  ['Furniture & Carpentry Work', '/services/furniture-carpentry'],
  ['Office Glass Partitions', '/services/office-glass-partitions'],
  ['POP Ceilings', '/services/pop-ceilings'],
  ['Kitchen Equipments', '/services/kitchen-equipments'],
];

export const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    apiClient.getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const phones = ['6366876887', '7306876887', '9562955740', '9606476887'];
  const email = settings?.email || 'decoranine@gmail.com';

  return (
    <footer className="footer">
      {/* Premium CTA panel with ribbon */}
      <div className="footer-cta">
        <div className="footer-cta-grid">
          <div className="fcta-panel">
            <span className="fcta-ribbon">CALL US</span>
            <h3>Let's Create Your Dream Space</h3>
            <a href={`tel:${phones[0]}`} className="fcta-phone">Call: +91 <strong>{phones[0]}</strong></a>
            <Link to="/contact" className="btn btn-accent btn-lg">Book Free Consultation</Link>
          </div>
          <div
            className="fcta-image"
            style={{ backgroundImage: 'url(/gallery/living.jpg)' }}
            role="img"
            aria-label="Decora Nine interior"
          />
        </div>
      </div>

      <div className="footer-container container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            {settings?.logo && (
              <img src={settings.logo} alt={settings.company_name} className="footer-logo" />
            )}
            <p>{settings?.footer_description}</p>
            <div className="social-links">
              {settings?.instagram_url && <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>}
              {settings?.facebook_url && <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>}
              {settings?.whatsapp_number && <a href={`https://wa.me/91${settings.whatsapp_number}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>}
              {settings?.linkedin_url && <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>}
              {settings?.youtube_url && <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>}
            </div>
          </div>

          <div className="footer-section">
            <h3>Our Services</h3>
            <ul>
              {SERVICES.map(([name, to]) => (
                <li key={to}><Link to={to}>{name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section footer-contact">
            <h3>Get In Touch</h3>
            <p className="fc-line"><span className="fc-ico">📍</span> {settings?.address}</p>
            <div className="fc-line fc-phones">
              <span className="fc-ico">📞</span>
              <span className="fc-phone-list">
                {phones.map(p => (
                  <a key={p} href={`tel:${p}`}>+91 {p}</a>
                ))}
              </span>
            </div>
            <p className="fc-line"><span className="fc-ico">✉️</span> <a href={`mailto:${email}`}>{email}</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 {settings?.company_name || 'Decora Nine Interiors'}. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
