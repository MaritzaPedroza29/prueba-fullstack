// components/CustomButton.tsx
import React from "react"

// Props que recibe el botón:
// - text: texto que se mostrará dentro del botón
// - onClick: función opcional que se ejecuta al hacer clic
// - variant: estilo visual del botón (primary, secondary, danger)
type CustomButtonProps = {
  text: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger"
}

// Componente de botón reutilizable.
// Permite definir diferentes variantes de estilo y manejar eventos de clic.
export default function CustomButton({ text, onClick, variant = "primary" }: CustomButtonProps) {
  // Estilos base aplicados a todos los botones
  const baseStyle = "px-4 py-2 rounded font-semibold"

  // Estilos específicos según la variante
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",     // Botón principal (azul)
    secondary: "bg-gray-300 text-black hover:bg-gray-400",   // Botón secundario (gris)
    danger: "bg-red-600 text-white hover:bg-red-700",        // Botón de acción peligrosa (rojo)
  }

  return (
    // Renderiza un botón con los estilos combinados (base + variante)
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {text}
    </button>
  )
}