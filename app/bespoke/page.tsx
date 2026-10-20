import type { Metadata } from "next";
import { EditorialStory } from "@/components/story/editorial-story";

export const metadata: Metadata = { title: "Bespoke", description: "A private jewellery commission shaped entirely around you." };

export default function BespokePage() {
  return <EditorialStory eyebrow="Private commissions / By appointment" title={<>CREATED<br /><em>FOR ONE.</em></>} hero="/images/campaign-signature-cream-v2.png" heroAlt="A VSR Ornaments bespoke diamond jewel" heading={<>A CONVERSATION,<br />MADE PRECIOUS.</>} paragraphs={["Bespoke begins with listening. A memory, a stone, a gesture or a future heirloom becomes the starting point for a piece that could belong to no one else.", "Across private consultations, our designers refine the line, proportion and material. The final jewel is made by hand and documented for its life beyond you."]} image="/images/campaign-ring-cream-v2.png" imageAlt="Bespoke oval diamond ring" linkLabel="Arrange a private consultation" linkHref="/contact" />;
}
