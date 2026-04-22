import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/utils/scripts/lenis/styles/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Intercept all anchor clicks that point to a hash target (#section)
// and delegate the scroll to Lenis so it stays smooth and controlled.
document.addEventListener("click", (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute("href");
  if (!targetId || targetId === "#") return;

  const target = document.querySelector(targetId);
  if (!target) return;

  e.preventDefault();
  lenis.scrollTo(target, { offset: -80, duration: 1.2 });
});

document.addEventListener("astro:before-preparation", () => {
  lenis.destroy();
});

export { lenis };
