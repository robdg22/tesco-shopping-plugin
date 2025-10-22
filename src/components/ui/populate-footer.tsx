import * as React from 'react';

const forwardIcon = "data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.29077 3.88744L15.6963 11.9995L7.29102 20.1039L8.33217 21.1837L17.8569 12L8.33242 2.80811L7.29077 3.88744Z' fill='white'/%3E%3C/svg%3E";

const checkIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.33398 10L8.33398 15L16.6673 5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const chevronDownIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

// Add animation styles with single variant
const animationStyles = `
  @keyframes dropdownSlide {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label?: string;
}

function CustomDropdown({ value, onChange, options, label }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);
  const [showAbove, setShowAbove] = React.useState(true);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Inject animation styles on mount
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = animationStyles;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuHeight = 120; // Approximate height of dropdown menu
      const spaceAbove = buttonRect.top;
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      setShowAbove(spaceAbove >= menuHeight || spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="box-border flex h-7 items-center pl-3 pr-1 py-1 relative shrink-0 bg-white overflow-clip rounded-lg shadow-[0px_1px_0px_0px_rgba(0,0,0,0.03),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_1px_-0.5px_rgba(0,0,0,0.04),0px_2px_2px_-1px_rgba(0,0,0,0.04),0px_4px_4px_-2px_rgba(0,0,0,0.04),0px_8px_8px_-4px_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-out"
        style={{
          minWidth: '110px',
          transform: `scale(${isPressed ? 0.95 : isHovered ? 1.05 : 1})`
        }}
      >
        <div className="flex gap-1 grow items-center">
          <div className="flex gap-4 grow items-start overflow-clip">
            <p className="leading-[18px] overflow-ellipsis overflow-hidden text-sm text-gray-800 whitespace-nowrap">
              {selectedOption?.label || label}
            </p>
          </div>
          <div className="flex gap-2 items-center shrink-0 relative w-6 h-6">
            {/* Chevron down state */}
            <img 
              src={chevronDownIcon} 
              alt="" 
              className="absolute w-6 h-6"
              style={{
                transform: 'rotate(0deg)',
                opacity: isOpen ? 0 : 1,
                filter: isOpen ? 'blur(2px)' : 'blur(0px)',
                transition: 'all 150ms cubic-bezier(0.17, 0.84, 0.44, 1)'
              }}
            />
            {/* Chevron up state */}
            <img 
              src={chevronDownIcon} 
              alt="" 
              className="absolute w-6 h-6"
              style={{
                transform: 'rotate(180deg)',
                opacity: isOpen ? 1 : 0,
                filter: isOpen ? 'blur(0px)' : 'blur(2px)',
                transition: 'all 150ms cubic-bezier(0.17, 0.84, 0.44, 1)'
              }}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div 
          ref={ref}
          className={`absolute left-0 w-[110px] z-50 ${
            showAbove ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
          onMouseLeave={() => setHoveredOption(null)}
          style={{
            animationName: 'dropdownSlide',
            animationDuration: '100ms',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'backwards',
            transformOrigin: showAbove ? 'bottom center' : 'top center'
          }}
        >
          <div className="bg-gray-900 relative rounded-lg shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.08),0px_2px_2px_-1px_rgba(0,0,0,0.08),0px_4px_4px_-2px_rgba(0,0,0,0.08),0px_8px_8px_-4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-start overflow-clip p-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHoveredOption(option.value)}
                  className={`box-border flex gap-1 items-center pl-1 pr-2 py-1 rounded-[4px] w-full cursor-pointer transition-colors relative ${
                    hoveredOption === option.value ? 'bg-[#007eb3]' : ''
                  }`}
                >
                  <div className="relative shrink-0 w-5 h-5">
                    {value === option.value && (
                      <img src={checkIcon} alt="" className="block w-full h-full" />
                    )}
                  </div>
                  <p className="leading-[18px] text-sm text-white whitespace-nowrap">
                    {option.label}
                  </p>
                  {hoveredOption === option.value && (
                    <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.1)] rounded-[4px]" />
                  )}
                </button>
              ))}
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[0px_0px_0px_1px_inset_rgba(255,255,255,0.08)] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}

interface PopulateFooterProps {
  onPopulate: () => void;
  productCount?: number;
  platform: string;
  layout: string;
  onPlatformChange: (platform: string) => void;
  onLayoutChange: (layout: string) => void;
  onOpenSettings: () => void;
}

