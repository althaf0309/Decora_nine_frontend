import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiClock, FiTool, FiEdit3, FiTarget, FiEye, FiHeart,
} from 'react-icons/fi';
import { Service, Project, SiteSettings, Testimonial } from '../types';
import { ServiceCarousel } from '../components/ServiceCarousel';
import { ProjectCard } from '../components/Cards';
import apiClient from '../api/client';
import '../styles/Home.css';

const TAGS = ['Modern', 'Elegant', 'Comfort', 'Minimalist', 'Stylish'];

const HERO_IMAGES = [
  '/gallery/cafe.webp',
  '/gallery/restaurant.jpg',
  '/gallery/office.jpg',
  '/gallery/living.jpg',
  '/gallery/glass.jpg',
];

const WHY = [
  { icon: <FiUsers />, title: 'Multi-talented Teams', text: 'Skilled supervisors and craftsmen who bring real expertise to every project across South India.' },
  { icon: <FiClock />, title: 'On-Schedule Delivery', text: 'Effective supervisors and a disciplined process bring every project in on time.' },
  { icon: <FiTool />, title: 'Skilled In-House Team', text: 'Our own supervisors and craftsmen execute the work — no loose ends, no surprises.' },
  { icon: <FiEdit3 />, title: 'True to Design Intent', text: 'From the first drawing to the final finish, the result matches the vision.' },
];

const MISSION_VISION = [
  {
    icon: <FiTarget />, title: 'Our Mission', img: '/gallery/glass.jpg',
    text: 'To build beautiful, functional interiors — reliably, every time. We turn everyday homes, offices and commercial spaces into places that work better and feel better, delivered on quality and on schedule.',
    dir: 'reveal-left',
  },
  {
    icon: <FiEye />, title: 'Our Vision', img: '/gallery/kitchen.jpg',
    text: "To be South India's most trusted interior design partner — the name clients and businesses recommend for design that lasts and execution they can depend on.",
    dir: '',
  },
  {
    icon: <FiHeart />, title: 'Our Promise', img: '/gallery/cafe.webp',
    text: 'Honest advice, transparent pricing and a skilled in-house team that stays true to the design intent — from the very first drawing to the final finish.',
    dir: 'reveal-right',
  },
];

const STATS = [
  { num: 'Skilled', label: 'Supervisors & Teams' },
  { num: '6', label: 'Core Services' },
  { num: '100%', label: 'In-house Execution' },
  { num: 'South India', label: 'Projects Delivered' },
];

const SHOWCASE = [
  {
    tag: 'Residential', a: 'Residential', b: 'Interiors', img: '/gallery/living.jpg',
    text: 'We create exquisite, functional living spaces — living rooms, bedrooms and modular kitchens — that reflect the unique personality and lifestyle of every homeowner.',
    to: '/services/residential-interior-design',
  },
  {
    tag: 'Commercial', a: 'Commercial', b: 'Interiors', img: '/gallery/restaurant.jpg',
    text: 'Whether it’s a sleek café, a stylish retail space or a high-end hospitality project, our designs optimise flow, elevate your brand and engage your customers.',
    to: '/services/commercial-interior-design',
  },
  {
    tag: 'Office', a: 'Office', b: 'Interiors', img: '/gallery/office.jpg',
    text: 'Productive, inspiring workspaces with open-plan layouts, glass cabins and breakout zones — designed for growing teams and delivered on schedule.',
    to: '/services/office-interiors',
  },
];

