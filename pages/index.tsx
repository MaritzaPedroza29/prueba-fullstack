
// Página de login principal.
// Se encarga de centrar el componente de autenticación en pantalla.
// En este caso, el login se realiza mediante GitHub.

import GitHubLogin from "../components/GitHubLogin"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <GitHubLogin />
    </div>
  )
}