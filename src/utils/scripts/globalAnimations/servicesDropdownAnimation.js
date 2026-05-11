/**
 * Sets up an accessible dropdown: click/keyboard toggle, aria-expanded,
 * close-on-outside-click, Escape key, and arrow-key focus management.
 */
function setupDropdown(triggerId, dropdownId) {
  const trigger = document.getElementById(triggerId);
  const dropdown = document.getElementById(dropdownId);

  if (!trigger || !dropdown) return;

  const getItems = () =>
    Array.from(dropdown.querySelectorAll("a, button")).filter(
      (el) => !el.closest("[hidden]") && !el.hasAttribute("disabled")
    );

  const isOpen = () => !dropdown.classList.contains("hidden");

  const open = () => {
    dropdown.classList.remove("hidden");
    trigger.setAttribute("aria-expanded", "true");
  };

  const close = () => {
    dropdown.classList.add("hidden");
    trigger.setAttribute("aria-expanded", "false");
  };

  const toggle = () => (isOpen() ? close() : open());

  // Set initial ARIA state
  trigger.setAttribute("aria-expanded", "false");
  trigger.setAttribute("aria-haspopup", "true");

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });

  // Keyboard: Enter/Space toggle, Escape close, ArrowDown open+focus first item
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
      if (isOpen()) getItems()[0]?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      open();
      getItems()[0]?.focus();
    } else if (e.key === "Escape") {
      close();
      trigger.focus();
    }
  });

  // Arrow navigation within open dropdown
  dropdown.addEventListener("keydown", (e) => {
    const items = getItems();
    const current = document.activeElement;
    const idx = items.indexOf(current);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
      trigger.focus();
    }
  });

  // Close when focus leaves the entire widget
  dropdown.addEventListener("focusout", (e) => {
    if (!dropdown.contains(e.relatedTarget) && e.relatedTarget !== trigger) {
      close();
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
      close();
    }
  });
}

export const servicesDropdownAnimation = () => {
  setupDropdown("services-linkToggle", "services-dropdown");
  setupDropdown("services-overlayMenu", "services-dropdown-overlayMenu");
};

export const footerServicesDropdownAnimation = () => {
  setupDropdown("footer-services", "footer-services-dropdown");
};