export const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    apiClient.getServices({ page_size: 8 }).then(d => setServices(d.results)).catch(console.error);
    apiClient.getProjects({ page_size: 6 }).then(d => setProjects(d.results)).catch(console.error);
    apiClient.getSiteSettings().then(setSettings).catch(console.error);
    apiClient.getTestimonials().then(setTestimonials).catch(console.error);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = projects.filter(p => p.is_featured);
  const featuredProjects = (featured.length ? featured : projects).slice(0, 3);
  const phone = settings?.phone || '6366876887';
  const whatsapp = settings?.whatsapp_number || '6366876887';

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slides">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`hero-slide ${i === slide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tagline reveal">DECORA NINE INTERIORS · BANGALORE</span>
          <h1 className="reveal d1">Your Interior Design Partner</h1>
          <p className="reveal d2">
            Beautiful, functional interiors for homes, offices, restaurants and commercial
            spaces — built to last, built to work. Reliably, every time.
          </p>
          <div className="hero-buttons reveal d3">
            <Link to="/contact" className="btn btn-accent btn-lg">Book Free Consultation</Link>
            <Link to="/projects" className="btn btn-secondary btn-lg">View Our Work</Link>
          </div>
        </div>
        <div className="hero-dots">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={i === slide ? 'on' : ''}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* Trust / Stats bar */}
      <section className="stats-bar">
        <div className="container stats-bar-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className={`stat-pill reveal d${i + 1}`}>
              <span className="stat-pill-num">{s.num}</span>
              <span className="stat-pill-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome line */}
      <section className="welcome-line">
        <div className="container">
          <p className="reveal">
            Welcome to <strong>Decora Nine Interiors</strong> — a reputed, premium interior
            design &amp; execution firm in Bangalore, crafting beautiful, functional spaces
            across South India.
          </p>
        </div>
      </section>

      {/* About / Intro */}
      <section className="intro-section">
        <div className="container intro-grid">
          <div className="intro-media reveal reveal-left">
            <img src="/about.jpg" alt="Decora Nine interior work" />
            <div className="intro-badge">
              <strong><FiUsers /></strong>
              <span>Multi-talented<br />Supervisors &amp; Teams</span>
            </div>
          </div>
          <div className="intro-text reveal reveal-right">
            <span className="eyebrow">About Us</span>
            <h2>A reputed interior design &amp; execution firm in Bangalore</h2>
            <p>
              Decora Nine Interiors brings together multi-talented supervisors and skilled
              teams to shape homes, offices and commercial spaces. Our strength lies on the
              ground — people who bring every project in on quality, on schedule and true to
              design intent, from the first drawing to the final finish.
            </p>
            <div className="tag-row">
              {TAGS.map(t => <span key={t} className="tag-chip">{t}</span>)}
            </div>
            <Link to="/about" className="btn btn-primary">More About Us</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <span className="eyebrow center reveal">What We Do</span>
          <h2 className="fancy-h center reveal d1">
            <span className="fh-italic">Our</span>&nbsp;<span className="fh-bold">Services</span>
            <span className="fh-dash" />
          </h2>
          <p className="section-subtitle reveal d1">Expert interior solutions tailored to your needs — swipe to explore</p>
          <ServiceCarousel services={services} />
        </div>
      </section>

      {/* Showcase — alternating image + navy panel */}
      <section className="showcase-section">
        <div className="container">
          <div className="showcase-head">
            <span className="eyebrow center reveal">Our Portfolio</span>
            <h2 className="fancy-h center reveal d1">
              <span className="fh-italic">Explore</span>&nbsp;<span className="fh-bold">Our Work</span>
              <span className="fh-dash" />
            </h2>
          </div>

          {SHOWCASE.map((s, i) => (
            <div key={s.tag} className={`showcase-row ${i % 2 ? 'reverse' : ''}`}>
              <div className="showcase-img reveal reveal-left">
                <img src={s.img} alt={`${s.a} ${s.b}`} />
              </div>
              <div className="showcase-panel reveal reveal-right">
                <h3 className="fancy-h on-dark">
                  <span className="fh-italic">{s.a}</span>&nbsp;<span className="fh-bold">{s.b}</span>
                </h3>
                <p>{s.text}</p>
                <Link to={s.to} className="btn btn-outline on-dark">
                  <span className="arw">→</span> View Projects
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <span className="eyebrow center reveal">Our Past Projects</span>
            <h2 className="fancy-h center reveal d1">
              <span className="fh-italic">Recent</span>&nbsp;<span className="fh-bold">Work</span>
              <span className="fh-dash" />
            </h2>
            <p className="section-subtitle reveal d1">
              Stand-out interiors for restaurants, cafés, offices and large-format spaces across South India
            </p>
            <div className="projects-grid">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
            <div className="center-btn">
              <Link to="/projects" className="btn btn-primary">View All Projects</Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="why-section">
        <div className="container">
          <span className="eyebrow center reveal">Why Decora Nine</span>
          <h2 className="fancy-h center reveal d1">
            <span className="fh-italic">The Decora Nine</span>&nbsp;<span className="fh-bold">Advantage</span>
            <span className="fh-dash" />
          </h2>
          <p className="section-subtitle reveal d1">
            Our strength lies on the ground — quality work, delivered reliably
          </p>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={w.title} className={`why-card reveal d${i + 1}`}>
                <span className="why-icon">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="mv-section">
        <div className="container">
          <div className="mv-head">
            <span className="eyebrow center reveal">Our Purpose</span>
            <h2 className="fancy-h center reveal d1">
              <span className="fh-italic">Mission,</span>&nbsp;<span className="fh-bold">Vision &amp; Values</span>
              <span className="fh-dash" />
            </h2>
            <p className="section-subtitle reveal d1">
              What drives every design decision and every day on site
            </p>
          </div>
          <div className="mv-grid">
            {MISSION_VISION.map(m => (
              <div key={m.title} className={`mv-card reveal ${m.dir}`}>
                <div className="mv-card-img">
                  <img src={m.img} alt={m.title} />
                  <span className="mv-icon">{m.icon}</span>
                </div>
                <div className="mv-card-body">
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy band */}
      <section className="philosophy-section">
        <div className="container">
          <span className="eyebrow center light reveal">Our Philosophy</span>
          <h2 className="reveal d1">Beautiful Spaces</h2>
          <p className="philosophy-quote reveal d2">
            “Every space we design is a space that feels as good as it looks — built to last, built to work.”
          </p>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="testimonials-section">
          <div className="container">
            <span className="eyebrow center reveal">Testimonials</span>
            <h2 className="fancy-h center reveal d1">
              <span className="fh-italic">What Our Clients</span>&nbsp;<span className="fh-bold">Say</span>
              <span className="fh-dash" />
            </h2>
            <p className="section-subtitle reveal d1">Real feedback from homes and businesses we've delivered</p>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <div key={t.id} className={`testimonial-card reveal d${i + 1}`}>
                  <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                  <p className="testimonial-text">“{t.feedback}”</p>
                  <div className="testimonial-author">
                    <span className="author-avatar">{t.customer_name.charAt(0)}</span>
                    <div>
                      <strong>{t.customer_name}</strong>
                      <span>{t.designation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="reveal">Planning a New Interior Project?</h2>
          <p className="reveal d1">Talk to our team and receive a customized interior solution</p>
          <div className="cta-buttons reveal d2">
            <a href={`tel:${phone}`} className="btn btn-light">📞 Call Now</a>
            <a href={`https://wa.me/91${whatsapp}`} className="btn btn-light" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            <Link to="/contact" className="btn btn-light">📝 Request Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
