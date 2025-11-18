"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  children,
  className,
}: SectionProps) {
  return (
    <section
      className={clsx(
        "rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900",
        className,
      )}
    >
      {title ? (
        <header className="mb-3">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-xs text-zinc-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      <div>{children}</div>
    </section>
  );
}
