"use client";

import { useId } from "react";
import { metals, type Metal } from "@/data/products";

export function MetalSelector({ value, onChange, label = "Choose metal" }: { value: Metal; onChange: (metal: Metal) => void; label?: string }) {
  const id = useId();
  return (
    <fieldset className="metal-selector">
      <legend className="sr-only">{label}</legend>
      {metals.map((metal) => (
        <label className={`metal-choice metal-choice--${metal.id}`} key={metal.id}>
          <input type="radio" name={id} value={metal.id} checked={value === metal.id} onChange={() => onChange(metal.id)} />
          <span className="metal-choice__swatch" />
          <span>{metal.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
