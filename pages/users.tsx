import { DataTable, Column } from "@/components/DataTable"
import { useEffect, useState } from "react"
import CustomButton from "@/components/CustomButton"
import CustomModal from "@/components/CustomModal"
import { Role } from "@prisma/client"
import Swal from "sweetalert2"
import { PencilIcon } from "@heroicons/react/24/outline" // Icono de edición

// Tipo de usuario según la base de datos (Prisma)
type User = {
  id: string
  name: string
  email: string
  phone: string
  role: Role
}

export default function UsersPage() {
  // Estado para lista de usuarios
  const [users, setUsers] = useState<User[]>([])
  // Estado para mostrar/ocultar modal
  const [showModal, setShowModal] = useState(false)
  // Usuario seleccionado para edición
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  // Campos controlados para edición
  const [nombre, setNombre] = useState("")
  const [rol, setRol] = useState<Role>("USER")

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])

  // Manejar clic en botón de edición
  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setNombre(user.name)
    setRol(user.role)
    setShowModal(true)
  }

  // Definición de columnas para la tabla
  const userColumns: Column<User>[] = [
    { header: "Nombre", accessor: "name" },
    { header: "Correo", accessor: "email" },
    { header: "Teléfono", accessor: "phone" },
    { header: "Rol", accessor: "role" },
    {
      header: "Acciones",
      accessor: "id",
      cell: (row: User) => (
        // Botón de edición con icono
        <button
          onClick={() => handleEdit(row)}
          className="p-2 rounded hover:bg-gray-100"
          title="Editar usuario"
        >
          <PencilIcon className="h-5 w-5 text-blue-600" />
        </button>
      ),
    },
  ]

  return (
    <div className="p-6">
      {/* Título de la página */}
      <h2 className="text-xl font-bold mb-4">Gestión de Usuarios</h2>

      {/* Tabla de usuarios */}
      <DataTable columns={userColumns} data={users} />

      {/* Modal de edición */}
      <CustomModal
        title="Editar Usuario"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        {selectedUser && (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              // Llamada PUT para actualizar usuario
              const res = await fetch(`/api/users/${selectedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: nombre,
                  role: rol,
                }),
              })

              // Manejo de respuesta
              if (res.ok) {
                const updated = await res.json()
                // Actualizar lista de usuarios en estado
                setUsers(users.map((u) => (u.id === updated.id ? updated : u)))
                setShowModal(false)
                Swal.fire({
                  icon: "success",
                  title: "Usuario actualizado",
                  text: "Cambios guardados",
                })
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo actualizar",
                })
              }
            }}
            className="space-y-4"
          >
            {/* Campo nombre */}
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full"
              required
            />

            {/* Campo rol */}
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value as Role)}
              className="border p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuario</option>
            </select>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-2">
              <CustomButton
                text="Cancelar"
                onClick={() => setShowModal(false)}
                variant="secondary"
              />
              <CustomButton text="Guardar" variant="primary" />
            </div>
          </form>
        )}
      </CustomModal>
    </div>
  )
}