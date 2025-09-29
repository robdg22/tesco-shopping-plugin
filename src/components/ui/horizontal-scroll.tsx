import * as React from "react"
import { cn } from "../../lib/utils"

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = React.useRef<number | null>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)
  const [hasOverflow, setHasOverflow] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const checkScrollability = React.useCallback(() => {
    const element = scrollRef.current
    if (!element) return

    const { scrollLeft, scrollWidth, clientWidth } = element
    const hasOverflowContent = scrollWidth > clientWidth
    
    setHasOverflow(hasOverflowContent)
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  React.useEffect(() => {
    checkScrollability()
    
    const element = scrollRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver(checkScrollability)
    resizeObserver.observe(element)

    element.addEventListener('scroll', checkScrollability)
    
    return () => {
      resizeObserver.disconnect()
      element.removeEventListener('scroll', checkScrollability)
    }
  }, [checkScrollability])

  const scrollLeft = () => {
    const element = scrollRef.current
    if (!element || !canScrollLeft) return
    
    const scrollAmount = element.clientWidth * 0.5
    element.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    const element = scrollRef.current
    if (!element || !canScrollRight) return
    
    const scrollAmount = element.clientWidth * 0.5
    element.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent, direction: 'left' | 'right') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (direction === 'left') {
        scrollLeft()
      } else {
        scrollRight()
      }
    }
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false)
    }, 300)
  }

  React.useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const containerClasses = cn(
    "horizontal-scroll-container",
    hasOverflow && "has-scroll",
    canScrollLeft && "fade-left",
    canScrollRight && "fade-right",
    isHovered && "hovered",
    className
  )

  return (
    <div 
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Left scroll icon */}
      <div
        className={cn(
          "scroll-button scroll-button-left",
          canScrollLeft ? "active" : "inactive"
        )}
        onClick={scrollLeft}
        onKeyDown={(e) => handleKeyDown(e, 'left')}
        role="button"
        tabIndex={canScrollLeft ? 0 : -1}
        aria-label="Scroll left"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M6.79077 3.88738L15.1963 11.9995L6.79102 20.1038L7.83217 21.1836L17.3569 12L7.83242 2.80804L6.79077 3.88738Z" 
            fill="currentColor"
            transform="rotate(180 12 12)"
          />
        </svg>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="scroll-content w-full overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>

      {/* Right scroll icon */}
      <div
        className={cn(
          "scroll-button scroll-button-right",
          canScrollRight ? "active" : "inactive"
        )}
        onClick={scrollRight}
        onKeyDown={(e) => handleKeyDown(e, 'right')}
        role="button"
        tabIndex={canScrollRight ? 0 : -1}
        aria-label="Scroll right"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M6.79077 3.88738L15.1963 11.9995L6.79102 20.1038L7.83217 21.1836L17.3569 12L7.83242 2.80804L6.79077 3.88738Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}
