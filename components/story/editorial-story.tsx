import Image from "next/image";
import { EditorialLink } from "@/components/ui/editorial-link";

type EditorialStoryProps = {
  eyebrow: string;
  title: React.ReactNode;
  hero: string;
  heroAlt: string;
  heading: React.ReactNode;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  linkLabel: string;
  linkHref: string;
};

export function EditorialStory(props: EditorialStoryProps) {
  return (
    <main id="main-content">
      <section className="story-hero">
        <Image src={props.hero} alt={props.heroAlt} fill priority sizes="100vw" />
        <div className="story-hero__copy"><p className="eyebrow">{props.eyebrow}</p><h1>{props.title}</h1></div>
      </section>
      <section className="story-content">
        <h2>{props.heading}</h2>
        <div>{props.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<EditorialLink href={props.linkHref}>{props.linkLabel}</EditorialLink></div>
      </section>
      <div className="story-image-break"><Image src={props.image} alt={props.imageAlt} fill sizes="100vw" /></div>
    </main>
  );
}
