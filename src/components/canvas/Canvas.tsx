import { useEffect, useRef } from 'react'
import { fabric } from 'fabric'

export const Canvas = () => {
  const canvasEl = useRef(null)
  const text = new fabric.Text('hello world', { left: 100, top: 100 })
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {})
    canvas.add(text)
    return () => {
      canvas.dispose()
    }
  }, [])

  return <canvas width="300" height="300" ref={canvasEl} />
}
