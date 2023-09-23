import React, { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Toast from '../Toast';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const [message, setMessage] = useState("")
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0])
  const messageInputRef = useRef(null)

  const [visible, setVisible] = useState(false)

  const [toasts, setToasts] = useState([])

  const handleMessageInputChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleRadioInputChange = (event) => {
    const { value } = event.target
    setVariant(value)
  }

  const handleButtonClick = (event) => {
    setVisible(true)
  }

  useEffect(() => {
    messageInputRef.current.focus()
  }, [])

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      {visible && <Toast onDismiss={() => setVisible(false)} dismissMessage={"Dismiss Toast"} variant={variant} message={message} />}
      <div className={styles.controlsWrapper}>
        {/* Message TextArea input */}
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea ref={messageInputRef} value={message} onChange={handleMessageInputChange} id="message" className={styles.messageInput} />
          </div>
        </div>
        {/* Variant Radio Input */}
        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {
              VARIANT_OPTIONS.map((value, index, array) => {

                const variantId = `variant-${value}`
                const isSelected = variant === value

                return (
                  <label htmlFor={variantId} key={value}>
                    <input
                      id={variantId}
                      type="radio"
                      name="variant"
                      value={value}
                      data-checked={isSelected.toString()}
                      checked={isSelected}
                      onChange={handleRadioInputChange}
                    />
                    {value}
                  </label>
                )
              })
            }
          </div>
        </div>
        {/* PopToast Button */}
        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={handleButtonClick}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
