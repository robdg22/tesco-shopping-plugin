import * as React from 'react';

const forwardIcon = "data:image/svg+xml,%3Csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.29077 3.88744L15.6963 11.9995L7.29102 20.1039L8.33217 21.1837L17.8569 12L8.33242 2.80811L7.29077 3.88744Z' fill='white'/%3E%3C/svg%3E";

interface PopulateFooterProps {
  onPopulate: () => void;
  productCount?: number;
}

export function PopulateFooter({ onPopulate, productCount = 0 }: PopulateFooterProps) {
  return (
    <div 
      className="box-border content-stretch flex gap-[8px] items-center justify-end relative w-full" 
      data-name="footer" 
      data-node-id="215:49225"
    >
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
  );
}
