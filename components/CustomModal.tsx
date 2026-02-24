// components/CustomModal.tsx
import React from "react"

type CustomModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function CustomModal({ title, isOpen, children }: CustomModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
        <div className="flex justify-end mt-4">
        </div>
      </div>
    </div>
  )
}