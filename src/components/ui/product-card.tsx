import * as React from "react"
import { cn } from "../../lib/utils"

interface ProductCardProps {
  id: string
  title: string
  brandName?: string
  shortDescription?: string
  defaultImageUrl?: string
  media?: {
    defaultImage?: {
      url: string;
      aspectRatio?: number;
    };
    images?: Array<{
      url: string;
      aspectRatio?: number;
    }>;
  }
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
  media,
  price,
  promotions = [],
  isNew = false,
  averageRating,
  reviewCount,
  isSelected = false,
  onSelect,
  className
}: ProductCardProps) {
  // Get the best available image with aspect ratio
  const getImageData = () => {
    // Try media.defaultImage first (primary image with aspect ratio)
    if (media?.defaultImage?.url) {
      return {
        url: media.defaultImage.url,
        aspectRatio: media.defaultImage.aspectRatio
      }
    }
    
    // Try first image from media.images array
    if (media?.images && media.images.length > 0) {
      const primaryImage = media.images[0]
      return {
        url: primaryImage.url,
        aspectRatio: primaryImage.aspectRatio
      }
    }
    
    // Fallback to defaultImageUrl (no aspect ratio available)
    return {
      url: defaultImageUrl,
      aspectRatio: undefined
    }
  }

  const imageData = getImageData()

  // Get appropriate aspect ratio class based on the actual aspect ratio
  const getAspectRatioClass = (aspectRatio?: number) => {
    if (!aspectRatio) return "aspect-square" // Default fallback
    
    if (Math.abs(aspectRatio - 0.8) < 0.1) {
      // 4:5 aspect ratio (0.8)
      return "aspect-[4/5]"
    } else if (Math.abs(aspectRatio - 1.0) < 0.1) {
      // Square (1:1)
      return "aspect-square"
    } else if (Math.abs(aspectRatio - 1.25) < 0.1) {
      // 5:4 aspect ratio (1.25)
      return "aspect-[5/4]"
    } else if (aspectRatio < 1) {
      // Portrait - use closest portrait ratio
      return "aspect-[4/5]"
    } else if (aspectRatio > 1) {
      // Landscape - use closest landscape ratio
      return "aspect-[5/4]"
    }
    
    return "aspect-square" // Default
  }

  const aspectRatioClass = getAspectRatioClass(imageData.aspectRatio)

  // Check if product has Clubcard promotion
  const clubcardPromotion = promotions.find(promo => {
    if (!promo) return false
    const promotionType = promo.promotionType?.toLowerCase() || ''
    const offerText = promo.offerText?.toLowerCase() || ''
    return promotionType.includes('clubcard') || offerText.includes('clubcard')
  })

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
            className={`${aspectRatioClass} bg-center bg-cover bg-no-repeat w-full bg-gray-100`}
            style={{ 
              backgroundImage: imageData.url ? `url('${imageData.url}')` : 'none'
            }}
          >
            {!imageData.url && (
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
                className="w-3 h-3 text-[#AC9200] fill-current" 
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
          <div className="relative flex items-center justify-start rounded w-full shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_2px_2px_0px_rgba(0,0,0,0.1)]">
            <div className="bg-[#00539f] flex flex-col h-[26px] items-center justify-center overflow-clip px-1 py-0 relative rounded-bl rounded-tl shrink-0 w-[50px]">
              <div className="flex flex-col font-tesco-bold justify-center leading-[8px] text-[8px] text-center text-white w-12">
                <p>
                  Clubcard<br />Price
                </p>
              </div>
            </div>
            <div className="bg-white h-[26px] w-px" />
            <div className="flex-1 bg-[#fcd700] flex gap-1 h-[26px] items-center justify-start px-2 py-0 relative rounded-br rounded-tr">
              <div className="flex flex-col font-tesco-bold h-4 justify-center leading-4 text-xs text-black overflow-ellipsis overflow-hidden w-[39px]">
                <p className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {clubcardPromotion.offerText || formatPrice(price?.price)}
                </p>
              </div>
              {/* Inner highlight only on yellow section with rounded corners */}
              <div className="absolute inset-0 pointer-events-none shadow-[0.5px_0px_0px_0px_inset_rgba(255,255,255,0.55)] rounded-br rounded-tr" />
            </div>
            {/* Outer shadow overlay only on the complete bar */}
            <div className="absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(255,255,255,0.25),0px_-2px_4px_0px_inset_rgba(0,0,0,0.25)] rounded" />
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
        className={cn(
          "absolute left-1.5 top-1.5 w-4 h-4 cursor-pointer flex items-center justify-center",
          isSelected 
            ? "border-none" 
            : "bg-white border border-[#d1d1d1] rounded shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_2px_2px_0px_rgba(0,0,0,0.1)]"
        )}
        style={isSelected ? {
          borderRadius: '3px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 100%), #007EB3',
          boxShadow: '0 0 0.3px 1px rgba(0, 108, 153, 0.60) inset, 0 2px 1px 0 rgba(255, 255, 255, 0.14) inset, 0 1px 2px 0.5px rgba(0, 126, 179, 0.20)'
        } : {}}
        onClick={handleCheckboxClick}
        aria-label={isSelected ? "Deselect product" : "Select product"}
      >
        {isSelected && (
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_i_182_48279)">
              <path d="M5.66666 13.0404L14.6869 4.02022L13.9798 3.31311L5.66666 11.6262L2.02022 7.97978L1.31311 8.68688L5.66666 13.0404Z" fill="white"/>
            </g>
            <defs>
              <filter id="filter0_i_182_48279" x="0" y="0" width="16" height="16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="0.375"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_182_48279"/>
              </filter>
            </defs>
          </svg>
        )}
      </button>
    </div>
  )
}
