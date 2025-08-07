import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const navbarAnimation = () => {
  const logoContainer = document.querySelector("#logo-container");
  
  // Create the scroll-triggered animation
  ScrollTrigger.create({
    trigger: "body",
    start: "80px top",
    onEnter: () => {
      // Hide logo when scrolled past 80px
      gsap.to(logoContainer, { 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    },
    onLeaveBack: () => {
      // Show logo when scrolling back to top
      gsap.to(logoContainer, { 
        opacity: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    }
  });
};