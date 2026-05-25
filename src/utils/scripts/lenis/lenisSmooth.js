import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/utils/scripts/lenis/styles/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const lenisOptions = {
  duration: reducedMotionQuery.matches ? 0 : 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: !reducedMotionQuery.matches,
  touchMultiplier: reducedMotionQuery.matches ? 0 : 2,
  infinite: false,
};

const lenis = new Lenis(lenisOptions);

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Intercept all anchor clicks that point to a hash target (#section)
document.addEventListener("click", (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;

  const targetId = anchor.getAttribute("href");
  if (!targetId || targetId === "#") return;

  const target = document.querySelector(targetId);
  if (!target) return;

  e.preventDefault();
  lenis.scrollTo(target, { offset: -80, duration: reducedMotionQuery.matches ? 0 : 1.2 });
});

// Update Lenis options when reduced motion preference changes
reducedMotionQuery.addEventListener("change", () => {
  const isReduced = reducedMotionQuery.matches;
  lenis.options.duration = isReduced ? 0 : 1.2;
  lenis.options.smoothWheel = !isReduced;
  lenis.options.touchMultiplier = isReduced ? 0 : 2;
});

document.addEventListener("astro:before-preparation", () => {
  lenis.destroy();
});

export { lenis };