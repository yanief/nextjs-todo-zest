"use client";

import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  label: string;
}

export function PrimaryButton({ href, label }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400"
    >
      {label}
    </Link>
  );
}
