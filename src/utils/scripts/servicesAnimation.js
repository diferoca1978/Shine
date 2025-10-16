import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesAnimation = () => {
  const servicesSection = document.querySelector("#services");
  const bodyElement = document.querySelector("body");
  const titleElement = document.querySelector("#services h2");
  
  if (!servicesSection || !bodyElement) return;

  // Set initial background color
  gsap.set(bodyElement, { backgroundColor: "oklch(0.98 0.0157 106.42)" });

  // Background color animation and title hide for entire services section 
  gsap.timeline({
    scrollTrigger: {
      trigger: servicesSection,
      start: "top 60%",
      end: "bottom 40%",
      toggleActions: "play none play reverse"
    }
  })
  .to(bodyElement, {
    backgroundColor: "oklch(0.3052 0 0)",
    duration: 0.8,
    ease: "power2.out"
  })
  .to(titleElement, {
    opacity: 0,
    y: -50,
    duration: 0.6,
    ease: "power2.out"
  }, 0.2);

  // Services scroll animation
  initServicesScrollAnimation();
}

function initServicesScrollAnimation() {
  var points = gsap.utils.toArray(".point");
  var star = document.querySelector(".indicator-star");

  if (points.length === 0 || !star) return;

  var height = 100 * points.length; // 500% for 5 services

  // Show indicators
  gsap.set(".indicators", { display: "flex" });

  // Main timeline for content animations
  var tl = gsap.timeline({
    duration: points.length,
    scrollTrigger: {
      trigger: "#services",
      start: "top center",
      end: "+=" + height + "%",
      scrub: 0.5,
      markers: false,
      id: "points",
      immediateRender: false,
    },
  });

  // Star movement timeline
  var starTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#services",
      start: "top center",
      end: "+=" + height + "%",
      scrub: 0.5,
      markers: false,
      id: "star-movement",
      immediateRender: false,
    },
  });

  // Pinning timeline
  var pinner = gsap.timeline({
    scrollTrigger: {
      trigger: ".services-section .wrapper",
      start: "top top",
      end: "+=" + height + "%",
      scrub: 0.5,
      pin: ".services-section .wrapper",
      pinSpacing: true,
      id: "pinning",
      markers: false,
      snap: {
        snapTo: [0, 0.25, 0.5, 0.75, 1.0], // snap points for each service
        duration: { min: 0.1, max: 0.1 },
        delay: 1,
        inertia: false,
        directional: false,
        ease: "power1.inOut",
      },
    },
  });

  // Calculate star positions for each service
  var starPositions = [];
  for (let i = 0; i < points.length; i++) {
    // Star moves from 5% to 95% of the indicator line height to stay within bounds
    var progress = i / (points.length - 1);
    starPositions.push(5 + (progress * 90));
  }

  // Animate star movement
  starPositions.forEach(function (position, i) {
    starTl.to(star, {
      top: position + "%",
      rotate: i * 72,
      duration: 1,
      ease: "power2.inOut"
    }, i);
  });

  // Set up each point
  points.forEach(function (elem, i) {
    gsap.set(elem, { position: "absolute", top: 0, pointerEvents: "none" });

    // Show image
    tl.from(elem.querySelector("div"), {
      opacity: 0,
      duration: 0.25
    }, i);

    // Show article content and enable pointer events
    tl.from(elem.querySelector("article"), {
      opacity: 0,
      translateY: 100,
      duration: 0.25
    }, i);

    tl.set(elem, { pointerEvents: "auto" }, i + 0.25);

    // Hide content for next service (except last one)
    if (i != points.length - 1) {
      tl.set(elem, { pointerEvents: "none" }, i + 0.75);

      tl.to(elem.querySelector("article"), {
        opacity: 0,
        translateY: -100,
        duration: 0.25
      }, i + 0.75);

      tl.to(elem.querySelector("div"), {
        opacity: 0,
        duration: 0.25
      }, i + 0.75);
    }
  });
}



