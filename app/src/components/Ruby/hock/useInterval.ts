import {useEffect, useRef} from "react";

export const useInterval = (onUpdate: () => void) => {
    const onUpdateRef = useRef(onUpdate)
    useEffect(() => {
        onUpdateRef.current = onUpdate
    }, [onUpdate])
    useEffect(() => {
        const timerId = setInterval(() => onUpdateRef.current(), 1000)
        return () => clearInterval(timerId)
    }, [])
}
