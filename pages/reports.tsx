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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Movement = {
  id: string
  concept: string
  amount: number
  type: "INCOME" | "EXPENSE"
  date: string
}

export default function ReportsPage() {
  const [movements, setMovements] = useState<Movement[]>([])
  const [saldo, setSaldo] = useState(0)

    useEffect(() => {
  fetch("/api/reports")
    .then((res) => res.json())
    .then((data) => {
      console.log("data del report", data)
      if (data && Array.isArray(data.movimientos)) {
        setMovements(data.movimientos)
      } else {
        setMovements([])
      }

      if (typeof data.saldo === "number") {
        setSaldo(data.saldo)
      } else {
        // no pisar el saldo con 0 si no viene
        console.warn("Saldo inválido en respuesta:", data.saldo)
      }
    })
    .catch(err => console.error("Error en fetch:", err))
}, [])

  const chartData = {
    labels: movements.map(m => new Date(m.date).toLocaleDateString()),
    datasets: [
      {
        label: "Movimientos",
        data: movements.map(m => m.type === "INCOME" ? m.amount : -m.amount),
        borderColor: "blue",
        fill: false,
      },
    ],
  }

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
      <h2 className="text-xl font-bold mb-4">Informes Financieros</h2>

      <div className="mb-4">
        <p className="text-lg">
            Saldo actual: <strong>{saldo !== null ? `$${saldo}` : "Cargando..."}</strong>
        </p>
      </div>

      <div className="mb-6">
        <Line key={movements.length} data={chartData} />
      </div>

      <CustomButton text="Descargar CSV" onClick={downloadCSV} />
    </div>
  )
}