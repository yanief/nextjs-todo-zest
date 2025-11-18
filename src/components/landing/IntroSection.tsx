"use client";

export function IntroSection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="space-y-4 text-center text-slate-600 dark:text-slate-200">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
