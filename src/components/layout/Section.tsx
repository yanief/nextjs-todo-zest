"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <section className={clsx(
      "rounded-lg bg-white p-4 shadow-sm",
      className,
    )}>
      {title ? (
        <header className="mb-3">
          <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
          ) : null}
        </header>
      ) : null}
      <div>{children}</div>
    </section>
  );
}


