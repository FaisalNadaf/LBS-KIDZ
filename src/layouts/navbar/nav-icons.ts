import {
  Baby,
  BookOpen,
  ClipboardList,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  Images,
  Landmark,
  MapPin,
  Newspaper,
  Quote,
  ReceiptIndianRupee,
  ScrollText,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { routes } from '@/data/routes'

/**
 * One icon per destination in the dropdowns.
 *
 * Keyed by route rather than by label, because the labels are long editorial
 * phrases fixed by the sitemap ("A Message from the Lal Bahadur Shastri
 * Family") and they are the thing most likely to be reworded. A route is the
 * stable identifier.
 *
 * These are wayfinding, not decoration: a reader scanning a four-row panel
 * reaches the shape before the words, so each has to be recognisably *this*
 * destination and not merely on-theme. A row with no entry here renders without
 * a medallion rather than falling back to a generic mark, since five copies of
 * the same glyph would be worse than none.
 */
export const navIcons: Record<string, LucideIcon> = {
  [routes.legacy]: Landmark,
  [routes.lbsWay]: Sparkles,
  [routes.familyMessage]: HeartHandshake,
  [routes.foundersNote]: ScrollText,

  [routes.valueStories]: BookOpen,
  [routes.parenting]: Users,

  [routes.programs]: Baby,
  [routes.fees]: ReceiptIndianRupee,
  [routes.faqs]: HelpCircle,
  [routes.admissionProcess]: ClipboardList,

  [routes.campuses]: MapPin,

  // Phase 2 routes. Listed now so the panel does not lose its icons on the day
  // School Life is switched on.
  [routes.gallery]: Images,
  [routes.educators]: GraduationCap,
  [routes.events]: Newspaper,
  [routes.testimonials]: Quote,
}
