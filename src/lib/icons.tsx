import { IconType } from 'react-icons';
import {
  FiHome, FiShoppingBag, FiBriefcase, FiTool, FiTag, FiLayers, FiGrid,
} from 'react-icons/fi';

const SERVICE_ICON: Record<string, IconType> = {
  'residential-interior-design': FiHome,
  'commercial-interior-design': FiShoppingBag,
  'office-interiors': FiBriefcase,
  'furniture-carpentry': FiTool,
  'signage-board-work': FiTag,
  'acp-glass-structure-glazing': FiLayers,
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
