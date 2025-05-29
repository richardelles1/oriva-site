'use client'

import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FFCC88] hover:bg-[#FEC56B] text-black px-6 py-3 shadow-inner ring-1 ring-[#FFD28F]/30 shadow-[0_0_40px_8px_rgba(255,210,143,0.2)] hover:-translate-y-1 ${className}`}
      />
    )
  }
)

Button.displayName = 'Button'
export { Button }
