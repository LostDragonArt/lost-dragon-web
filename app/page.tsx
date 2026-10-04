const worlds = [
  { id: "art", label: "ART", note: "Paintings, collage, fine art" },
  { id: "digital", label: "DIGITAL", note: "Illustration, experiments, Lost Dragon Crew" },
  { id: "fashion", label: "FASHION", note: "Wearable art and design" },
  { id: "furniture", label: "FURNITURE", note: "Objects for space and living" },
  { id: "sound", label: "SOUND", note: "Camp Dragon Records, songs and lyrics" },
  { id: "objects", label: "OBJECTS", note: "Sculpture, editions and concepts" },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="hero-copy">
          <p className="kicker">LOST DRAGON</p>
          <h1 id="hero-title">ENTER MY MIND</h1>
          <p className="hero-text">
            One creative universe. Many forms. Follow the Dragon through art,
            digital worlds, fashion, furniture, sound and objects.
          </p>
          <a className="enter-link" href="#worlds">
            ENTER
          </a>
        </div>
        <div className="dragon-placeholder" aria-hidden="true">
          <div className="dragon-eye" />
          <span>DRAGON PRESENCE / V1</span>
        </div>
      </section>

      <section className="worlds" id="worlds" aria-labelledby="worlds-title">
        <div className="section-head">
          <p className="kicker">THE INNER WORLD</p>
          <h2 id="worlds-title">Choose a path.</h2>
        </div>

        <div className="world-grid">
          {worlds.map((world, index) => (
            <a
              className="world-card"
              href={world.id === "art" ? "/work/pilot-artwork" : "#" + world.id}
              id={world.id}
              key={world.id}
            >
              <span className="world-index">{String(index + 1).padStart(2, "0")}</span>
              <strong>{world.label}</strong>
              <span>{world.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <p className="kicker">LOST DRAGON</p>
        <p>
          The website is not a catalogue. It is the first layer of the work.
          The deeper layers open when you choose to enter.
        </p>
      </section>
    </main>
  );
}
