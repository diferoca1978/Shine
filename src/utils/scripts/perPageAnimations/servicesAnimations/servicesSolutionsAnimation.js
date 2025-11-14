import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function gsapSolutionAnimation() {
  // Get all animated elements
  const benefitsItems = gsap.utils.toArray("#solution-benefits .benefits-item");
  const checkmarksItems = gsap.utils.toArray("#solution-audience .checkmarks-item");

  // Create timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#solution-section",
      start: "top 80%",
      once: true,
      markers: false, // Set to true for debugging
    },
  });

  // Animate left column (Benefits)
  tl.to("#solution-benefits h2", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  })
  .to("#solution-benefits h4", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  }, "-=0.4");

  // Animate benefits list items
  benefitsItems.forEach((item, i) => {
    tl.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");
  });

  // Animate CTA button
  tl.to("#solution-cta", {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
  }, "-=0.2");

  // Animate right column (Target Audience) - starts while benefits are animating
  tl.to("#solution-audience h2", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  }, "-=1.5") // Overlap with benefits animation
  .to("#solution-audience h4", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
  }, "-=0.4");

  // Animate checkmarks list items
  checkmarksItems.forEach((item, i) => {
    tl.to(item, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");
  });
}
