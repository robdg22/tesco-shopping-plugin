import * as React from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  layout: string;
  componentMappings: Record<string, any>;
  onCaptureComponent: () => void;
  onSaveMapping: (componentId: string, libraryId?: string, libraryName?: string) => void;
  capturedComponentId: string | null;
  capturedComponentName: string | null;
  capturedLibraryId: string | null;
  capturedLibraryName: string | null;
  onExtractMappings?: () => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  platform,
  layout,
  componentMappings,
  onCaptureComponent,
  onSaveMapping,
  capturedComponentId,
  capturedComponentName,
  capturedLibraryId,
  capturedLibraryName,
  onExtractMappings
}: SettingsPanelProps) {
  if (!isOpen) return null;

  const configKey = `${platform}-${layout}`;
  const currentMapping = componentMappings[configKey];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Configure Component</h2>
          <div className="flex gap-2">
            {onExtractMappings && (
              <button
                onClick={onExtractMappings}
                className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 font-semibold"
                title="Debug: Extract mappings from Figma"
              >
                🔧 Debug
              </button>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              Platform: <strong>{platform}</strong> | Layout: <strong>{layout}</strong>
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">Current Component:</h3>
            {currentMapping?.componentId ? (
              <div className="text-xs bg-gray-100 p-2 rounded">
                <div><strong>ID:</strong> {currentMapping.componentId}</div>
                {currentMapping.libraryId && (
                  <div><strong>Library:</strong> {currentMapping.libraryName || currentMapping.libraryId}</div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No component configured</p>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-gray-600 italic">
              💡 Component mappings are managed by your administrator. These settings cannot be changed by users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