export function PopulateFooter({ 
  onPopulate, 
  productCount = 0,
  platform,
  layout,
  onPlatformChange,
  onLayoutChange,
  onOpenSettings
}: PopulateFooterProps) {
  const platformOptions: DropdownOption[] = [
    { value: 'app', label: 'App' },
    { value: 'mobile-web', label: 'Mweb' },
    { value: 'desktop-web', label: 'Desktop' }
  ];

  const layoutOptions: DropdownOption[] = [
    { value: 'grid', label: 'Grid' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'horizontal', label: 'Horizontal' }
  ];

  return (
    <div className="flex gap-2 items-center justify-between w-full">
      <button
        onClick={onOpenSettings}
        className="text-gray-600 hover:text-gray-800 p-1"
        title="Configure components"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.1928 1.74936L14.8081 1.75464L14.8728 2.43271C14.9601 3.34635 15.475 4.15995 16.2764 4.62202C16.7041 4.86777 17.1911 4.998 17.6822 4.998C18.0968 4.998 18.5052 4.9079 18.8848 4.73528L19.5029 4.45417L22.3152 9.29863L21.7551 9.69448C21.002 10.2267 20.553 11.0775 20.5522 11.9996L19.0522 11.9984C19.0532 10.8167 19.5348 9.71466 20.3567 8.91271L18.8609 6.33601C18.4796 6.44261 18.0837 6.498 17.6822 6.498C16.9275 6.498 16.1827 6.29832 15.5284 5.92222C14.5038 5.33166 13.7855 4.3647 13.4987 3.25341L10.5031 3.25059C10.2168 4.36314 9.4992 5.33035 8.47395 5.92168L8.47262 5.92245C7.81134 6.30205 7.05851 6.502 6.29323 6.502C5.90078 6.502 5.51188 6.44927 5.13673 6.34689L3.65237 8.90709C4.46895 9.71432 4.94823 10.8259 4.94823 12C4.94823 13.1741 4.46895 14.2857 3.65237 15.0929L5.13673 17.6531C5.51188 17.5507 5.90078 17.498 6.29323 17.498C7.05851 17.498 7.81134 17.698 8.47262 18.0776L8.47395 18.0783C9.4992 18.6697 10.2168 19.6369 10.5031 20.7494L13.4987 20.7466C13.7855 19.6353 14.5031 18.6688 15.5277 18.0782C16.182 17.7021 16.9275 17.502 17.6822 17.502C18.0837 17.502 18.4796 17.5574 18.8609 17.664L20.3567 15.0873C19.5348 14.2853 19.0532 13.1833 19.0522 12.0016L20.5522 11.9996C20.553 12.9217 21.002 13.7733 21.7551 14.3055L22.3152 14.7014L19.5029 19.5458L18.8848 19.2647C18.5052 19.0921 18.0968 19.002 17.6822 19.002C17.1911 19.002 16.704 19.1323 16.2763 19.3781C15.4749 19.8402 14.9601 20.6537 14.8728 21.5673L14.8081 22.2454L9.1928 22.2506L9.12856 21.5705C9.04212 20.6554 8.52752 19.8412 7.72546 19.3782C7.29283 19.13 6.79781 18.998 6.29323 18.998C5.88377 18.998 5.47935 19.0853 5.10728 19.2523L4.49049 19.529L1.69861 14.7137L2.25275 14.3171C2.99733 13.7842 3.44823 12.9182 3.44823 12C3.44823 11.0819 2.99733 10.2158 2.25275 9.68291L1.69861 9.28633L4.49049 4.47097L5.10728 4.74773C5.47935 4.91469 5.88376 5.002 6.29323 5.002C6.79768 5.002 7.29257 4.8701 7.72512 4.62197C8.52737 4.159 9.04211 3.34471 9.12856 2.42947L9.1928 1.74936Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M7.74999 12C7.74999 9.65279 9.65277 7.75 12 7.75C14.3472 7.75 16.25 9.65279 16.25 12C16.25 14.3472 14.3472 16.25 12 16.25C9.65277 16.25 7.74999 14.3472 7.74999 12ZM12 9.25C10.4812 9.25 9.24999 10.4812 9.24999 12C9.24999 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25Z" fill="currentColor"/>
        </svg>
      </button>
      
      <div className="flex gap-2 items-center">
        {/* Platform Dropdown */}
        <CustomDropdown
          value={platform}
          onChange={onPlatformChange}
          options={platformOptions}
          label="Platform"
        />
        
        {/* Layout Dropdown */}
        <CustomDropdown
          value={layout}
          onChange={onLayoutChange}
          options={layoutOptions}
          label="Layout"
        />

        {productCount > 0 && (
          <span className="text-sm text-gray-600 mr-2">
            {productCount} product{productCount !== 1 ? 's' : ''} ready
          </span>
        )}
        
        <button
          onClick={onPopulate}
          className="overflow-clip relative shrink-0 size-[40px] transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none" 
          style={{
            borderRadius: '40px',
            background: '#E81C2D',
            boxShadow: '0 0 4px 5px rgba(255, 255, 255, 0.07) inset, 0 1px 1px 0 rgba(255, 255, 255, 0.25) inset, 0 -1px 1px 0 rgba(0, 0, 0, 0.21) inset, 0 1px 0 0 rgba(0, 0, 0, 0.02), 0 1px 1px -0.5px rgba(0, 0, 0, 0.06), 0 2px 2px -1px rgba(0, 0, 0, 0.06), 0 4px 4px -2px rgba(0, 0, 0, 0.06), 0 8px 8px -4px rgba(0, 0, 0, 0.06), 0 0 12px 1px rgba(232, 28, 45, 0.10)'
          }}
          data-name="icon-button-elevated" 
          data-node-id="215:49242"
          title="Populate product tiles"
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
      </div>
    </div>
  );
}
