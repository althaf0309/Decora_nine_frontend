import { useState } from 'react';
import { ContactEnquiry, Service } from '../types';
import apiClient from '../api/client';
import '../styles/ContactForm.css';

interface ContactFormProps {
  services?: Service[];
}

export const ContactForm = ({ services = [] }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactEnquiry>({
    full_name: '',
    phone: '',
    email: '',
    project_location: '',
    estimated_budget: '',
    preferred_contact_method: 'email',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await apiClient.submitEnquiry(formData);
      setMessage({ type: 'success', text: 'Enquiry submitted successfully! We will contact you soon.' });
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        project_location: '',
        estimated_budget: '',
        preferred_contact_method: 'email',
        message: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit enquiry. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {message && (
        <div className={`form-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="full_name">Full Name *</label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
          placeholder="Your Name"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXXXXXXX"
          />
        </div>
      </div>

      {services.length > 0 && (
        <div className="form-group">
          <label htmlFor="service">Service Interested In</label>
          <select id="service" name="service" onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value ? parseInt(e.target.value) : undefined }))}>
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.title}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="project_location">Project Location</label>
        <input
          type="text"
          id="project_location"
          name="project_location"
          value={formData.project_location}
          onChange={handleChange}
          placeholder="Where is your project located?"
        />
      </div>

      <div className="form-group">
        <label htmlFor="estimated_budget">Estimated Budget</label>
        <input
          type="text"
          id="estimated_budget"
          name="estimated_budget"
          value={formData.estimated_budget}
          onChange={handleChange}
          placeholder="e.g., 5-10 lakhs"
        />
      </div>

      <div className="form-group">
        <label htmlFor="preferred_contact_method">Preferred Contact Method</label>
        <select
          id="preferred_contact_method"
          name="preferred_contact_method"
          value={formData.preferred_contact_method}
          onChange={handleChange}
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell us about your project..."
          rows={5}
        />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Send Enquiry'}
      </button>
    </form>
  );
};
