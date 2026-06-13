import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const aboutMissionAnimation = () => {
  const title = document.querySelector(".mission-title");
  const subtitle = document.querySelector(".mission-subtitle");
  const text = document.querySelector(".mission-text");
  const image = document.querySelector(".mission-image");

  const elements = [title, subtitle, text, image].filter(Boolean);

  if (!elements.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set(elements, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.set(elements, { autoAlpha: 0, xPercent: -100 });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 80%",
          end: "bottom 20%",
          markers: false,
          toggleActions: "play none none reverse",
        },
      })
        .to(title, {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(subtitle, {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.4")
        .to(text, {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.4")
        .to(image, {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.4");
    }
  );

  return () => mm.revert();
};