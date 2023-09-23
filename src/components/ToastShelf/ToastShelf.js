import React, { useContext } from 'react';
import Toast from '../Toast';
import { ToastContext } from '../ToastProvider/ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {

  const {toasts, dismissToast} = useContext(ToastContext)

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast, index, array) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              onDismiss={() => dismissToast(toast.id)}
              dismissMessage={"Dismiss Toast"}
              variant={toast.variant}
              message={toast.message}
            />
          </li>
        )
      })}
    </ol>
  );
}

export default ToastShelf;
