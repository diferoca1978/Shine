export const servicesDropdownAnimation = () => {
  const servicesLinkToggle = document.getElementById("services-linkToggle");
  const servicesDropdown = document.getElementById("services-dropdown");

  if(servicesLinkToggle && servicesDropdown) {
    servicesLinkToggle.addEventListener("click", (e) => {
      e.preventDefault();
      servicesDropdown.classList.toggle("hidden");
    });
    servicesDropdown.addEventListener("mouseleave", () => {
      servicesDropdown.classList.add("hidden");
    });
  }


  const servicesOverlayMenu = document.getElementById("services-overlayMenu");
  const servicesDropdownOverlayMenu = document.getElementById("services-dropdown-overlayMenu");

  if(servicesOverlayMenu && servicesDropdownOverlayMenu) {
    servicesOverlayMenu.addEventListener("click", (e) => {
      e.preventDefault();
      servicesDropdownOverlayMenu.classList.toggle("hidden");
    });
    servicesDropdownOverlayMenu.addEventListener("mouseleave", () => {
      servicesDropdownOverlayMenu.classList.add("hidden");
    });
  }

}

export const footerServicesDropdownAnimation = () => {
  const servicesLinkToggle = document.getElementById("footer-services");
  const servicesDropdown = document.getElementById("footer-services-dropdown");

  if(servicesLinkToggle && servicesDropdown) {
    servicesLinkToggle.addEventListener("click", (e) => {
      e.preventDefault();
      servicesDropdown.classList.toggle("hidden");
    });
    servicesDropdown.addEventListener("mouseleave", () => {
      servicesDropdown.classList.add("hidden");
    });
  }

}

