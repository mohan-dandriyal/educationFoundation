// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import blog from "@/app/data/blog.json"; // adjust paths to where you keep the JSON
import BlogDetailsSection, {
  type BlogDetail,
} from "@/app/components/blog/BlogDetailsSection";
import type { BlogPost } from "@/app/components/ui/BlogCard";
import LoadingScreen from "@/app/components/LoadingScreen";

const posts = blog.post as BlogPost[];
const details = blog.details as BlogDetail[];

type PageProps = { params: Promise<{ slug: string }> };

// Build one page for every post in the details list
export function generateStaticParams() {
  return details.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = details.find((d) => d.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
  };
}

// The page itself does not touch `params`. It only renders the Suspense
// boundary, so the shell can show instantly while the content below loads.
export default function BlogDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BlogDetailsContent params={params} />
    </Suspense>
  );
}

// `await params` happens here, inside the Suspense boundary
async function BlogDetailsContent({ params }: PageProps) {
  const { slug } = await params;
  const post = details.find((d) => d.slug === slug);
  if (!post) notFound();

  // Recent posts: everything except this one, one card per slug, newest three
  const recent = Array.from(
    new Map(posts.filter((p) => p.slug !== slug).map((p) => [p.slug, p])).values()
  ).slice(0, 3);

  return <BlogDetailsSection post={post} recent={recent} />;
}