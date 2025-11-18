"use client";

import type { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  items?: string[];
  children?: ReactNode;
}

export function InfoCard({ title, items, children }: InfoCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      {items ? (
        <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-200">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {children ? (
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-200">
          {children}
        </div>
      ) : null}
    </section>
  );
}
