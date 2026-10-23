import { GallerySection } from "../components/gallery/GallerySection";
import gallery from "../data/gallery.json";

export default function GalleryPage() {
  return <GallerySection {...gallery} />;
}
