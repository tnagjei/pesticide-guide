import type { Metadata } from "next";
import Link from "next/link";
import { getSnapshot } from "@/lib/data";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Pesticide Guide compares pesticide monitoring data, Food Compass 2.0 scores and evidence quality.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  const { meta } = getSnapshot();

  return (
    <main className="content-page prose-page">
      <header>
        <p className="eyebrow">Methods · version {meta.generatedAt}</p>
        <h1>How the guide turns monitoring records into a map</h1>
        <p>
          Pesticide Guide keeps pesticide load, nutrition and evidence quality
          separate. The map makes comparisons easier; it does not estimate an
          individual person&apos;s health risk.
        </p>
      </header>

      <section>
        <span className="step-number">01</span>
        <h2>Start with public monitoring records</h2>
        <p>
          The seed snapshot combines official records from the United States,
          United Kingdom, selected European markets, Canada and Taiwan. Records
          are grouped by familiar food and market before they reach the website.
        </p>
      </section>

      <section>
        <span className="step-number">02</span>
        <h2>Keep the load score relative</h2>
        <p>
          The pesticide load score runs from 0 to 100 inside this collection.
          Lower values indicate a lower modeled load relative to the other foods
          shown. It is not a probability of harm.
        </p>
        <div className="formula-card">
          <span>Display direction</span>
          <strong>Cleanliness = 100 − pesticide load</strong>
        </div>
      </section>

      <section>
        <span className="step-number">03</span>
        <h2>Show raw nutrition separately</h2>
        <p>
          The vertical axis uses the matched Food Compass 2.0 score for a plain
          food. We do not rename it a lifespan score or blend it into a medical
          recommendation.
        </p>
      </section>

      <section>
        <span className="step-number">04</span>
        <h2>Expose uncertainty</h2>
        <p>
          Evidence labels combine benchmark coverage and sample count. Limited
          evidence remains visible instead of being promoted to the same level
          of certainty as a large monitoring set.
        </p>
        <div className="threshold-table">
          <div>
            <strong>High</strong>
            <span>At least 80% benchmark coverage and 100 samples</span>
          </div>
          <div>
            <strong>Moderate</strong>
            <span>At least 60% coverage and 40 samples</span>
          </div>
          <div>
            <strong>Limited</strong>
            <span>Anything below those thresholds</span>
          </div>
        </div>
      </section>

      <aside className="callout">
        <strong>Important limitation</strong>
        <p>
          Monitoring programmes differ in sampling strategy, year, market and
          food coverage. Cross-market differences are descriptive, not proof
          that geography or production method caused the result.
        </p>
      </aside>

      <div className="page-actions">
        <Link className="button button-primary" href="/sources">
          Inspect every source
        </Link>
        <Link className="button button-secondary" href="/">
          Return to the map
        </Link>
      </div>
    </main>
  );
}
