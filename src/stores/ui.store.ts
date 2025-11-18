"use client";

import { create } from "zustand";

type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ModalState {
  title: string;
  description?: string;
  isOpen: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

interface UIState {
  toasts: Toast[];
  modal: ModalState | null;
  addToast: (message: string, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
  openModal: (modal: Omit<ModalState, "isOpen">) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],
  modal: null,
  addToast: (message, variant = "info") =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), message, variant }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  openModal: (modal) =>
    set({
      modal: { ...modal, isOpen: true },
    }),
  closeModal: () =>
    set({
      modal: null,
    }),
}));
