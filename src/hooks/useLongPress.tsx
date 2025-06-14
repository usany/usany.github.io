import { useEffect } from 'react'
import useEventListener from "./useEventListener"
import useTimeout from "./useTimeout"

export default function useLongPress(ref, cb, { delay = 500 } = {}) {
  const { reset, clear } = useTimeout(cb, delay)
  useEffect(() => {
    clear()
  }, [])

  useEventListener("mousedown", reset, ref.current)
  useEventListener("touchstart", reset, ref.current)

  useEventListener("mouseup", clear, ref.current)
  useEventListener("mouseleave", clear, ref.current)
  useEventListener("touchend", clear, ref.current)
}
