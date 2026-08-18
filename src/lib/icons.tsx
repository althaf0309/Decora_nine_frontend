import { IconType } from 'react-icons';
import {
  FiCoffee, FiHome, FiLayers, FiBriefcase, FiColumns, FiSun, FiGrid,
} from 'react-icons/fi';
import { FaChair, FaUtensils } from 'react-icons/fa';

const SERVICE_ICON: Record<string, IconType> = {
  'restaurant-cafe-interiors': FiCoffee,
  'home-interiors-modular-kitchen': FiHome,
  'acp-glass-structure-glazing': FiLayers,
  'office-interiors': FiBriefcase,
  'kitchen-equipments': FaUtensils,
  'furniture-carpentry': FaChair,
  'office-glass-partitions': FiColumns,
  'pop-ceilings': FiSun,
};

interface ServiceIconProps {
  slug: string;
  size?: number;
  className?: string;
}

export const ServiceIcon = ({ slug, size = 24, className }: ServiceIconProps) => {
  const Icon = SERVICE_ICON[slug] || FiGrid;
  return <Icon size={size} className={className} />;
};
