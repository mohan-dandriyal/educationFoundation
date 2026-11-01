import OurProgram from '../components/home/OurProgram';
import program from '@/app/data/programs.json';
import PageBanner from '../components/ui/PageBanner';

export const metadata = {
  title: "Our Programs | Educare Foundation",
  description: "Explore our six core education programs: Foundational schooling, Digital Literacy Labs, School Supplies, Girls' Education, After-School Tutoring, and Early Childhood Learning.",
};

function OurProgramPage() {
  return (
    <div className="bg-[#f4f4f4] pb-20">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={program.hero.label}
        title={program.hero.title}
        description={program.hero.description}
        image={program.hero.image}
        imageAlt={program.hero.imageAlt}
        breadcrumb={program.hero.breadcrum}
        stats={program.hero.stats}
        actions={[
          { label: program.hero.primaryButton.text, href: program.hero.primaryButton.link, variant: "primary" },
          { label: "Partner With Us", href: "/contact-us", variant: "secondary" },
        ]}
      />

      <div className="pt-12">
        <OurProgram
          eyebrow={program.programsOverview.label}
          heading={program.programsOverview.title ?? ""}
          dis={program.programsOverview.description}
          program={program.programsOverview.programs ?? []}
          isShowMoreButton={false}
        />
      </div>
    </div>
  );
}

export default OurProgramPage;
