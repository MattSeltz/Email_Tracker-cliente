export default function RecoverPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Recuperar contraseña
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="tuemail@gmail.com"
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl shadow bg-black text-white font-semibold"
          >
            Enviar instrucciones
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          ¿Recordaste tu contraseña?{" "}
          <a href="/login" className="text-black font-semibold underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
