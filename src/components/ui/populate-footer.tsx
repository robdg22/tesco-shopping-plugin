import * as React from 'react';

const forwardIcon = "data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.29077 3.88744L15.6963 11.9995L7.29102 20.1039L8.33217 21.1837L17.8569 12L8.33242 2.80811L7.29077 3.88744Z' fill='white'/%3E%3C/svg%3E";

const checkIconPath = "M7.20847 15.8187L18 5.02721L17.154 4.18125L7.20847 14.1268L2.84596 9.76432L2 10.6103L7.20847 15.8187Z";

type Platform = 'app' | 'mobile-web' | 'desktop-web';

interface PopulateFooterProps {
  onPopulate: () => void;
  productCount?: number;
  platform: string;
  layout: string;
  onPlatformChange: (platform: string) => void;
  onLayoutChange: (layout: string) => void;
  onOpenSettings: () => void;
  disabled?: boolean;
}

interface LayoutOption {
  value: string;
  label: string;
  icon: string;
}

// Platform Dropdown Component
function PlatformDropdown({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredOption, setHoveredOption] = React.useState<Platform | null>(null);
  const [showAbove, setShowAbove] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Tooltip state
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [hasShownTooltip, setHasShownTooltip] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (hasShownTooltip) {
      setShowTooltip(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
        setHasShownTooltip(true);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  // Calculate tooltip position for platform dropdown immediately
  const calculatePlatformTooltipPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipWidth = 120; // Approximate tooltip width for "Select platform"
      const margin = 12;
      
      let left = '50%';
      let transform = 'translateX(-50%)';
      
      // Check if tooltip would go off the left edge
      if (buttonRect.left + (buttonRect.width / 2) - (tooltipWidth / 2) < margin) {
        left = `${margin}px`;
        transform = 'translateX(0)';
      }
      // Check if tooltip would go off the right edge
      else if (buttonRect.right - (buttonRect.width / 2) + (tooltipWidth / 2) > window.innerWidth - margin) {
        left = `${window.innerWidth - tooltipWidth - margin}px`;
        transform = 'translateX(0)';
      }
      
      return { left, transform };
    }
    return { left: '50%', transform: 'translateX(-50%)' };
  };

  const platformLabels: Record<Platform, string> = {
    'app': 'App',
    'mobile-web': 'Mweb',
    'desktop-web': 'Desktop'
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuHeight = 120;
      const spaceAbove = buttonRect.top;
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      setShowAbove(spaceAbove >= menuHeight || spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  const handleSelect = (platform: Platform) => {
    onChange(platform);
    setIsOpen(false);
  };

  const currentPlatform = value as Platform;
  const scalePressed = 0.98;
  const scaleHovered = 1.02;

  return (
    <div className="relative" ref={dropdownRef}>
      <style>{`
        @keyframes dropdownSlideFromTop {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes dropdownSlideFromBottom {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="box-border flex h-[28px] items-center pl-[12px] pr-[4px] py-[4px] relative w-[110px] bg-white overflow-clip rounded-[8px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.03),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_1px_-0.5px_rgba(0,0,0,0.04),0px_2px_2px_-1px_rgba(0,0,0,0.04),0px_4px_4px_-2px_rgba(0,0,0,0.04),0px_8px_8px_-4px_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-out"
        style={{
          transform: `scale(${isPressed ? scalePressed : isHovered ? scaleHovered : 1})`
        }}
      >
        <div className="flex gap-[4px] grow h-[24px] items-center pb-[2px]">
          <div className="flex gap-[16px] grow items-start overflow-clip">
            <p className="leading-[18px] overflow-ellipsis overflow-hidden text-sm text-[#333333] whitespace-nowrap">
              {platformLabels[currentPlatform]}
            </p>
          </div>
          <div className="flex gap-[8px] items-center relative shrink-0 w-[24px] h-[24px]">
            <svg
              className="absolute inset-0 size-[24px] text-[#666666] transition-all duration-150"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: 'rotate(0deg)',
                opacity: isOpen ? 0 : 1,
                filter: isOpen ? 'blur(2px)' : 'blur(0px)',
              }}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg
              className="absolute inset-0 size-[24px] text-[#666666] transition-all duration-150"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: 'rotate(180deg)',
                opacity: isOpen ? 1 : 0,
                filter: isOpen ? 'blur(0px)' : 'blur(2px)',
              }}
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div 
          className={`absolute left-0 w-[110px] z-50 ${showAbove ? 'bottom-full mb-2' : 'top-full mt-2'}`}
          onMouseLeave={() => setHoveredOption(null)}
          style={{
            animationName: showAbove ? 'dropdownSlideFromBottom' : 'dropdownSlideFromTop',
            animationDuration: '100ms',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'backwards',
            transformOrigin: showAbove ? 'bottom center' : 'top center'
          }}
        >
          <div className="bg-[#222222] relative rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_2px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-start overflow-clip p-[8px] gap-0">
              {(['app', 'mobile-web', 'desktop-web'] as Platform[]).map((platform) => (
                <button
                  key={platform}
                  onClick={() => handleSelect(platform)}
                  onMouseEnter={() => setHoveredOption(platform)}
                  className={`flex gap-[4px] items-center pl-[4px] pr-[8px] py-[4px] rounded-[4px] w-full cursor-pointer ${
                    hoveredOption === platform ? 'bg-[#007eb3] overflow-clip' : ''
                  }`}
                >
                  <div className="relative shrink-0 w-[20px] h-[20px]">
                    {currentPlatform === platform && (
                      <svg className="block w-full h-full" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d={checkIconPath} />
                      </svg>
                    )}
                  </div>
                  <p className="leading-[18px] text-sm text-white whitespace-nowrap">
                    {platformLabels[platform]}
                  </p>
                  {hoveredOption === platform && (
                    <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.1)] rounded-[4px]" />
                  )}
                </button>
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.08)] rounded-[8px]" />
          </div>
        </div>
      )}
      
      {/* Platform Tooltip */}
      {showTooltip && !isOpen && (
        <div
          className="absolute bottom-full mb-[8px] pointer-events-none z-20"
          style={{
            animation: 'fadeInScale 100ms ease-out',
            ...calculatePlatformTooltipPosition(),
          }}
        >
          <style>{`
            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(4px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
              }
            }
          `}</style>
          <div className="bg-[#222222] relative rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_2px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-4px_rgba(0,0,0,0.08)] px-[8px] py-[4px]">
            <p className="text-sm text-white whitespace-nowrap">
              Select platform
            </p>
            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.08)] rounded-[8px]" />
          </div>
        </div>
      )}
    </div>
  );
}

// Icon components using exact SVG paths from project
function GridIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg 
        className="block size-full" 
        fill="none" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        style={isActive ? {
          filter: 'drop-shadow(0 0 16px rgba(0, 126, 179, 0.32)) drop-shadow(0 0 8px rgba(0, 126, 179, 0.16)) drop-shadow(0 0 4px rgba(0, 126, 179, 0.08)) drop-shadow(0 0 2px rgba(0, 126, 179, 0.08)) drop-shadow(0 0 1px rgba(0, 126, 179, 0.08))'
        } : undefined}
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M18 2H11.5135V8.48649H18V2ZM12.8108 7.18919V3.2973H16.7027V7.18919H12.8108Z" fill={isActive ? "#007EB3" : "#666666"} />
        <path fillRule="evenodd" clipRule="evenodd" d="M2 18V11.5135H8.48649V18H2ZM3.2973 12.8108V16.7027H7.18919V12.8108H3.2973Z" fill={isActive ? "#007EB3" : "#666666"} />
        <path fillRule="evenodd" clipRule="evenodd" d="M11.5135 11.5135V18H18V11.5135H11.5135ZM12.8108 16.7027V12.8108H16.7027V16.7027H12.8108Z" fill={isActive ? "#007EB3" : "#666666"} />
        <path fillRule="evenodd" clipRule="evenodd" d="M2 8.48649V2H8.48649V8.48649H2ZM3.2973 3.2973V7.18919H7.18919V3.2973H3.2973Z" fill={isActive ? "#007EB3" : "#666666"} />
      </svg>
    </div>
  );
}

function VerticalIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg 
        className="block size-full" 
        fill="none" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        style={isActive ? {
          filter: 'drop-shadow(0 0 16px rgba(0, 126, 179, 0.32)) drop-shadow(0 0 8px rgba(0, 126, 179, 0.16)) drop-shadow(0 0 4px rgba(0, 126, 179, 0.08)) drop-shadow(0 0 2px rgba(0, 126, 179, 0.08)) drop-shadow(0 0 1px rgba(0, 126, 179, 0.08))'
        } : undefined}
      >
        <path d="M10.6701 15.4347L17.0524 9.05237L18 10L10 18L2 10L2.94763 9.05237L9.32993 15.4347V2H10.6701V15.4347Z" fill={isActive ? "#007EB3" : "#666666"} />
      </svg>
    </div>
  );
}

function HorizontalIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg 
        className="block size-full" 
        fill="none" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
        style={isActive ? {
          filter: 'drop-shadow(0 0 16px rgba(0, 126, 179, 0.32)) drop-shadow(0 0 8px rgba(0, 126, 179, 0.16)) drop-shadow(0 0 4px rgba(0, 126, 179, 0.08)) drop-shadow(0 0 2px rgba(0, 126, 179, 0.08)) drop-shadow(0 0 1px rgba(0, 126, 179, 0.08))'
        } : undefined}
      >
        <path d="M15.4347 9.32993L9.05237 2.94763L10 2L18 10L10 18L9.05237 17.0524L15.4347 10.6701H2V9.32993H15.4347Z" fill={isActive ? "#007EB3" : "#666666"} />
      </svg>
    </div>
  );
}

function LayoutSegmentedControl({ value, onChange, options }: {
  value: string;
  onChange: (value: string) => void;
  options: LayoutOption[];
}) {
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [hasShownTooltip, setHasShownTooltip] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = (optionValue: string) => {
    setHoveredOption(optionValue);
    
    if (hasShownTooltip) {
      setShowTooltip(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(true);
        setHasShownTooltip(true);
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredOption(null);
    setShowTooltip(false);
  };

  // Calculate tooltip position for segmented control immediately
  const calculateSegmentedTooltipPosition = () => {
    if (hoveredOption && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const hoveredIndex = options.findIndex(opt => opt.value === hoveredOption);
      const tooltipWidth = 80; // Approximate tooltip width for layout names
      const margin = 12;
      
      // Calculate the center position of the hovered segment
      const segmentCenter = (hoveredIndex * 44) + 22; // 44px per segment + 22px to center
      const tooltipLeft = containerRect.left + segmentCenter;
      
      let left = `${segmentCenter}px`;
      let transform = 'translateX(-50%)';
      
      // Check if tooltip would go off the left edge
      if (tooltipLeft - (tooltipWidth / 2) < margin) {
        left = `${margin - containerRect.left}px`;
        transform = 'translateX(0)';
      }
      // Check if tooltip would go off the right edge
      else if (tooltipLeft + (tooltipWidth / 2) > window.innerWidth - margin) {
        left = `${window.innerWidth - margin - containerRect.left}px`;
        transform = 'translateX(0)';
      }
      
      return { left, transform };
    }
    return { left: '50%', transform: 'translateX(-50%)' };
  };

  const activeIndex = options.findIndex(opt => opt.value === value);
  const activeOption = options.find(opt => opt.value === value);

  const getIcon = (optionValue: string, isActive: boolean) => {
    switch (optionValue) {
      case 'grid':
        return <GridIcon isActive={isActive} />;
      case 'vertical':
        return <VerticalIcon isActive={isActive} />;
      case 'horizontal':
        return <HorizontalIcon isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="bg-neutral-200 h-[32px] rounded-[16px] shadow-[0px_-1px_1px_1px_rgba(255,255,255,0.12),0px_0px_0px_1px_rgba(0,0,0,0.1)] flex items-center px-[2px] py-0 relative"
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated background */}
        <div
          className="absolute bg-white rounded-[36px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.01),0px_1px_1px_-0.5px_rgba(0,0,0,0.04),0px_2px_2px_-1px_rgba(0,0,0,0.04),0px_4px_4px_-2px_rgba(0,0,0,0.04),0px_8px_8px_-4px_rgba(0,0,0,0.03)] h-[28px] w-[44px]"
          style={{
            transform: `translateX(${activeIndex * 44}px)`,
            transition: 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none shadow-[0px_-1px_0.4px_0px_inset_rgba(0,0,0,0.03)] rounded-[36px]" />
        </div>

        {/* Control items */}
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            onMouseEnter={() => handleMouseEnter(option.value)}
            className="box-border content-stretch flex items-center justify-center px-[12px] py-[4px] relative rounded-[36px] shrink-0 cursor-pointer z-10"
            style={{
              transform: hoveredOption === option.value && value !== option.value 
                ? 'scale(1.03)' 
                : 'scale(1)',
            }}
            onMouseDown={(e) => {
              if (value !== option.value) {
                e.currentTarget.style.transform = 'scale(0.97)';
              }
            }}
            onMouseUp={(e) => {
              if (value !== option.value) {
                e.currentTarget.style.transform = hoveredOption === option.value ? 'scale(1.03)' : 'scale(1)';
              }
            }}
            title={`${option.label} layout`}
          >
            {getIcon(option.value, value === option.value)}
          </button>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredOption && showTooltip && (
        <div
          className="absolute bottom-full mb-[8px] pointer-events-none z-20"
          style={{
            animation: 'fadeInScale 100ms ease-out',
            ...calculateSegmentedTooltipPosition(),
          }}
        >
          <style>{`
            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: translateX(-50%) translateY(4px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
              }
            }
          `}</style>
          <div className="bg-[#222222] relative rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_2px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-4px_rgba(0,0,0,0.08)] px-[8px] py-[4px]">
            <p className="text-sm text-white whitespace-nowrap max-w-[200px]">
              {options.find(opt => opt.value === hoveredOption)?.label}
            </p>
            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.08)] rounded-[8px]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function PopulateFooter({ 
  onPopulate, 
  productCount = 0,
  platform,
  layout,
  onPlatformChange,
  onLayoutChange,
  onOpenSettings,
  disabled = false
}: PopulateFooterProps) {
  const platformOptions = [
    { value: 'app', label: 'App' },
    { value: 'mobile-web', label: 'Mobile Web' },
    { value: 'desktop-web', label: 'Desktop Web' }
  ];

  const layoutOptions: LayoutOption[] = [
    { value: 'grid', label: 'Grid', icon: 'grid' },
    { value: 'vertical', label: 'Vertical', icon: 'vertical' },
    { value: 'horizontal', label: 'Horizontal', icon: 'horizontal' }
  ];

  // Tooltip state for settings button
  const [showSettingsTooltip, setShowSettingsTooltip] = React.useState(false);
  const [hasShownSettingsTooltip, setHasShownSettingsTooltip] = React.useState(false);
  const settingsTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const settingsButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleSettingsMouseEnter = () => {
    if (hasShownSettingsTooltip) {
      setShowSettingsTooltip(true);
    } else {
      settingsTimeoutRef.current = setTimeout(() => {
        setShowSettingsTooltip(true);
        setHasShownSettingsTooltip(true);
      }, 1000);
    }
  };

  const handleSettingsMouseLeave = () => {
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current);
      settingsTimeoutRef.current = null;
    }
    setShowSettingsTooltip(false);
  };

  // Calculate tooltip position for settings button - fixed to left edge
  const calculateSettingsTooltipPosition = () => {
    return { left: '0px', transform: 'translateX(0)' };
  };

  // Tooltip state for submit button
  const [showSubmitTooltip, setShowSubmitTooltip] = React.useState(false);
  const [hasShownSubmitTooltip, setHasShownSubmitTooltip] = React.useState(false);
  const submitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmitMouseEnter = () => {
    if (hasShownSubmitTooltip) {
      setShowSubmitTooltip(true);
    } else {
      submitTimeoutRef.current = setTimeout(() => {
        setShowSubmitTooltip(true);
        setHasShownSubmitTooltip(true);
      }, 1000);
    }
  };

  const handleSubmitMouseLeave = () => {
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = null;
    }
    setShowSubmitTooltip(false);
  };

  // Calculate tooltip position for submit button - fixed to right edge
  const calculateSubmitTooltipPosition = () => {
    return { right: '0px', left: 'auto', transform: 'translateX(0)' };
  };

  return (
    <div className="flex gap-5 items-center justify-between w-full">
      <div className="relative">
        <button
          ref={settingsButtonRef}
          onClick={onOpenSettings}
          onMouseEnter={handleSettingsMouseEnter}
          onMouseLeave={handleSettingsMouseLeave}
          className="text-gray-600 hover:text-gray-800 p-1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.1928 1.74936L14.8081 1.75464L14.8728 2.43271C14.9601 3.34635 15.475 4.15995 16.2764 4.62202C16.7041 4.86777 17.1911 4.998 17.6822 4.998C18.0968 4.998 18.5052 4.9079 18.8848 4.73528L19.5029 4.45417L22.3152 9.29863L21.7551 9.69448C21.002 10.2267 20.553 11.0775 20.5522 11.9996L19.0522 11.9984C19.0532 10.8167 19.5348 9.71466 20.3567 8.91271L18.8609 6.33601C18.4796 6.44261 18.0837 6.498 17.6822 6.498C16.9275 6.498 16.1827 6.29832 15.5284 5.92222C14.5038 5.33166 13.7855 4.3647 13.4987 3.25341L10.5031 3.25059C10.2168 4.36314 9.4992 5.33035 8.47395 5.92168L8.47262 5.92245C7.81134 6.30205 7.05851 6.502 6.29323 6.502C5.90078 6.502 5.51188 6.44927 5.13673 6.34689L3.65237 8.90709C4.46895 9.71432 4.94823 10.8259 4.94823 12C4.94823 13.1741 4.46895 14.2857 3.65237 15.0929L5.13673 17.6531C5.51188 17.5507 5.90078 17.498 6.29323 17.498C7.05851 17.498 7.81134 17.698 8.47262 18.0776L8.47395 18.0783C9.4992 18.6697 10.2168 19.6369 10.5031 20.7494L13.4987 20.7466C13.7855 19.6353 14.5031 18.6688 15.5277 18.0782C16.182 17.7021 16.9275 17.502 17.6822 17.502C18.0837 17.502 18.4796 17.5574 18.8609 17.664L20.3567 15.0873C19.5348 14.2853 19.0532 13.1833 19.0522 12.0016L20.5522 11.9996C20.553 12.9217 21.002 13.7733 21.7551 14.3055L22.3152 14.7014L19.5029 19.5458L18.8848 19.2647C18.5052 19.0921 18.0968 19.002 17.6822 19.002C17.1911 19.002 16.704 19.1323 16.2763 19.3781C15.4749 19.8402 14.9601 20.6537 14.8728 21.5673L14.8081 22.2454L9.1928 22.2506L9.12856 21.5705C9.04212 20.6554 8.52752 19.8412 7.72546 19.3782C7.29283 19.13 6.79781 18.998 6.29323 18.998C5.88377 18.998 5.47935 19.0853 5.10728 19.2523L4.49049 19.529L1.69861 14.7137L2.25275 14.3171C2.99733 13.7842 3.44823 12.9182 3.44823 12C3.44823 11.0819 2.99733 10.2158 2.25275 9.68291L1.69861 9.28633L4.49049 4.47097L5.10728 4.74773C5.47935 4.91469 5.88376 5.002 6.29323 5.002C6.79768 5.002 7.29257 4.8701 7.72512 4.62197C8.52737 4.159 9.04211 3.34471 9.12856 2.42947L9.1928 1.74936Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.74999 12C7.74999 9.65279 9.65277 7.75 12 7.75C14.3472 7.75 16.25 9.65279 16.25 12C16.25 14.3472 14.3472 16.25 12 16.25C9.65277 16.25 7.74999 14.3472 7.74999 12ZM12 9.25C10.4812 9.25 9.24999 10.4812 9.24999 12C9.24999 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25Z" fill="currentColor"/>
          </svg>
        </button>
        
        {/* Settings Tooltip */}
        {showSettingsTooltip && (
          <div
            className="absolute bottom-full mb-[8px] pointer-events-none z-20"
            style={{
              animation: 'fadeInScaleFixed 100ms ease-out',
              ...calculateSettingsTooltipPosition(),
            }}
          >
            <style>{`
              @keyframes fadeInScaleFixed {
                from {
                  opacity: 0;
                  transform: translateY(4px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>
            <div className="bg-[#222222] relative rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_2px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-4px_rgba(0,0,0,0.08)] px-[8px] py-[4px]">
              <p className="text-sm text-white whitespace-nowrap">
                Configure components
              </p>
              <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.08)] rounded-[8px]" />
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-5 items-center">
        {/* Platform Dropdown */}
        <PlatformDropdown
          value={platform}
          onChange={onPlatformChange}
        />
        
        {/* Layout Segmented Control */}
        <LayoutSegmentedControl
          value={layout}
          onChange={onLayoutChange}
          options={layoutOptions}
        />
        
        <div className="relative">
      <button
            ref={submitButtonRef}
        onClick={disabled ? undefined : onPopulate}
            onMouseEnter={disabled ? undefined : handleSubmitMouseEnter}
            onMouseLeave={disabled ? undefined : handleSubmitMouseLeave}
        disabled={disabled}
        className={`overflow-clip relative shrink-0 size-[40px] transition-all duration-200 focus:outline-none ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 active:scale-95 cursor-pointer'}`}
        style={{
          borderRadius: '40px',
          background: '#E81C2D',
          boxShadow: '0 0 4px 5px rgba(255, 255, 255, 0.07) inset, 0 1px 1px 0 rgba(255, 255, 255, 0.25) inset, 0 -1px 1px 0 rgba(0, 0, 0, 0.21) inset, 0 1px 0 0 rgba(0, 0, 0, 0.02), 0 1px 1px -0.5px rgba(0, 0, 0, 0.06), 0 2px 2px -1px rgba(0, 0, 0, 0.06), 0 4px 4px -2px rgba(0, 0, 0, 0.06), 0 8px 8px -4px rgba(0, 0, 0, 0.06), 0 0 12px 1px rgba(232, 28, 45, 0.10)'
        }}
        data-name="icon-button-elevated" 
        data-node-id="215:49242"
        aria-label="Populate product tiles"
      >
        <div 
          className="absolute size-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%]" 
          data-name="24px Icons/Forward" 
          data-node-id="I215:49242;86:12065" 
          style={{ left: "calc(50% + 0.5px)" }}
        >
          <div 
            className="absolute inset-0" 
            data-name="icon" 
            data-node-id="I215:49242;86:12065;757:17868"
          >
            <img 
              alt="Populate tiles" 
              className="block max-w-none size-full" 
              src={forwardIcon} 
            />
          </div>
        </div>
      </button>
          
          {/* Submit Tooltip */}
          {showSubmitTooltip && (
            <div
              className="absolute bottom-full mb-[8px] pointer-events-none z-20"
              style={{
                animation: 'fadeInScaleFixed 100ms ease-out',
                ...calculateSubmitTooltipPosition(),
              }}
            >
              <style>{`
                @keyframes fadeInScaleFixed {
                  from {
                    opacity: 0;
                    transform: translateY(4px) scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
              `}</style>
              <div className="bg-[#222222] relative rounded-[8px] shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_2px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-4px_rgba(0,0,0,0.08)] px-[8px] py-[4px]">
                <p className="text-sm text-white whitespace-nowrap">
                  Fill {productCount} tiles
                </p>
                <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.08)] rounded-[8px]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
