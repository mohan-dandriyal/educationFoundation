import { OurTeamSection } from "../components/about/Ourteamsection";
import PageBanner from "../components/ui/PageBanner";
import data from "../data/ourTeams.json";

export const metadata = {
  title: "Our Team & Educators | Educare Foundation",
  description: "Meet the grassroots educators, program directors, and mentors leading Educare Foundation's 25+ community learning centers.",
};

export default function OurTeamPage() {
  return (
    <div className="bg-[#fdfbf3] pb-24">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        description={data.hero.dis}
        image={data.hero.image}
        imageAlt="Educare Foundation educators and leaders"
        breadcrumb={data.hero.breadcrum}
        stats={data.hero.stats}
        actions={[
          { label: "Join As Volunteer", href: "/contact-us", variant: "primary" },
          { label: "Support Our Teachers", href: "#", variant: "secondary" },
        ]}
      />

      <div className="pt-16">
        <OurTeamSection
          eyebrow={data.team.eyebrow}
          heading={data.team.heading}
          intro={data.team.intro}
          members={data.team.members}
        />
      </div>
    </div>
  );
}
