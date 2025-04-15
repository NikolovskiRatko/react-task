import React from "react";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Button({ label, onClick, style }: ButtonProps) {
  return (
    <button onClick={onClick} style={{ ...defaultStyle, ...style }}>
      {label}
    </button>
  );
}

const defaultStyle: React.CSSProperties = {
  padding: "0.5em 1em",
  backgroundColor: "#ddd",
  border: "none",
  cursor: "pointer"
};
