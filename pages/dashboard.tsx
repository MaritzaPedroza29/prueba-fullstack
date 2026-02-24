import { useState, useEffect } from "react"
import { DataTable, Column } from "@/components/DataTable"
import { MovementType } from "@prisma/client"
import { authClient } from "@/lib/auth-client"
import CustomButton from "@/components/CustomButton"
import CustomModal from "@/components/CustomModal"
import Swal from "sweetalert2"
import { isAdmin } from "@/utils/authHelpers"

// Tipo de movimiento financiero
// - id: identificador único
// - concept: descripción del movimiento
// - amount: monto
// - type: tipo de movimiento (INCOME o EXPENSE)
// - date: fecha del movimiento
// - user: usuario que lo registró
type Movement = {
  id: string
  concept: string
  amount: number
  type: MovementType
  date: string
  user: string
}

// Definición de columnas para la tabla de movimientos
const movementColumns: Column<Movement>[] = [
  { header: "Concepto", accessor: "concept" },
  { header: "Monto", accessor: "amount" },
  { header: "Tipo", accessor: "type" },
  { header: "Fecha", accessor: "date" },
  { header: "Usuario", accessor: "user" },
]

export default function HomePage() {
  const { data: session } = authClient.useSession() // Obtener sesión actual
  const [movements, setMovements] = useState<Movement[]>([]) // Lista de movimientos
  const [showModal, setShowModal] = useState(false) // Estado para mostrar/ocultar modal

  // Campos controlados del formulario
  const [concepto, setConcepto] = useState("")
  const [monto, setMonto] = useState("")
  const [fecha, setFecha] = useState("")
  const [type, setType] = useState<MovementType>(MovementType.INCOME)

  // Cargar movimientos al montar el componente
  useEffect(() => {
    fetch("/api/movements")
      .then((res) => res.json())
      .then((data) => setMovements(data))
  }, [])

  // Manejar envío del formulario para crear movimiento
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/movements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        concept: concepto,
        amount: parseFloat(monto),
        type,
        date: fecha,
      }),
    })

    if (res.ok) {
      // Recargar lista de movimientos después de crear uno nuevo
      await fetch("/api/movements")
        .then((res) => res.json())
        .then((data) => setMovements(data))

      setShowModal(false)

      Swal.fire({ icon: "success", title: "Movimiento creado", text: "Guardado con éxito" })
    } else {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el movimiento" })
    }
  }

  return (
    <div className="p-6">
      {/* Título de la página */}
      <h2 className="text-xl font-bold mb-4">Ingresos y Egresos</h2>

      {/* Botón para crear movimiento, visible solo para ADMIN */}
      {isAdmin(session) && (
        <div className="mb-4 flex justify-end">
          <CustomButton text="Nuevo Movimiento" onClick={() => setShowModal(true)} />
        </div>
      )}

      {/* Tabla de movimientos */}
      <DataTable columns={movementColumns} data={movements} />

      {/* Modal para crear nuevo movimiento */}
      <CustomModal title="Crear Movimiento" isOpen={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo concepto */}
          <input
            type="text"
            placeholder="Concepto"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            className="border p-2 w-full"
            required
          />

          {/* Campo monto */}
          <input
            type="number"
            placeholder="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            className="border p-2 w-full"
            required
          />

          {/* Campo tipo (Ingreso/Egreso) */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MovementType)}
            className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={MovementType.INCOME}>💰 Ingreso</option>
            <option value={MovementType.EXPENSE}>📉 Egreso</option>
          </select>

          {/* Campo fecha */}
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="border p-2 w-full"
            required
          />

          {/* Botones de acción */}
          <div className="flex justify-end space-x-2">
            <CustomButton text="Cancelar" onClick={() => setShowModal(false)} variant="secondary" />
            <CustomButton text="Guardar" variant="primary" />
          </div>
        </form>
      </CustomModal>
    </div>
  )
}