import * as React from "react"
import { cn } from "../../lib/utils"
import { Skeleton } from "./skeleton"

interface CategorySkeletonProps {
  className?: string
}

export function CategorySkeleton({ className }: CategorySkeletonProps) {
  return (
    <div 
      className={cn(
        "flex flex-col gap-2 items-start justify-start p-2 rounded-lg",
        "w-[93px]",
        className
      )}
    >
      {/* Image Container Skeleton */}
      <div className="w-full flex flex-col gap-1 items-start justify-start">
        <Skeleton className="w-full aspect-square rounded-lg" />
      </div>

      {/* Text Label Skeleton */}
      <div className="w-full h-9 flex flex-col justify-center space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    </div>
  )
}

interface CategorySkeletonGridProps {
  count?: number
  columns?: number
  className?: string
}

export function CategorySkeletonGrid({ 
  count = 8, 
  columns = 4, 
  className 
}: CategorySkeletonGridProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <CategorySkeleton key={i} />
  ))

  return (
    <>
      {skeletons}
    </>
  )
}
