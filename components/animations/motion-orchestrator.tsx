"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionOrchestrator() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-media img",
        { scale: 1.06 },
        { scale: 1, duration: 1.6, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-copy > *",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, stagger: 0.13, delay: 0.25, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((element) => {
        const image = element.querySelector("img");
        gsap.fromTo(
          element,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.25,
            ease: "power4.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
        if (image) {
          gsap.fromTo(image, { scale: 1.05 }, {
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const distance = Number(element.dataset.parallax ?? 35);
        gsap.fromTo(
          element,
          { y: distance * -0.5 },
          {
            y: distance * 0.5,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1.2 },
          },
        );
      });

      gsap.to(".campaign-word--left", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".campaign-stage", start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
      gsap.to(".campaign-word--right", {
        xPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".campaign-stage", start: "top bottom", end: "bottom top", scrub: 1.4 },
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
