"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";

export default function GitHubLogin() {
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p className="text-blue-600 animate-pulse">Cargando sesión...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p className="text-red-500">Error: {String(error)}</p>
      </div>
    );
  }

  // Si no hay sesión, mostrar login
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Github size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Inicia sesión en <span className="text-blue-600">FinTrack</span>
          </h2>
        </div>
        <button
          onClick={() => authClient.signIn.social({ provider: "github" })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Github size={20} />
          <span>Entrar con GitHub</span>
        </button>
      </div>
    </div>
  );
}