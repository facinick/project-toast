import React, { useContext } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X
} from 'react-feather';

import { ToastContext } from '../ToastProvider';
import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({
  id,
  variant,
  message,
}) {

  const { dismissToast } = useContext(ToastContext)

  const IconComponent = ICONS_BY_VARIANT[variant]

  console.log(`toast render`)

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconComponent size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{`${variant} - `}</VisuallyHidden>
        {message}
      </p>
      <button aria-live="off" aria-label="Dismiss message" onClick={() => dismissToast(id)} className={styles.closeButton}>
        <X size={24} />
      </button>
    </div>
  );
}

export default React.memo(Toast);
