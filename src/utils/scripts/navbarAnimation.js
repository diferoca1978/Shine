export const navbarAnimation = () => {
  const logoContainer = document.querySelector("#logo-container");
  
  if (!logoContainer) return;

  let lastScrollY = 0;
  let ticking = false;

  function isMobile() {
    return window.innerWidth < 1024; // lg breakpoint
  }

  function updateLogo() {
    // Only apply animation on mobile devices
    if (!isMobile()) {
      logoContainer.style.opacity = "1";
      return;
    }

    const scrollY = window.scrollY;
    
    if (scrollY === 0) {
      // At the top - show logo
      logoContainer.style.opacity = "1";
    } else if (scrollY > 100) {
      // Past 100px - hide logo (regardless of scroll direction)
      logoContainer.style.opacity = "0";
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateLogo);
      ticking = true;
    }
  }

  function onResize() {
    // Reset logo visibility when resizing
    if (!isMobile()) {
      logoContainer.style.opacity = "1";
    }
  }

  // Add event listeners
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
};