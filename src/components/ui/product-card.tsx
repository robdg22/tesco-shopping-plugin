import * as React from "react"
import { cn } from "../../lib/utils"

interface ProductCardProps {
  id: string
  title: string
  brandName?: string
  shortDescription?: string
  defaultImageUrl?: string
  price?: {
    price: number
    unitPrice?: string
    unitOfMeasure?: string
  }
  promotions?: Array<{
    id: string
    offerText: string
    promotionType: string
  }>
  isNew?: boolean
  averageRating?: number
  reviewCount?: number
  isSelected?: boolean
  onSelect?: (productId: string) => void
  className?: string
}

export function ProductCard({
  id,
  title,
  brandName,
  defaultImageUrl,
  price,
  promotions = [],
  isNew = false,
  averageRating,
  reviewCount,
  isSelected = false,
  onSelect,
  className
}: ProductCardProps) {
  // Check if product has Clubcard promotion
  const clubcardPromotion = promotions.find(promo => 
    promo.promotionType.toLowerCase().includes('clubcard') || 
    promo.offerText.toLowerCase().includes('clubcard')
  )

  const formatPrice = (priceValue: number | undefined) => {
    if (typeof priceValue !== 'number' || isNaN(priceValue)) {
      return '£0.00'
    }
    return `£${priceValue.toFixed(2)}`
  }

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(id)
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSelect) {
      onSelect(id)
    }
  }

  return (
    <div 
      className={cn(
        "bg-white box-border flex flex-col gap-2 items-start justify-start p-2 relative w-full cursor-pointer",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Top container */}
      <div className="flex flex-col gap-1 items-start justify-start relative w-full">
        {/* Product Image */}
        <div className="flex flex-col items-start justify-start relative w-full">
          <div 
            className="aspect-square bg-center bg-cover bg-no-repeat w-full bg-gray-100"
            style={{ 
              backgroundImage: defaultImageUrl ? `url('${defaultImageUrl}')` : 'none'
            }}
          >
            {!defaultImageUrl && (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* Product Tags */}
        {isNew && (
          <div className="flex flex-wrap gap-1 items-start justify-start relative w-full">
            <div className="bg-[#00539f] flex items-start justify-start pb-px pt-0 px-0.5 relative rounded-sm">
              <p className="font-tesco-bold leading-3 text-[10px] text-center text-white min-w-[25px]">
                New
              </p>
            </div>
          </div>
        )}

        {/* Product Title */}
        <p className="font-tesco-regular leading-4 text-[#333333] text-xs w-full line-clamp-2">
          {title}
        </p>

        {/* Product Rating */}
        {(averageRating || reviewCount) && (
          <div className="flex gap-2 h-3 items-center justify-start relative w-full">
            <div className="relative w-3 h-3">
              <svg 
                className="w-3 h-3 text-orange-400 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p className="font-tesco-regular leading-3 text-[#666666] text-xs whitespace-nowrap">
              {averageRating?.toFixed(1) || 'N/A'} ({reviewCount || 0})
            </p>
          </div>
        )}
      </div>

      {/* Bottom container */}
      <div className="flex flex-col gap-2 items-start justify-center relative w-full">
        {/* Clubcard Value Bar */}
        {clubcardPromotion && (
          <div className="flex items-center justify-start relative rounded shadow-sm w-full border">
            <div className="bg-[#00539f] flex flex-col h-[26px] items-center justify-center px-1 py-0 relative rounded-l shrink-0 w-[50px]">
              <div className="flex flex-col font-tesco-bold justify-center leading-none text-[8px] text-center text-white w-12">
                <p className="leading-2">
                  Clubcard
                  <br />
                  Price
                </p>
              </div>
            </div>
            <div className="bg-white h-[26px] w-px" />
            <div className="flex-1 bg-[#fcd700] flex gap-1 h-[26px] items-center justify-start px-2 py-0 relative rounded-r">
              <div className="flex flex-col font-tesco-bold h-4 justify-center leading-none text-xs text-black">
                <p className="leading-4 overflow-hidden text-ellipsis">
                  {clubcardPromotion.offerText.includes('£') 
                    ? clubcardPromotion.offerText.match(/£[\d.]+/)?.[0] || formatPrice(price?.price)
                    : formatPrice(price?.price)
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex flex-wrap gap-1 h-[18px] items-baseline justify-start relative w-full">
          <p className="font-tesco-bold leading-[18px] text-[#333333] text-sm">
            {formatPrice(price?.price)}
          </p>
          {price?.unitPrice && price?.unitOfMeasure && (
            <p className="font-tesco-regular leading-4 text-[#666666] text-xs">
              £{price.unitPrice}/{price.unitOfMeasure}
            </p>
          )}
        </div>
      </div>

      {/* Selection Checkbox */}
      <button 
        className="absolute left-1.5 top-1.5 w-4 h-4 rounded shadow-sm cursor-pointer"
        onClick={handleCheckboxClick}
        aria-label={isSelected ? "Deselect product" : "Select product"}
      >
        <div className={cn(
          "w-4 h-4 rounded border border-gray-200",
          isSelected ? "bg-[#00539f] border-[#00539f]" : "bg-white"
        )}>
          {isSelected && (
            <svg 
              className="w-3 h-3 text-white m-0.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  )
}
