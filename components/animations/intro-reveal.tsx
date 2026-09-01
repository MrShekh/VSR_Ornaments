"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ onComplete: finish });

      timeline
        .to(".intro-reveal__eyebrow", {
          y: 0,
          opacity: 1,
          duration: 0.48,
          ease: "power3.out",
        })
        .to(
          ".intro-reveal__letter",
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: "power4.out",
          },
          0.14,
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
          ".intro-reveal__atelier, .intro-reveal__corner",
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
          y: -14,
          opacity: 0,
          duration: 0.48,
          ease: "power2.in",
        }, "+=0.42")
        .to(".intro-reveal__corner", {
          opacity: 0,
          duration: 0.28,
          ease: "power2.in",
        }, "<")
        .to(root, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.02,
          ease: "power4.inOut",
        });
    }, root);

    return () => {
      context.revert();
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
          <div className="intro-reveal__mark" aria-label="VSR">
            {"VSR".split("").map((letter) => (
              <span className="intro-reveal__letter-frame" key={letter}>
                <span className="intro-reveal__letter">{letter}</span>
              </span>
            ))}
          </div>
          <span className="intro-reveal__rule" />
          <p className="intro-reveal__atelier">Atelier</p>
        </div>
        <p className="intro-reveal__corner intro-reveal__corner--bottom">Objects of lasting beauty</p>
      </div>
      <noscript>
        <style>{`.intro-reveal { display: none !important; }`}</style>
      </noscript>
    </>
  );
}
