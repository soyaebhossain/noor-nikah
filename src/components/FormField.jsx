import React from "react";

export default function FormField({ label, children, className = "fgroup" }) {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}
