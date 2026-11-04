import React from 'react';
import BlogSection from '../components/blog/BlogSection';
import PageBanner from '../components/ui/PageBanner';
import blog from '@/app/data/blog.json';

export const metadata = {
  title: "Blog & Field Notes | Educare Foundation",
  description: "Read field stories, educator interviews, and student updates from Educare Foundation's 25+ community centers.",
};

function BlogPage() {
  return (
    <div className="bg-[#f4f4f4]">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={blog.hero.eyebrow}
        title={blog.hero.heading}
        description={blog.hero.description}
        image={blog.hero.image}
        imageAlt={blog.hero.imageAlt}
        breadcrumb={blog.breadcrum}
        stats={blog.hero.stats}
        actions={[
          { label: "Volunteer With Us", href: "/contact-us", variant: "primary" },
        ]}
      />

      <BlogSection
        post={blog.post ?? []}
        breadcrum={blog.breadcrum}
      />
    </div>
  );
}

export default BlogPage;
