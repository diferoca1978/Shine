import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const nabBarAltAnimation = () => {
  const btnOpenClose = document.querySelector("#btn-open-close");
  const logoContainer = document.querySelector("#logo-container");
  const visibleMenu = document.querySelector("#visible-menu");
  const overlayMenu = document.querySelector(".overlay-menu");
  const navContainer = document.querySelector(".nav-container");

  if (!btnOpenClose || !logoContainer || !visibleMenu || !overlayMenu || !navContainer) {
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

  const overlayRocketAnimation = () => {
  const rocket = document.querySelector("#rocket");

  if (!rocket) {
    console.warn("Rocket not found");
    return;
  }

  // Create a master timeline that repeats
  const masterTl = gsap.timeline({ repeat: -1 });

  // Flying path animation - move rocket in a figure-8 or curved pattern
  const flyingTl = gsap.timeline();
  
  // Start from center, fly up and right
  flyingTl.to(rocket, {
    x: 100,
    y: -80,
    rotation: 15,
    duration: 1.5,
    ease: "power2.out"
  })
  // Curve down and right
  .to(rocket, {
    x: 150,
    y: 20,
    rotation: -10,
    duration: 1.2,
    ease: "power2.inOut"
  })
  // Fly left and down
  .to(rocket, {
    x: -50,
    y: 60,
    rotation: -25,
    duration: 1.8,
    ease: "power2.inOut"
  })
  // Return to start position
  .to(rocket, {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 1.5,
    ease: "power2.inOut"
  });

  // Add the flying timeline to master
  masterTl.add(flyingTl);

  // Add continuous floating motion (independent of main flight path)
  gsap.to(rocket, {
    y: "+=10",
    duration: 0.8,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // Add subtle scaling for breathing effect
  gsap.to(rocket, {
    scale: 1.05,
    duration: 1.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
  });

  // Add slight horizontal wobble
  gsap.to(rocket, {
    x: "+=5",
    duration: 0.6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    delay: 0.3
  });
};

overlayRocketAnimation();

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
        // Remove dark background when scrolled
        navContainer.classList.remove("dark:bg-smokyBlack");
      } else {
        hideLogoMenu.reverse();
        showButton.reverse();
        // Restore dark background when at top
        navContainer.classList.add("dark:bg-smokyBlack");
      }
    }
  });
}