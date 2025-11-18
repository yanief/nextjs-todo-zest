"use client";

interface PageHeaderProps {
  tagline: string;
  title: string;
}

export function PageHeader({ tagline, title }: PageHeaderProps) {
  return (
    <header className="space-y-3 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-blue-600">
        {tagline}
      </p>
      <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h1>
    </header>
  );
}
