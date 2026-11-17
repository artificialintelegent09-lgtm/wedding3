import Link from "next/link";

export default function NotFound() {
  return (
    <main className="surface surface-oxblood relative grid min-h-screen place-items-center px-6 text-center text-paper">
      <div>
        <p className="font-display text-6xl italic text-rose">Oh dear</p>
        <h1 className="mt-4 text-xs font-normal uppercase tracking-[0.36em] text-gold-light">Invitation not found</h1>
        <p className="mx-auto mt-4 max-w-sm font-light text-paper/70">
          This link doesn&apos;t match an invitation. Please check the link you were sent.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center border border-paper/80 px-7 text-[0.72rem] uppercase tracking-[0.28em] text-paper transition-colors hover:bg-paper hover:text-primary"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
