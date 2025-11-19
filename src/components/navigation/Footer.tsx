"use client";

import Link from "next/link";

interface FooterProps {
  text: string;
  repoLabel: string;
}

export function Footer({ text, repoLabel }: FooterProps) {
  return (
    <footer className="text-center text-sm text-slate-500 dark:text-slate-400">
      {text}{" "}
      <Link
        href="https://github.com/yanief/nextjs-todo-zest"
        className="underline hover:text-slate-700 dark:hover:text-slate-200"
      >
        {repoLabel}
      </Link>
    </footer>
  );
}
