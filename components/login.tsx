"use client";

import { authClient } from "@/lib/auth-client";

export default function Login() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Bienvenido</h1>

        {!session ? (
          <>
            <p className="mb-4 text-gray-600">
              Inicia sesión para continuar
            </p>

            <button
              onClick={() =>
                authClient.signIn.social({
                  provider: "github",
                })
              }
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Login con GitHub
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              Hola{" "}
              <span className="font-semibold">
                {session.user.email}
              </span>
            </p>

            <button
              onClick={() => authClient.signOut()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}"use client";

import { authClient } from "@/lib/auth-client";

export default function Login() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Bienvenido</h1>

        {!session ? (
          <>
            <p className="mb-4 text-gray-600">
              Inicia sesión para continuar
            </p>

            <button
              onClick={() =>
                authClient.signIn.social({
                  provider: "github",
                })
              }
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Login con GitHub
            </button>
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-600">
              Hola{" "}
              <span className="font-semibold">
                {session.user.email}
              </span>
            </p>

            <button
              onClick={() => authClient.signOut()}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}