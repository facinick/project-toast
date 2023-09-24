import { useEffect } from "react"

function useKeyDown(key, callback) {
    useEffect(() => {

        const onKeyDown = (event) => {
            if (event.code === key) {
                callback()
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => window.removeEventListener("keydown", onKeyDown)

        // add this here, because this effect might get used in situations
        // where we get stale function reference only. what if callback 
        // relies on some new state?
        // in our current usecase our callback doesnt depend on any state that can go stale
        // but to future proof it.
    }, [key, callback])
}

export default useKeyDown