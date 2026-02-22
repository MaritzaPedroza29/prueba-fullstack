import React, { FC, memo } from "react"
import { CFooter } from "@coreui/react"

const AppFooter: FC = () => {
  const year = new Date().getFullYear()

  return (
    <CFooter className="bg-light d-flex justify-content-between align-items-center px-4 py-3">
      <small className="text-muted">
        © {year} Mi Aplicación. Todos los derechos reservados.
      </small>

      <small className="text-muted">
        Desarrollado por <strong>Maritza Pedroza</strong>
      </small>
    </CFooter>
  )
}

export default memo(AppFooter)