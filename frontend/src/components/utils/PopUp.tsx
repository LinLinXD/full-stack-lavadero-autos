import { useEffect, useState } from "react";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  message?: string;
  inline?: boolean;
  variant?: "error" | "alert" | "success";
};

const STYLES = {
  error: {
    wrapper: "bg-white border-2 border-red-600 text-red-700",
    title: "text-red-700",
    button: "text-red-600 hover:bg-red-50",
  },
  alert: {
    wrapper:
      "bg-yellow-50 border-2 border-yellow-400 text-yellow-800 dark:bg-gray-800 dark:text-yellow-300",
    title: "text-yellow-800 dark:text-yellow-300",
    button: "text-yellow-700 hover:bg-yellow-100",
  },
  success: {
    wrapper: "bg-green-50 border-2 border-green-400 text-green-800",
    title: "text-green-800",
    button: "text-green-700 hover:bg-green-100",
  },
};

export default function PopUp({
  isOpen = false,
  onClose = () => {},
  title = "Alerta",
  message = "Contraseña incorrecta",
  inline = false,
  variant = "error",
}: Props) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  const styles = STYLES[variant];
  const anim = `transition-opacity duration-200 ${
    isOpen ? "opacity-100" : "opacity-0"
  }`;

  const content = (
    <div
      className={`rounded-md p-4 max-w-sm w-full mx-4 shadow-lg ${styles.wrapper} ${anim}`}
    >
      <div className="flex justify-between items-center">
        <h2 className={`font-semibold text-lg ${styles.title}`}>{title}</h2>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className={`${styles.button} font-bold px-2 py-1 rounded`}
        >
          X
        </button>
      </div>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );

  return inline ? (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      {content}
    </div>
  ) : (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div className="relative z-10">{content}</div>
    </div>
  );
}
