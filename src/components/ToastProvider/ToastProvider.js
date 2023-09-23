import React, { createContext, useState } from 'react';

export const ToastContext = createContext()

function ToastProvider({
  children
}) {

  const [toasts, setToasts] = useState([])

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

  const clearAllToasts = () => {
    setToasts([])
  }

  const value = {
    toasts,
    addToast,
    dismissToast,
    clearAllToasts
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
