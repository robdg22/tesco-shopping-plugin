import * as React from "react"
import { cn } from "../../lib/utils"

interface ProductSkeletonProps {
  className?: string
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div 
      className={cn(
        "bg-white box-border flex flex-col gap-2 items-start justify-start p-2 relative w-full",
        "animate-pulse",
        className
      )}
    >
      {/* Top container */}
      <div className="flex flex-col gap-1 items-start justify-start relative w-full">
        {/* Product Image Skeleton */}
        <div className="aspect-square bg-gray-200 w-full rounded" />

        {/* Product Title Skeleton */}
        <div className="w-full space-y-1">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex gap-2 items-center w-full">
          <div className="w-3 h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>

      {/* Bottom container */}
      <div className="flex flex-col gap-2 items-start justify-center relative w-full">
        {/* Value Bar Skeleton */}
        <div className="flex items-center justify-start relative rounded w-full h-[26px] bg-gray-200" />

        {/* Price Skeleton */}
        <div className="flex gap-1 items-baseline justify-start relative w-full">
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>

      {/* Checkbox Skeleton */}
      <div className="absolute left-1.5 top-1.5 w-4 h-4 bg-gray-200 rounded" />
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
        "grid gap-3 w-full",
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
