export const beforeAfterSliderAnimation = () => {
  const wrappers = document.querySelectorAll("[data-before-after-slider]");
  if (!wrappers.length) return;

  wrappers.forEach((wrapper) => {
    const input = wrapper.querySelector("[data-slider-input]");
    const clip = wrapper.querySelector("[data-slider-clip]");
    const beforeImage = wrapper.querySelector("[data-slider-before-image]");
    if (!input || !clip || !beforeImage) return;

    const update = () => {
      const value = Number(input.value);
      clip.style.width = `${value}%`;
      beforeImage.style.width = `${wrapper.getBoundingClientRect().width}px`;
    };

    update();
    input.addEventListener("input", update);
    window.addEventListener("resize", update);
  });
};
