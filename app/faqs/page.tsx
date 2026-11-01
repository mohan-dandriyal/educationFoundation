import React from 'react';
import { FaqSection } from '../components/home/Faqsection';
import PageBanner from '../components/ui/PageBanner';
import data from '@/app/data/faq.json';

export const metadata = {
  title: "FAQs | Educare Foundation",
  description: "Frequently asked questions regarding Educare Foundation's programs, 80G tax exemptions, donations, and volunteering.",
};

function Faq() {
  return (
    <div className="bg-[#fdfbf3]">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        description={data.hero.dis}
        image={data.hero.image}
        imageAlt="Questions and answers about Educare Foundation"
        breadcrumb={data.breadcrum}
        stats={data.hero.stats}
        actions={[
          { label: "Have a Question? Contact Us", href: "/contact-us", variant: "primary" },
          { label: "Donate", href: "#", variant: "secondary" },
        ]}
      />

      <FaqSection />
    </div>
  );
}

export default Faq;
