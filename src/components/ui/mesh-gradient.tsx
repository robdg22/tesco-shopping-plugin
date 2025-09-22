import * as React from "react"
import { MeshGradient as PaperMeshGradient } from '@paper-design/shaders-react'
import { cn } from "../../lib/utils"

interface MeshGradientProps {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export function MeshGradient({ className, children, style }: MeshGradientProps) {
  return (
    <div 
      className={cn(
        "relative w-full h-full overflow-hidden",
        className
      )}
      style={style}
    >
      {/* Paper Design Mesh Gradient */}
      <PaperMeshGradient 
        speed={0.36} 
        colors={['#FFFFFF', '#F6F6F6', '#E5E5E5']} 
        distortion={0.77} 
        swirl={0.99} 
        grainMixer={0.1} 
        grainOverlay={0} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%',
          zIndex: 0
        }} 
      />
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
