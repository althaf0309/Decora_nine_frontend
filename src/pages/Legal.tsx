import { SEO, businessJsonLd } from '../components/SEO';
import '../styles/Legal.css';

const UPDATED = 'August 2026';

export const PrivacyPolicy = () => (
  <div className="legal-page">
    <SEO
      title="Privacy Policy"
      description="How Decora Nine Interiors collects, uses and protects the information you share through our website and enquiry form."
      jsonLd={businessJsonLd}
    />
    <section className="page-header">
      <h1>Privacy Policy</h1>
      <p>How we handle your information</p>
    </section>

    <div className="container legal-content">
      <p className="legal-updated">Last updated: {UPDATED}</p>

      <p>
        Decora Nine Interiors Pvt. Ltd. (“Decora Nine”, “we”, “us”) respects your privacy. This
        policy explains what information we collect through this website, how we use it, and the
        choices you have.
      </p>

      <h2>Information we collect</h2>
      <p>When you contact us or submit an enquiry, we may collect your name, phone number, email
        address, project location, estimated budget, preferred contact method and any details you
        share about your project. We also collect basic, non-identifying usage data (such as pages
        visited) to improve the website.</p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your enquiry and provide a quotation.</li>
        <li>To contact you by phone, email or WhatsApp about your project.</li>
        <li>To deliver, plan and improve our interior design and execution services.</li>
        <li>To keep a record of enquiries for our internal follow-up.</li>
      </ul>

      <h2>Sharing your information</h2>
      <p>We do not sell or rent your personal information. We only share it with our own team and,
        where necessary, trusted partners involved in delivering your project. When you submit the
        enquiry form, the details may be sent to our business WhatsApp so our team is notified
        quickly.</p>

      <h2>Data security &amp; retention</h2>
      <p>We take reasonable measures to protect your information and retain it only for as long as
        needed to serve you and meet legal requirements.</p>

      <h2>Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal information by
        contacting us using the details below.</p>

      <h2>Contact us</h2>
      <p>Decora Nine Interiors Pvt. Ltd.<br />
        13/4, 3rd Cross, 2nd Main, New Extension, Madiwala, Bangalore – 560068<br />
        Phone: +91 6366876887 &nbsp;|&nbsp; Email: decoranine@gmail.com</p>
    </div>
  </div>
);

export const Terms = () => (
  <div className="legal-page">
    <SEO
      title="Terms & Conditions"
      description="The terms governing your use of the Decora Nine Interiors website and our interior design and execution services."
      jsonLd={businessJsonLd}
    />
    <section className="page-header">
      <h1>Terms &amp; Conditions</h1>
      <p>The terms that govern our website and services</p>
    </section>

    <div className="container legal-content">
      <p className="legal-updated">Last updated: {UPDATED}</p>

      <p>By using this website or engaging Decora Nine Interiors Pvt. Ltd. (“Decora Nine”), you
        agree to the following terms.</p>

      <h2>Our services</h2>
      <p>Decora Nine provides interior design and execution services including residential and
        commercial interiors, modular kitchens, furniture &amp; carpentry, glazing, partitions,
        signage and related work. The scope, materials, timeline and price of any project are
        confirmed in a written estimate before work begins.</p>

      <h2>Enquiries &amp; quotations</h2>
      <p>Information on this website is for general guidance only. Any figures or timelines shared
        are indicative; a formal quotation is provided after a consultation and site visit and is
        valid for the period stated in that quotation.</p>

      <h2>Intellectual property</h2>
      <p>All content on this website — text, logos, designs and images — belongs to Decora Nine or
        is used with permission, and may not be copied or reused without our written consent.</p>

      <h2>Limitation of liability</h2>
      <p>We strive for accuracy, but the website is provided “as is”. Decora Nine is not liable for
        any indirect or consequential loss arising from use of the website. Nothing here limits
        liability that cannot be excluded under applicable law.</p>

      <h2>Third-party links</h2>
      <p>The site may link to third-party services (such as WhatsApp or Google Maps). We are not
        responsible for the content or privacy practices of those services.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the website means you accept
        the current version.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and any disputes are subject to the
        jurisdiction of the courts of Bangalore, Karnataka.</p>

      <h2>Contact us</h2>
      <p>Decora Nine Interiors Pvt. Ltd.<br />
        13/4, 3rd Cross, 2nd Main, New Extension, Madiwala, Bangalore – 560068<br />
        Phone: +91 6366876887 &nbsp;|&nbsp; Email: decoranine@gmail.com</p>
    </div>
  </div>
);
