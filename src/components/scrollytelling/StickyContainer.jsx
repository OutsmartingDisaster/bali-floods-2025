import { useEffect, useRef } from 'react'

const StickyContainer = ({ children, className = "" }) => {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set sticky positioning
    element.style.position = 'sticky'
    element.style.top = '0'
    element.style.height = '100vh'
    element.style.display = 'flex'
    element.style.alignItems = 'center'
    element.style.justifyContent = 'center'

    return () => {
      if (element) {
        element.style.position = ''
        element.style.top = ''
        element.style.height = ''
        element.style.display = ''
        element.style.alignItems = ''
        element.style.justifyContent = ''
      }
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default StickyContainer