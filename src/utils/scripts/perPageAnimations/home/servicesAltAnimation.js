import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesAltAnimation = () => {
  const services = gsap.utils.toArray(".service-card");
  const mainTitle = document.querySelector(".main-title");

  if (!services.length && !mainTitle) return;

  const allElements = [mainTitle, ...services].filter(Boolean);

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set(allElements, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.set(mainTitle, { xPercent: -100, autoAlpha: 0 });
      gsap.set(services, { xPercent: 100, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-container",
          start: "top 30%",
          once: true,
          markers: false,
        },
      });

      tl.to(mainTitle, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "back.out(1.7)",
      })
      .to(services, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.3,
        ease: "power2.out",
      }, "-=0.3");
    }
  );

  return () => mm.revert();
};