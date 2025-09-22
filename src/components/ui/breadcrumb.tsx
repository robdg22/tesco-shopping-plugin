import * as React from "react"
import { cn } from "../../lib/utils"

interface BreadcrumbProps {
  onHomeClick: () => void
  resultCount?: number
  className?: string
}

export function Breadcrumb({ onHomeClick, resultCount, className }: BreadcrumbProps) {
  return (
    <div className={cn("flex gap-[2px] items-center justify-center max-w-[664px]", className)}>
      {/* Home Icon - using actual SVG file at full 16px size */}
      <button
        onClick={onHomeClick}
        className="relative shrink-0 size-4 hover:opacity-70 transition-opacity"
        aria-label="Back to categories"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M8.14248 2.29724L3.04248 6.34724V13.6972H6.64248V8.89724H9.64248V13.6972H13.2425V6.34724L8.14248 2.29724Z" 
            stroke="#00539F" 
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {/* Forward Arrow + Results Text */}
      <div className="flex gap-[2px] items-center justify-start">
        {/* Forward Arrow - using actual SVG file at full 16px size */}
        <div className="relative shrink-0 size-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M4.35352 2.77147L9.77073 7.99956L4.35377 13.2226L5.39492 14.3024L11.9313 8.00006L5.39517 1.69214L4.35352 2.77147Z" 
              fill="#666666"
            />
          </svg>
        </div>

        {/* Results Text */}
        <p className="font-tesco-regular leading-4 text-[#333333] text-xs whitespace-nowrap">
          {resultCount ? `${resultCount} results` : 'results'}
        </p>
      </div>
    </div>
  )
}