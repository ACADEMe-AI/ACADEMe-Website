/**
 * Premium hero intro: wordmark + headline lines + lede/CTAs after the loader.
 */
import { useEffect } from "react";
import gsap from "gsap";

type Props = {
  active: boolean;
};

export function HeroEntrance({ active }: Props) {
  useEffect(() => {
    if (!active) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wordmark = document.querySelector(".nav-wordmark");
    const lines = gsap.utils.toArray<HTMLElement>(".chapter-hero .hero-line");
    const lede = document.querySelector(".chapter-hero .hero-lede");
    const ctas = gsap.utils.toArray<HTMLElement>(".chapter-hero .hero-cta-row .btn-flow");
    const micro = document.querySelector(".chapter-hero .hero-micro");
    const jump = document.querySelector(".section-jump-corner");
    const progress = document.querySelector(".scroll-progress");

    const targets = [wordmark, ...lines, lede, ...ctas, micro, jump, progress].filter(
      Boolean,
    ) as HTMLElement[];

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    // Ensure start state (CSS also sets this under loader-active)
    gsap.set(wordmark, { opacity: 0, y: -14 });
    gsap.set(lines, { opacity: 0, y: 32 });
    gsap.set(lede, { opacity: 0, y: 18 });
    gsap.set(ctas, { opacity: 0, y: 14 });
    gsap.set(micro, { opacity: 0, y: 10 });
    gsap.set(jump, { opacity: 0, y: 12 });
    gsap.set(progress, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(wordmark, { opacity: 1, y: 0, duration: 0.65 }, 0.05)
      .to(lines, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.12)
      .to(lede, { opacity: 1, y: 0, duration: 0.6 }, 0.42)
      .to(ctas, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, 0.52)
      .to(micro, { opacity: 1, y: 0, duration: 0.5 }, 0.62)
      .to(jump, { opacity: 1, y: 0, duration: 0.55 }, 0.55)
      .to(progress, { opacity: 1, duration: 0.45 }, 0.5);

    return () => {
      tl.kill();
    };
  }, [active]);

  return null;
}
