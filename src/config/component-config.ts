export interface ComponentConfig {
  platform: 'app' | 'mobile-web' | 'desktop-web';
  layout: 'grid' | 'vertical' | 'horizontal';
  componentId: string;
  libraryName: string;
  libraryId?: string;
}

// Default component mappings - UPDATE THESE WITH YOUR COMPONENT IDS FOR END USERS
// These will be the default mappings that end users get without having to configure anything
export const DEFAULT_COMPONENT_MAPPINGS: Record<string, ComponentConfig> = {
  'app-grid': { platform: 'app', layout: 'grid', componentId: '330:9137', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'app-vertical': { platform: 'app', layout: 'vertical', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'app-horizontal': { platform: 'app', layout: 'horizontal', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'mobile-web-grid': { platform: 'mobile-web', layout: 'grid', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'mobile-web-vertical': { platform: 'mobile-web', layout: 'vertical', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'mobile-web-horizontal': { platform: 'mobile-web', layout: 'horizontal', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'desktop-web-grid': { platform: 'desktop-web', layout: 'grid', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'desktop-web-vertical': { platform: 'desktop-web', layout: 'vertical', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
  'desktop-web-horizontal': { platform: 'desktop-web', layout: 'horizontal', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
};

// Initialize with default mappings
export const COMPONENT_MAPPINGS: Record<string, ComponentConfig> = {
  ...DEFAULT_COMPONENT_MAPPINGS,
};

// Helper function to reset to defaults (useful for development)
export function resetToDefaults() {
  Object.keys(COMPONENT_MAPPINGS).forEach(key => {
    COMPONENT_MAPPINGS[key] = { ...DEFAULT_COMPONENT_MAPPINGS[key] };
  });
}

export const AUTOLAYOUT_CONFIG = {
  'grid': { layoutMode: 'HORIZONTAL', layoutWrap: 'WRAP' },
  'vertical': { layoutMode: 'VERTICAL', layoutWrap: 'NO_WRAP' },
  'horizontal': { layoutMode: 'HORIZONTAL', layoutWrap: 'NO_WRAP' },
};
