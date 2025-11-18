"use client";

export function Spinner() {
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Loading">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
    </div>
  );
}


