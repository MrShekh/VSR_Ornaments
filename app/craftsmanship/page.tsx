import type { Metadata } from "next";
import { EditorialStory } from "@/components/story/editorial-story";

export const metadata: Metadata = { title: "Craftsmanship", description: "Inside VSR Ornaments: drawing, setting, polishing and finishing by hand." };

export default function CraftsmanshipPage() {
  return <EditorialStory eyebrow="Inside the atelier / Rajkot" title={<>THE HUMAN<br /><em>MEASURE.</em></>} hero="/images/craftsmanship-cream-v2.png" heroAlt="A VSR master jeweller setting diamonds by hand in the light-filled atelier" heading={<>PRECISION,<br />WITHOUT HASTE.</>} paragraphs={["From the first drawing to the final polish, a VSR piece moves through many skilled hands. Each decision is made at an intimate scale, where a fraction of a millimetre changes the way light travels.", "We work with master setters, polishers and goldsmiths whose knowledge is carried through practice. Technology brings accuracy; the hand brings judgment, warmth and life."]} image="/images/products/line-bracelet-v2.png" imageAlt="Finished platinum and diamond tennis bracelet" linkLabel="Explore the collection" linkHref="/collections" />;
}
