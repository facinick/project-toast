import React, { useContext, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { ToastContext } from '../ToastProvider/ToastProvider';
import ToastShelf from '../ToastShelf';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

const DEFAULT_MESSAGE = ""
const DEFAULT_VARIANT = VARIANT_OPTIONS[0]

function ToastPlayground() {

  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [variant, setVariant] = useState(DEFAULT_VARIANT)
  const messageInputRef = useRef(null)

  const { addToast } = useContext(ToastContext)

  const handleMessageInputChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleRadioInputChange = (event) => {
    const { value } = event.target
    setVariant(value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const trimmedMessage = message.trim()

    if (trimmedMessage === "") {
      alert("Toast message cannot be empty!")
      return
    }

    addToast({
      variant,
      message: trimmedMessage,
      id: Math.random(),
    })

    setMessage(DEFAULT_MESSAGE)
    setVariant(DEFAULT_VARIANT)
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

      <form onSubmit={handleFormSubmit} className={styles.controlsWrapper}>
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
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>

      <ToastShelf />
    </div>
  );
}

export default ToastPlayground;
