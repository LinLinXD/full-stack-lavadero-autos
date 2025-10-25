import { useRouteError, isRouteErrorResponse, useLocation, Link } from "react-router-dom";

export const ErrorBoundary = () => {
  const location = useLocation();
  const routeError = useRouteError();

  const navState = location.state as {
    code?: number;
    message?: string;
    reason?: string;
    from?: string;
  } | undefined;

  

  let code = navState?.code ?? 404;
  let message = navState?.message ?? "Página no encontrada";
  const reason = navState?.reason ?? "unknown";

  if (isRouteErrorResponse(routeError)) {
    code = routeError.status;
    message = routeError.statusText || message;
  }

  const color =
    code === 401
      ? "bg-yellow-100 text-yellow-700"
      : code === 403
      ? "bg-red-100 text-red-700"
      : code === 404
      ? "bg-gray-100 text-gray-700"
      : "bg-rose-100 text-rose-700";

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
      <div
        className={`rounded-2xl shadow-md p-10 w-full max-w-lg border ${color}`}
      >
        <h1 className="text-6xl font-extrabold mb-3">{code}</h1>
        <p className="text-xl font-semibold mb-2">
          {message || "Ha ocurrido un error"}
        </p>

        {reason && (
          <p className="text-sm opacity-80 mb-6">
            Motivo: <span className="italic">{reason}</span>
          </p>
        )}

        {navState?.from && (
          <p className="text-sm mb-6">
            Intentaste acceder a:{" "}
            <span className="font-mono text-gray-600">{navState.from}</span>
          </p>
        )}

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Ir al inicio
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
          >
            Recargar
          </button>
        </div>
      </div>

      <p className="text-sm mt-6 text-gray-500">
        Si el problema persiste, contacta con el administrador del sistema.
      </p>
    </div>
  );
};
