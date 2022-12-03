import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

export const Canvas = () => {
  const canvasEl = useRef(null)
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {})
    return () => {
      canvas.dispose()
    }
  }, [])

  return <canvas width="300" height="300" ref={canvasEl} />
}
