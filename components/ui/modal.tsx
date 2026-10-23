"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function Modal({ label, className = "", onClose, children }: { label: string; className?: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return (
    <dialog ref={ref} className={`site-dialog ${className}`} aria-label={label} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} data-lenis-prevent>
      {children}
    </dialog>
  );
}
