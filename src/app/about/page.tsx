import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Pesticide Guide makes public produce monitoring data easier to inspect.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="content-page prose-page">
      <header>
        <p className="eyebrow">About the project</p>
        <h1>A clearer way to inspect produce monitoring data</h1>
        <p>
          Pesticide Guide turns dense public records into food profiles,
          cross-market comparisons and an interactive field map.
        </p>
      </header>
      <section>
        <h2>What this site is for</h2>
        <p>
          Most residue datasets are organised for analysts, not shoppers. This
          site keeps the underlying sources visible while making the comparison
          layer easier to browse.
        </p>
      </section>
      <section>
        <h2>What this site does not decide</h2>
        <p>
          A detection is not automatically a safety failure. A score cannot
          account for your diet, preparation method, health history or local
          product. Use the guide to ask better questions, not to replace
          professional advice.
        </p>
      </section>
    </main>
  );
}
