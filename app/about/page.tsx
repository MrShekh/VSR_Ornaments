import type { Metadata } from "next";
import { EditorialStory } from "@/components/story/editorial-story";

export const metadata: Metadata = { title: "Our Story", description: "VSR Ornaments is an independent Indian fine jewellery house founded on restraint, proportion and light." };

export default function AboutPage() {
  return <EditorialStory eyebrow="The house / Since 1998" title={<>A QUIET<br /><em>LEGACY.</em></>} hero="/images/campaign-hero-cream-v2.png" heroAlt="The VSR Ornaments house campaign" heading={<>INDIAN CRAFT,<br />A NEW LANGUAGE.</>} paragraphs={["VSR Ornaments was founded between a family workshop and a belief: that the richest expression is often the most restrained. Our work draws from India's deep jewellery knowledge without repeating its past.", "We make modern heirlooms—precise, tactile pieces that reveal themselves slowly and gather meaning through wear. Every collection begins with form and ends with the person who gives it life."]} image="/images/campaign-earring-cream-v2.png" imageAlt="VSR diamond earring portrait" linkLabel="Visit the atelier" linkHref="/contact" />;
}
