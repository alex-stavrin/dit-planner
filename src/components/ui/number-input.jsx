import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const NumberInput = React.forwardRef(({ 
  className, 
  value, 
  onChange, 
  min = 0, 
  max = 10, 
  step = 0.5,
  precision = 1,
  ...props 
}, ref) => {
  const handleChange = (e) => {
    const value = e.target.value
    if (value === "") {
      onChange("")
      return
    }
    
    const parsedValue = parseFloat(value)
    if (!isNaN(parsedValue)) {
      onChange(Math.min(max, Math.max(min, parsedValue)).toFixed(precision))
    }
  }

  const increment = () => {
    const parsedValue = parseFloat(value || 0)
    if (!isNaN(parsedValue)) {
      onChange(Math.min(max, parsedValue + step).toFixed(precision))
    }
  }

  const decrement = () => {
    const parsedValue = parseFloat(value || 0)
    if (!isNaN(parsedValue)) {
      onChange(Math.max(min, parsedValue - step).toFixed(precision))
    }
  }

  return (
    <div className={cn("flex w-full max-w-[10rem]", className)}>
      <Input
        ref={ref}
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="rounded-r-none"
        {...props}
      />
      <div className="flex flex-col">
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          className="h-[1.25rem] w-6 rounded-none rounded-tr-md border-l-0"
          onClick={increment}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          size="icon" 
          className="h-[1.25rem] w-6 rounded-none rounded-br-md border-t-0 border-l-0"
          onClick={decrement}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
})
NumberInput.displayName = "NumberInput"

export { NumberInput }