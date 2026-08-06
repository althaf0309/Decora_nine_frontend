import axios, { AxiosInstance } from 'axios';
import * as Types from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Site Settings
  async getSiteSettings(): Promise<Types.SiteSettings> {
    const response = await this.api.get('/site-settings/current/');
    return response.data;
  }

  // Services
  async getServices(params?: any): Promise<Types.PaginatedResponse<Types.Service>> {
    const response = await this.api.get('/services/', { params });
    return response.data;
  }

  async getServiceBySlug(slug: string): Promise<Types.Service> {
    const response = await this.api.get(`/services/${slug}/`);
    return response.data;
  }

  // Projects
  async getProjects(params?: any): Promise<Types.PaginatedResponse<Types.Project>> {
    const response = await this.api.get('/projects/', { params });
    return response.data;
  }

  async getProjectBySlug(slug: string): Promise<Types.Project> {
    const response = await this.api.get(`/projects/${slug}/`);
    return response.data;
  }

  async getProjectCategories(): Promise<Types.ProjectCategory[]> {
    const response = await this.api.get('/projects/categories/');
    return response.data.results || response.data;
  }

  // News
  async getNews(params?: any): Promise<Types.PaginatedResponse<Types.News>> {
    const response = await this.api.get('/news/', { params });
    return response.data;
  }

  async getNewsBySlug(slug: string): Promise<Types.News> {
    const response = await this.api.get(`/news/${slug}/`);
    return response.data;
  }

  // Testimonials
  async getTestimonials(): Promise<Types.Testimonial[]> {
    const response = await this.api.get('/testimonials/');
    return response.data.results || response.data;
  }

  // Contact Enquiry
  async submitEnquiry(data: Types.ContactEnquiry): Promise<any> {
    const response = await this.api.post('/enquiries/', data);
    return response.data;
  }
}

export default new ApiService();
