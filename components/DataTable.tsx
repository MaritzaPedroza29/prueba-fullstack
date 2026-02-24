/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DataTable.tsx
import React from "react"

export type Column<T> = {
  header: string
  accessor: keyof T | string
  cell?: (row: T) => React.ReactNode
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
}


export function DataTable<T extends object>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full border-collapse font-poppins">
        <thead>
          <tr className="bg-blue-600 text-white">
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-6 py-4 text-left text-base font-semibold uppercase tracking-wide"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(data) &&
            data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.accessor)}
                    className="px-6 py-4 text-base text-gray-800"
                  >
                    {col.cell ? col.cell(row) : (row as any)[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
