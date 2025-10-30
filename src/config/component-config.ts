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
  'app-grid': { platform: 'app', layout: 'grid', componentId: '460285c805ef3d57d4777ada2d578eb344acfb8a', libraryName: 'DDS Shopping native domain library', libraryId: '460285c805ef3d57d4777ada2d578eb344acfb8a' },
  'app-vertical': { platform: 'app', layout: 'vertical', componentId: 'd32bcf2b8ce4db5afa4b2a718a60c2075009b715', libraryName: 'DDS Shopping native domain library', libraryId: 'd32bcf2b8ce4db5afa4b2a718a60c2075009b715' },
  'app-horizontal': { platform: 'app', layout: 'horizontal', componentId: '004c06075c5e082faaab349559abedfb86229e3a', libraryName: 'DDS Shopping native domain library', libraryId: '004c06075c5e082faaab349559abedfb86229e3a' },
  'mobile-web-grid': { platform: 'mobile-web', layout: 'grid', componentId: 'ca2dca0f0925c9184a3d0d85e5662cf6db83efd9', libraryName: 'DDS Shopping web domain library', libraryId: 'ca2dca0f0925c9184a3d0d85e5662cf6db83efd9' },
  'mobile-web-vertical': { platform: 'mobile-web', layout: 'vertical', componentId: 'bfd125dd00b542b4e21d2dfb9980ed5584fc8fb6', libraryName: 'DDS Shopping web domain library', libraryId: 'bfd125dd00b542b4e21d2dfb9980ed5584fc8fb6' },
  'mobile-web-horizontal': { platform: 'mobile-web', layout: 'horizontal', componentId: '8612136a8ee1b7f167ad984028c614c3f5ee139a', libraryName: 'DDS Shopping web domain library', libraryId: '8612136a8ee1b7f167ad984028c614c3f5ee139a' },
  'desktop-web-grid': { platform: 'desktop-web', layout: 'grid', componentId: 'ca2dca0f0925c9184a3d0d85e5662cf6db83efd9', libraryName: 'DDS Shopping web domain library', libraryId: 'ca2dca0f0925c9184a3d0d85e5662cf6db83efd9' },
  'desktop-web-vertical': { platform: 'desktop-web', layout: 'vertical', componentId: '9a1fb3f66e66b08f80969d8d45a97bc7768c68ef', libraryName: 'DDS Shopping web domain library', libraryId: '9a1fb3f66e66b08f80969d8d45a97bc7768c68ef' },
  'desktop-web-horizontal': { platform: 'desktop-web', layout: 'horizontal', componentId: '8612136a8ee1b7f167ad984028c614c3f5ee139a', libraryName: 'DDS Shopping web domain library', libraryId: '8612136a8ee1b7f167ad984028c614c3f5ee139a' },
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
