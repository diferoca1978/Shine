import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const navbarAnimation = () => {
  const visibleMenu = document.querySelector("#visible-menu");
  const logoContainer = document.querySelector("#logo-container");
  
  if (!visibleMenu || !logoContainer) {
    console.warn("Navbar not found");
    return;
  }

  const tl = gsap.timeline();
  
  // Ensure navbar is visible initially
  gsap.set(visibleMenu, {yPercent: 0, opacity: 1 });
  gsap.set(logoContainer, {yPercent: 0, opacity: 1 });
  
  // Create the hide animation - starts visible, can animate to hidden
  const hideAnim = gsap.to(visibleMenu, {
    yPercent: -100,
    opacity: 0,
    paused: true,
    duration: 0.3,
    ease: "power2.out"
  });
  gsap.to(logoContainer, {
    yPercent: -100,
    opacity: 0,
    paused: true,
    duration: 0.3,
    ease: "power2.out"
  });  
  // Create scroll trigger that responds to scroll direction
  ScrollTrigger.create({
    start: "80px top",
    end: "max",
    onUpdate: (self) => {
      // Hide navbar when scrolling down, show when scrolling up
      self.direction === 1 ? hideAnim.play() : hideAnim.reverse();
    }
  });
};