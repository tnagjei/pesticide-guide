import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-page not-found">
      <p className="eyebrow">404 · specimen not found</p>
      <h1>That food is not in this field guide.</h1>
      <Link className="button button-primary" href="/">
        Return to the food map
      </Link>
    </main>
  );
}
