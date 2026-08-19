import { gsap } from "gsap";

export const overlayMenuAnimation = () => {
  const btnOpenClose = document.querySelector("#btn-open-close");
  const overlayMenu = document.querySelector("#nav-overlay");

  if (!btnOpenClose || !overlayMenu) return;

  // Live reference — checked at call time inside event handlers so it reflects
  // any runtime change the user makes in their OS accessibility settings.
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const overlayContent = overlayMenu.querySelector(".overlay-content");
  const navItems = overlayMenu.querySelectorAll("li");
  gsap.set(overlayContent, { x: "-100%", autoAlpha: 0 });
  gsap.set(navItems, { x: -50, autoAlpha: 0 });

  // Overlay open: slide-in for full motion, instant reveal for reduced motion
  const openOverlay = () => {
    overlayMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (reducedMotionQuery.matches) {
      gsap.set(overlayContent, { x: "0%", autoAlpha: 1 });
      gsap.set(navItems, { x: 0, autoAlpha: 1 });
      return;
    }

    gsap.set(overlayContent, { x: "-100%", autoAlpha: 0 });
    gsap.set(navItems, { x: -50, autoAlpha: 0 });

    gsap
      .timeline()
      .to(overlayContent, { x: "0%", autoAlpha: 1, duration: 0.6, ease: "power3.out" })
      .to(navItems, { x: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.3");
  };

  // Overlay close: slide-out for full motion, instant hide for reduced motion
  const closeOverlay = () => {
    const items = overlayMenu.querySelectorAll("li");
    const content = overlayMenu.querySelector(".overlay-content");

    document.body.style.overflow = "";

    if (reducedMotionQuery.matches) {
      overlayMenu.classList.add("hidden");
      return;
    }

    gsap
      .timeline({ onComplete: () => overlayMenu.classList.add("hidden") })
      .to(items, { x: 50, autoAlpha: 0, duration: 0.3, stagger: 0.05, ease: "power2.in" })
      .to(content, { x: "100%", autoAlpha: 0, duration: 0.5, ease: "power3.in" }, "-=0.2");
  };

  // Rocket decoration — skip entirely for reduced motion
  const overlayRocketAnimation = () => {
    const rocket = document.querySelector("#rocket");
    if (!rocket || reducedMotionQuery.matches) return;

    const masterTl = gsap.timeline({ repeat: -1 });
    const flyingTl = gsap.timeline();

    flyingTl
      .to(rocket, { x: 100, y: -80, rotation: 15, duration: 1.5, ease: "power2.out" })
      .to(rocket, { x: 150, y: 20, rotation: -10, duration: 1.2, ease: "power2.inOut" })
      .to(rocket, { x: -50, y: 60, rotation: -25, duration: 1.8, ease: "power2.inOut" })
      .to(rocket, { x: 0, y: 0, rotation: 0, duration: 1.5, ease: "power2.inOut" });

    masterTl.add(flyingTl);

    gsap.to(rocket, { y: "+=10", duration: 0.8, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.to(rocket, { scale: 1.05, duration: 1.5, ease: "sine.inOut", repeat: -1, yoyo: true });
    gsap.to(rocket, { x: "+=5", duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.3 });
  };

  overlayRocketAnimation();

  btnOpenClose.addEventListener("click", (e) => {
    e.preventDefault();
    btnOpenClose.setAttribute("aria-expanded", "true");
    btnOpenClose.setAttribute("aria-label", "Cerrar menú");
    openOverlay();
  });

  const btnClose = overlayMenu.querySelector("#btn-close");
  if (btnClose) {
    btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      btnOpenClose.setAttribute("aria-expanded", "false");
      btnOpenClose.setAttribute("aria-label", "Abrir menú");
      closeOverlay();
    });
  }
};
