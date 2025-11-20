"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Verify({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const router = useRouter();

  const { code } = use<{ code: string }>(params);

  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email");

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Seteamos el email del query
    setEmail(emailFromQuery);

    const verifyCode = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/recovery/verify-code/${code}?email=${emailFromQuery}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!res.ok) {
          setError("El código de recuperación es inválido o ya expiró.");
          setValid(false);
        } else {
          setValid(true);
        }
      } catch (err) {
        console.error(err);
        setError("Error conectando con el servidor.");
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    verifyCode();
  }, [code, emailFromQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3001/recovery/update-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, email }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        return alert(data.message || "No se pudo actualizar la contraseña.");
      }

      alert("Contraseña actualizada correctamente.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Error al conectar con el servidor.");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Verificando código...</p>
      </div>
    );
  }

  // Error
  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  // Código válido → formulario
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Actualizar contraseña</h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full border p-2 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
