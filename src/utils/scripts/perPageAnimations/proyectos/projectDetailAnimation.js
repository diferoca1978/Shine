import { gsap } from "gsap";

const getSlugFromLocation = (fallbackSlug) => {
  const match = window.location.pathname.match(/^\/proyectos\/([^/]+)\/?$/);
  return match ? match[1] : fallbackSlug;
};

export const projectDetailAnimation = () => {
  const root = document.querySelector("[data-project-detail]");
  if (!root) return;

  const cards = gsap.utils.toArray("[data-project-card]", root);
  if (!cards.length) return;

  let reducedMotion = false;
  const mm = gsap.matchMedia();
  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      reducedMotion = context.conditions.reducedMotion;
    },
  );

  const updateDocumentTitle = (card) => {
    const heading = card.querySelector("h2");
    if (!heading) return;
    const brand = document.title.split(" | ").pop();
    document.title = `${heading.textContent} | ${brand}`;
  };

  const focusHeading = (card) => {
    const heading = card.querySelector("h2");
    if (!heading) return;
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  };

  const activateCard = (slug) => {
    const nextCard = cards.find((card) => card.dataset.slug === slug);
    if (!nextCard) return;
    const currentCard = cards.find(
      (card) => card !== nextCard && !card.classList.contains("hidden"),
    );
    if (currentCard === nextCard) return;

    if (reducedMotion) {
      cards.forEach((card) => {
        const isNext = card === nextCard;
        card.classList.toggle("hidden", !isNext);
        card.setAttribute("aria-hidden", isNext ? "false" : "true");
      });
      updateDocumentTitle(nextCard);
      focusHeading(nextCard);
      return;
    }

    nextCard.classList.remove("hidden");
    nextCard.setAttribute("aria-hidden", "false");
    gsap.set(nextCard, { autoAlpha: 0, scale: 1.02 });

    if (currentCard) {
      gsap.killTweensOf(currentCard);
      gsap.to(currentCard, {
        autoAlpha: 0,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          currentCard.classList.add("hidden");
          currentCard.setAttribute("aria-hidden", "true");
        },
      });
    }

    gsap.killTweensOf(nextCard);
    gsap.to(nextCard, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
      delay: currentCard ? 0.15 : 0,
    });

    updateDocumentTitle(nextCard);
    focusHeading(nextCard);
  };

  window.addEventListener("proyecto:selected", (event) => {
    activateCard(event.detail.slug);
  });

  window.addEventListener("popstate", () => {
    const slug = getSlugFromLocation(root.dataset.pageSlug);
    if (slug) activateCard(slug);
  });
};
