import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="text-center text-sm text-slate-500">
      Built for the FE Hiring Case Study —{" "}
      <Link
        href="https://github.com/yanief/nextjs-todo-app-zest"
        className="underline hover:text-slate-700"
      >
        GitHub Repository
      </Link>
    </footer>
  );
}
