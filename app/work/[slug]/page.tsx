import Link from "next/link";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="work-page">
      <Link className="back-link" href="/">
        ← LOST DRAGON
      </Link>

      <section className="work-hero">
        <p className="kicker">PILOT WORK</p>
        <h1>{slug.replaceAll("-", " ")}</h1>
        <p>
          This is the reusable work page. The pilot artwork will later contain
          VIEW, ACCESS MY MIND, DECOMPOSE and RECOMPOSE.
        </p>
      </section>

      <section className="decompose-placeholder">
        <div>
          <p className="kicker">ACCESS MY MIND</p>
          <h2>One artwork. Many origins.</h2>
          <p>
            This is where the first real decomposed artwork experience will live:
            image fragments, symbols, references, sound, text and meaning in spatial depth.
          </p>
        </div>
        <button type="button" disabled>
          DECOMPOSE — COMING NEXT
        </button>
      </section>
    </main>
  );
}
