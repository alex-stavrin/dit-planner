import * as React from "react"
import { cn } from "@/lib/utils"

const CircularProgress = React.forwardRef(({ 
  className,
  value = 0,
  min = 0,
  max = 100,
  size = '250px',
  thickness = '5px',
  color = 'primary',
  children,
  ...props 
}, ref) => {
  // Calculate the percentage
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  
  // Calculate the circle parameters
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference
  
  // Determine color class
  const colorClass = color === 'primary' ? 
    'stroke-primary' : 
    `stroke-${color}`

  return (
    <div 
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          className="stroke-muted-foreground/20 fill-transparent"
          strokeWidth={thickness}
        />
        {/* Progress circle */}
        <circle 
          cx="50" 
          cy="50" 
          r={radius} 
          className={`fill-transparent ${colorClass}`}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
})
CircularProgress.displayName = "CircularProgress"

const CircularProgressLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-center font-medium", className)}
    {...props}
  />
))
CircularProgressLabel.displayName = "CircularProgressLabel"

export { CircularProgress, CircularProgressLabel }