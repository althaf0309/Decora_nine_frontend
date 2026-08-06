import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiteSettings } from '../types';
import apiClient from '../api/client';
import '../styles/Header.css';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/news', label: 'News' },
];

export const Header = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    apiClient.getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  const phone = settings?.phone || '6366876887';
  const email = settings?.email || 'decoranine@gmail.com';

  return (
    <header className="header">
      {/* Top utility bar */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href={`tel:${phone}`}>📞 +91 {phone}</a>
            <a href={`mailto:${email}`}>✉️ {email}</a>
          </div>
          <div className="topbar-right">
            <span>🕒 {settings?.business_hours || 'Mon–Sat: 10:00 AM – 6:00 PM'}</span>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            {settings?.logo ? (
              <img src={settings.logo} alt={settings.company_name} className="logo-img" />
            ) : (
              <span className="logo-name">{settings?.company_name || 'Decora Nine Interiors'}</span>
            )}
          </Link>

          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            {NAV.map(item => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? 'nav-active' : '')}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/contact"
                className="btn-contact"
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
