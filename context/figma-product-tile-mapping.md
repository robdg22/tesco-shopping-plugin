# Figma Product Tile Mapping Documentation

This document details how search results from the Tesco API are mapped to Figma product tile layers, including field mappings, population logic, and layer visibility controls.

## Table of Contents
1. [Overview](#overview)
2. [Layer Name Configuration](#layer-name-configuration)
3. [API Field Mappings](#api-field-mappings)
4. [Layer Population Logic](#layer-population-logic)
5. [Visibility Controls](#visibility-controls)
6. [Component Variants](#component-variants)
7. [Population Configuration](#population-configuration)
8. [Error Handling](#error-handling)
9. [Implementation Examples](#implementation-examples)

---

## Overview

The plugin maps Tesco API product data to specifically named layers in Figma product tiles. Each API field corresponds to a layer name, and the population process handles text content, images, component variants, and visibility based on data availability and user configuration.

### **Key Concepts**
- **Strict Layer Naming**: Only exact layer names are recognized
- **Configuration-Driven**: Each layer type can be enabled/disabled
- **Data-Driven Visibility**: Layers show/hide based on available data
- **Component Variants**: Automatic variant selection based on product data
- **Fallback Handling**: Graceful degradation when layers or data are missing

---

## Layer Name Configuration

### **Core Layer Names**

**Location**: `code.js` lines 522-532

```javascript
const TILE_LAYER_NAMES = {
  price: "productPrice",
  title: "productName", 
  image: "productImage",
  thumbnail: "Thumbnail",
  offerText: "offerText",
  offerEndDate: "offerEndDate",
  swatches: "variationSwatches",
  valueBar: "valueBar",
  rating: "Rating"
};
```

### **Additional Layer Names**
```javascript
// Text layers
"productPriceWeight"    // Unit price (e.g., "£2.50/kg")
"productRatingText"     // Rating text (e.g., "4.2 (156)")
"deliveryInfo"          // Delivery information

// Component layers
"productTags"           // Container for tag components
"tagNew"               // New product tag
"tagMarketplace"       // Marketplace tag  
"tagFnf"               // F&F tag
"productRating"        // Rating container
"productRatingStars"   // Star rating component
"deliveryInfoContainer" // Delivery info container

// Swatch-related layers
"variationSwatch1"     // First color swatch
"variationSwatch2"     // Second color swatch
"Image placeholder"    // Image within swatch components

// Value bar sub-layers
"Text & icon"          // Container within value bar
"Text"                 // Text within value bar
"Background"           // Background rectangle
```

---

## API Field Mappings

### **Direct Text Mappings**

| Figma Layer | API Field | Data Type | Example |
|-------------|-----------|-----------|---------|
| `productName` | `product.title` | String | "Tesco Finest Free Range Eggs" |
| `productPrice` | `product.price.price` | Number | `3.50` |
| `offerText` | `product.promotions[0].offerText` | String | "Save £1.00" |
| `productRatingText` | `product.reviews.stats` | Calculated | "4.2 (156)" |
| `deliveryInfo` | Multiple fields | Calculated | "Courier delivery from 15 Jan" |

### **Image Mappings**

| Figma Layer | API Field | Processing |
|-------------|-----------|------------|
| `productImage` | `product.media.defaultImage.url` | Direct URL |
| `productImage` (fallback) | `product.defaultImageUrl` | Direct URL |
| Swatch images | `variation.media.defaultImage.url` | Color-filtered variations |

### **Calculated/Derived Fields**

#### **Unit Price (`productPriceWeight`)**
```javascript
// Mapping logic
if (product.price.unitOfMeasure !== "each") {
  const unitPriceText = `${currency}${product.price.unitPrice.toFixed(2)}/${product.price.unitOfMeasure}`;
  // Maps to: "£2.50/kg"
}
```

#### **Rating Text (`productRatingText`)**
```javascript
// Mapping logic
const overallRating = product.reviews.stats.overallRating;
const noOfReviews = product.reviews.stats.noOfReviews;
const ratingText = `${overallRating.toFixed(1)} (${noOfReviews})`;
// Maps to: "4.2 (156)"
```

#### **Offer End Date (`offerEndDate`)**
```javascript
// Mapping logic
const endDate = new Date();
endDate.setDate(endDate.getDate() + 7);
const formattedDate = formatDateAsDDMM(endDate);

const isMarketplaceOrFF = product.__typename === "MPProduct" || product.__typename === "FNFProduct";
const offerEndText = isMarketplaceOrFF 
  ? `Offer valid until ${formattedDate}`
  : `Offer valid for delivery until ${formattedDate}`;
// Maps to: "Offer valid for delivery until 15 Jan"
```

#### **Delivery Info (`deliveryInfo`)**
```javascript
// Mapping logic
const deliveryDate = getRandomDeliveryDate();
let deliveryInfoText = `Courier delivery from ${deliveryDate}`;

if (product.__typename === "MPProduct") {
  deliveryInfoText += ". Sold by Marketplace seller";
}
// Maps to: "Courier delivery from 15 Jan. Sold by Marketplace seller"
```

### **Color Swatches**
```javascript
// Extraction from variations
function extractColorSwatches(product) {
  const swatches = [];
  
  if (product.variations?.products) {
    product.variations.products.forEach(variation => {
      const colorAttr = variation.variationAttributes?.find(attr => 
        attr.attributeGroup === "colour" && attr.attributeGroupData?.value
      );
      
      if (colorAttr && variation.media?.defaultImage?.url) {
        swatches.push({
          color: colorAttr.attributeGroupData.value,
          url: variation.media.defaultImage.url,
          variationId: variation.id
        });
      }
    });
  }
  
  return swatches;
}
```

---

## Layer Population Logic

### **Main Population Function**

**Location**: `code.js` line 1038 - `populateTile(tileNode, product)`

```javascript
async function populateTile(tileNode, product) {
  // 1. Find layers using strict naming
  const priceNode = tileNode.findOne((n) => 
    n.type === "TEXT" && n.name === TILE_LAYER_NAMES.price
  );
  
  const titleNode = tileNode.findOne((n) => 
    n.type === "TEXT" && n.name === TILE_LAYER_NAMES.title
  );
  
  // 2. Populate if config enabled and layer exists
  if (priceNode && populationConfig.price && product.price?.price) {
    await setTextWithDebug(priceNode, 
      `${currentCurrency}${product.price.price.toFixed(2)}`, 
      "(price)"
    );
  }
  
  if (titleNode && populationConfig.title && product.title) {
    await setTextWithDebug(titleNode, product.title, "(title)");
  }
  
  // ... continue for all layers
}
```

### **Text Population Process**

```javascript
async function setTextWithDebug(textNode, text, context = '') {
  try {
    // 1. Load required font
    await figma.loadFontAsync(textNode.fontName);
    
    // 2. Set text content
    textNode.characters = text;
    
    // 3. Make visible
    textNode.visible = true;
    
    console.log(`✅ Updated ${textNode.name} ${context}: "${text}"`);
  } catch (error) {
    console.error(`❌ Error setting text on ${textNode.name}:`, error);
    throw error;
  }
}
```

### **Image Population Process**

```javascript
async function setImageFill(imageNode, imageUrl) {
  try {
    // 1. Create image from URL
    const image = await figma.createImageAsync(imageUrl);
    
    // 2. Apply as fill
    const rect = imageNode;
    rect.fills = [{
      type: 'IMAGE',
      scaleMode: 'FILL',
      imageHash: image.hash
    }];
    
    // 3. Make visible
    rect.visible = true;
    
    console.log(`✅ Set image fill: ${imageUrl}`);
  } catch (error) {
    console.error(`❌ Error setting image fill:`, error);
    throw error;
  }
}
```

---

## Visibility Controls

### **Data-Driven Visibility**

#### **Basic Show/Hide Logic**
```javascript
// Show layer only if data exists and config is enabled
const hasData = Boolean(product.fieldName);
const configEnabled = populationConfig.layerType;
layerNode.visible = hasData && configEnabled;
```

#### **Conditional Visibility Examples**

**Unit Price Layer**
```javascript
// Only show if unit of measure is NOT "each"
const isNotEach = product.price?.unitOfMeasure?.toLowerCase() !== "each";
byWeightLayer.visible = Boolean(isNotEach && populationConfig.unitPrice);
```

**Promotion Layers**
```javascript
// Show promotion-related layers only if promotions exist
const hasPromotions = product.promotions && product.promotions.length > 0;
valueBarComponent.visible = Boolean(hasPromotions && populationConfig.promotionText);
offerEndDateLayer.visible = Boolean(hasPromotions && populationConfig.offerEndDate);
```

**Product Type-Specific Layers**
```javascript
// Delivery info only for Marketplace and F&F products
const isMarketplaceOrFF = product.__typename === "MPProduct" || product.__typename === "FNFProduct";
deliveryInfoContainer.visible = Boolean(isMarketplaceOrFF && populationConfig.deliveryInfo);
```

**Review-Based Visibility**
```javascript
// Ratings only if reviews exist
const hasReviews = product.reviews?.stats?.noOfReviews > 0 && 
                   product.reviews?.stats?.overallRating !== undefined;
ratingsComponent.visible = Boolean(hasReviews && populationConfig.ratings);
```

**Tag Visibility Logic**
```javascript
// Individual tag visibility
const isNew = Boolean(product.isNew === true && populationConfig.newTag);
const isFF = Boolean(product.__typename === "FNFProduct" && populationConfig.ffTag);
const isMarketplace = Boolean(product.__typename === "MPProduct" && populationConfig.marketplaceTag);

// Show tag container if any tags are visible
tagRowComponent.visible = Boolean(isNew || isFF || isMarketplace);
```

### **Swatches Visibility**
```javascript
// Extract color swatches
const swatches = extractColorSwatches(product);

// Show swatches component if swatches exist
swatchesComponent.visible = Boolean(swatches.length > 0 && populationConfig.swatches);

// Individual swatch visibility
swatchComponents.forEach((swatchComponent, index) => {
  swatchComponent.visible = index < swatches.length;
});
```

---

## Component Variants

### **Thumbnail Size Variants**

**Logic**: Based on image aspect ratio

```javascript
// Determine Size variant based on aspect ratio
const aspectRatio = product.media?.defaultImage?.aspectRatio;
const sizeValue = !aspectRatio || aspectRatio === 1 ? "1:1" : "4:5";

// Apply variant
if (thumbnailInstance.variantProperties?.Size) {
  thumbnailInstance.setProperties({ Size: sizeValue });
}
```

**Variants**:
- `"1:1"` - Square images (aspect ratio = 1.0 or null)
- `"4:5"` - Rectangular images (aspect ratio ≠ 1.0)

### **Tag Variants**

**Function**: `setTagVariant(tagComponent, variantName, isVisible)`

```javascript
async function setTagVariant(tagComponent, variantName, isVisible) {
  if (!tagComponent) return;
  
  // Set visibility
  tagComponent.visible = Boolean(isVisible);
  
  // Set variant if visible and has properties
  if (isVisible && tagComponent.variantProperties?.Type) {
    tagComponent.setProperties({ Type: variantName });
    console.log(`Set ${tagComponent.name} to Type=${variantName}`);
  }
}
```

**Tag Types**:
- `"New"` - For new products (`product.isNew === true`)
- `"F&F"` - For Fashion products (`product.__typename === "FNFProduct"`)
- `"Marketplace"` - For Marketplace products (`product.__typename === "MPProduct"`)

### **Rating Stars Variants**

```javascript
// Round rating to nearest 0.5
const overallRating = product.reviews.stats.overallRating;
const roundedRating = Math.round(overallRating * 2) / 2;
const validRating = Math.max(0, Math.min(5, roundedRating));

// Set Stars variant
if (ratedComponent.variantProperties?.Stars) {
  ratedComponent.setProperties({ Stars: validRating.toString() });
}
```

**Star Values**: `"0"`, `"0.5"`, `"1"`, `"1.5"`, `"2"`, `"2.5"`, `"3"`, `"3.5"`, `"4"`, `"4.5"`, `"5"`

### **Value Bar Clubcard Logo**

```javascript
// Check if promotion text contains "Clubcard"
const containsClubcard = promoText.toLowerCase().includes("clubcard");
const tylerLogoValue = containsClubcard ? "Yes" : "No";

// Try multiple property name variations
const propertyNames = ["Tyler logo", "Tyler Logo", "Tylerlogo", "TylerLogo"];
for (const propName of propertyNames) {
  if (valueBarComponent.variantProperties?.[propName]) {
    valueBarComponent.setProperties({ [propName]: tylerLogoValue });
    break;
  }
}
```

---

## Population Configuration

### **Configuration Object**

**Location**: `code.js` lines 258-271

```javascript
let populationConfig = {
  title: true,           // Product title
  price: true,           // Product price
  unitPrice: true,       // Unit price (per kg, etc.)
  image: true,           // Product image
  swatches: true,        // Color variation swatches
  promotionText: true,   // Promotion/offer text
  clubcardLogo: true,    // Clubcard logo in promotions
  offerEndDate: true,    // Offer expiration date
  newTag: true,          // "New" product tag
  ffTag: true,           // "F&F" product tag  
  marketplaceTag: true,  // "Marketplace" product tag
  ratings: true,         // Star ratings and review count
  deliveryInfo: true     // Delivery information
};
```

### **Configuration Control**

```javascript
// Check configuration before populating each layer
if (populationConfig.price && priceNode && product.price?.price) {
  // Populate price layer
}

if (populationConfig.image && imageNode && product.defaultImageUrl) {
  // Populate image layer
}

// Configuration can be updated via UI
figma.ui.postMessage({ 
  type: "updateConfig", 
  config: populationConfig 
});
```

---

## Error Handling

### **Layer Finding with Debug**

```javascript
function findLayerWithDebug(container, predicate, layerDescription) {
  const foundLayer = container.findOne(predicate);
  
  if (foundLayer) {
    console.log(`✅ Found ${layerDescription}: "${foundLayer.name}"`);
  } else {
    console.log(`❌ Could not find ${layerDescription}`);
    
    // Debug: List available layers
    const textLayers = container.findAll(n => n.type === "TEXT");
    console.log(`Available TEXT layers: ${textLayers.map(l => l.name).join(', ')}`);
  }
  
  return foundLayer;
}
```

### **Font Loading Errors**

```javascript
async function setTextWithDebug(textNode, text, context = '') {
  try {
    await figma.loadFontAsync(textNode.fontName);
    textNode.characters = text;
    textNode.visible = true;
  } catch (error) {
    console.error(`❌ Error setting text on ${textNode.name}: ${error.message}`);
    
    // Try default font as fallback
    try {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      textNode.fontName = { family: "Inter", style: "Regular" };
      textNode.characters = text;
    } catch (fallbackError) {
      console.error(`❌ Fallback font also failed: ${fallbackError.message}`);
    }
  }
}
```

### **Image Loading Errors**

```javascript
async function setImageFill(imageNode, imageUrl) {
  const MAX_RETRIES = 3;
  let retryCount = 0;
  
  while (retryCount < MAX_RETRIES) {
    try {
      const image = await figma.createImageAsync(imageUrl);
      imageNode.fills = [{
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: image.hash
      }];
      return true;
    } catch (error) {
      retryCount++;
      console.error(`❌ Image load attempt ${retryCount} failed: ${error.message}`);
      
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }
  }
  
  console.error(`❌ Failed to load image after ${MAX_RETRIES} attempts`);
  return false;
}
```

### **Component Property Errors**

```javascript
function setComponentProperty(component, propertyName, value) {
  if (!component) {
    console.error(`❌ Component not found`);
    return false;
  }
  
  if (!component.variantProperties) {
    console.error(`❌ Component has no variant properties`);
    return false;
  }
  
  if (!(propertyName in component.variantProperties)) {
    console.error(`❌ Property "${propertyName}" not found`);
    console.log(`Available properties: ${Object.keys(component.variantProperties).join(', ')}`);
    return false;
  }
  
  try {
    component.setProperties({ [propertyName]: value });
    console.log(`✅ Set ${propertyName}=${value}`);
    return true;
  } catch (error) {
    console.error(`❌ Error setting property: ${error.message}`);
    return false;
  }
}
```

---

## Implementation Examples

### **Complete Tile Population Flow**

```javascript
// 1. Validate tile structure
const validation = validateTileStructure(tileNode, product);

// 2. Find all required layers
const layers = {
  priceNode: tileNode.findOne((n) => n.type === "TEXT" && n.name === "productPrice"),
  titleNode: tileNode.findOne((n) => n.type === "TEXT" && n.name === "productName"),
  imageNode: tileNode.findOne((n) => (n.type === "RECTANGLE" || n.type === "FRAME") && n.name === "productImage"),
  thumbnailInstance: tileNode.findOne((n) => n.type === "INSTANCE" && n.name === "Thumbnail"),
  // ... find other layers
};

// 3. Populate each layer based on configuration
if (layers.priceNode && populationConfig.price && product.price?.price) {
  const priceText = `${currentCurrency}${product.price.price.toFixed(2)}`;
  await setTextWithDebug(layers.priceNode, priceText, "(price)");
}

if (layers.titleNode && populationConfig.title && product.title) {
  await setTextWithDebug(layers.titleNode, product.title, "(title)");
}

if (layers.imageNode && populationConfig.image && product.defaultImageUrl) {
  await setImageFill(layers.imageNode, product.defaultImageUrl);
}

// 4. Handle component variants
if (layers.thumbnailInstance && populationConfig.image) {
  const aspectRatio = product.media?.defaultImage?.aspectRatio;
  const sizeValue = !aspectRatio || aspectRatio === 1 ? "1:1" : "4:5";
  
  if (layers.thumbnailInstance.variantProperties?.Size) {
    layers.thumbnailInstance.setProperties({ Size: sizeValue });
  }
}

// 5. Handle conditional visibility
const hasPromotions = product.promotions && product.promotions.length > 0;
const valueBarComponent = tileNode.findOne((n) => n.name === "valueBar");

if (valueBarComponent) {
  valueBarComponent.visible = Boolean(hasPromotions && populationConfig.promotionText);
}
```

### **Custom Layer Finder**

```javascript
function findTileLayer(tileNode, layerType, layerName, description) {
  console.log(`🔍 Looking for ${description}...`);
  
  let layer;
  
  // Try exact match first
  if (layerType === "TEXT") {
    layer = tileNode.findOne((n) => n.type === "TEXT" && n.name === layerName);
  } else if (layerType === "IMAGE") {
    layer = tileNode.findOne((n) => 
      (n.type === "RECTANGLE" || n.type === "FRAME") && n.name === layerName
    );
  } else if (layerType === "INSTANCE") {
    layer = tileNode.findOne((n) => n.type === "INSTANCE" && n.name === layerName);
  }
  
  if (layer) {
    console.log(`✅ Found ${description}: "${layer.name}" (${layer.type})`);
    return layer;
  }
  
  // Try fallback names
  const fallbackNames = getFallbackNames(layerName);
  for (const fallbackName of fallbackNames) {
    if (layerType === "TEXT") {
      layer = tileNode.findOne((n) => n.type === "TEXT" && n.name === fallbackName);
    }
    // ... handle other types
    
    if (layer) {
      console.log(`✅ Found ${description} with fallback name: "${layer.name}"`);
      return layer;
    }
  }
  
  console.log(`❌ Could not find ${description}`);
  return null;
}

function getFallbackNames(primaryName) {
  const fallbacks = {
    "productPrice": ["price", "Price", "product-price"],
    "productName": ["title", "Title", "product-title", "name"],
    "productImage": ["image", "Image", "product-image"],
    "productPriceWeight": ["By weight", "by-weight", "unitPrice"]
  };
  
  return fallbacks[primaryName] || [];
}
```

### **Batch Population**

```javascript
async function populateMultipleTiles(tileNodes, products) {
  console.log(`🚀 Starting batch population: ${tileNodes.length} tiles, ${products.length} products`);
  
  const results = [];
  
  for (let i = 0; i < tileNodes.length; i++) {
    const tileNode = tileNodes[i];
    const product = products[i % products.length]; // Cycle through products
    
    try {
      console.log(`📋 Populating tile ${i + 1}/${tileNodes.length}: "${tileNode.name}" with "${product.title}"`);
      
      const result = await populateTile(tileNode, product);
      results.push({
        tileIndex: i,
        tileName: tileNode.name,
        productTitle: product.title,
        success: true,
        result: result
      });
      
      // Brief pause to prevent overwhelming Figma
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ Failed to populate tile ${i + 1}: ${error.message}`);
      results.push({
        tileIndex: i,
        tileName: tileNode.name,
        productTitle: product.title,
        success: false,
        error: error.message
      });
    }
  }
  
  // Report results
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.length - successCount;
  
  console.log(`📊 Batch population complete: ${successCount} successful, ${failureCount} failed`);
  
  return results;
}
```

---

## Summary

### **Key Mapping Principles**

1. **Exact Layer Names**: Only layers with exact names from `TILE_LAYER_NAMES` are populated
2. **Configuration Control**: Each layer type can be enabled/disabled via `populationConfig`
3. **Data-Driven**: Layer visibility and content depend on available API data
4. **Graceful Fallbacks**: Missing layers or data don't break the population process
5. **Component Variants**: Automatic variant selection based on product characteristics

### **Population Flow**

```
API Response → Data Extraction → Layer Finding → Content Population → Visibility Control → Variant Setting
```

### **Required Figma Structure**

Your Figma product tiles must have layers named exactly as specified in `TILE_LAYER_NAMES`:

- **Text Layers**: `productName`, `productPrice`, `offerText`, `offerEndDate`, `productPriceWeight`, `productRatingText`, `deliveryInfo`
- **Image Layers**: `productImage` (Rectangle/Frame)
- **Component Layers**: `Thumbnail`, `valueBar`, `variationSwatches`, `productTags`, `productRating`
- **Sub-components**: `tagNew`, `tagMarketplace`, `tagFnf`, `productRatingStars`

### **Best Practices**

1. **Consistent Naming**: Use exact layer names from the configuration
2. **Layer Types**: Ensure layers have correct types (TEXT, RECTANGLE, FRAME, INSTANCE)
3. **Component Variants**: Include required variant properties (`Size`, `Type`, `Stars`, etc.)
4. **Error Handling**: Monitor console logs for population issues
5. **Configuration**: Adjust `populationConfig` to control which layers populate

This mapping system provides a robust, flexible way to automatically populate Figma product tiles with live data from the Tesco API while maintaining design consistency and handling edge cases gracefully.
