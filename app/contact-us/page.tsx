import React from 'react';
import contact from '@/app/data/contact.json';
import ContactSection, { type ContactContent } from '../components/contact/ContactFormSection';
import PageBanner from '../components/ui/PageBanner';

export const metadata = {
  title: "Contact Us & Partner | Educare Foundation",
  description: "Get in touch with Educare Foundation for volunteer opportunities, donor inquiries, school supply drives, or CSR partnerships.",
};

function ContactUs() {
  return (
    <div className="bg-[#fdfbf3]">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={contact.hero.eyebrow}
        title={contact.hero.title}
        description={contact.hero.description}
        image={contact.hero.image.src}
        imageAlt={contact.hero.image.alt}
        breadcrumb={contact.hero.breadcrum}
        stats={contact.hero.stats}
        actions={[
          { label: "Send Message Below", href: "#contact-form-section", variant: "primary" },
        ]}
      />

      <div id="contact-form-section">
        <ContactSection content={contact.formSection as ContactContent} />
      </div>
    </div>
  );
}

export default ContactUs;
