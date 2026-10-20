"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BrandMark } from "@/components/brand/brand-mark";

export function IntroReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const previousOverflow = document.body.style.overflow;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      document.body.style.overflow = previousOverflow;
      setVisible(false);
    };

    if (reducedMotion) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";
    let cancelled = false;
    let context: ReturnType<typeof gsap.context> | undefined;

    const startAnimation = () => {
      if (cancelled) return;

      context = gsap.context(() => {
        const timeline = gsap.timeline({ onComplete: finish });

        timeline
          .to(".intro-reveal__eyebrow", {
            y: 0,
            opacity: 1,
            duration: 0.48,
            ease: "power3.out",
          })
          .to(
            ".intro-reveal__brand .brand-mark__emblem",
            {
              y: 0,
              opacity: 1,
              duration: 0.78,
              ease: "power4.out",
            },
            0.14,
          )
          .to(
            ".intro-reveal__brand .brand-mark__text",
            {
              y: 0,
              opacity: 1,
              duration: 0.78,
              ease: "power4.out",
            },
            0.34,
          )
          .to(
            ".intro-reveal__rule",
            {
              scaleX: 1,
              duration: 0.75,
              ease: "power3.inOut",
            },
            0.48,
          )
          .to(
            ".intro-reveal__corner",
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.out",
            },
            0.72,
          )
          .to(".intro-reveal__lockup", {
            y: -12,
            opacity: 0,
            duration: 0.52,
            ease: "power2.in",
          }, "+=0.85")
          .to(".intro-reveal__corner", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          }, "<")
          .to(root, {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.02,
            ease: "power4.inOut",
          });
      }, root);
    };

    void document.fonts.ready.then(startAnimation);

    return () => {
      cancelled = true;
      context?.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={rootRef} className="intro-reveal" aria-hidden="true" data-lenis-prevent>
        <p className="intro-reveal__corner intro-reveal__corner--top">Fine jewellery / India</p>
        <div className="intro-reveal__lockup">
          <p className="intro-reveal__eyebrow">A study in light and form</p>
          <BrandMark className="brand-mark--intro intro-reveal__brand" />
          <span className="intro-reveal__rule" />
        </div>
        <p className="intro-reveal__corner intro-reveal__corner--bottom">Objects of lasting beauty</p>
      </div>
      <noscript>
        <style>{`.intro-reveal { display: none !important; }`}</style>
      </noscript>
    </>
  );
}
