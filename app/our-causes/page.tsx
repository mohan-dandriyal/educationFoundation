import React from 'react';
import OurCausesSection from '../components/home/Ourcausessection';
import cause from '@/app/data/cause.json';
import PageBanner from '../components/ui/PageBanner';

export const metadata = {
  title: "Our Causes & Active Campaigns | Educare Foundation",
  description: "Directly support causes like digital literacy labs, STEAM kits, girl-child scholarships, school supplies, and village mobile libraries.",
};

function CausesPage() {
  return (
    <div className="bg-[#fdfbf3]">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={cause.banner.eyebrow}
        title={cause.banner.title}
        description={cause.banner.description}
        image={cause.banner.image}
        imageAlt={cause.banner.imageAlt}
        breadcrumb={cause.breadcrum}
        stats={cause.banner.stats}
        actions={[
          { label: "Volunteer With Us", href: "/contact-us", variant: "primary" },
        ]}
      />

      <div className="sm:py-16 py-14">
        <OurCausesSection
          currencySymbol="₹"
          content={{ ...cause.ourCauses, causes: cause.ourCauses.causes }}
        />
      </div>
    </div>
  );
}

export default CausesPage;
