import React, { createContext, useState } from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = createContext()

function ToastProvider({
  children
}) {

  const [toasts, setToasts] = useState([])
  useEscapeKey(() => setToasts([]))

  const addToast = (toast) => {

    const { variant, message, id } = toast

    const nextToasts = [...toasts]
    nextToasts.push({
      variant,
      message,
      id,
    })
    setToasts(nextToasts)
  }

  const dismissToast = (toastId) => {
    const nextToasts = [...toasts]
    const filtered = nextToasts.filter((toast) => toast.id !== toastId)
    setToasts(filtered)
  }

  const value = React.useMemo(() => ({
    toasts,
    addToast,
    dismissToast,
  }), [toasts])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
