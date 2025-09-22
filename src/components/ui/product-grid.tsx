import * as React from "react"
import { ProductCard } from "./product-card"
import { ProductSkeletonGrid } from "./product-skeleton"
import { cn } from "../../lib/utils"
import type { ProductItem } from "../../types/tesco"

interface ProductGridProps {
  products: ProductItem[]
  loading?: boolean
  selectedProducts?: string[]
  onProductSelect?: (productId: string) => void
  columns?: number
  className?: string
  emptyMessage?: string
}

export function ProductGrid({
  products,
  loading = false,
  selectedProducts = [],
  onProductSelect,
  columns = 4,
  className,
  emptyMessage = "No products found"
}: ProductGridProps) {
  
  if (loading) {
    return (
      <div className={cn("p-3", className)}>
        <ProductSkeletonGrid count={8} columns={columns} />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className={cn("flex items-center justify-center h-full p-6", className)}>
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-2">
            <svg 
              className="w-12 h-12 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm font-tesco-regular">
            {emptyMessage}
          </p>
          <p className="text-gray-500 text-xs font-tesco-regular mt-1">
            Try a different search term
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("", className)}>
      <div 
        className={cn(
          "grid gap-0 w-full",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4"
        )}
      >
        {products.map((product) => {
          // Safety check for product data
          if (!product || !product.id || !product.title) {
            console.warn('Invalid product data:', product)
            return null
          }
          
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              brandName={product.brandName}
              shortDescription={product.shortDescription}
              defaultImageUrl={product.defaultImageUrl}
              price={product.price}
              promotions={product.promotions || []}
              isNew={product.isNew}
              averageRating={product.reviews?.stats?.overallRating}
              reviewCount={product.reviews?.stats?.noOfReviews}
              isSelected={selectedProducts.includes(product.id)}
              onSelect={onProductSelect}
            />
          )
        }).filter(Boolean)}
      </div>
    </div>
  )
}
