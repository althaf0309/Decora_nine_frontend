import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Service } from '../types';
import { ServiceIcon } from '../lib/icons';
import '../styles/Cards.css';

interface ServiceCardProps {
  service: Service;
  index?: number;
  noReveal?: boolean;
}

export const ServiceCard = ({ service, index = 0, noReveal }: ServiceCardProps) => {
  const cls = noReveal ? 'service-card' : `service-card reveal d${(index % 4) + 1}`;
  return (
    <Link to={`/services/${service.slug}`} className={cls}>
      <div className="service-card-img">
        {service.cover_image && <img src={service.cover_image} alt={service.title} />}
        <span className="service-card-icon"><ServiceIcon slug={service.slug} size={22} /></span>
      </div>
      <div className="service-card-body">
        <h3>{service.title}</h3>
        <p>{service.short_description}</p>
        <span className="service-card-link">
          View Details <FiArrowRight className="scl-arw" />
        </span>
      </div>
      <span className="service-card-accent" />
    </Link>
  );
};
