import { Hero } from "./components/Hero";
import { homeHero } from "./data/home";
import { AboutUsSection } from "./components/home/AboutSection";

import home from '@/app/data/home.json'
import blog from '@/app/data/blog.json'
import program from '@/app/data/programs.json'

import OurProgram from "./components/home/OurProgram";
import BlogSection from "@/app/components/home/BlogSection";
import { TestimonialSection } from "./components/home/TestimonialSectionClient";
import { SuccessStorySection } from "./components/home/SuccessStorySection";

export default function Home() {
  return (
    <div className="relative">

      <Hero content={homeHero} />

      <div className="bg-[#f4f4f4]">
        <AboutUsSection
          label={home.about.label ?? ""}
          title={home.about.title ?? ""}
          description={home.about.dis ?? ""}
          cta={home.about.buttonText ?? ""}
          ctaHref={home.about.href ?? ""}
          image={home.about.image ?? {}}
        />
      </div>

      <div className="bg-[#f4f4f4]">
        <OurProgram
          eyebrow={home.ourProgram.eyebrow ?? ""}
          heading={home.ourProgram.heading ?? ""}
          program={program.programsOverview.programs?.slice(0, 4) ?? []}
          isShowMoreButton={true} />
      </div>

      <div>
        <SuccessStorySection />
      </div>

      <div className="bg-[#fdfbf3]">
        <TestimonialSection />
      </div>

      <div className="bg-[#f4f4f4] md:py-0 py-20">
        <BlogSection
          eyebrow={home.ourBlog.eyebrow ?? ""}
          heading={home.ourBlog.heading ?? ""}
          post={blog.post ?? []} />
      </div>
    </div>
  );
}
