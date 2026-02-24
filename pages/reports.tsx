import { useEffect, useState } from "react"
import CustomButton from "@/components/CustomButton"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Registrar los módulos necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Tipo de movimiento financiero
// - id: identificador único
// - concept: descripción del movimiento
// - amount: monto
// - type: INCOME o EXPENSE
// - date: fecha en formato string
type Movement = {
  id: string
  concept: string
  amount: number
  type: "INCOME" | "EXPENSE"
  date: string
}

export default function ReportsPage() {
  // Estado para lista de movimientos
  const [movements, setMovements] = useState<Movement[]>([])
  // Estado para saldo actual
  const [saldo, setSaldo] = useState(0)

  // Cargar datos de reportes al montar el componente
  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => {
        // Validar movimientos
        if (data && Array.isArray(data.movimientos)) {
          setMovements(data.movimientos)
        } else {
          setMovements([])
        }

        // Validar saldo
        if (typeof data.saldo === "number") {
          setSaldo(data.saldo)
        } else {
          console.warn("Saldo inválido en respuesta:", data.saldo)
        }
      })
      .catch(err => console.error("Error en fetch:", err))
  }, [])

  // Datos para el gráfico de líneas
  const chartData = {
    labels: movements.map(m => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: "Movimientos",
        // Ingresos positivos, egresos negativos
        data: movements.map(m => m.type === "INCOME" ? m.amount : -m.amount),
        borderColor: "blue",
        fill: false,
      },
    ],
  }

  // Función para descargar reporte en CSV
  const downloadCSV = async () => {
    const res = await fetch("/api/reports", { method: "POST" })
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6">
      {/* Título de la página */}
      <h2 className="text-xl font-bold mb-4">Informes Financieros</h2>

      {/* Saldo actual */}
      <div className="mb-4">
        <p className="text-lg">
          Saldo actual: <strong>{saldo !== null ? `$${saldo}` : "Cargando..."}</strong>
        </p>
      </div>

      {/* Gráfico de movimientos */}
      <div className="mb-6">
        <Line key={movements.length} data={chartData} />
      </div>

      {/* Botón para descargar CSV */}
      <CustomButton text="Descargar CSV" onClick={downloadCSV} />
    </div>
  )
}