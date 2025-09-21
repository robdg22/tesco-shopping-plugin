import * as React from "react"
import { X } from "lucide-react"
import { SearchIcon } from "./search-icon"
import { cn } from "../../lib/utils"

interface FilterChipProps {
  label: string
  onSelect?: (label: string) => void
  onRemove?: (label: string) => void
  variant?: "search" | "filter"
  className?: string
}

export function FilterChip({ 
  label, 
  onSelect, 
  onRemove, 
  variant = "search",
  className 
}: FilterChipProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handleClick = () => {
    if (onSelect) {
      onSelect(label)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onRemove) {
      onRemove(label)
    }
  }

  return (
    <div 
      className={cn(
        "relative inline-flex items-center gap-1 px-3 py-1 rounded-2xl cursor-pointer",
        "bg-[#f6f6f6] border border-[rgba(0,0,0,0.08)]",
        "transition-all duration-200 ease-out",
        "hover:bg-[#f0f0f0] hover:scale-[1.02]",
        "active:scale-[0.98]",
        "boop",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center py-0.5">
        <span className="text-sm text-[#666666] font-tesco-regular leading-[18px] text-center whitespace-nowrap">
          {label}
        </span>
      </div>
      
      {variant === "search" && (
        <SearchIcon size={20} className="text-[#666666] opacity-60" />
      )}
      
      {variant === "filter" && onRemove && (
        <button
          onClick={handleRemove}
          className={cn(
            "ml-1 p-0.5 rounded-full transition-all duration-150",
            "hover:bg-[#e0e0e0] opacity-60 hover:opacity-100"
          )}
        >
          <X className="h-3 w-3 text-[#666666]" />
        </button>
      )}
    </div>
  )
}

interface FilterChipListProps {
  chips: string[]
  onChipSelect?: (label: string) => void
  onChipRemove?: (label: string) => void
  variant?: "search" | "filter"
  className?: string
}

export function FilterChipList({ 
  chips, 
  onChipSelect, 
  onChipRemove, 
  variant = "search",
  className 
}: FilterChipListProps) {
  return (
    <div className={cn(
      "flex gap-2.5 items-start flex-wrap",
      className
    )}>
      {chips.map((chip, index) => (
        <FilterChip
          key={`${chip}-${index}`}
          label={chip}
          onSelect={onChipSelect}
          onRemove={onChipRemove}
          variant={variant}
        />
      ))}
    </div>
  )
}
