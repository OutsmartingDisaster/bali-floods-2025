import { useEffect, useRef, useState } from 'react'
import scrollama from 'scrollama'

export const useScrollama = (options = {}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState('down')
  const scrollerRef = useRef(null)

  useEffect(() => {
    const scroller = scrollama()

    scroller
      .setup({
        step: '.scroll-step',
        offset: 0.5,
        debug: false,
        ...options
      })
      .onStepEnter((response) => {
        setCurrentStep(response.index)
        setDirection(response.direction)
        
        // Custom callback
        if (options.onStepEnter) {
          options.onStepEnter(response)
        }
      })
      .onStepExit((response) => {
        if (options.onStepExit) {
          options.onStepExit(response)
        }
      })

    // Handle resize
    const handleResize = () => scroller.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      scroller.destroy()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { currentStep, direction, scrollerRef }
}