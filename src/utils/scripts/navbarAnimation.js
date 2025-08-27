import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const navbarAnimation = () => {
  const navbar = document.querySelector(".mainNavBar");
  
  if (!navbar) {
    console.warn("Navbar not found");
    return;
  }
  
  // Ensure navbar is visible initially
  gsap.set(navbar, { yPercent: 0, opacity: 1 });
  
  // Create the hide animation - starts visible, can animate to hidden
  const hideAnim = gsap.to(navbar, {
    yPercent: -100,
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