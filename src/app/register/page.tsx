"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-8 flex flex-col gap-6">
            <h1 className="text-3xl font-semibold text-center">Crear cuenta</h1>
            <p className="text-gray-600 text-center -mt-3">
              Registrate para gestionar tus emails
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

              <input
                type="password"
                placeholder="Repetir contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg rounded-xl">
                Registrarme
              </Button>

              <a
                href="/login"
                className="text-sm text-center text-gray-600 hover:underline"
              >
                ¿Ya tenés cuenta? Iniciar sesión
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
