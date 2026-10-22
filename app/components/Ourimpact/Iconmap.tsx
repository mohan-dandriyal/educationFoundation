import type { IconType } from "react-icons";
import {
  FaBook,
  FaBookOpen,
  FaChartLine,
  FaClipboardList,
  FaDesktop,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaHandshake,
  FaLaptop,
  FaLightbulb,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPalette,
  FaPuzzlePiece,
  FaStar,
  FaUsers,
} from "react-icons/fa6";

// Icon names used in your JSON files, mapped to react-icons.
// Add a line here whenever you use a new icon name in the JSON.
const icons: Record<string, IconType> = {
  Users: FaUsers,
  MapPin: FaLocationDot,
  HeartHandshake: FaHandHoldingHeart,
  BookOpen: FaBookOpen,
  BookMarked: FaBook,
  GraduationCap: FaGraduationCap,
  Laptop: FaLaptop,
  Monitor: FaDesktop,
  Palette: FaPalette,
  Lightbulb: FaLightbulb,
  Search: FaMagnifyingGlass,
  ClipboardList: FaClipboardList,
  ChartNoAxesCombined: FaChartLine,
  Handshake: FaHandshake,
  Puzzle: FaPuzzlePiece,
};

// Falls back to a star so a wrong name never breaks the page
export function getIcon(name?: string): IconType {
  return (name && icons[name]) || FaStar;
}