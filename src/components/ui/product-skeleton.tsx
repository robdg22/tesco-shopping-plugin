import * as React from "react"
import { cn } from "../../lib/utils"
import { Skeleton } from "./skeleton"

interface ProductSkeletonProps {
  className?: string
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div 
      className={cn(
        "bg-white box-border flex flex-col gap-2 items-start justify-start p-2 relative w-full",
        className
      )}
    >
      {/* Top container */}
      <div className="flex flex-col gap-1 items-start justify-start relative w-full">
        {/* Product Image Skeleton */}
        <Skeleton className="aspect-square w-full" />

        {/* Product Title Skeleton */}
        <div className="w-full space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex gap-2 items-center w-full">
          <Skeleton className="w-3 h-3" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Bottom container */}
      <div className="flex flex-col gap-2 items-start justify-center relative w-full">
        {/* Value Bar Skeleton */}
        <Skeleton className="w-full h-[26px]" />

        {/* Price Skeleton */}
        <div className="flex gap-1 items-baseline justify-start relative w-full">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Checkbox Skeleton */}
      <Skeleton className="absolute left-1.5 top-1.5 w-4 h-4 rounded shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_2px_2px_0px_rgba(0,0,0,0.1)]" />
    </div>
  )
}

interface ProductSkeletonGridProps {
  count?: number
  columns?: number
  className?: string
}

export function ProductSkeletonGrid({ 
  count = 8, 
  columns = 4, 
  className 
}: ProductSkeletonGridProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <ProductSkeleton key={i} />
  ))

  return (
    <div 
      className={cn(
        "grid gap-0 w-full", // Changed to gap-0 to match ProductGrid
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3", 
        columns === 4 && "grid-cols-4",
        className
      )}
    >
      {skeletons}
    </div>
  )
}
