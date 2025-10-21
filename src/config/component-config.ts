export interface ComponentConfig {
  platform: 'app' | 'mobile-web' | 'desktop-web';
  layout: 'grid' | 'vertical' | 'horizontal';
  componentId: string;
  libraryName: string;
  libraryId?: string;
}

export const COMPONENT_MAPPINGS: Record<string, ComponentConfig> = {
  'app-grid': { platform: 'app', layout: 'grid', componentId: '', libraryName: 'Library 1', libraryId: '' },
  'app-vertical': { platform: 'app', layout: 'vertical', componentId: '', libraryName: 'Library 1', libraryId: '' },
  'app-horizontal': { platform: 'app', layout: 'horizontal', componentId: '', libraryName: 'Library 1', libraryId: '' },
  'mobile-web-grid': { platform: 'mobile-web', layout: 'grid', componentId: '', libraryName: 'Library 1', libraryId: '' },
  'mobile-web-vertical': { platform: 'mobile-web', layout: 'vertical', componentId: '', libraryName: 'Library 1', libraryId: '' },
  'mobile-web-horizontal': { platform: 'mobile-web', layout: 'horizontal', componentId: '', libraryName: 'Library 1', libraryId: '' },
  'desktop-web-grid': { platform: 'desktop-web', layout: 'grid', componentId: '', libraryName: 'Library 2', libraryId: '' },
  'desktop-web-vertical': { platform: 'desktop-web', layout: 'vertical', componentId: '', libraryName: 'Library 2', libraryId: '' },
  'desktop-web-horizontal': { platform: 'desktop-web', layout: 'horizontal', componentId: '', libraryName: 'Library 2', libraryId: '' },
};

export const AUTOLAYOUT_CONFIG = {
  'grid': { layoutMode: 'HORIZONTAL', layoutWrap: 'WRAP' },
  'vertical': { layoutMode: 'VERTICAL', layoutWrap: 'NO_WRAP' },
  'horizontal': { layoutMode: 'HORIZONTAL', layoutWrap: 'NO_WRAP' },
};
