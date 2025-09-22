import * as React from "react"
import { SearchIcon } from "./search-icon"
import { cn } from "../../lib/utils"

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
  onClick?: () => void
  loading?: boolean
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, onClick, loading = false, onChange, onKeyPress, ...props }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value)
      }
      onKeyPress?.(e)
    }

    return (
      <div className={cn(
        "relative w-full max-w-[664px]",
        className
      )}
        style={{ height: '36px' }}
      >
        <div 
          className="relative bg-white rounded-[20px]"
          style={{ 
            height: '36px', 
            boxSizing: 'border-box',
            boxShadow: '0 -1px 0 0 rgba(0, 0, 0, 0.04) inset, 0 1px 0 0 rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 1px -0.5px rgba(0, 0, 0, 0.04), 0 2px 2px -1px rgba(0, 0, 0, 0.04), 0 4px 4px -2px rgba(0, 0, 0, 0.04), 0 8px 8px -4px rgba(0, 0, 0, 0.04), 0 0 0 2px rgba(255, 255, 255, 0.20)'
          }}
        >
          <div className="flex items-center h-full pl-3 pr-3">
            <div className="flex items-center gap-2 flex-1">
              <SearchIcon 
                size={16}
                className={cn(
                  "text-[#666666] transition-colors flex-shrink-0",
                  loading && "animate-pulse"
                )} 
              />
              <input
                ref={ref}
                className={cn(
                  "flex-1 bg-transparent border-0 outline-none h-full",
                  "text-sm text-[#666666] placeholder:text-[#666666]",
                  "font-tesco-regular leading-[18px]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                placeholder="Search..."
                onChange={onChange}
                onKeyPress={handleKeyPress}
                onClick={onClick}
                disabled={loading}
                {...props}
              />
            </div>
          </div>
          {/* Subtle inner shadow - much lighter */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{ boxShadow: '0px -1px 1px 0px inset rgba(0,0,0,0.03)' }}
          />
        </div>
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"
