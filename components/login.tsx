"use client";

import { authClient } from "@/lib/auth-client";

export default function Login() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <div>Cargando...</div>;

  return (
    <div>
      {!session ? (
        <button
          onClick={() =>
            authClient.signIn.social({
              provider: "github",
            })
          }
        >
          Login con GitHub
        </button>
      ) : (
        <button onClick={() => authClient.signOut()}>
          Logout
        </button>
      )}
    </div>
  );
}