import { createEffect, createSignal } from "solid-js";
import screenfull from 'screenfull'

export function useFullScreen(ref?: HTMLElement, enabled?: boolean) {
  const [elRef, setElRef] = createSignal(ref)
  const [isFullScreen, setIsFullScreen] = createSignal(enabled ?? false)

  createEffect(() => {
    setElRef(elRef)
  }, [ref])

  const toggleFullscreen = () => {
    if (isFullScreen()) {
      setIsFullScreen(false)
      screenfull.exit()
    } else {
      if (screenfull.isEnabled) {
        elRef() ? screenfull.request(elRef()) : screenfull.request()
        setIsFullScreen(true)
      }
    }
  }

  return {
    toggleFullscreen
  }
}