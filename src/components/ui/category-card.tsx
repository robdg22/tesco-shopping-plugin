import * as React from "react"
import { cn } from "../../lib/utils"
import { CategorySkeletonGrid } from "./category-skeleton"

interface CategoryCardProps {
  id: string
  name: string
  imageUrl?: string
  onClick?: (id: string, name: string) => void
  className?: string
}

export function CategoryCard({ 
  id, 
  name, 
  imageUrl, 
  onClick,
  className 
}: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick(id, name)
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <div 
      className={cn(
        "flex flex-col gap-2 items-start justify-start p-2 rounded-lg",
        "w-[93px] cursor-pointer transition-all duration-200 ease-out",
        "hover:bg-[#f9f9f9] hover:scale-[1.02]",
        "active:scale-[0.98] boop",
        className
      )}
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="w-full flex flex-col gap-1 items-start justify-start">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#f6f6f6]">
          {imageUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#f0f0f0] animate-pulse rounded-lg" />
              )}
              <img
                src={imageUrl}
                alt={name}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] flex items-center justify-center">
              <div className="text-[#999] text-xs font-medium">
                {name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          
        </div>
      </div>

      {/* Text Label */}
      <div className="w-full h-9 flex flex-col justify-center">
        <p className={cn(
          "text-center text-sm text-[#333333] leading-[18px]",
          "font-tesco-regular",
          "overflow-hidden text-ellipsis",
          "line-clamp-2"
        )}>
          {name}
        </p>
      </div>
    </div>
  )
}

interface CategoryGridProps {
  categories: Array<{
    id: string
    name: string
    imageUrl?: string
  }>
  onCategoryClick?: (id: string, name: string) => void
  loading?: boolean
  className?: string
  columns?: 3 | 4
}

export function CategoryGrid({ 
  categories, 
  onCategoryClick, 
  loading = false,
  className,
  columns = 4
}: CategoryGridProps) {
  const gridCols = columns === 3 ? "grid-cols-3" : "grid-cols-4"

  // Show skeleton when loading (both initial load and reloading)
  if (loading) {
    return (
      <div className={cn(
        "w-full p-3",
        className
      )}>
        <div className={cn(
          "grid gap-1 content-start",
          gridCols
        )}>
          <CategorySkeletonGrid count={12} columns={columns} />
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "w-full p-3",
      className
    )}>
      <div className={cn(
        "grid gap-1 content-start",
        gridCols
      )}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            imageUrl={category.imageUrl}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </div>
  )
}
