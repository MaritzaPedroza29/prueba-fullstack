// components/CustomButton.tsx
import React from "react"

type CustomButtonProps = {
  text: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger"
}

export default function CustomButton({ text, onClick, variant = "primary" }: CustomButtonProps) {
  const baseStyle = "px-4 py-2 rounded font-semibold"
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {text}
    </button>
  )
}