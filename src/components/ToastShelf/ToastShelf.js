import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({
  toasts,
  onDismiss
}) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast, index, array) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              onDismiss={() => onDismiss(toast.id)}
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
