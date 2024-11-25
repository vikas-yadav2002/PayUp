"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  onClick: () => void;
  className?: string; // Optional className prop
  disabled?: boolean; // Add the disabled prop
}

export const Button = ({
  onClick,
  children,
  className = "",
  disabled = false, // Default disabled to false
}: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined} // Prevent click events when disabled
      type="button"
      disabled={disabled} // Pass disabled to the button
      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed" // Disabled styles
          : "bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
      } ${className}`} // Merge additional classNames
    >
      {children}
    </button>
  );
};
