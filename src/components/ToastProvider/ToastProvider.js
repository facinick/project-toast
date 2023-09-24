import React, { createContext, useState } from 'react';
import useKeyDown from '../../hooks/useKeyDown';

export const ToastContext = createContext()

function ToastProvider({
  children
}) {

  const [toasts, setToasts] = useState([])
  const memoisedClearToast = React.useCallback(() => setToasts([]), [])
  
  // because the callback passed will be recreated every time toasts change
  // which will cause the useKeyDown hook to remove event listener and add a new one,
  // which will have a performance cost
  useKeyDown("Escape", memoisedClearToast)

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

  const value = React.useCallback({
    toasts,
    addToast,
    dismissToast,
  }, [toasts])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
