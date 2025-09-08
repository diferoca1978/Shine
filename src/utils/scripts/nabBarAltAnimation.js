import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const nabBarAltAnimation = () => {
  const btnOpenClose = document.querySelector("#btn-open-close");
  const logoContainer = document.querySelector("#logo-container");
  const visibleMenu = document.querySelector("#visible-menu");
  const overlayMenu = document.querySelector(".overlay-menu");

  if (!btnOpenClose || !logoContainer || !visibleMenu || !overlayMenu) {
    console.warn("Navbar not found");
    return;
  }

  // Initial state - button hidden, logo and menu visible
  gsap.set(btnOpenClose, { opacity: 0 });
  gsap.set(logoContainer, { opacity: 1 });
  gsap.set(visibleMenu, { opacity: 1 });
  
  // Set initial state for overlay menu
  const overlayContent = overlayMenu.querySelector(".overlay-content");
  const navItems = overlayMenu.querySelectorAll("li");
  gsap.set(overlayContent, { x: "-100%", opacity: 0 });
  gsap.set(navItems, { x: -50, opacity: 0 });

  // Create animations for hiding logo and menu
  const hideLogoMenu = gsap.to([logoContainer, visibleMenu], {
    opacity: 0,
    paused: true,
    duration: 0.2,
    ease: "power2.out"
  });

  const hideOverlayMenu = gsap.to(overlayMenu, {
    opacity: 0,
    paused: true,
    duration: 0.2,
    ease: "power2.out"
  });

  // Create animation for showing button
  const showButton = gsap.to(btnOpenClose, {
    opacity: 1,
    paused: true,
    duration: 0.2,
    ease: "power2.out"
  });

 

  // Overlay menu animation functions
  const openOverlay = () => {
    // Show overlay first
    overlayMenu.classList.remove("hidden");
    
    // Reset to initial states before animating
    gsap.set(overlayContent, { x: "-100%", opacity: 0 });
    gsap.set(navItems, { x: -50, opacity: 0 });
    
    // Create timeline for opening animation
    const tl = gsap.timeline();
    
    // Animate overlay sliding in from left
    tl.to(overlayContent, {
      x: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power3.out"
    })
    // Stagger animate navigation items
    .to(navItems, {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3");
  };

  const closeOverlay = () => {
    const navItems = overlayMenu.querySelectorAll("li");
    const overlayContent = overlayMenu.querySelector(".overlay-content");
    
    // Create timeline for closing animation
    const tl = gsap.timeline({
      onComplete: () => {
        overlayMenu.classList.add("hidden");
      }
    });
    
    // Animate navigation items out first
    tl.to(navItems, {
      x: 50,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in"
    })
    // Then slide overlay out to the right
    .to(overlayContent, {
      x: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in"
    }, "-=0.2");
  };

  // Add click event listeners
  btnOpenClose.addEventListener("click", (e) => {
    e.preventDefault();
    openOverlay();
  });

  const btnClose = overlayMenu.querySelector("#btn-close");
  if (btnClose) {
    btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      closeOverlay();
    });
  }

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