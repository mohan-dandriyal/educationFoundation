import { GallerySection } from "../components/gallery/GallerySection";
import PageBanner from "../components/ui/PageBanner";
import gallery from "../data/gallery.json";

export const metadata = {
  title: "Field Gallery | Educare Foundation",
  description: "Moments from our 25+ neighborhood classrooms, digital literacy labs, rural science fairs, and mobile library visits.",
};

export default function GalleryPage() {
  return (
    <div className="bg-[#fdfbf3]">
      {/* Dedicated Page Hero Banner */}
      <PageBanner
        eyebrow={gallery.banner?.eyebrow || gallery.eyebrow}
        title={gallery.banner?.title || gallery.heading}
        description={gallery.banner?.description || gallery.intro}
        image={gallery.banner?.image || "/images/banner-gallery.jpg"}
        imageAlt="Educare Foundation field photography"
        breadcrumb={gallery.breadcrum}
        stats={gallery.banner?.stats}
        actions={[
          { label: "Volunteer With Us", href: "/contact-us", variant: "primary" },
        ]}
      />

      <GallerySection {...gallery} />
    </div>
  );
}
