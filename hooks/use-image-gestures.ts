import { useCallback, useRef, useState } from "react"

interface UseImageGesturesOptions {
  onNext: () => void
  onPrev: () => void
  onClose: () => void
}

export default function useImageGestures({
  onNext,
  onPrev,
  onClose,
}: UseImageGesturesOptions) {
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [dragY, setDragY] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Touch tracking refs
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)
  const pinchStartDist = useRef<number | null>(null)
  const pinchStartScale = useRef(1)
  const panStart = useRef<{ x: number; y: number } | null>(null)
  const panStartTranslate = useRef({ x: 0, y: 0 })
  const didGesture = useRef(false)
  const dragStartY = useRef<number | null>(null)

  // Double tap refs
  const lastTap = useRef(0)
  const tapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetZoom = useCallback(() => {
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [])

  const reset = useCallback(() => {
    resetZoom()
    setShowControls(true)
    setDragY(0)
    setDragX(0)
    setIsDragging(false)
    setIsDraggingHorizontal(false)
  }, [resetZoom])

  const toggleControls = useCallback(() => {
    setShowControls((v) => !v)
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    didGesture.current = false

    if (e.touches.length === 1 && scale <= 1) {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now(),
      }
      dragStartY.current = e.touches[0].clientY
    } else if (e.touches.length === 1 && scale > 1) {
      panStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      panStartTranslate.current = { ...translate }
      touchStart.current = null
      dragStartY.current = null
    } else if (e.touches.length === 2) {
      touchStart.current = null
      dragStartY.current = null
      setIsDragging(false)
      setIsDraggingHorizontal(false)
      setDragY(0)
      setDragX(0)
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      pinchStartDist.current = Math.hypot(dx, dy)
      pinchStartScale.current = scale
    }

    // Double tap detection
    if (e.touches.length === 1) {
      const now = Date.now()
      if (now - lastTap.current < 300) {
        if (tapTimeout.current) clearTimeout(tapTimeout.current)
        if (scale > 1) {
          resetZoom()
        } else {
          setScale(2.5)
        }
        e.preventDefault()
        lastTap.current = 0
      } else {
        lastTap.current = now
        if (tapTimeout.current) clearTimeout(tapTimeout.current)
        tapTimeout.current = setTimeout(() => {
          if (!didGesture.current) {
            toggleControls()
          }
        }, 320)
      }
    }
  }, [scale, translate, resetZoom, toggleControls])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDist.current !== null) {
      e.preventDefault()
      didGesture.current = true
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      const newScale = Math.min(Math.max(pinchStartScale.current * (dist / pinchStartDist.current), 0.5), 5)
      setScale(newScale)
      if (newScale <= 1) setTranslate({ x: 0, y: 0 })
    } else if (e.touches.length === 1 && scale > 1 && panStart.current) {
      e.preventDefault()
      didGesture.current = true
      const dx = e.touches[0].clientX - panStart.current.x
      const dy = e.touches[0].clientY - panStart.current.y
      setTranslate({
        x: panStartTranslate.current.x + dx,
        y: panStartTranslate.current.y + dy,
      })
    } else if (e.touches.length === 1 && scale <= 1 && dragStartY.current !== null) {
      const dy = e.touches[0].clientY - dragStartY.current
      const dx = touchStart.current ? e.touches[0].clientX - touchStart.current.x : 0
      const absDy = Math.abs(dy)
      const absDx = Math.abs(dx)

      if (isDraggingHorizontal) {
        // Already committed to horizontal drag — keep tracking
        e.preventDefault()
        setDragX(dx)
      } else if (!isDragging && absDx > 12 && absDx > absDy * 1.3) {
        // Commit to horizontal drag
        e.preventDefault()
        didGesture.current = true
        setIsDraggingHorizontal(true)
        setDragX(dx)
      } else if (absDy > 15 && absDy > absDx * 1.2 && dy > 0) {
        // Commit to vertical drag (close gesture)
        didGesture.current = true
        setIsDragging(true)
        setDragY(dy)
      } else if (isDragging) {
        setDragY(dy)
      }
    }
  }, [scale, isDragging, isDraggingHorizontal])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchStartDist.current = null
    }
    if (e.touches.length === 0) {
      panStart.current = null
    }

    // Pinch to close
    if (e.touches.length === 0 && scale < 0.7) {
      onClose()
      return
    }

    // Horizontal drag: navigate or snap back
    if (isDraggingHorizontal && e.touches.length === 0) {
      didGesture.current = true
      if (Math.abs(dragX) > 80) {
        if (dragX < 0) onNext()
        else onPrev()
      }
      setDragX(0)
      setIsDraggingHorizontal(false)
      dragStartY.current = null
      touchStart.current = null
      return
    }

    // Vertical drag to close
    if (isDragging && e.touches.length === 0) {
      if (dragY > 150) {
        onClose()
      } else {
        setDragY(0)
      }
      setIsDragging(false)
      dragStartY.current = null
      return
    }

    // Fast swipe detection (no visible drag committed yet)
    if (e.touches.length === 0 && touchStart.current && scale <= 1 && !isDragging && !isDraggingHorizontal) {
      const dx = e.changedTouches[0].clientX - touchStart.current.x
      const dy = e.changedTouches[0].clientY - touchStart.current.y
      const dt = Date.now() - touchStart.current.time
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      if (absDx > 50 && dt < 350 && absDx > absDy * 1.5) {
        didGesture.current = true
        if (dx < 0) onNext()
        else onPrev()
      }
      touchStart.current = null
    }

    dragStartY.current = null

    // Snap back
    if (scale < 1.1 && scale >= 0.7 && e.touches.length === 0) {
      resetZoom()
    }
  }, [scale, onNext, onPrev, resetZoom, isDragging, dragY, isDraggingHorizontal, dragX, onClose])

  const dragProgress = Math.min(dragY / 300, 1)

  const containerStyle = {
    transform: isDraggingHorizontal
      ? `translateX(${dragX}px) scale(${1 - Math.abs(dragX) / 2000})`
      : isDragging
      ? `translateY(${dragY}px) scale(${1 - dragProgress * 0.1})`
      : undefined,
    transition: (isDragging || isDraggingHorizontal) ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }

  const imageStyle = {
    transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
    transition: pinchStartDist.current !== null || panStart.current !== null ? 'none' : 'transform 0.15s ease-out',
  }

  const backdropOpacity = isDragging ? 0.9 - dragProgress * 0.5 : 0.9

  return {
    scale,
    showControls,
    isDragging,
    isDraggingHorizontal,
    dragX,
    resetZoom,
    reset,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
    containerStyle,
    imageStyle,
    backdropOpacity,
  }
}
