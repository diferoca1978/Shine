export const problemVideo = () => {
  const wrappers = document.querySelectorAll("[data-loop-video]");
  if (!wrappers.length) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  wrappers.forEach((wrapper) => {
    const video = wrapper.querySelector("[data-video]");
    const toggle = wrapper.querySelector("[data-video-toggle]");
    const sound = wrapper.querySelector("[data-video-sound]");
    if (!video) return;

    // A manual pause must survive the visibility observer: it only resumes
    // playback the user did not stop themselves.
    let userPaused = false;

    video.addEventListener("play", () => {
      wrapper.setAttribute("data-playing", "");
      toggle?.setAttribute("aria-label", "Pausar video");
    });

    video.addEventListener("pause", () => {
      wrapper.removeAttribute("data-playing");
      toggle?.setAttribute("aria-label", "Reproducir video");
    });

    toggle?.addEventListener("click", () => {
      if (video.paused) {
        userPaused = false;
        video.play().catch(() => {});
      } else {
        userPaused = true;
        video.pause();
      }
    });

    sound?.addEventListener("click", () => {
      video.muted = !video.muted;
      wrapper.toggleAttribute("data-unmuted", !video.muted);
      sound.setAttribute("aria-label", video.muted ? "Activar sonido" : "Silenciar video");
    });

    // Reduced motion: never autoplay — the poster stays and the play button
    // is the only way to start the film.
    if (reducedMotionQuery.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!userPaused) video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(wrapper);
  });
};
