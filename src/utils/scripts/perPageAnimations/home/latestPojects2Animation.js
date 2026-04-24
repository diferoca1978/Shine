import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const cursorTrackingImgPreview = () => {
  const section = document.querySelector("[data-cursor-section]");
  if (!section) return;

  const previewColumn = section.querySelector("[data-preview-column]");
  const previewInner = section.querySelector("[data-preview-inner]");
  const projectList = section.querySelector("[data-project-list]");
  const previewImages = gsap.utils.toArray("[data-preview-img]", section);
  const idleEl = section.querySelector("[data-preview-idle]");
  const counterEl = section.querySelector("[data-preview-counter]");
  const projectItems = gsap.utils.toArray("[data-project-item]", section);

  if (
    !previewColumn ||
    !previewInner ||
    !projectList ||
    !previewImages.length ||
    !projectItems.length
  )
    return;

  const total = projectItems.length;

  // --- Initial state ---
  gsap.set(previewImages, { autoAlpha: 0, scale: 1.08 });
  gsap.set(idleEl, { autoAlpha: 1 });

  // --- PIN: GSAP pins the left column for the full scroll height of the right column.
  // trigger = left column, endTrigger = right column bottom.
  // pinSpacing: false because the right column already provides the scroll height.
  // This works with Lenis because ScrollTrigger.update is already wired to lenis.on("scroll").
  ScrollTrigger.create({
    trigger: previewColumn,
    endTrigger: projectList,
    start: "top top",
    end: "bottom bottom",
    pin: true,
    pinSpacing: false,
  });

  // --- Scroll parallax: move the inner wrapper up/down as the user scrolls through the section.
  // The range maps the section's scroll progress to a ±60px vertical offset on the card.
  gsap.to(previewInner, {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  // --- Crossfade state ---
  let activeIndex = -1;

  const showImage = (i) => {
    gsap.to(idleEl, { autoAlpha: 0, duration: 0.25 });

    if (activeIndex !== -1 && activeIndex !== i) {
      gsap.to(previewImages[activeIndex], {
        autoAlpha: 0,
        scale: 1.06,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    gsap.to(previewImages[i], {
      autoAlpha: 1,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
    });

    if (counterEl) {
      counterEl.textContent = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }

    activeIndex = i;
  };

  const resetToIdle = () => {
    if (activeIndex !== -1) {
      gsap.to(previewImages[activeIndex], { autoAlpha: 0, scale: 1.06, duration: 0.4 });
    }
    gsap.to(idleEl, { autoAlpha: 1, duration: 0.35, delay: 0.1 });
    if (counterEl) counterEl.textContent = `— / ${String(total).padStart(2, "0")}`;
    activeIndex = -1;
  };

  // --- Hover: image crossfade + row micro-animations ---
  projectItems.forEach((item, i) => {
    const numberEl = item.querySelector("[data-project-number]");
    const titleEl = item.querySelector("[data-project-title]");
    const arrowEl = item.querySelector("[data-project-arrow]");

    item.addEventListener("mouseenter", () => {
      showImage(i);
      gsap.to(numberEl, { color: "var(--color-softBeige)", opacity: 1, duration: 0.25 });
      gsap.to(titleEl, { x: 12, duration: 0.35, ease: "power2.out" });
      gsap.to(arrowEl, { x: 5, color: "var(--color-accentGold)", opacity: 1, duration: 0.3 });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(numberEl, { color: "var(--color-softBeige)", opacity: 0.25, duration: 0.3 });
      gsap.to(titleEl, { x: 0, duration: 0.35, ease: "power2.out" });
      gsap.to(arrowEl, { x: 0, color: "var(--color-softBeige)", opacity: 0.4, duration: 0.3 });
    });
  });

  // Reset when the cursor leaves the section entirely
  section.addEventListener("mouseleave", resetToIdle);
};
