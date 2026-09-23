import { gsap } from "gsap";

// Derives the active project slug from the current URL — /proyectos/<slug>/
// resolves to <slug>; a bare /proyectos/ falls back to the slug this page
// was server-rendered with (its sitewide default), which is exactly right
// for a back/forward navigation that lands on the index route.
const getSlugFromLocation = () => {
  const match = window.location.pathname.match(/^\/proyectos\/([^/]+)\/?$/);
  if (match) return match[1];
  const detailRoot = document.querySelector("[data-project-detail]");
  return detailRoot?.dataset.pageSlug ?? null;
};

export const projectsAccordionAnimation = () => {
  const sidebar = document.querySelector("#proyectos-sidebar");
  if (!sidebar) return;

  const trigger = document.querySelector("#proyectos-sidebar-trigger");
  const triggerLabel = trigger?.querySelector("[data-sidebar-trigger-label]");
  const closeBtn = document.querySelector("#proyectos-sidebar-close");
  const industryTriggers = gsap.utils.toArray("[data-industry-trigger]", sidebar);
  const projectLinks = gsap.utils.toArray("[data-project-link]", sidebar);

  const OPEN_DIALOG_CLASSES = [
    "fixed",
    "inset-0",
    "z-110",
    "flex",
    "overflow-y-auto",
    "bg-softBeige",
    "p-6",
    "dark:bg-smokyBlack",
  ];

  // --- Single-open-industry accordion ---
  const setIndustryOpen = (industryTrigger, isOpen) => {
    industryTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (isOpen) industryTrigger.dataset.state = "active";
    else delete industryTrigger.dataset.state;

    const panel = document.getElementById(industryTrigger.getAttribute("aria-controls"));
    panel?.classList.toggle("hidden", !isOpen);
  };

  const openIndustryFor = (slug) => {
    const ownerTrigger = industryTriggers.find((industryTrigger) => {
      const panel = document.getElementById(industryTrigger.getAttribute("aria-controls"));
      return panel?.querySelector(`[data-slug="${slug}"]`);
    });
    if (!ownerTrigger) return;
    industryTriggers.forEach((industryTrigger) =>
      setIndustryOpen(industryTrigger, industryTrigger === ownerTrigger),
    );
  };

  industryTriggers.forEach((industryTrigger) => {
    industryTrigger.addEventListener("click", () => {
      const alreadyOpen = industryTrigger.getAttribute("aria-expanded") === "true";
      industryTriggers.forEach((other) =>
        setIndustryOpen(other, other === industryTrigger && !alreadyOpen),
      );
    });
  });

  // --- Keep the sidebar's own state (active link, open industry, trigger label) in sync ---
  const syncSidebar = (slug) => {
    projectLinks.forEach((link) => {
      const isActive = link.dataset.slug === slug;
      if (isActive) {
        link.dataset.state = "active";
        link.setAttribute("aria-current", "true");
      } else {
        delete link.dataset.state;
        link.removeAttribute("aria-current");
      }
    });

    openIndustryFor(slug);

    if (triggerLabel) {
      const activeLink = projectLinks.find((link) => link.dataset.slug === slug);
      if (activeLink) triggerLabel.textContent = activeLink.textContent.trim();
    }
  };

  // --- Delegated project-link clicks: pushState + custom event ---
  projectLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const slug = link.dataset.slug;
      const href = link.getAttribute("href");
      if (!slug || !href) return;

      event.preventDefault();
      history.pushState(null, "", href);
      syncSidebar(slug);
      closeDialog();
      window.dispatchEvent(new CustomEvent("proyecto:selected", { detail: { slug } }));
    });
  });

  window.addEventListener("popstate", () => {
    const slug = getSlugFromLocation();
    if (slug) syncSidebar(slug);
  });

  // --- Mobile dialog: open/close + focus trap ---
  let lastFocused = null;

  const getFocusable = () =>
    gsap.utils.toArray(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      sidebar,
    );

  const onKeydown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const openDialog = () => {
    lastFocused = document.activeElement;
    sidebar.classList.remove("hidden");
    sidebar.classList.add(...OPEN_DIALOG_CLASSES);
    sidebar.setAttribute("role", "dialog");
    sidebar.setAttribute("aria-modal", "true");
    sidebar.setAttribute("aria-label", "Filtrar proyectos por industria");
    trigger?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeydown);
    closeBtn?.focus();
  };

  const closeDialog = () => {
    if (!sidebar.classList.contains("fixed")) return;
    sidebar.classList.add("hidden");
    sidebar.classList.remove(...OPEN_DIALOG_CLASSES);
    sidebar.removeAttribute("role");
    sidebar.removeAttribute("aria-modal");
    sidebar.removeAttribute("aria-label");
    trigger?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);
    (lastFocused ?? trigger)?.focus();
    lastFocused = null;
  };

  trigger?.addEventListener("click", () => {
    if (sidebar.classList.contains("fixed")) closeDialog();
    else openDialog();
  });

  closeBtn?.addEventListener("click", closeDialog);
};
