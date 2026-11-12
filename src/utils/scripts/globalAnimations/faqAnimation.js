import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Open/close animation for the native <details> in FAQ.astro. The answer wrapper's height and
// opacity tween together; on close, `open` is removed only after the tween ends so the native
// disclosure cannot cut it off. A click mid-animation reverses from the current height.
// Reduced motion keeps the plain native toggle (no listeners, no inline styles).
const CLEAR = "height,opacity,overflow";

document.querySelectorAll("[data-faq]").forEach((root) => {
  const items = gsap.utils.toArray("[data-faq-item]", root);
  if (items.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    items.forEach((details) => details.removeAttribute("data-closing"));
    gsap.set(root.querySelectorAll("[data-faq-answer]"), { clearProps: CLEAR });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const cleanups = items.map((details) => {
      const summary = details.querySelector("summary");
      const answer = details.querySelector("[data-faq-answer]");
      if (!summary || !answer) return () => {};

      // `target` is where the item is heading; it differs from `details.open` only mid-close.
      let target = details.open;
      let tween;

      const settle = () => {
        tween = undefined;
        gsap.set(answer, { clearProps: CLEAR });
        // Content below changed height: keep later ScrollTriggers in place.
        ScrollTrigger.refresh();
      };

      const open = () => {
        details.removeAttribute("data-closing");
        // Mid-close the wrapper already has an inline height; start from there, not from 0.
        if (!details.open) {
          gsap.set(answer, { height: 0, opacity: 0, overflow: "hidden" });
          details.open = true;
        }
        tween = gsap.to(answer, {
          height: answer.scrollHeight,
          opacity: 1,
          duration: 0.45,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: settle,
        });
      };

      const close = () => {
        details.setAttribute("data-closing", "");
        gsap.set(answer, { overflow: "hidden" });
        tween = gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            details.open = false;
            details.removeAttribute("data-closing");
            settle();
          },
        });
      };

      // Fires for mouse, Enter and Space alike. Outside a tween, read the real state so a
      // <details> the browser opened on its own (find-in-page) closes on the first click.
      const onClick = (event) => {
        event.preventDefault();
        target = tween ? !target : !details.open;
        tween?.kill();
        if (target) open();
        else close();
      };

      summary.addEventListener("click", onClick);

      // Leaving this branch (e.g. reduced motion switched on mid-animation): land on `target`.
      return () => {
        summary.removeEventListener("click", onClick);
        if (tween) {
          tween.kill();
          tween = undefined;
          details.open = target;
        }
        details.removeAttribute("data-closing");
        gsap.set(answer, { clearProps: CLEAR });
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
});
