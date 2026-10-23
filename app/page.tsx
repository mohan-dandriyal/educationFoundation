import { Hero } from "./components/Hero";
import { AboutUsSection } from "./components/home/AboutSection";

import home from '@/app/data/home.json'
import blog from '@/app/data/blog.json'
import program from '@/app/data/programs.json'
import successStories from '@/app/data/success-stories.json'
import cause from '@/app/data/cause.json'

import OurProgram from "./components/home/OurProgram";
import BlogSection from "@/app/components/home/BlogSection";
import { TestimonialSection } from "./components/home/TestimonialSectionClient";
import { SuccessStorySection } from "./components/home/SuccessStorySection";
import OurCausesSection from "./components/home/Ourcausessection";

export default function Home() {
  return (
    <div className="relative">

      <Hero content={home.hero} />

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

      <div className="bg-[#f4f4f4] pt-20">
        <OurProgram
          eyebrow={home.ourProgram.eyebrow ?? ""}
          heading={home.ourProgram.heading ?? ""}
          dis={home.ourProgram.dis ?? ""}
          program={program.programsOverview.programs?.slice(0, 4) ?? []}
          isShowMoreButton={true} />
      </div>

      <div>
        <SuccessStorySection content={successStories} />
      </div>

      <div className="">
        <OurCausesSection
          currencySymbol=""
          content={{ ...home.ourCauses, causes: cause.ourCauses.causes.slice(0, 3) }}
        />
      </div>

      <div className="bg-[#fdfbf3]">
        <TestimonialSection
          eyebrow={home.testimonials.eyebrow ?? ""}
          heading={home.testimonials.heading ?? ""}
          items={home.testimonials.items ?? []}
        />
      </div>

      <div className="bg-[#f4f4f4] md:py-28 py-10">
        <BlogSection
          eyebrow={home.ourBlog.eyebrow ?? ""}
          heading={home.ourBlog.heading ?? ""}
          post={blog.post ?? []}
           />
      </div>
    </div>
  );
}
