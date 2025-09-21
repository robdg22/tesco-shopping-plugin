# Generic Figma Plugin - Technical Specification

## Overview
A Figma plugin that automatically populates component tiles with external API data. This specification details the core architecture for mapping API responses to Figma component layers and populating the canvas with components.

## Table of Contents
1. [System Architecture](#system-architecture)
2. [API Integration](#api-integration)
3. [Field Mapping System](#field-mapping-system)
4. [Component Detection & Creation](#component-detection--creation)
5. [Canvas Population](#canvas-population)
6. [Data Flow](#data-flow)

---

## System Architecture

### Core Components
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Figma Plugin  │────│  Proxy Server   │────│   External API  │
│   (UI + Code)   │    │  (CORS Handler) │    │   (Data Source) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Figma Canvas    │
│ (Components)    │
└─────────────────┘
```

### Technology Stack
- **Frontend**: React + TypeScript
- **Plugin Backend**: Figma Plugin API
- **Proxy Server**: Node.js + Express (optional, for CORS)
- **Build Tool**: Webpack

---

## API Integration

### Generic API Response Structure

```typescript
// Example API Response Format
interface APIResponse {
  data: Array<{
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    price?: string;
    category?: string;
    metadata?: Record<string, any>;
  }>;
  total?: number;
  page?: number;
}
```

### Internal Data Structure

```typescript
// Generic Item Data Structure
interface DataItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  category?: string;
  metadata?: Record<string, any>;
}
```

### Proxy Server Configuration (Optional)

**Use Case**: When direct API calls are blocked by CORS

**Basic Setup**:
```javascript
// proxy-server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/proxy', async (req, res) => {
  try {
    const { url, ...params } = req.query;
    const apiResponse = await fetch(`${url}?${new URLSearchParams(params)}`);
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001);
```

**Request Format**:
```
GET http://localhost:3001/api/proxy?url=https://api.example.com/items&query=search
```

---

## Field Mapping System

### Simple Field Mappings

```typescript
// Basic field mapping configuration
interface FieldMapping {
  layerName: string;     // Name of the Figma layer
  dataField: string;     // Field name from API data
  layerType: 'text' | 'image' | 'fill';
}

// Example mappings
const fieldMappings: FieldMapping[] = [
  { layerName: 'title', dataField: 'title', layerType: 'text' },
  { layerName: 'description', dataField: 'description', layerType: 'text' },
  { layerName: 'price', dataField: 'price', layerType: 'text' },
  { layerName: 'image', dataField: 'imageUrl', layerType: 'image' },
  { layerName: 'category', dataField: 'category', layerType: 'text' }
];
```

### Field-to-Value Mapping Logic

```typescript
function createLayerMappings(component: DetectedComponent, dataItem: DataItem): LayerMapping[] {
  const mappings: LayerMapping[] = [];
  
  // Simple mapping based on layer names
  component.children.forEach(layer => {
    const mapping = fieldMappings.find(m => 
      layer.name.toLowerCase().includes(m.layerName.toLowerCase())
    );
    
    if (mapping) {
      const value = dataItem[mapping.dataField as keyof DataItem];
      
      if (value !== undefined && value !== null && value !== '') {
        mappings.push({
          layerId: layer.id,
          layerName: layer.name,
          layerType: mapping.layerType,
          value: value,
          defaultVisible: true
        });
      }
    }
  });
  
  return mappings;
}

// Alternative: Pattern-based mapping
function detectFieldMapping(layerName: string, dataItem: DataItem): LayerMapping | null {
  const normalizedName = layerName.toLowerCase();
  
  // Text mappings
  if (normalizedName.includes('title')) {
    return { layerId: '', layerName, layerType: 'text', value: dataItem.title };
  }
  if (normalizedName.includes('description')) {
    return { layerId: '', layerName, layerType: 'text', value: dataItem.description };
  }
  if (normalizedName.includes('price')) {
    return { layerId: '', layerName, layerType: 'text', value: dataItem.price };
  }
  if (normalizedName.includes('category')) {
    return { layerId: '', layerName, layerType: 'text', value: dataItem.category };
  }
  
  // Image mappings
  if (normalizedName.includes('image')) {
    return { 
      layerId: '', 
      layerName, 
      layerType: 'image', 
      value: { imageUrl: dataItem.imageUrl, scaleMode: 'FILL' }
    };
  }
  
  return null;
}
```

---

## Component Detection & Creation

### Component Detection Algorithm

**Location**: `src/utils/figma.ts` - `detectProductTileComponents()`

```typescript
// 1. Search Strategy
function detectProductTileComponents(nodes: readonly SceneNode[]): DetectedComponent[] {
  const detectedComponents: DetectedComponent[] = [];

  function searchNode(node: SceneNode): void {
    // Check if node matches component criteria
    if (isProductTileComponent(node)) {
      const component = analyzeProductTileComponent(node);
      if (component) {
        detectedComponents.push(component);
      }
    }

    // Recursive search through children
    if ('children' in node && node.children) {
      for (const child of node.children) {
        searchNode(child);
      }
    }
  }

  const nodesToSearch = nodes.length > 0 ? nodes : figma.currentPage.children;
  for (const node of nodesToSearch) {
    searchNode(node);
  }

  return detectedComponents;
}

// 2. Component Identification
function isProductTileComponent(node: SceneNode): boolean {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    return node.name.toLowerCase().includes('producttile');
  }
  return false;
}

// 3. Component Analysis
function analyzeProductTileComponent(node: SceneNode): DetectedComponent | null {
  if (!('children' in node) || !node.children) return null;

  const requiredLayers = ['productimage', 'producttitle', 'productprice', 'productbrand'];
  const children: DetectedLayer[] = [];

  function findLayers(searchNode: SceneNode): void {
    const normalizedName = searchNode.name.toLowerCase().replace(/\s+/g, '');

    if (requiredLayers.some(required => normalizedName.includes(required))) {
      children.push({
        id: searchNode.id,
        name: searchNode.name,
        type: mapLayerType(normalizedName),
        layerType: getNodeType(searchNode),
        node: searchNode,
      });
    }

    if ('children' in searchNode && searchNode.children) {
      for (const child of searchNode.children) {
        findLayers(child);
      }
    }
  }

  findLayers(node);

  return {
    id: node.id,
    name: node.name,
    type: 'FRAME',
    isValid: children.length >= 3,
    children,
  };
}
```

### Component Resolution

```typescript
// Simple component finding by name
function findComponent(componentName: string): ComponentNode | null {
  // Search for local component
  const component = figma.root.findOne(
    node => node.type === 'COMPONENT' && node.name === componentName
  ) as ComponentNode | null;
  
  return component;
}

// Library component import (if using external libraries)
async function importLibraryComponent(componentKey: string): Promise<ComponentNode | null> {
  try {
    const importedComponent = await figma.importComponentByKeyAsync(componentKey);
    
    if (importedComponent && importedComponent.type === 'COMPONENT') {
      return importedComponent;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to import library component:', error);
    return null;
  }
}
```

---

## Canvas Population

### Instance Creation & Layout

```typescript
// Simple instance creation
function createInstances(
  component: ComponentNode, 
  count: number, 
  startPosition: { x: number, y: number }
): InstanceNode[] {
  
  const instances: InstanceNode[] = [];
  const spacing = 120; // Fixed spacing between instances
  
  for (let i = 0; i < count; i++) {
    const instance = component.createInstance();
    instance.name = `${component.name} ${i + 1}`;
    
    // Simple grid positioning
    const cols = Math.ceil(Math.sqrt(count));
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    instance.x = startPosition.x + (col * spacing);
    instance.y = startPosition.y + (row * spacing);
    
    instances.push(instance);
  }
  
  return instances;
}

// Auto-layout frame creation (optional)
function createAutoLayoutFrame(
  component: ComponentNode,
  count: number,
  direction: 'HORIZONTAL' | 'VERTICAL' = 'HORIZONTAL'
): InstanceNode[] {
  
  const frame = figma.createFrame();
  frame.name = `${component.name} Layout`;
  frame.layoutMode = direction;
  frame.itemSpacing = 16;
  frame.paddingTop = frame.paddingRight = frame.paddingBottom = frame.paddingLeft = 16;
  
  const instances: InstanceNode[] = [];
  
  for (let i = 0; i < count; i++) {
    const instance = component.createInstance();
    instance.name = `${component.name} ${i + 1}`;
    frame.appendChild(instance);
    instances.push(instance);
  }
  
  figma.currentPage.appendChild(frame);
  return instances;
}

// Smart positioning on canvas
function findOptimalPosition(): { x: number, y: number } {
  // Find empty area on canvas
  const allNodes = figma.currentPage.children;
  const viewport = figma.viewport.bounds;
  
  if (allNodes.length === 0) {
    return { x: viewport.x + 50, y: viewport.y + 50 };
  }
  
  // Calculate bounding box of existing content
  let maxX = -Infinity;
  let minY = Infinity;
  
  for (const node of allNodes) {
    if ('x' in node && 'y' in node && 'width' in node && 'height' in node) {
      maxX = Math.max(maxX, node.x + node.width);
      minY = Math.min(minY, node.y);
    }
  }
  
  // Position new content with spacing
  const spacing = 100;
  return { x: maxX + spacing, y: minY };
}
```

### Data Application to Layers

**Location**: `src/code.ts` - `applyLayerMapping()`

```typescript
async function applyLayerMapping(mapping: LayerMapping): Promise<void> {
  const node = await figma.getNodeByIdAsync(mapping.layerId);
  
  if (!node || !('name' in node)) {
    throw new Error(`Node with ID ${mapping.layerId} not found`);
  }
  
  const sceneNode = node as SceneNode;
  
  // Smart visibility logic
  const hasData = !!(mapping.value && (
    typeof mapping.value === 'string' ? mapping.value.trim() : mapping.value.imageUrl
  ));
  
  sceneNode.visible = hasData;
  
  if (!hasData) return; // Skip content fill if no data
  
  switch (mapping.layerType) {
    case 'text':
      await applyTextContent(sceneNode, mapping.value as string);
      break;
      
    case 'image':
      await applyImageContent(sceneNode, mapping.value.imageUrl, mapping.value.scaleMode);
      break;
      
    case 'fill':
      await applyFillContent(sceneNode, mapping.value as string);
      break;
  }
}

// Text Content Application
async function applyTextContent(node: SceneNode, text: string): Promise<void> {
  if (node.type === 'TEXT') {
    const textNode = node as TextNode;
    
    try {
      await figma.loadFontAsync(textNode.fontName as FontName);
      textNode.characters = text;
    } catch (error) {
      // Fallback font loading
      const fallbackFont: FontName = { family: 'Inter', style: 'Regular' };
      await figma.loadFontAsync(fallbackFont);
      textNode.fontName = fallbackFont;
      textNode.characters = text;
    }
  }
}

// Image Content Application
async function applyImageContent(node: SceneNode, imageUrl: string, scaleMode: string): Promise<void> {
  try {
    // Fetch and process image
    const response = await fetch(imageUrl);
    const imageData = await response.arrayBuffer();
    const image = figma.createImage(new Uint8Array(imageData));
    
    // Apply to fillable nodes
    if (node.type === 'RECTANGLE' || node.type === 'FRAME' || node.type === 'ELLIPSE') {
      const fillableNode = node as RectangleNode | FrameNode | EllipseNode;
      
      const imageFill: ImagePaint = {
        type: 'IMAGE',
        scaleMode: scaleMode as 'FILL' | 'FIT' | 'CROP' | 'TILE',
        imageHash: image.hash,
      };
      
      fillableNode.fills = [imageFill];
    }
  } catch (error) {
    console.error('Error applying image:', error);
    throw error;
  }
}
```


---

## Data Flow

### Complete User Journey

```
1. Data Fetch
   ├── UI: User initiates data search/fetch
   ├── API: HTTP request to external API (direct or via proxy)
   └── Response: Raw data from API

2. Data Processing
   ├── Transform: Raw API response → DataItem interface
   └── Store: Data array in app state

3. Component Selection
   ├── Auto-detect: Scan canvas for existing components
   └── Manual: Select specific component by name

4. Fill Operation
   ├── Component Resolution: Find local/library components
   ├── Instance Creation: Create new instances if needed
   ├── Field Mapping: Data fields → Layer values
   └── Canvas Update: Apply data to Figma layers
```

### Message Flow (UI ↔ Plugin Code)

```typescript
// UI → Plugin Messages
enum MessageType {
  FETCH_DATA = 'fetch-data',
  DETECT_COMPONENTS = 'detect-components',
  FILL_COMPONENT = 'fill-component',
  BULK_FILL = 'bulk-fill',
  CREATE_INSTANCES = 'create-instances'
}

// Plugin → UI Messages  
enum ResponseType {
  DATA_LOADED = 'data-loaded',
  COMPONENTS_DETECTED = 'components-detected',
  FILL_COMPLETE = 'fill-complete',
  ERROR = 'error'
}
```

---

This specification provides a complete blueprint for creating a generic Figma plugin that populates components with external API data, including data transformations, component mappings, and canvas manipulation logic.
