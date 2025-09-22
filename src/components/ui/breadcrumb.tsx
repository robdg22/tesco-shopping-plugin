import * as React from "react"
import { cn } from "../../lib/utils"
import type { CategoryBreadcrumb } from "../../types/tesco"

interface BreadcrumbProps {
  breadcrumbs: CategoryBreadcrumb[]
  onBreadcrumbClick: (breadcrumbId: string) => void
  resultCount?: number
  className?: string
}

export function Breadcrumb({ breadcrumbs, onBreadcrumbClick, resultCount, className }: BreadcrumbProps) {
  return (
    <div className={cn("flex gap-[2px] items-center justify-center max-w-[664px] overflow-hidden", className)}>
      {/* Render all breadcrumbs */}
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.id}>
          {/* Breadcrumb Button */}
          <button
            onClick={() => onBreadcrumbClick(breadcrumb.id)}
            className="relative shrink-0 flex items-center gap-1 hover:opacity-70 transition-opacity"
            aria-label={`Navigate to ${breadcrumb.name}`}
          >
            {/* Home Icon for first breadcrumb */}
            {index === 0 && breadcrumb.level === 'home' && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M8.14248 2.29724L3.04248 6.34724V13.6972H6.64248V8.89724H9.64248V13.6972H13.2425V6.34724L8.14248 2.29724Z" 
                  stroke="#00539F" 
                  strokeWidth="1.5"
                />
              </svg>
            )}
            
            {/* Category name for non-home breadcrumbs */}
            {breadcrumb.level !== 'home' && (
              <span className="font-tesco-regular leading-4 text-[#00539F] text-xs whitespace-nowrap max-w-[100px] truncate">
                {breadcrumb.name}
              </span>
            )}
          </button>

          {/* Forward Arrow (except for last breadcrumb) */}
          {index < breadcrumbs.length - 1 && (
            <div className="relative shrink-0 size-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M4.35352 2.77147L9.77073 7.99956L4.35377 13.2226L5.39492 14.3024L11.9313 8.00006L5.39517 1.69214L4.35352 2.77147Z" 
                  fill="#666666"
                />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}

      {/* Final arrow and results text */}
      {breadcrumbs.length > 0 && (
        <div className="flex gap-[2px] items-center justify-start">
          {/* Forward Arrow */}
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
      )}
    </div>
  )
}