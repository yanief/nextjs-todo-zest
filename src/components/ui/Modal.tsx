"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { useUIStore } from "@/stores/ui.store";
import { Button } from "./Button";

export function ModalHost() {
  const modal = useUIStore((s) => s.modal);
  const closeModal = useUIStore((s) => s.closeModal);
  const { t } = useI18n();

  if (!modal || !modal.isOpen) return null;

  const {
    title,
    description,
    confirmLabel = t("common.buttons.confirm"),
    cancelLabel = t("common.buttons.cancel"),
    onConfirm,
  } = modal;

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-slate-900">
        <h2
          id="modal-title"
          className="text-lg font-semibold text-zinc-900 dark:text-white"
        >
          {title}
        </h2>
        {description ? (
          <p
            id="modal-description"
            className="mt-2 text-sm text-zinc-600 dark:text-slate-300"
          >
            {description}
          </p>
        ) : null}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={closeModal}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
