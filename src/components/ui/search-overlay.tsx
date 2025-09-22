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
  onSearchFieldVisualUpdate: (value: string) => void
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
  onSearchFieldVisualUpdate,
  onSuggestionSelect,
  onSearch,
  loading = false
}: SearchOverlayProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [previousSelectedIndex, setPreviousSelectedIndex] = React.useState(-1)
  const [originalSearchTerm, setOriginalSearchTerm] = React.useState('')

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

  // Reset selected index when suggestions change and store original term
  React.useEffect(() => {
    setSelectedIndex(-1)
    setPreviousSelectedIndex(-1)
    setOriginalSearchTerm(searchTerm)
  }, [suggestions])

  // Store original search term when overlay opens
  React.useEffect(() => {
    if (isOpen) {
      setOriginalSearchTerm(searchTerm)
    }
  }, [isOpen])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = selectedIndex === -1 ? 0 : (selectedIndex < displaySuggestions.length - 1 ? selectedIndex + 1 : selectedIndex)
      setPreviousSelectedIndex(selectedIndex)
      setSelectedIndex(newIndex)
      
      // Update search field with highlighted suggestion (visual only, no new API calls)
      if (newIndex >= 0 && newIndex < displaySuggestions.length) {
        const suggestion = displaySuggestions[newIndex]
        onSearchFieldVisualUpdate(suggestion.text)
        
        // Set cursor to end of text
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(suggestion.text.length, suggestion.text.length)
          }
        }, 0)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = selectedIndex === -1 ? displaySuggestions.length - 1 : selectedIndex - 1
      setPreviousSelectedIndex(selectedIndex)
      setSelectedIndex(newIndex)
      
      // Update search field with highlighted suggestion or restore original (visual only, no new API calls)
      if (newIndex >= 0 && newIndex < displaySuggestions.length) {
        const suggestion = displaySuggestions[newIndex]
        onSearchFieldVisualUpdate(suggestion.text)
        
        // Set cursor to end of text
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(suggestion.text.length, suggestion.text.length)
          }
        }, 0)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < displaySuggestions.length) {
        // Select the highlighted suggestion
        const selectedSuggestion = displaySuggestions[selectedIndex]
        onSuggestionSelect(selectedSuggestion.query)
        handleClose()
      } else if (searchTerm.trim()) {
        // No suggestion selected, search with current term
        onSearch(searchTerm)
        handleClose()
      }
    } else if (e.key === 'Escape') {
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
    // Clear selection when typing
    setPreviousSelectedIndex(selectedIndex)
    setSelectedIndex(-1)
    onSearchChange(e.target.value)
  }

  // Show all suggestions from API, up to 10
  const displaySuggestions = React.useMemo(() => {
    // Don't filter suggestions - the API already returns relevant suggestions
    // Just show all suggestions received from the API
    return suggestions.slice(0, 10);
  }, [suggestions]);

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
    ? 34 + (displaySuggestions.length * 38) + 6 // 34px input + suggestions (38px each) + 8px padding
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
             "transition-all duration-200 ease-out transform",
             "animate-in slide-in-from-top-2 fade-in-0"
           )}
           style={{
             height: `${searchBarHeight}px`,
             boxSizing: 'border-box',
             boxShadow: '0 -1px 0 0 rgba(0, 0, 0, 0.04) inset, 0 1px 0 0 rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 1px -0.5px rgba(0, 0, 0, 0.04), 0 2px 2px -1px rgba(0, 0, 0, 0.04), 0 4px 4px -2px rgba(0, 0, 0, 0.04), 0 8px 8px -4px rgba(0, 0, 0, 0.04), 0 0 0 2px rgba(255, 255, 255, 0.20)'
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
                onKeyDown={handleKeyDown}
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
                 "relative transition-all duration-150 ease-out",
                 "animate-in slide-in-from-top-1 fade-in-0"
               )}
               style={{ 
                 paddingTop: '4px',
                 paddingBottom: '4px'
               }}
             >
               {/* Base layer - inactive text (gray) */}
               <div className="relative" onMouseLeave={() => {
                 setPreviousSelectedIndex(selectedIndex)
                 setSelectedIndex(-1)
               }}>
                 {displaySuggestions.map((suggestion, index) => (
                   <button
                     key={`${suggestion.query}-${index}`}
                     onClick={() => handleSuggestionClick(suggestion.query)}
                     onMouseEnter={() => {
                       setPreviousSelectedIndex(selectedIndex)
                       setSelectedIndex(index)
                     }}
                     className={cn(
                       "block w-full text-left text-sm font-tesco-regular leading-[18px]",
                       "h-[38px] flex items-center",
                       "animate-in slide-in-from-left-1 fade-in-0",
                       "text-[#666666] hover:text-[#333333]"
                     )}
                     style={{ 
                       paddingLeft: '36px', // 12px padding + 16px icon + 8px gap
                       paddingRight: '12px',
                       animationDelay: `${index * 30}ms`,
                       animationFillMode: 'both'
                     }}
                   >
                     {renderSuggestionText(suggestion)}
                   </button>
                 ))}
               </div>

               {/* Clipping path overlay - active background + white text */}
               <div 
                 className="absolute top-0 left-0 right-0 pointer-events-none"
                 style={{
                   height: `${displaySuggestions.length * 38 + 8}px`, // Total height of all suggestions + padding
                   background: '#007eb3',
                   clipPath: selectedIndex >= 0 
                     ? `inset(${4 + (selectedIndex * 38)}px 0 ${4 + ((displaySuggestions.length - selectedIndex - 1) * 38)}px 0 round 0px)`
                     : 'inset(100% 0 0 0)',
                   transition: (previousSelectedIndex === -1 && selectedIndex === 0) || (previousSelectedIndex === 0 && selectedIndex === -1) ? 'none' : 'clip-path 200ms cubic-bezier(0.77, 0, 0.175, 1)',
                   boxShadow: '0px 0px 12px 1px rgba(0,126,179,0.1)'
                 }}
               >
                 {displaySuggestions.map((suggestion, index) => (
                   <button
                     key={`overlay-${suggestion.query}-${index}`}
                     className={cn(
                       "block w-full text-left text-sm font-tesco-regular leading-[18px]",
                       "h-[38px] flex items-center pointer-events-auto",
                       "text-white"
                     )}
                     style={{ 
                       paddingLeft: '36px',
                       paddingRight: '12px',
                       marginTop: index === 0 ? '4px' : '0px'
                     }}
                     onClick={() => handleSuggestionClick(suggestion.query)}
                     onMouseEnter={() => {
                       setPreviousSelectedIndex(selectedIndex)
                       setSelectedIndex(index)
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
