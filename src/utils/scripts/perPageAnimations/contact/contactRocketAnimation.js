import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const contactRocketAnimation = () => {
  const rocket = document.querySelector("#contact-rocket");
  const contactForm = document.querySelector("#contact-form");

  if (!rocket || !contactForm) {
    console.warn("Rocket or contact form not found");
    return;
  }

  gsap.set(rocket, {x: -100, opacity: 0 });
  gsap.set(contactForm, {x: 100, opacity: 0 });

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
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  })
  .to(contactForm, {
    x: 0,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.3");
};

export const launchRocket = () => {
  const rocket = document.querySelector("#contact-rocket");
  const stars = document.querySelectorAll(".contact-section svg");
  
  if (!rocket) {
    console.warn("Rocket not found for launch");
    return;
  }

  const launchTl = gsap.timeline();
  
  // Pre-launch shake
  launchTl.to(rocket, {
    x: "+=3",
    duration: 0.1,
    yoyo: true,
    repeat: 3,
    ease: "power2.inOut"
  })
  // Launch sequence
  .to(rocket, {
    y: -1000,
    x: "+=200",
    rotation: 15,
    scale: 0.3,
    duration: 2,
    ease: "power2.in"
  })
  // Stars twinkle effect during launch
  .to(stars, {
    scale: 1.5,
    opacity: 0.3,
    duration: 0.5,
    stagger: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  }, "-=1.5")
  // Reset rocket position after launch
  .to(rocket, {
    y: 0,
    x: 0,
    rotation: 0,
    scale: 1,
    duration: 1,
    ease: "power2.out"
  }, "+=0.3");
  
  return launchTl;
};
