import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Service } from '../types';
import { ServiceCard } from './ServiceCard';
import '../styles/ServiceCarousel.css';

export const ServiceCarousel = ({ services }: { services: Service[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.svc-slide') as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="svc-carousel reveal">
      <button className="svc-arrow left" onClick={() => scroll(-1)} aria-label="Previous services">
        <FiChevronLeft />
      </button>
      <div className="svc-track" ref={trackRef}>
        {services.map((s, i) => (
          <div className="svc-slide" key={s.id}>
            <ServiceCard service={s} index={i} noReveal />
          </div>
        ))}
      </div>
      <button className="svc-arrow right" onClick={() => scroll(1)} aria-label="Next services">
        <FiChevronRight />
      </button>
    </div>
  );
};
