import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Service } from '../types';
import { ServiceIcon } from '../lib/icons';
import { ServiceCard } from '../components/ServiceCard';
import { SEO, businessJsonLd } from '../components/SEO';
import { FAQ, CTABand, faqJsonLd, QA } from '../components/PageExtras';
import apiClient from '../api/client';
import '../styles/ServiceDetail.css';

const PROCESS = [
  ['01', 'Consultation', 'We understand your space, needs, style and budget — free of charge.'],
  ['02', 'Design & Estimate', 'Layouts, 3D visuals and a transparent, itemised estimate to approve.'],
  ['03', 'Execution', 'Our in-house supervisors and craftsmen build it on quality and on schedule.'],
  ['04', 'Handover', 'A final quality check, walkthrough and after-sales support.'],
];

const SERVICE_FAQ: QA[] = [
  { q: 'How much does interior design cost in Bangalore?', a: 'It depends on the size of the space, the scope of work and the materials you choose. After a free consultation and site visit we give you a transparent, itemised estimate, so you know exactly what you are paying for before any work begins.' },
  { q: 'Do you handle both design and execution?', a: 'Yes. Decora Nine is a design-and-execution firm — we manage layout, 3D design, materials, carpentry, modular kitchens, glazing, signage and site supervision under one roof, so you deal with a single accountable team.' },
  { q: 'How long does an interior project take?', a: 'A typical home interior takes about 6–10 weeks and an office or commercial fit-out about 4–8 weeks, depending on scope. Because our supervisors and workers are in-house, we keep projects true to schedule from the first drawing to the final finish.' },
  { q: 'Which areas do you serve?', a: 'We are based in Madiwala, Bangalore and take on residential, office and commercial interior projects across Bangalore and South India.' },
  { q: 'Can you work within my budget?', a: 'Absolutely. We design to your budget and priorities, recommending materials and finishes that balance looks, durability and cost — without compromising on quality or timelines.' },
];

export const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getServices({ page_size: 50 })
      .then(data => setServices(data.results))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="services-page">
      <SEO
        title="Interior Design Services in Bangalore"
        description="Residential, office, commercial, café & restaurant interior design and execution in Bangalore. Modular kitchens, furniture & carpentry, signage and ACP & glass glazing — designed and delivered by Decora Nine Interiors."
        keywords="interior design services Bangalore, residential interior designers Bangalore, office interior design, commercial interior design, modular kitchen Bangalore, furniture and carpentry, ACP glass glazing, signage board work"
        jsonLd={[businessJsonLd, faqJsonLd(SERVICE_FAQ)]}
      />
      <section className="page-header">
        <h1>Our Services</h1>
        <p>Complete interior design &amp; execution in Bangalore</p>
      </section>

      <div className="container">
        <div className="page-intro reveal">
          <h2>End-to-end interior design &amp; execution</h2>
          <p>
            From concept and design to on-site execution, Decora Nine delivers complete interior
            solutions for homes, offices, restaurants, cafés and commercial spaces across Bangalore.
            With multi-talented supervisors and a skilled in-house team, we handle every stage —
            space planning, 3D design, modular kitchens, furniture &amp; carpentry, glazing and
            signage — on quality and on schedule. Explore our core services below.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <Link key={service.id} to={`/services/${service.slug}`} className={`service-detail-card reveal d${(i % 3) + 1}`}>
              <div className="service-detail-img">
                <img src={service.cover_image} alt={`${service.title} in Bangalore by Decora Nine Interiors`} />
                <span className="service-icon-badge"><ServiceIcon slug={service.slug} size={26} /></span>
              </div>
              <div className="service-detail-body">
                <h3>{service.title}</h3>
                <p>{service.short_description}</p>
                <span className="btn-link">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How we work */}
      <section className="proc-section">
        <div className="container">
          <div className="about-sec-head">
            <span className="eyebrow center reveal">How We Work</span>
            <h2 className="fancy-h center about-fh reveal d1">
              <span className="fh-italic">A Simple,</span>&nbsp;<span className="fh-bold">Proven Process</span>
              <span className="fh-dash" />
            </h2>
          </div>
          <div className="proc-grid">
            {PROCESS.map(([n, t, d], i) => (
              <div key={n} className={`proc-card reveal d${i + 1}`}>
                <span className="proc-num">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={SERVICE_FAQ} eyebrow="Interior Design FAQ" />

      <CTABand
        heading="Planning your next interior?"
        text="Get a free consultation and a transparent estimate from Bangalore's dependable interior design & execution team."
      />
    </div>
  );
};

export const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [others, setOthers] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      apiClient.getServiceBySlug(slug)
        .then(setService)
        .catch(console.error)
        .finally(() => setLoading(false));
      apiClient.getServices({ page_size: 8 })
        .then(d => setOthers(d.results))
        .catch(console.error);
    }
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!service) return <div className="error">Service not found</div>;

  const otherServices = others.filter(s => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="service-detail-page">
      <SEO
        title={`${service.title} in Bangalore`}
        description={`${service.short_description}. ${service.title} by Decora Nine Interiors — design and execution across Bangalore and South India. ${service.description.slice(0, 110)}`}
        keywords={`${service.title} Bangalore, ${service.title} interior designers, interior design Bangalore`}
        image={service.cover_image}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: service.title,
          provider: businessJsonLd,
          areaServed: 'Bangalore',
          description: service.short_description,
        }}
      />
      <section className="pd-hero" style={{ backgroundImage: `url(${service.cover_image})` }}>
        <div className="pd-hero-overlay" />
        <div className="pd-hero-content">
          <span className="pd-category"><ServiceIcon slug={service.slug} size={15} /> Service</span>
          <h1>{service.title}</h1>
          <p className="pd-hero-loc">{service.short_description}</p>
        </div>
      </section>

      <div className="container">
        <Link to="/services" className="pd-back"><FiArrowLeft /> All Services</Link>

        <div className="pd-overview reveal">
          <h2 className="fancy-h">
            <span className="fh-italic">About This</span>&nbsp;<span className="fh-bold">Service</span>
            <span className="fh-dash" />
          </h2>
          <p>{service.description}</p>
        </div>

        {service.gallery.length > 0 && (
          <div className="pd-gallery-section">
            <div className="about-sec-head">
              <span className="eyebrow center reveal">Gallery</span>
              <h2 className="fancy-h center about-fh reveal d1">
                <span className="fh-italic">Our</span>&nbsp;<span className="fh-bold">Work</span>
                <span className="fh-dash" />
              </h2>
            </div>
            <div className="pd-gallery">
              {service.gallery.map((item, i) => (
                <figure key={item.id} className={`pd-gitem reveal d${(i % 4) + 1}`}>
                  <img src={item.image} alt={item.caption || service.title} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        )}

        {otherServices.length > 0 && (
          <div className="pd-related">
            <div className="about-sec-head">
              <span className="eyebrow center reveal">Explore More</span>
              <h2 className="fancy-h center about-fh reveal d1">
                <span className="fh-italic">Other</span>&nbsp;<span className="fh-bold">Services</span>
                <span className="fh-dash" />
              </h2>
            </div>
            <div className="pd-related-grid">
              {otherServices.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        )}

        <section className="pd-cta reveal">
          <h2 className="fancy-h center on-dark">
            <span className="fh-italic">Interested in this</span>&nbsp;<span className="fh-bold">service?</span>
          </h2>
          <p>Book a free consultation and let's plan your project together.</p>
          <Link to="/contact" className="btn btn-accent btn-lg">Book Free Consultation</Link>
        </section>
      </div>
    </div>
  );
};
