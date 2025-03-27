import { createContext, useContext, useState, useCallback } from "react";
const ToastContext = createContext();

// eslint-disable-next-line react/prop-types
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`toast ${
              type === "success"
                ? "success"
                : type === "error"
                ? "error"
                : "info"
            }`}
          >
            <p>{message}</p>
            <button onClick={() => removeToast(id)} className="toast-btn">✖️</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
