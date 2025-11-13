"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CheckCircle, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmailDashboard() {
  const [emails] = useState([
    {
      id: 1,
      email: "ejemplo@gmail.com",
      rubro: "Inmobiliaria",
      fecha: "12/11/2025",
      enviado: true,
    },
    {
      id: 2,
      email: "cliente@empresa.com",
      rubro: "Gastronomía",
      fecha: "10/11/2025",
      enviado: false,
    },
    {
      id: 3,
      email: "contacto@modashop.com",
      rubro: "Moda",
      fecha: "09/11/2025",
      enviado: true,
    },
    {
      id: 4,
      email: "ventas@techpro.com",
      rubro: "Tecnología",
      fecha: "08/11/2025",
      enviado: false,
    },
    {
      id: 5,
      email: "info@turismoworld.com",
      rubro: "Turismo",
      fecha: "07/11/2025",
      enviado: true,
    },
    {
      id: 6,
      email: "reservas@restogourmet.com",
      rubro: "Gastronomía",
      fecha: "06/11/2025",
      enviado: false,
    },
    {
      id: 7,
      email: "clientes@finanzasmax.com",
      rubro: "Finanzas",
      fecha: "05/11/2025",
      enviado: true,
    },
    {
      id: 8,
      email: "hola@beautyspa.com",
      rubro: "Estética",
      fecha: "04/11/2025",
      enviado: false,
    },
    {
      id: 9,
      email: "equipo@marketingplus.com",
      rubro: "Marketing",
      fecha: "03/11/2025",
      enviado: true,
    },
    {
      id: 10,
      email: "soporte@segurmax.com",
      rubro: "Seguridad",
      fecha: "02/11/2025",
      enviado: false,
    },
    {
      id: 11,
      email: "turnos@clinicasalud.com",
      rubro: "Salud",
      fecha: "01/11/2025",
      enviado: true,
    },
    {
      id: 12,
      email: "pedidos@minimarket.com",
      rubro: "Alimentos",
      fecha: "31/10/2025",
      enviado: false,
    },
    {
      id: 13,
      email: "servicios@autosvip.com",
      rubro: "Automotriz",
      fecha: "30/10/2025",
      enviado: true,
    },
    {
      id: 14,
      email: "contacto@eventoselite.com",
      rubro: "Eventos",
      fecha: "29/10/2025",
      enviado: false,
    },
    {
      id: 15,
      email: "clientes@realstateglobal.com",
      rubro: "Inmobiliaria",
      fecha: "28/10/2025",
      enviado: true,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-semibold">Bienvenido, Matías 👋</h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setOpenModal(true)}
            className="flex gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" /> Añadir Email
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border border-gray-300 hover:bg-gray-200"
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <Card className="shadow-lg">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Email</th>
                <th className="p-3">Rubro</th>
                <th className="p-3">Fecha</th>
                <th className="p-3 text-center">Enviado</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.rubro}</td>
                  <td className="p-3">{item.fecha}</td>
                  <td className="p-3 text-center">
                    {item.enviado ? (
                      <CheckCircle className="text-green-600 w-5 h-5 mx-auto" />
                    ) : (
                      <Circle className="text-gray-400 w-5 h-5 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal UI */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in">
            <h2 className="text-xl font-semibold mb-4">Añadir Email</h2>

            <div className="flex flex-col gap-4">
              <textarea
                placeholder="Ingresá emails separados por coma, espacio o enter..."
                className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Rubro"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex justify-end gap-3 mt-2">
                <Button variant="outline" onClick={() => setOpenModal(false)}>
                  Cancelar
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
