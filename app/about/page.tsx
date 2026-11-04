import React from 'react';
import { AboutSplitSection } from '../components/about/Aboutsplitsection';
import { OurMissionSection } from '../components/about/OurMission';
import { OurJourneySection } from '../components/about/JourneySection';
import about from '@/app/data/about.json';
import { OurVision } from '../components/about/Ourvision';
import PageBanner from '../components/ui/PageBanner';

export const metadata = {
  title: "About Us | Educare Foundation",
  description: "Learn about Educare Foundation's mission, story, leadership, and our journey from one classroom to 25+ centers.",
};

function AboutPage() {
  return (
    <div className="bg-[#fdfbf3]">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={about.banner.eyebrow}
        title={about.banner.title}
        description={about.banner.description}
        image={about.banner.image}
        imageAlt={about.banner.imageAlt}
        breadcrumb={about.breadcrum}
        stats={about.banner.stats}
        actions={about.banner.actions as React.ComponentProps<typeof PageBanner>['actions']}
      />

      {/* Modern, attractive About Story Collage */}
      <AboutSplitSection
        eyebrow={about.aboutSplit.eyebrow}
        title={about.aboutSplit.title}
        description={about.aboutSplit.description}
        cta={about.aboutSplit.cta}
        ctaHref={about.aboutSplit.ctaHref}
        stats={about.aboutSplit.stats}
        thumbs={about.aboutSplit.thumbs}
        mainImage={about.aboutSplit.mainImage}
      />

      <OurMissionSection {...about.mission} />

      <OurVision content={about.ourVision} />

      <OurJourneySection {...about.journey} />
    </div>
  );
}

export default AboutPage;
