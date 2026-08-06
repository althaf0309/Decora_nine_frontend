import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Service } from '../types';
import { ServiceIcon } from '../lib/icons';
import { ServiceCard } from '../components/ServiceCard';
import apiClient from '../api/client';
import '../styles/ServiceDetail.css';

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
      <section className="page-header">
        <h1>Our Services</h1>
        <p>Complete interior design and execution solutions</p>
      </section>

      <div className="container">
        <div className="page-intro reveal">
          <h2>End-to-end interior design &amp; execution</h2>
          <p>
            From concept and design to on-site execution, Decora Nine delivers complete
            interior solutions for homes, offices, restaurants and commercial spaces. With
            13 years of experience and a skilled in-house team, we handle every stage — layout,
            materials, carpentry, glazing and signage — on quality and on schedule. Explore our
            core services below.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <Link key={service.id} to={`/services/${service.slug}`} className={`service-detail-card reveal d${(i % 3) + 1}`}>
              <div className="service-detail-img">
                <img src={service.cover_image} alt={service.title} />
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
