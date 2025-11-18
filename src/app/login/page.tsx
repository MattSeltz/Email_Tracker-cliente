"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickLogin = async () => {
    if (!email || !password) return;

    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-8 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-center">
              Iniciar sesión
            </h1>
            <p className="text-gray-600 text-center -mt-3">
              Accedé a tu panel de emails
            </p>

            <div className="flex flex-col gap-4 mt-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg rounded-xl"
                onClick={handleClickLogin}
              >
                Ingresar
              </Button>

              <Link
                href="/recover"
                className="text-sm text-center text-blue-600 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>

              <Link
                href="/register"
                className="text-sm text-center text-gray-600 hover:underline"
              >
                ¿No tenés cuenta? Crear una
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
