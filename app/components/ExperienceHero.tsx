"use client";

import { useEffect, useRef, useState } from "react";

const words = ["LIGHT", "COLOR", "SOUND", "FEELING", "MEMORY", "FORM"];

export default function ExperienceHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(el.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = soundOn ? Math.min(0.42, 0.12 + progress * 0.3) : 0;
    if (soundOn) {
      audio.play().catch(() => setSoundOn(false));
    } else {
      audio.pause();
    }
  }, [soundOn, progress]);

  const activeWord = Math.min(words.length - 1, Math.floor(Math.max(0, progress - 0.12) / 0.09));
  const showWords = progress > 0.10 && progress < 0.68;
  const showManifesto = progress >= 0.60 && progress < 0.84;
  const showNav = progress >= 0.78;

  return (
    <section className="experience" ref={sectionRef}>
      <div className="experience-sticky">
        <div
          className="video-shell"
          style={{
            opacity: Math.min(1, Math.max(0, (progress - 0.025) * 4.8)),
            transform: `scale(${1.12 - progress * 0.08})`,
            filter: `saturate(${0.75 + progress * 0.55}) brightness(${0.45 + progress * 0.55}) blur(${Math.max(0, 7 - progress * 14)}px)`,
          }}
        >
          <iframe
            title="Lost Dragon visual field"
            src="https://player.vimeo.com/video/1029407814?h=48c2a47f28&background=1&autoplay=1&muted=1&loop=1&byline=0&title=0"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="black-veil" style={{ opacity: Math.max(0, 1 - progress * 3.2) }} />
        <div className="cursor-field" aria-hidden="true" />

        <header className="brand-line">
          <span>LOST DRAGON</span>
          <button
            className="sound-toggle"
            type="button"
            aria-pressed={soundOn}
            onClick={() => setSoundOn((v) => !v)}
          >
            {soundOn ? "SOUND ON" : "SOUND OFF"}
          </button>
        </header>

        <div className="intro-copy" style={{ opacity: Math.max(0, 1 - progress * 7) }}>
          <p>SCROLL TO ENTER</p>
        </div>

        {showWords && (
          <div className="word-field" aria-live="polite">
            {words.map((word, index) => {
              const distance = Math.abs(index - activeWord);
              return (
                <span
                  key={word}
                  className={distance === 0 ? "crystal-word active" : "crystal-word"}
                  style={{
                    opacity: distance === 0 ? 1 : Math.max(0, 0.18 - distance * 0.06),
                    filter: `blur(${distance === 0 ? 0 : 12 + distance * 5}px)`,
                    transform: `translateY(${(index - activeWord) * 24}px) scale(${distance === 0 ? 1 : 0.96})`,
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
            <h1>
              In a world slowly fading into shades of grey,
              <br />
              light, color, sound and feeling become more than decoration.
            </h1>
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

        <audio ref={audioRef} loop preload="none">
          <source src="/audio/event-horizon-pulse.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </section>
  );
}
