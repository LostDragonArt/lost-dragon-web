"use client";

import { useEffect, useRef, useState } from "react";

const words = ["LIGHT", "COLOR", "SOUND", "FEELING", "MEMORY", "FORM"];

export default function ExperienceHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoActive = progress > 0.012;

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
      const y = Math.min(100, Math.max(0, (event.clientY / window.innerHeight) * 100));
      el.style.setProperty("--mx", x + "%");
      el.style.setProperty("--my", y + "%");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(nextProgress);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const wordProgress = Math.max(0, progress - 0.13);
  const activeWord = Math.min(words.length - 1, Math.floor(wordProgress / 0.067));
  const showWords = progress >= 0.13 && progress < 0.55;
  const showManifesto = progress >= 0.50 && progress < 0.80;
  const showNav = progress >= 0.72;

  return (
    <section className="experience" ref={sectionRef}>
      <div className="experience-sticky">
        <div className="ambient-backdrop" aria-hidden="true" />

        <div
          className={videoLoaded ? "video-shell loaded" : "video-shell"}
          style={{
            opacity: videoActive ? Math.min(1, Math.max(0, (progress - 0.012) * 6.5)) : 0,
            transform: `scale(${1.10 - progress * 0.07})`,
            filter: `saturate(${0.72 + progress * 0.55}) brightness(${0.48 + progress * 0.42}) blur(${Math.max(0, 6 - progress * 13)}px)`,
          }}
        >
          {videoActive && (
            <iframe
              title="Lost Dragon visual field"
              src="https://player.vimeo.com/video/1029407814?h=48c2a47f28&background=1&autoplay=1&muted=1&loop=1&controls=0&playsinline=1&title=0&byline=0&portrait=0&dnt=1"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setVideoLoaded(true)}
            />
          )}
        </div>

        <div
          className="black-veil"
          style={{ opacity: Math.max(0, 1 - progress * 6.5) }}
          aria-hidden="true"
        />
        <div
          className="cursor-field"
          style={{ opacity: progress < 0.08 ? 0 : Math.min(0.58, (progress - 0.08) * 3.5) }}
          aria-hidden="true"
        />

        {showWords && (
          <div className="word-field" aria-live="polite">
            {words.map((word, index) => {
              const distance = Math.abs(index - activeWord);
              return (
                <span
                  key={word}
                  className={distance === 0 ? "crystal-word active" : "crystal-word"}
                  style={{
                    opacity: distance === 0 ? 1 : Math.max(0, 0.13 - distance * 0.04),
                    filter: `blur(${distance === 0 ? 0 : 10 + distance * 4}px)`,
                    transform: `translateY(${(index - activeWord) * 26}px) scale(${distance === 0 ? 1 : 0.96})`,
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
        )}

        {showManifesto && (
          <div className="manifesto-layer">
            <p className="manifesto-kicker">THE POWER OF ART</p>
            <h2>
              In a world slowly fading into shades of grey,
              <br />
              light, color, sound and feeling become more than decoration.
            </h2>
            <p className="manifesto-tail">
              They become memory. They become language. They become art.
            </p>
          </div>
        )}

        {showNav && (
          <div className="world-nav-wrap">
            <p className="world-nav-title">CHOOSE A PATH</p>
            <nav className="world-nav" aria-label="Creative worlds">
              <a href="#art">ART</a>
              <a href="#digital">DIGITAL</a>
              <a href="#fashion">FASHION</a>
              <a href="#furniture">FURNITURE</a>
              <a href="#sound">SOUND</a>
              <a href="#objects">OBJECTS</a>
              <a className="mind-link" href="/work/pilot-artwork">
                ENTER MY MIND
              </a>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
