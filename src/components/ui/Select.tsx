"use client";

import type { SelectHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors cursor-pointer",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:ring-blue-900",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
