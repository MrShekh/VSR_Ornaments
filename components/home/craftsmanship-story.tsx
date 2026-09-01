"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EditorialLink } from "@/components/ui/editorial-link";

const stages = [
  {
    index: "01 / 04",
    title: "The first line",
    copy: "Every piece begins as a study of proportion—drawn, revised and reduced until only the essential remains.",
    image: "/images/craftsmanship.png",
    position: "center",
  },
  {
    index: "02 / 04",
    title: "The chosen stone",
    copy: "Diamonds are selected slowly, not only for grade, but for their particular life under changing light.",
    image: "/images/products/lumen-ring-v2.png",
    position: "center",
  },
  {
    index: "03 / 04",
    title: "Set by hand",
    copy: "A master setter works at the scale of fractions, bringing metal and stone into a precise, quiet balance.",
    image: "/images/craftsmanship.png",
    position: "left center",
  },
  {
    index: "04 / 04",
    title: "The final light",
    copy: "Every edge is softened, every surface finished, and every clasp tested before the piece leaves the atelier.",
    image: "/images/campaign-ring.png",
    position: "center 62%",
  },
];

export function CraftsmanshipStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = sectionRef.current?.querySelectorAll<HTMLElement>("[data-craft-step]");
    if (!elements) return;
    const triggers = Array.from(elements).map((element, index) =>
      ScrollTrigger.create({
        trigger: element,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(index),
      }),
    );
    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section className="craft-story" ref={sectionRef}>
      <div className="craft-story__sticky">
        {stages.map((stage, index) => (
          <div
            key={stage.index}
            className={`craft-story__image ${active === index ? "craft-story__image--active" : ""}`}
          >
            <Image
              src={stage.image}
              alt="VSR Atelier craftsmanship"
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
              style={{ objectFit: "cover", objectPosition: stage.position }}
            />
          </div>
        ))}
        <div className="craft-story__title">
          <p className="eyebrow">Inside the atelier</p>
          <h2>CRAFTED<br /><em>WITH INTENTION.</em></h2>
        </div>
      </div>
      <div className="craft-story__steps">
        {stages.map((stage) => (
          <article data-craft-step key={stage.index}>
            <span>{stage.index}</span>
            <h3>{stage.title}</h3>
            <p>{stage.copy}</p>
            <EditorialLink href="/craftsmanship">Discover the process</EditorialLink>
          </article>
        ))}
      </div>
    </section>
  );
}
