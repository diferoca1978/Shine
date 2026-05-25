import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const contactRocketAnimation = () => {
  const rocket = document.querySelector("#contact-rocket");
  const contactForm = document.querySelector("#contact-form");

  if (!rocket || !contactForm) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set([rocket, contactForm], { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.set(rocket, { x: -100, autoAlpha: 0 });
      gsap.set(contactForm, { x: 100, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 50%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });

      tl.to(rocket, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(contactForm, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.3");
    }
  );

  return () => mm.revert();
};

export const launchRocket = () => {
  const rocket = document.querySelector("#contact-rocket");
  const stars = document.querySelectorAll(".contact-section svg");

  if (!rocket) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotionQuery.matches) return;

  const launchTl = gsap.timeline();

  launchTl.to(rocket, {
    x: "+=3",
    duration: 0.1,
    yoyo: true,
    repeat: 3,
    ease: "power2.inOut",
  })
  .to(rocket, {
    y: -1000,
    x: "+=200",
    rotation: 15,
    scale: 0.3,
    duration: 2,
    ease: "power2.in",
  })
  .to(stars, {
    scale: 1.5,
    opacity: 0.3,
    duration: 0.5,
    stagger: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut",
  }, "-=1.5")
  .to(rocket, {
    y: 0,
    x: 0,
    rotation: 0,
    scale: 1,
    duration: 1,
    ease: "power2.out",
  }, "+=0.3");

  return launchTl;
};