"use client";

import { useEffect } from "react";
import { useUIStore } from "@/stores/ui.store";

export function ToastHost() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  useEffect(() => {
    const timeouts = toasts.map((toast) =>
      setTimeout(() => {
        removeToast(toast.id);
      }, 4000),
    );
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const base =
          "min-w-[220px] rounded-md px-3 py-2 text-sm shadow-md border flex items-center justify-between gap-2";
        const variantClass =
          toast.variant === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
            : toast.variant === "error"
              ? "bg-red-50 border-red-200 text-red-900"
              : "bg-zinc-50 border-zinc-200 text-zinc-900";

        return (
          <div key={toast.id} className={`${base} ${variantClass}`}>
            <span>{toast.message}</span>
            <button
              className="text-xs text-zinc-500 hover:text-zinc-700"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
