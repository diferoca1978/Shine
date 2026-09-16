export const navbarAnimation = () => {
  // ===== Desktop services dropdown (hover-preview two-pane panel) =====
  const ddRoot = document.getElementById("dd-root");
  const ddTrigger = document.getElementById("dd-trigger");
  const ddPanel = document.getElementById("dd-panel");
  const svcLinks = document.querySelectorAll(".dd-svc-link");
  const descPanels = document.querySelectorAll(".dd-desc-panel");

  function openDd() {
    ddPanel?.classList.remove("hidden");
    ddTrigger?.setAttribute("aria-expanded", "true");
  }

  function closeDd() {
    ddPanel?.classList.add("hidden");
    ddTrigger?.setAttribute("aria-expanded", "false");
  }

  ddRoot?.addEventListener("mouseenter", openDd);
  ddRoot?.addEventListener("mouseleave", closeDd);

  ddTrigger?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      ddPanel?.classList.contains("hidden") ? openDd() : closeDd();
    }
    if (e.key === "Escape") closeDd();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDd();
  });

  // Close desktop dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (ddRoot && e.target instanceof Node && !ddRoot.contains(e.target)) {
      closeDd();
    }
  });

  // Split-panel hover preview
  function activateService(idx) {
    svcLinks.forEach((l) => l.removeAttribute("data-state"));
    descPanels.forEach((p) => p.classList.add("hidden"));

    document
      .querySelector(`.dd-svc-link[data-idx="${idx}"]`)
      ?.setAttribute("data-state", "active");

    document
      .querySelector(`.dd-desc-panel[data-panel="${idx}"]`)
      ?.classList.remove("hidden");
  }

  svcLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const idx = link.getAttribute("data-idx");
      if (idx !== null) activateService(idx);
    });
  });
};
