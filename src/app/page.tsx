"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CheckCircle, Circle, Trash } from "lucide-react";
import { motion } from "framer-motion";
import {
  deleteEmail,
  editIsSend,
  getEmails,
  logout,
  saveEmail,
} from "@/services/services";

interface Email {
  id: number;
  email: string;
  rubro: string;
  fecha: string;
  send: boolean;
}

// Hook personalizado para localStorage que funciona con SSR
function useLocalStorage(key: string, defaultValue: string) {
  const subscribe = () => () => {};
  const getSnapshot = () => {
    if (typeof window === "undefined") return defaultValue;
    return localStorage.getItem(key) || defaultValue;
  };
  const getServerSnapshot = () => defaultValue;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function EmailDashboard() {
  const router = useRouter();

  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedRubro, setSelectedRubro] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const userName = useLocalStorage("user", "Usuario");

  const [emailsToSave, setEmailsToSave] = useState("");
  const [rubro, setRubro] = useState("");

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getEmails()
      .then((data) => setEmails(data))
      .catch((e) => console.error(e));
  }, [toggle]);

  const reset = () => {
    setEmailsToSave("");
    setRubro("");
  };

  const handleClickCancel = () => {
    setOpenModal(false);
    reset();
  };

  const parseEmails = (arr: string) => {
    const emailsLimpios = arr
      .split(/[\n, ,]+/)
      .map((email) => email.trim())
      .filter((email) => email !== "");
    return emailsLimpios;
  };

  const handleClickSaveEmails = async () => {
    if (!emailsToSave || !rubro) return;
    const parsedEmailsToSave = parseEmails(emailsToSave);

    try {
      for (const email of parsedEmailsToSave) {
        await saveEmail(email, rubro);
      }

      setToggle((prev) => !prev);
      handleClickCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickEditIsSend = async (id: number, isSend: boolean) => {
    try {
      await editIsSend(id, isSend);

      setToggle((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickDelete = async (id: number) => {
    try {
      await deleteEmail(id);

      setToggle((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLogout = async () => {
    try {
      const isSuccess = await logout();

      if (isSuccess) {
        router.push("/login");
      } else {
        alert("Error inesperado, vuelve a intentarlo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueRubros = Array.from(new Set(emails.map((e) => e.rubro)));

  const filteredEmails =
    selectedRubro === ""
      ? emails
      : emails.filter((e) => e.rubro === selectedRubro);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-semibold">Bienvenido, {userName} 👋</h1>
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
            onClick={handleClickLogout}
          >
            Logout
          </Button>
        </div>
      </motion.div>

      {/* FILTRO DE RUBRO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex gap-4 items-center"
      >
        <select
          className="border border-gray-300 p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          value={selectedRubro}
          onChange={(e) => setSelectedRubro(e.target.value)}
        >
          <option value="">Todos los rubros</option>
          {uniqueRubros.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
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
              {filteredEmails.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.rubro}</td>
                  <td className="p-3">
                    {item.fecha.split("T")[0].split("-").reverse().join("/")}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {item.send ? (
                        <CheckCircle
                          className="text-green-600 w-5 h-5 cursor-pointer"
                          onClick={() => handleClickEditIsSend(item.id, false)}
                        />
                      ) : (
                        <Circle
                          className="text-gray-400 w-5 h-5 cursor-pointer"
                          onClick={() => handleClickEditIsSend(item.id, true)}
                        />
                      )}

                      <Trash
                        className="text-red-600 w-5 h-5 cursor-pointer"
                        onClick={() => handleClickDelete(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in">
            <h2 className="text-xl font-semibold mb-4">Añadir Email</h2>

            <div className="flex flex-col gap-4">
              <textarea
                placeholder="Ingresá emails separados por coma, espacio o enter..."
                className="w-full h-32 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={emailsToSave}
                onChange={(e) => setEmailsToSave(e.target.value)}
              />

              <input
                type="text"
                placeholder="Rubro"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
              />

              <div className="flex justify-end gap-3 mt-2">
                <Button variant="outline" onClick={handleClickCancel}>
                  Cancelar
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleClickSaveEmails}
                >
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
