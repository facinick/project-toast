import { useEffect } from "react"

function useEscapeKey(callback) {
    useEffect(() => {

        const onKeyDown = (event) => {
            if (event.code === "Escape") {
                callback()
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => window.removeEventListener("keydown", onKeyDown)

    }, [])
}

export default useEscapeKey