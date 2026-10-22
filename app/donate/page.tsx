// app/donate/page.tsx
// Adjust the import paths to where you keep the components and the JSON.
import type { Metadata } from "next";
import data from "@/app/data/donate.json";

import DonateHeroSection, { type DonateHeroContent } from "@/app/components/donate/DonateHero";
import FutureGoalsSection, { type GoalsContent } from "@/app/components/Ourimpact/Futuregoalssection";
import DonationFlowSection, {
  type DonationOptionsContent,
  type DonorDetailsContent,
} from "@/app/components/donate/Donationflowsection";
import HowDonationsHelpSection, {
  type HowDonationsHelpContent,
} from "@/app/components/donate/Howdonationshelpsection";
import TransparencySection, { type TransparencyContent } from "@/app/components/donate/Transparencysection";
import DonationFaqSection, { type DonationFaqContent } from "@/app/components/donate/Donationfaqsection";
import FinalCtaSection, { type CtaContent } from "@/app/components/Ourimpact/Finalctasection";

export const metadata: Metadata = {
  title: "Donate",
  description: data.hero.description,
};

export default function DonatePage() {
  return (
    <>
      <DonateHeroSection content={data.hero as DonateHeroContent} />

      {/* "Why donate" has the same shape as the goals section, so it reuses it:
          the benefits list is passed in as goals */}
      <FutureGoalsSection
        content={data.whyDonate as GoalsContent}
      />

      <DonationFlowSection
        options={data.donationOptions as DonationOptionsContent}
        details={data.donorDetails as DonorDetailsContent}
        // onProceed={async (payload) => { /* start your payment gateway here */ }}
      />

      <HowDonationsHelpSection content={data.howDonationsHelp as HowDonationsHelpContent} />
      <TransparencySection content={data.transparency as TransparencyContent} />
      <DonationFaqSection content={data.donationFaq as DonationFaqContent} />
      <FinalCtaSection content={data.finalCallToAction as CtaContent} />
    </>
  );
}
