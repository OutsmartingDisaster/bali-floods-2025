import { forwardRef } from 'react'

const ScrollStep = forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={`scroll-step min-h-screen flex items-center justify-center p-4 md:p-8 pb-6 md:pb-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

ScrollStep.displayName = 'ScrollStep'

export default ScrollStep