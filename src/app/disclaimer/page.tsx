import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data and Health Disclaimer",
  description: "Important limitations for using Pesticide Guide.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="content-page prose-page">
      <header>
        <p className="eyebrow">Use with context</p>
        <h1>Data and health disclaimer</h1>
      </header>
      <section>
        <h2>Not medical advice</h2>
        <p>
          Pesticide Guide provides educational comparisons. It does not diagnose
          disease, predict lifespan or recommend treatment.
        </p>
      </section>
      <section>
        <h2>Monitoring is not your individual exposure</h2>
        <p>
          Published samples represent particular foods, markets and years. They
          cannot establish what is present in a specific item you purchase.
        </p>
      </section>
      <section>
        <h2>Sources can change</h2>
        <p>
          Agencies revise files and definitions. Check the linked source before
          relying on a number for professional, regulatory or purchasing work.
        </p>
      </section>
    </main>
  );
}
