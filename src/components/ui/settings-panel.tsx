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
  capturedLibraryName
}: SettingsPanelProps) {
  if (!isOpen) return null;

  const configKey = `${platform}-${layout}`;
  const currentMapping = componentMappings[configKey];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Configure Component</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
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
            <h3 className="text-sm font-semibold mb-2">Set New Component:</h3>
            <ol className="text-xs text-gray-600 mb-3 list-decimal list-inside space-y-1">
              <li>Select a component in Figma</li>
              <li>Click "Capture Component ID" below</li>
              <li>Click "Save" to assign it</li>
            </ol>
            
            <button
              onClick={onCaptureComponent}
              className="w-full mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              Capture Component ID
            </button>

            {capturedComponentId && (
              <div className="bg-green-50 border border-green-200 rounded p-3 mb-2">
                <p className="text-xs font-semibold text-green-800 mb-1">Captured:</p>
                <p className="text-xs text-green-700">{capturedComponentName}</p>
                <p className="text-xs text-green-600 font-mono"><strong>ID:</strong> {capturedComponentId}</p>
                {capturedLibraryId && (
                  <p className="text-xs text-green-600 font-mono"><strong>Library:</strong> {capturedLibraryName || capturedLibraryId}</p>
                )}
              </div>
            )}

            <button
              onClick={() => capturedComponentId && onSaveMapping(capturedComponentId, capturedLibraryId || undefined, capturedLibraryName || undefined)}
              disabled={!capturedComponentId}
              className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Save Component Mapping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
