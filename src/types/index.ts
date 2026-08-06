export interface SiteSettings {
  id: number;
  company_name: string;
  logo: string | null;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  business_hours: string;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  google_maps_url: string | null;
  footer_description: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  cover_image: string;
  gallery: ServiceGallery[];
  seo_title: string;
  seo_description: string;
}

export interface ServiceGallery {
  id: number;
  image: string;
  caption: string;
  display_order: number;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: ProjectCategory;
  client_name: string;
  location: string;
  completion_date: string;
  project_area: string;
  short_description: string;
  description: string;
  cover_image: string;
  gallery: ProjectGallery[];
  is_featured: boolean;
}

export interface ProjectGallery {
  id: number;
  image: string;
  caption: string;
  display_order: number;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  featured_image: string;
  summary: string;
  content: string;
  author: string;
  category: NewsCategory | null;
  published_date: string;
  seo_title: string;
  seo_description: string;
}

export interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  designation: string;
  customer_image: string | null;
  rating: number;
  feedback: string;
}

export interface ContactEnquiry {
  full_name: string;
  phone: string;
  email: string;
  service?: number;
  project_location: string;
  estimated_budget?: string;
  preferred_contact_method: 'phone' | 'email' | 'whatsapp';
  message: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
