export const beforeAfterVideoAnimation = () => {
  const wrappers = document.querySelectorAll("[data-before-after-video]");
  if (!wrappers.length) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  wrappers.forEach((wrapper) => {
    const video = wrapper.querySelector("[data-video]");
    const poster = wrapper.querySelector("[data-video-poster]");
    const toggle = wrapper.querySelector("[data-video-toggle]");
    const progress = wrapper.querySelector("[data-video-progress]");
    if (!video) return;

    video.addEventListener("play", () => {
      poster?.setAttribute("data-playing", "");
      toggle?.setAttribute("aria-label", "Pausar video");
    });

    video.addEventListener("pause", () => {
      poster?.removeAttribute("data-playing");
      toggle?.setAttribute("aria-label", "Reproducir video");
    });

    video.addEventListener("timeupdate", () => {
      if (!progress || !video.duration) return;
      progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
    });

    toggle?.addEventListener("click", () => {
      if (video.paused) video.play();
      else video.pause();
    });

    // Reduced motion: never autoplay — the poster (the "después" frame) stays,
    // and the visible play button is the only way to start it.
    if (reducedMotionQuery.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(wrapper);
  });
};
