import * as React from "react"
import { cn } from "../../lib/utils"

interface BreadcrumbProps {
  onHomeClick: () => void
  resultCount?: number
  className?: string
}

export function Breadcrumb({ onHomeClick, resultCount, className }: BreadcrumbProps) {
  return (
    <div className={cn("flex gap-0.5 h-6 items-center justify-center max-w-[664px]", className)}>
      {/* Home Icon */}
      <button
        onClick={onHomeClick}
        className="relative shrink-0 w-[12.8px] h-[12.8px] hover:opacity-70 transition-opacity"
        aria-label="Back to categories"
      >
        <div className="absolute inset-[14.38%_18.13%]">
          <svg 
            className="w-full h-full text-[#00539f]" 
            viewBox="0 0 16 17" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M8.00002 2.85364L2.90002 6.90364V14.2536H6.50002V9.45364H9.50002V14.2536H13.1V6.90364L8.00002 2.85364Z" 
              stroke="currentColor" 
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </button>

      {/* Forward Arrow + Results Text */}
      <div className="flex gap-0.5 items-center justify-start">
        {/* Forward Arrow */}
        <div className="relative shrink-0 w-[10.24px] h-[10.24px]">
          <div className="absolute inset-[10.58%_25.43%_10.61%_27.21%]">
            <svg 
              className="w-full h-full text-[#333333]" 
              viewBox="0 0 5 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M1 1L4 4L1 7" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Results Text */}
        <p className="font-tesco-regular leading-4 text-[#333333] text-xs whitespace-nowrap">
          {resultCount ? `${resultCount} results` : 'results'}
        </p>
      </div>
    </div>
  )
}
