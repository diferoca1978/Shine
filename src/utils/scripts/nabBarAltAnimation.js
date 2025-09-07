import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const nabBarAltAnimation = () => {
  const btnOpenClose = document.querySelector("#btn-open-close");
  const logoContainer = document.querySelector("#logo-container");
  const visibleMenu = document.querySelector("#visible-menu");

  if (!btnOpenClose || !logoContainer || !visibleMenu) {
    console.warn("Navbar not found");
    return;
  }

  // Initial state - button hidden, logo and menu visible
  gsap.set(btnOpenClose, { opacity: 0 });
  gsap.set(logoContainer, { opacity: 1 });
  gsap.set(visibleMenu, { opacity: 1 });

  // Create animations for hiding logo and menu
  const hideLogoMenu = gsap.to([logoContainer, visibleMenu], {
    opacity: 0,
    paused: true,
    duration: 0.3,
    ease: "power2.out"
  });

  // Create animation for showing button
  const showButton = gsap.to(btnOpenClose, {
    opacity: 1,
    paused: true,
    duration: 0.3,
    ease: "power2.out"
  });

  // ScrollTrigger that activates after 1px of scroll
  ScrollTrigger.create({
    start: "1px top",
    end: "max",
    onUpdate: (self) => {
      if (self.scroll() > 1) {
        hideLogoMenu.play();
        showButton.play();
      } else {
        hideLogoMenu.reverse();
        showButton.reverse();
      }
    }
  });
}