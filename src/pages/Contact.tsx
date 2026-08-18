import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMessageCircle, FiMail, FiClock, FiTarget, FiEye, FiUsers } from 'react-icons/fi';
import { SiteSettings, Service } from '../types';
import { ContactForm } from '../components/ContactForm';
import { SEO, businessJsonLd } from '../components/SEO';
import apiClient from '../api/client';
import '../styles/Contact.css';

export const Contact = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    Promise.all([
      apiClient.getSiteSettings(),
      apiClient.getServices({ page_size: 50 })
    ]).then(([settingsData, servicesData]) => {
      setSettings(settingsData);
      setServices(servicesData.results);
    }).catch(console.error);
  }, []);

  const phones = ['6366876887', '7306876887', '9562955740', '9606476887'];
  const whatsapp = settings?.whatsapp_number || '6366876887';

  return (
    <div className="contact-page">
      <SEO
        title="Contact — Interior Designers in Bangalore"
        description="Contact Decora Nine Interiors in Madiwala, Bangalore for home, office and commercial interior design. Call +91 6366876887, WhatsApp or request a free consultation."
        keywords="contact interior designers Bangalore, interior design consultation Bangalore, Decora Nine Interiors contact, interior designers Madiwala"
        jsonLd={businessJsonLd}
      />
      <section className="page-header">
        <h1>Get In Touch</h1>
        <p>Have a project in mind? Let's talk</p>
      </section>

      <div className="container">
        <div className="page-intro reveal">
          <h2>Your interior design partner in Bangalore</h2>
          <p>
            Whether it's a new home, an office fit-out, a café or a commercial facade, our team
            is ready to help. Call us, send a WhatsApp message, or fill in the form below and
            we'll get back to you with a customized interior solution.
          </p>
        </div>

        {/* Quick contact highlight cards */}
        <div className="contact-highlights">
          <a href={`tel:${phones[0]}`} className="ch-card reveal d1">
            <span className="ch-icon"><FiPhone /></span>
            <strong>Call Us</strong>
            <span>+91 {phones[0]}</span>
          </a>
          <a href={`https://wa.me/91${whatsapp}`} target="_blank" rel="noopener noreferrer" className="ch-card reveal d2">
            <span className="ch-icon"><FiMessageCircle /></span>
            <strong>WhatsApp</strong>
            <span>Chat with us</span>
          </a>
          <a href={`mailto:${settings?.email}`} className="ch-card reveal d3">
            <span className="ch-icon"><FiMail /></span>
            <strong>Email</strong>
            <span>{settings?.email}</span>
          </a>
          <div className="ch-card reveal d4">
            <span className="ch-icon"><FiClock /></span>
            <strong>Hours</strong>
            <span>Mon–Sat, 10AM–6PM</span>
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-info reveal reveal-left">
            <img src="/gallery/office.jpg" alt="Decora Nine studio work" className="contact-photo" />
            <h2>Contact Information</h2>

            <div className="info-card">
              <h4>📍 Address</h4>
              <p>{settings?.address}</p>
            </div>

            <div className="info-card">
              <h4>📞 Phone</h4>
              {phones.map(p => (
                <p key={p}><a href={`tel:${p}`}>+91 {p}</a></p>
              ))}
            </div>

            <div className="info-card">
              <h4>📧 Email</h4>
              <p><a href={`mailto:${settings?.email}`}>{settings?.email}</a></p>
            </div>

            <div className="info-card">
              <h4>🕒 Business Hours</h4>
              <p>{settings?.business_hours || 'Mon–Sat: 10:00 AM – 6:00 PM, Sun: Closed'}</p>
            </div>
          </div>

          <div className="contact-form-wrapper reveal reveal-right">
            <h2>Send Us a Message</h2>
            <ContactForm services={services} />
          </div>
        </div>
      </div>

      {/* Map */}
      <section className="contact-map reveal">
        <iframe
          title="Decora Nine Interiors location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            settings?.address || '13/4, 3rd Cross, 2nd Main, New Extension, Madiwala, Bangalore 560068'
          )}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

const ABOUT_TAGS = ['Modern', 'Elegant', 'Comfort', 'Minimalist', 'Stylish'];
const ABOUT_GALLERY = [
  '/gallery/living.jpg', '/gallery/office.jpg', '/gallery/restaurant.jpg',
  '/gallery/cafe.webp', '/gallery/kitchen.jpg', '/gallery/glass.jpg',
];

