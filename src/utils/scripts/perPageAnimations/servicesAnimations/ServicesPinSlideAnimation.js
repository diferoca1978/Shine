import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const pinSlideInAnimation = () => {
    const mm = gsap.matchMedia();

    mm.add(
        {
            reducedMotion: "(prefers-reduced-motion: reduce)",
            fullMotion: "(prefers-reduced-motion: no-preference)",
            isDesktop: "(min-width: 1024px)",
        },
        (context) => {
            const { reducedMotion, isDesktop } = context.conditions;

            if (reducedMotion) {
                const description = document.querySelector(".description");
                if (description) gsap.set(description, { autoAlpha: 1, clearProps: "all" });

                const mobileSteps = gsap.utils.toArray(".mobile-step");
                mobileSteps.forEach((step) => gsap.set(step, { autoAlpha: 1, clearProps: "all" }));

                if (isDesktop) {
                    const panels = gsap.utils.toArray(".panel");
                    gsap.set(panels, { autoAlpha: 1, yPercent: 0, clearProps: "all" });
                    panels.forEach((panel) => {
                        gsap.set(panel.querySelectorAll(".panel-title, .panel-label, .panel-sub"), {
                            autoAlpha: 1,
                            clearProps: "all",
                        });
                    });
                }

                return;
            }

            // Mobile/tablet: simple fade-in per step on scroll
            if (!isDesktop) {
                const mobileSteps = gsap.utils.toArray(".mobile-step");
                mobileSteps.forEach((step) => {
                    gsap.from(step, {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: step,
                            start: "top 85%",
                            once: true,
                        },
                    });
                });
                return;
            }

            // Desktop: pinned slide-in animation
            const panels = gsap.utils.toArray(".panel");

            const splits = panels.map((panel) =>
                SplitText.create(panel.querySelectorAll(".panel-title, .panel-label"), {
                    type: "words, chars",
                    mask: "chars",
                })
            );

            const tl = gsap.timeline({
                defaults: { ease: "none", duration: 2 },
                scrollTrigger: {
                    trigger: "#panel-container",
                    start: "top 88px",
                    end: "+=4000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            tl.from(splits[0].chars, {
                opacity: 0,
                yPercent: 100,
                stagger: 0.02,
                duration: 0.5,
                ease: "power2.out",
            });

            tl.from(".orange", { yPercent: 100, duration: 2 })
                .from(
                    splits[1].chars,
                    { opacity: 0, yPercent: 100, stagger: 0.02, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );

            tl.from(".purple", { yPercent: 100, duration: 2 })
                .from(
                    splits[2].chars,
                    { opacity: 0, yPercent: 100, stagger: 0.02, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );

            tl.from(".blue", { yPercent: 100, duration: 2 })
                .from(
                    splits[3].chars,
                    { opacity: 0, yPercent: 100, stagger: 0.02, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );
        }
    );

    return () => mm.revert();
};