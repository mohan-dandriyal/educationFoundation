import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import details from "@/app/data/program-details.json";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton";
import {
  SectionInnerTitle,
  SectionLabel,
} from "@/app/components/ui/SectionTitle";
import PageBanner from "@/app/components/ui/PageBanner";
import MainContainer from "@/app/components/ui/MainContainer";

type ProgramDetail = (typeof details.programs)[number];
type PageProps = { params: Promise<{ slug: string }> };

const getProgram = (slug: string) =>
  details.programs.find((program) => program.slug === slug);

export function generateStaticParams() {
  return details.programs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgram(slug);

  return program
    ? {
        title: `${program.title} | Educare Foundation`,
        description: program.intro,
      }
    : {};
}

export default function ProgramDetailsPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-[60vh] bg-[#fdfbf3] px-6 py-24 md:px-[6%]" />
      }
    >
      {params.then(({ slug }) => <ProgramDetailsContent slug={slug} />)}
    </Suspense>
  );
}

function ProgramDetailsContent({ slug }: { slug: string }) {
  const program = getProgram(slug) as ProgramDetail | undefined;

  if (!program) notFound();

  return (
    <main className="bg-[#fdfbf3] text-[#15452e]">
      {/* Full Page Banner for Program Detail */}
      <PageBanner
        eyebrow={program.category}
        title={program.title}
        description={program.intro}
        image={program.image}
        imageAlt={program.imageAlt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Our Programs", href: "/our-program" },
          { label: program.title },
        ]}
        stats={program.stats}
        actions={[
          { label: "Support This Program", href: "#", variant: "primary" },
          { label: "Partner With Us", href: "/contact-us", variant: "secondary" },
        ]}
      />

      {/* Program Story & Features */}
      <section className="px-6 py-18 md:px-[6%]">
        <MainContainer>
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#15452e]/10 lg:col-span-6 sm:aspect-[16/11]">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6">
              <SectionLabel>{details.labels.whyItMattersLabel}</SectionLabel>
              <div className="mt-2">
                <SectionInnerTitle>{details.labels.whyItMattersHeading}</SectionInnerTitle>
              </div>

              <p className="mt-6 text-lg leading-8 text-[#15452e]/85">
                {program.story}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {program.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-[#15452e]/15 bg-[#f4f7f2] p-4 text-sm font-medium text-[#15452e]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#8a6b36]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MainContainer>
      </section>

      {/* Measurable Outcomes & Transformation */}
      <section className="border-t border-[#15452e]/15 bg-[#f4f7f2] px-6 py-18 md:px-[6%]">
        <MainContainer>
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center max-w-2xl mx-auto lg:pb-14 pb-8">
              <SectionLabel>{details.labels.outcomesLabel}</SectionLabel>
              <div className="mt-2">
                <SectionInnerTitle>{details.labels.outcomesHeading}</SectionInnerTitle>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {program.outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="rounded-2xl border border-[#15452e]/15 bg-[#fdfbf3] p-7 shadow-sm transition-all hover:shadow-md"
                >
                  <span className="font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-3xl font-bold text-[#8a6b36]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-base leading-7 font-medium text-[#15452e]/90">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryButton href="/contact-us">{details.labels.secondaryCtaButton}</PrimaryButton>
            </div>
          </div>
        </MainContainer>
      </section>
    </main>
  );
}
