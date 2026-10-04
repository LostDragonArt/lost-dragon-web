import ExperienceHero from "./components/ExperienceHero";

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
      <ExperienceHero />

      <section className="worlds" aria-labelledby="worlds-title">
        <div className="section-head">
          <p className="kicker">THE INNER WORLD</p>
          <h2 id="worlds-title">Many forms. One mind.</h2>
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
          Not a catalogue. A living map of what happens when image, object,
          sound, memory and instinct collide.
        </p>
      </section>
    </main>
  );
}