export const About = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    apiClient.getSiteSettings().then(setSettings).catch(console.error);
  }, []);

  return (
    <div className="about-page">
      <SEO
        title="About — Interior Design & Execution Firm in Bangalore"
        description="Decora Nine Interiors is a reputed interior design and execution firm in Bangalore, built on multi-talented supervisors and skilled teams delivering homes, offices and commercial spaces on quality and on schedule."
        keywords="about Decora Nine Interiors, interior design firm Bangalore, interior execution company, best interior designers Bangalore, Madiwala interior designers"
        jsonLd={businessJsonLd}
      />
      <section className="page-header">
        <h1>About Decora Nine Interiors</h1>
        <p>Your interior design partner in Bangalore</p>
      </section>

      <div className="container">
        <section className="about-split">
          <div className="about-media reveal reveal-left">
            <img src="/about.jpg" alt="Decora Nine interior project" />
            <div className="about-badge"><strong><FiUsers /></strong><span>Multi-talented<br />Supervisors &amp; Teams</span></div>
          </div>
          <div className="about-text reveal reveal-right">
            <span className="about-eyebrow">Who We Are</span>
            <h2 className="fancy-h">
              <span className="fh-italic">A reputed interior design &amp;</span>&nbsp;<span className="fh-bold">execution firm</span>
            </h2>
            <p>Decora Nine Interiors is a reputed interior design and execution firm based in Bangalore, built on multi-talented supervisors and skilled teams shaping homes, offices and commercial spaces.</p>
            <p>Our strength lies on the ground — a team of effective supervisors and skilled workers who bring every project in on quality, on schedule and true to design intent, from the first drawing to the final finish.</p>
            <div className="about-tags">
              {ABOUT_TAGS.map(t => <span key={t} className="tag-chip">{t}</span>)}
            </div>
          </div>
        </section>

        <section className="about-stats">
          <div className="about-sec-head">
            <span className="about-eyebrow center">By the Numbers</span>
            <h2 className="fancy-h center about-fh">
              <span className="fh-italic">Our</span>&nbsp;<span className="fh-bold">Track Record</span>
              <span className="fh-dash" />
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card reveal">
              <div className="stat-number stat-number-sm">Skilled</div>
              <div className="stat-label">Supervisors &amp; Teams</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-number">6</div>
              <div className="stat-label">Core Services</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-number">100%</div>
              <div className="stat-label">In-house Execution</div>
            </div>
            <div className="stat-card reveal">
              <div className="stat-number">South India</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
          </div>
        </section>

        <section className="about-mv-section">
          <div className="about-sec-head">
            <span className="about-eyebrow center">Our Purpose</span>
            <h2 className="fancy-h center about-fh">
              <span className="fh-italic">Mission &amp;</span>&nbsp;<span className="fh-bold">Vision</span>
              <span className="fh-dash" />
            </h2>
          </div>
          <div className="about-mv">
            <div className="mv-card reveal reveal-left">
              <span className="mv-icon"><FiTarget /></span>
              <h3>Our Mission</h3>
              <p>Building beautiful, functional interiors — reliably, every time. We turn everyday spaces into places that work better and feel better, delivered on quality and on schedule.</p>
            </div>
            <div className="mv-card reveal reveal-right">
              <span className="mv-icon"><FiEye /></span>
              <h3>Our Vision</h3>
              <p>To be South India's most trusted interior design partner — the name clients and businesses recommend for design that lasts and execution they can depend on.</p>
            </div>
          </div>
        </section>

        <section className="about-philosophy reveal">
          <span className="about-eyebrow center light">Our Philosophy</span>
          <h2 className="fancy-h center on-dark about-fh">
            <span className="fh-italic">Beautiful</span>&nbsp;<span className="fh-bold">Spaces</span>
          </h2>
          <p>“Every space we design is a space that feels as good as it looks — built to last, built to work.”</p>
        </section>

        <section className="about-process">
          <div className="about-sec-head">
            <span className="about-eyebrow center">How We Work</span>
            <h2 className="fancy-h center about-fh">
              <span className="fh-italic">Our</span>&nbsp;<span className="fh-bold">Process</span>
              <span className="fh-dash" />
            </h2>
          </div>
          <div className="process-steps">
            <div className="step reveal">
              <div className="step-number">1</div>
              <h4>Consultation</h4>
              <p>Understand your vision and requirements</p>
            </div>
            <div className="step reveal">
              <div className="step-number">2</div>
              <h4>Site Visit & Measurement</h4>
              <p>Detailed site assessment and planning</p>
            </div>
            <div className="step reveal">
              <div className="step-number">3</div>
              <h4>Concept & Design</h4>
              <p>Creative design solutions tailored for you</p>
            </div>
            <div className="step reveal">
              <div className="step-number">4</div>
              <h4>Material Selection</h4>
              <p>Premium quality materials selection</p>
            </div>
            <div className="step reveal">
              <div className="step-number">5</div>
              <h4>Estimation & Approval</h4>
              <p>Transparent pricing and timeline</p>
            </div>
            <div className="step reveal">
              <div className="step-number">6</div>
              <h4>Execution</h4>
              <p>Expert installation and execution</p>
            </div>
            <div className="step reveal">
              <div className="step-number">7</div>
              <h4>Quality Inspection</h4>
              <p>Rigorous quality checks</p>
            </div>
            <div className="step reveal">
              <div className="step-number">8</div>
              <h4>Handover & Support</h4>
              <p>Final handover and after-sales service</p>
            </div>
          </div>
        </section>

        <section className="about-gallery-section">
          <div className="about-sec-head">
            <span className="about-eyebrow center">Our Work</span>
            <h2 className="fancy-h center about-fh">
              <span className="fh-italic">A Glimpse of</span>&nbsp;<span className="fh-bold">Our Projects</span>
              <span className="fh-dash" />
            </h2>
          </div>
          <div className="about-gallery">
            {ABOUT_GALLERY.map((img, i) => (
              <figure key={img} className={`ag-item reveal d${(i % 4) + 1}`}>
                <img src={img} alt="Decora Nine interior work" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section className="about-cta reveal">
          <h2 className="fancy-h center about-fh">
            <span className="fh-italic">Ready to Transform</span>&nbsp;<span className="fh-bold">Your Space?</span>
          </h2>
          <p>Let's discuss your project and create something exceptional together</p>
          <Link to="/contact" className="btn btn-accent btn-lg">Get Started</Link>
        </section>
      </div>
    </div>
  );
};
