import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesAltAnimation = () => {
  const services = gsap.utils.toArray(".service-card");
  const stars = document.querySelectorAll(".star");
  const btns = document.querySelectorAll(".btn");
  const mainTitle = document.querySelector(".main-title");

  // Set initial states
  gsap.set(mainTitle, { xPercent: -100, opacity: 0 });
  gsap.set(services, { xPercent: 100, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".services-container",
      start: "top 30%",
      markers: false,
      toggleActions: "play none none reverse",
    },
  });

  // Title animation from left to right
  tl.to(mainTitle, {
    xPercent: 0,
    opacity: 1,
    duration: 1,
    ease: "back.out(1.7)"
  })
  // Cards animation one by one from right to left
  .to(services, {
    xPercent: 0,
    opacity: 1,
    duration: 0.5,
    stagger: 0.3,
    ease: "power2.out"
  }, "-=0.3");

  const tween = gsap.fromTo(stars, {
    rotate: 0,
    duration: 1,
    ease: "power2.out",
  }, {
    rotate: 360,
    duration: 1,
    ease: "power2.out",
    paused: true,
  });

  btns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      stars.forEach((star) => {
        tween.restart();
      });
    });
  });
  
};
