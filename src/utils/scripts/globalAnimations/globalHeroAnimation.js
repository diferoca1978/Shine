import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const globalHeroAnimation = () => {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".description-text");

  const elements = [heroTitle, heroSubtitle, heroDescription].filter(Boolean);

  // Typewriter title (home): only exists when GlobalHero receives rotatingWords
  const isTypewriter = !!heroTitle?.classList.contains("hero-title--typewriter");
  const typed = isTypewriter ? heroTitle.querySelector(".hero-typed") : null;
  const caret = isTypewriter ? heroTitle.querySelector(".hero-caret") : null;
  const tail = isTypewriter ? heroTitle.querySelector(".hero-title-tail") : null;

  let words = [];
  if (typed) {
    try {
      const parsed = JSON.parse(typed.dataset.words || "[]");
      words = Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    } catch {
      words = [];
    }
  }
  const useTypewriter = isTypewriter && !!typed && words.length > 0;
  const firstWord = words[0] ?? "";

  // "Diseño web, publicidad digital y e-commerce"
  const joinedWords = words
    .map((word, i) => (i === 0 ? word : word.toLowerCase()))
    .reduce((acc, word, i, arr) => (i === 0 ? word : `${acc}${i === arr.length - 1 ? " y " : ", "}${word}`), "");

  // Create matchMedia instance
  const mm = gsap.matchMedia();

  // Store split instances for cleanup
  let splitInstances = [];

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        // No animation — just make elements visible immediately
        if (useTypewriter) {
          // Static joined text, no caret, no loop. Title keeps autoAlpha 1
          // (no clearProps: the `invisible` class would hide it again).
          typed.textContent = joinedWords;
          gsap.set(caret, { display: "none" });
          // The long joined phrase must be allowed to wrap on small screens
          gsap.set(typed.parentElement, { whiteSpace: "normal" });
          gsap.set(heroTitle, { autoAlpha: 1 });
          gsap.set(
            elements.filter((el) => el !== heroTitle),
            { autoAlpha: 1 }
          );
          return () => {
            typed.textContent = firstWord;
          };
        }
        gsap.set(elements, { autoAlpha: 1 });
        return;
      }

      // Full motion: prevent FOUC then animate
      gsap.set(elements, { autoAlpha: 1 });

      let typewriterTl = null;
      if (useTypewriter) {
        const write = (word, n) => {
          typed.textContent = word.slice(0, n);
        };
        // Start empty; the caret keeps the line height so nothing shifts
        write(firstWord, 0);

        typewriterTl = gsap.timeline({ repeat: -1 });
        words.forEach((word) => {
          const proxy = { n: 0 };
          typewriterTl
            .fromTo(
              proxy,
              { n: 0 },
              {
                n: word.length,
                duration: word.length * 0.09,
                ease: "none",
                onUpdate: () => write(word, Math.round(proxy.n)),
              }
            )
            .to(
              proxy,
              {
                n: 0,
                duration: word.length * 0.045,
                ease: "none",
                onUpdate: () => write(word, Math.round(proxy.n)),
              },
              "+=1.4"
            )
            .to({}, { duration: 0.3 });
        });

        if (caret) {
          gsap.to(caret, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "steps(1)",
            repeat: -1,
            yoyo: true,
          });
        }

        if (tail) {
          gsap.from(tail, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
          });
        }
      }

      if (heroTitle && !useTypewriter) {
        const splitTitle = SplitText.create(heroTitle, { type: "words, chars" });
        splitInstances.push(splitTitle);

        gsap.from(splitTitle.chars, {
          yPercent: "random(-100, 100)",
          rotation: "random(-30, 30)",
          ease: "back.out(2)",
          autoAlpha: 0,
          stagger: {
            amount: 0.7,
            from: "random",
          },
        });
      }

      if (heroSubtitle) {
        // Line-by-line fade up from the bottom. autoSplit re-splits on resize /
        // font load; returning the tween from onSplit keeps its progress in sync.
        const splitSubtitle = SplitText.create(heroSubtitle, {
          type: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
              delay: 0.3,
              stagger: 0.15,
              ease: "power3.out",
            }),
        });
        splitInstances.push(splitSubtitle);
      }

      if (heroDescription) {
        const splitDescription = SplitText.create(heroDescription, { type: "words, chars" });
        splitInstances.push(splitDescription);

        gsap.from(splitDescription.chars, {
          yPercent: "random(-100, 100)",
          rotation: "random(-30, 30)",
          ease: "back.out(2)",
          autoAlpha: 0,
          delay: 0.6,
          stagger: {
            amount: 0.7,
            from: "random",
          },
        });
      }

      // Cleanup: revert all split text instances when media query no longer matches
      return () => {
        if (typewriterTl) {
          typewriterTl.kill();
          typewriterTl = null;
        }
        if (useTypewriter) typed.textContent = firstWord;
        splitInstances.forEach((split) => {
          if (split && split.revert) {
            split.revert();
          }
        });
        splitInstances = [];
      };
    }
  );

  // Return cleanup function to revert matchMedia on component unmount
  return () => {
    mm.revert();
  };
};