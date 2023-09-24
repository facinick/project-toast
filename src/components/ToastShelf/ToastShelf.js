import React, { useContext } from 'react';
import Toast from '../Toast';
import { ToastContext } from '../ToastProvider/ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {

  const {toasts} = useContext(ToastContext)

  console.log(`toast shelf render`)

  return (
    <ol aria-label='Notification' aria-live='polite' role="region" className={styles.wrapper}>
      {toasts.map((toast, index, array) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              id={toast.id}
              variant={toast.variant}
              message={toast.message}
            />
          </li>
        )
      })}
    </ol>
  );
}

export default React.memo(ToastShelf);
