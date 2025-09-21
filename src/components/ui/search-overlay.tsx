import * as React from "react"
import { X } from "lucide-react"
import { SearchIcon } from "./search-icon"
import { cn } from "../../lib/utils"

interface SearchSuggestion {
  text: string
  query: string
}

interface SearchOverlayProps {
  isOpen: boolean
  searchTerm: string
  suggestions: SearchSuggestion[]
  onClose: () => void
  onSearchChange: (value: string) => void
  onSuggestionSelect: (suggestion: string) => void
  onSearch: (query: string) => void
  loading?: boolean
}

export function SearchOverlay({
  isOpen,
  searchTerm,
  suggestions,
  onClose,
  onSearchChange,
  onSuggestionSelect,
  onSearch,
  loading = false
}: SearchOverlayProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      // Show suggestions after initial animation
      setTimeout(() => setShowSuggestions(true), 100)
    } else {
      setShowSuggestions(false)
      setIsClosing(false)
    }
  }, [isOpen])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onSearch(searchTerm)
      handleClose()
    }
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setShowSuggestions(false)
    // Wait for search bar to contract before closing overlay
    setTimeout(() => onClose(), 200)
  }

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion)
    handleClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  // Always show exactly 5 suggestions
  const displaySuggestions = React.useMemo(() => {
    if (!searchTerm.trim()) {
      // Show first 5 suggestions when no search term
      return suggestions.slice(0, 5);
    }
    
    const filtered = suggestions.filter(suggestion =>
      suggestion.text.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    
    // Pad with original suggestions if filtered results are fewer than 5
    const remaining = suggestions.filter(s => !filtered.includes(s));
    return [...filtered, ...remaining].slice(0, 5);
  }, [suggestions, searchTerm]);

  const renderSuggestionText = (suggestion: SearchSuggestion) => {
    const query = searchTerm.toLowerCase()
    const text = suggestion.text.toLowerCase()
    
    if (!query || !text.startsWith(query)) {
      return <span>{suggestion.text}</span>
    }
    
    const matchedPart = suggestion.text.slice(0, query.length)
    const remainingPart = suggestion.text.slice(query.length)
    
    return (
      <span>
        <span className="font-tesco-regular">{matchedPart}</span>
        <span className="font-tesco-bold">{remainingPart}</span>
      </span>
    )
  }

  if (!isOpen) return null

  // Calculate dynamic height based on suggestions
  const searchBarHeight = showSuggestions && displaySuggestions.length > 0 
    ? 34 + (displaySuggestions.length * 30) // 34px input + suggestions (30px each)
    : 34; // 34px input only

  return (
    <div className="fixed inset-0 z-50">
      {/* Background overlay with blur and darken */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-300 ease-out",
          "backdrop-blur-[6px] bg-black/20",
          isClosing && "opacity-0"
        )}
        onClick={handleClose}
      />
      
       {/* Search container */}
       <div className="absolute inset-0 flex flex-col" style={{ padding: '0.75rem' }}>
         <div 
           className={cn(
             "bg-white/80 backdrop-blur-[6px] rounded-[20px] overflow-hidden",
             "border border-[#e5e5e5] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.05)]",
             "transition-all duration-200 ease-out transform",
             "animate-in slide-in-from-top-2 fade-in-0"
           )}
           style={{
             height: `${searchBarHeight}px`,
             boxSizing: 'border-box'
           }}
         >
          {/* Search input container */}
          <div className="flex items-center pl-3 pr-3" style={{ height: '34px' }}>
            <div className="flex items-center gap-2 flex-1">
              <SearchIcon 
                size={16}
                className="text-[#666666] flex-shrink-0" 
              />
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                className={cn(
                  "flex-1 bg-transparent border-0 outline-none h-full",
                  "text-sm text-[#666666] placeholder:text-[#666666]",
                  "font-tesco-regular leading-[18px]"
                )}
                placeholder="Search..."
                disabled={loading}
              />
              
               {/* Clear button */}
               <button
                 onClick={handleClose}
                 className={cn(
                   "flex items-center justify-center w-4 h-4 rounded-full",
                   "bg-[#666666] hover:bg-[#555555] transition-colors",
                   "flex-shrink-0"
                 )}
               >
                 <X className="w-2.5 h-2.5 text-white" />
               </button>
            </div>
          </div>
          
           {/* Suggestions - Show when expanded */}
           {showSuggestions && displaySuggestions.length > 0 && (
             <div 
               className={cn(
                 "transition-all duration-150 ease-out",
                 "animate-in slide-in-from-top-1 fade-in-0"
               )}
               style={{ 
                 paddingLeft: '36px', // 12px padding + 16px icon + 4px gap adjustment
                 paddingRight: '12px', 
                 paddingTop: '4px',
                 paddingBottom: '4px'
               }}
             >
               <div className="space-y-1">
                 {displaySuggestions.map((suggestion, index) => (
                   <button
                     key={`${suggestion.query}-${index}`}
                     onClick={() => handleSuggestionClick(suggestion.query)}
                     className={cn(
                       "block w-full text-left text-sm text-[#666666]",
                       "hover:text-[#333333] transition-colors",
                       "font-tesco-regular leading-[18px]",
                       "animate-in slide-in-from-left-1 fade-in-0",
                       "py-1.5"
                     )}
                     style={{ 
                       animationDelay: `${index * 30}ms`,
                       animationFillMode: 'both'
                     }}
                   >
                     {renderSuggestionText(suggestion)}
                   </button>
                 ))}
               </div>
             </div>
           )}
           
           {/* Subtle inner shadow - same as original search bar */}
           <div 
             className="absolute inset-0 pointer-events-none rounded-[20px]"
             style={{ boxShadow: '0px -1px 1px 0px inset rgba(0,0,0,0.03)' }}
           />
        </div>
      </div>
    </div>
  )
}
