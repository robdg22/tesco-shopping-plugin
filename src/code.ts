// Import component configuration
import { COMPONENT_MAPPINGS, AUTOLAYOUT_CONFIG } from './config/component-config';

// Types for API communication
interface TescoAPIMessage {
  type: 'searchProducts' | 'getTaxonomy' | 'getCategoryProducts' | 'getCategoryChildren' | 'searchWithSuggestions' | 'loadRecentSearches' | 'saveRecentSearches' | 'populateSelectedTiles' | 'saveComponentMapping' | 'getSelectedComponentId' | 'loadComponentMappings' | 'extractMappings';
  payload?: {
    query?: string;
    categoryId?: string;
    count?: number;
    offset?: number;
    suggestionsCount?: number;
    searches?: string[];
    products?: any[];
    selectedProducts?: any[];
    platform?: string;
    layout?: string;
    componentId?: string;
  };
}

// This shows the HTML page in "ui.html"
figma.showUI(__html__, { width: 400, height: 600 });

// Handle messages from the UI
figma.ui.onmessage = async (msg: TescoAPIMessage) => {
  console.log('Received message:', msg);

  try {
    switch (msg.type) {
      case 'searchProducts':
        await handleSearchProducts(msg.payload);
        break;
      case 'getTaxonomy':
        await handleGetTaxonomy();
        break;
      case 'getCategoryProducts':
        await handleCategoryProducts(msg.payload);
        break;
      case 'getCategoryChildren':
        await handleCategoryChildren(msg.payload);
        break;
      case 'searchWithSuggestions':
        await handleSearchWithSuggestions(msg.payload);
        break;
      case 'loadRecentSearches':
        await handleLoadRecentSearches();
        break;
      case 'saveRecentSearches':
        await handleSaveRecentSearches(msg.payload);
        break;
      case 'populateSelectedTiles':
        await handlePopulateSelectedTiles(msg.payload);
        break;
      case 'saveComponentMapping':
        await handleSaveComponentMapping(msg.payload);
        break;
      case 'getSelectedComponentId':
        await handleGetSelectedComponentId();
        break;
      case 'loadComponentMappings':
        await handleLoadComponentMappings();
        break;
      case 'extractMappings':
        await handleExtractMappings();
        break;
      default:
        figma.ui.postMessage({ type: 'error', error: 'Unknown message type' });
    }
  } catch (error) {
    console.error('Plugin error:', error);
    figma.ui.postMessage({ 
      type: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// API Helper Functions
async function makeGraphQLRequest(query: string, variables: Record<string, any> = {}) {
  const response = await fetch('https://origin-preview1-mango.omnichannel.tescocloud.com/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Region': 'UK',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

async function handleSearchProducts(payload?: { query?: string; count?: number; offset?: number }) {
  if (!payload?.query) {
    figma.ui.postMessage({ type: 'error', error: 'Search query is required' });
    return;
  }

  const searchQuery = `
    query SearchProducts($query: String!, $count: Int, $offset: Int) {
      search(query: $query, count: $count, offset: $offset) {
        pageInformation: info {
          totalCount: total
          pageNo: page
          count
        }
        productItems: products {
          id
          baseProductId
          title
          brandName
          shortDescription
          defaultImageUrl
          media {
            defaultImage {
              url
              aspectRatio
            }
            images {
              url
              aspectRatio
            }
          }
          isNew
          price {
            price: actual
            unitPrice
            unitOfMeasure
          }
          promotions {
            promotionId: id
            promotionType
            startDate
            endDate
            offerText: description
          }
          reviews {
            stats {
              noOfReviews
              overallRating
              overallRatingRange
            }
          }
        }
      }
    }
  `;

  try {
    const result = await makeGraphQLRequest(searchQuery, {
      query: payload.query,
      count: payload.count || 20,
      offset: payload.offset || 0,
    });

    figma.ui.postMessage({
      type: 'searchProductsResponse',
      data: result,
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function handleGetTaxonomy() {
  const taxonomyQuery = `
    query TaxonomySuperDepts($storeId: ID, $style: String) {
      taxonomy(storeId: $storeId) {
        id
        name
        label
        images(style: $style) {
          style
          images {
            type
            url
            __typename
          }
          __typename
        }
        __typename
      }
    }
  `;

  try {
    const result = await makeGraphQLRequest(taxonomyQuery, {
      storeId: "3060", // UK store ID as per documentation
      style: "rounded"
    });
    
    // Filter for superdepartments as per documentation
    if (result.data && result.data.taxonomy) {
      const superDepartments = result.data.taxonomy.filter((item: any) => {
        return item.label === "superdepartment" || item.__typename === "TaxonomyItemType";
      });
      
      figma.ui.postMessage({
        type: 'getTaxonomyResponse',
        data: {
          ...result,
          data: {
            ...result.data,
            taxonomy: superDepartments
          }
        },
      });
    } else {
      figma.ui.postMessage({
        type: 'getTaxonomyResponse',
        data: result,
      });
    }
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function handleCategoryProducts(payload?: { categoryId?: string; count?: number; offset?: number }) {
  if (!payload?.categoryId) {
    figma.ui.postMessage({ type: 'error', error: 'Category ID is required' });
    return;
  }

  const categoryQuery = `
    query GetCategoryProducts(
      $facet: ID
      $page: Int
      $count: Int
      $sortBy: String
      $offset: Int
      $superDepartment: String
      $department: String
      $aisle: String
      $shelf: String
      $offers: Boolean
      $new: Boolean
      $favourites: Boolean
      $brand: String
      $brands: [String]
      $dietary: String
      $categoryId: ID
      $pageName: String
    ) {
      category(
        page: $page
        count: $count
        sortBy: $sortBy
        offset: $offset
        facet: $facet
        superDepartment: $superDepartment
        department: $department
        aisle: $aisle
        shelf: $shelf
        offers: $offers
        new: $new
        favourites: $favourites
        brand: $brand
        brands: $brands
        dietary: $dietary
        categoryId: $categoryId
      ) {
        pageInformation: info {
          ...PageInformation
        }
        productItems: products {
          ...ProductItem
        }
        facetLists: facetGroups {
          ...FacetLists
        }
        options {
          sortBy
        }
      }
    }

    fragment PageInformation on ListInfoInterface {
      totalCount: total
      pageNo: page
      count
      pageSize
      offset
    }

    fragment ProductItem on ProductInterface {
      id
      baseProductId
      title
      brandName
      shortDescription
      defaultImageUrl
      media {
        defaultImage {
          url
          aspectRatio
        }
        images {
          url
          aspectRatio
        }
      }
      badgeDetails(pageName: $pageName) {
        badges
        subText
      }
      superDepartmentId
      superDepartmentName
      departmentId
      departmentName
      aisleId
      aisleName
      shelfId
      shelfName
      displayType
      productType
      averageWeight
      bulkBuyLimit
      maxQuantityAllowed: bulkBuyLimit
      groupBulkBuyLimit
      bulkBuyLimitMessage
      bulkBuyLimitGroupId
      timeRestrictedDelivery
      restrictedDelivery
      isForSale
      isNew
      isRestrictedOrderAmendment
      status
      maxWeight
      minWeight
      increment
      catchWeightList {
        price
        weight
        default
      }
      restrictedDeliveryTime {
        day
        startDateTime
        endDateTime
        message
      }
      restrictedDeliveryDate {
        startDate
        endDate
        leadTimeValue
        message
      }
      price {
        price: actual
        unitPrice
        unitOfMeasure
      }
      promotions {
        promotionId: id
        promotionType
        startDate
        endDate
        offerText: description
      }
      reviews {
        stats {
          noOfReviews
          overallRating
          overallRatingRange
        }
      }
    }

    fragment FacetLists on ProductListFacetGroupInterface {
      categoryId
      category
      facets {
        facetId: id
        facetName: name
        binCount: count
        isSelected: selected
      }
    }
  `;

  try {
    const result = await makeGraphQLRequest(categoryQuery, {
      categoryId: payload.categoryId,
      pageName: "browse",
      count: payload.count || 20,
      offset: payload.offset || 0,
    });

    figma.ui.postMessage({
      type: 'getCategoryProductsResponse',
      data: result,
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Failed to load category products: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function handleCategoryChildren(payload?: { categoryId?: string }) {
  if (!payload?.categoryId) {
    figma.ui.postMessage({ type: 'error', error: 'Category ID is required' });
    return;
  }

  const childrenQuery = `
    query GetCategoryChildren($categoryId: String, $storeId: ID) {
      taxonomy(storeId: $storeId, categoryId: $categoryId) {
        id
        name
        label
        pageType
        images {
          style
          images {
            type
            url
            __typename
          }
          __typename
        }
        children {
          id
          name
          label
          pageType
          images {
            style
            images {
              type
              url
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
    }
  `;

  try {
    const result = await makeGraphQLRequest(childrenQuery, {
      categoryId: payload.categoryId,
      storeId: "3060",
    });

    figma.ui.postMessage({
      type: 'getCategoryChildrenResponse',
      data: result,
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Failed to load category children: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

async function handleSearchWithSuggestions(payload?: { query?: string; suggestionsCount?: number; count?: number }) {
  if (!payload?.query) {
    figma.ui.postMessage({ type: 'error', error: 'Search query is required' });
    return;
  }

  const searchWithSuggestionsQuery = `
    query SearchWithSuggestions(
      $query: String!
      $suggestionsCount: Int
      $params: BrowseSearchConfig
      $configs: [ConfigArgType]
    ) {
      search(
        query: $query
        config: $params
        configs: $configs
      ) {
        suggestions(suggestionsCount: $suggestionsCount) {
          searchTerms {
            suggestionQuery
          }
          info {
            count
            query
          }
        }
      }
    }
  `;

  try {
    const variables = {
      query: payload.query,
      suggestionsCount: payload.suggestionsCount || 10
    };
    
    console.log('Making search suggestions request with variables:', variables);
    const result = await makeGraphQLRequest(searchWithSuggestionsQuery, variables);
    console.log('Search suggestions API response:', result);

    figma.ui.postMessage({
      type: 'searchWithSuggestionsResponse',
      data: result,
    });
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Failed to search with suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
}

// Handle loading recent searches from clientStorage
async function handleLoadRecentSearches() {
  try {
    const recentSearches = await figma.clientStorage.getAsync('tesco-recent-searches');
    figma.ui.postMessage({
      type: 'recentSearchesLoaded',
      data: recentSearches || []
    });
  } catch (error) {
    console.error('Failed to load recent searches:', error);
    figma.ui.postMessage({
      type: 'recentSearchesLoaded',
      data: []
    });
  }
}

// Handle saving recent searches to clientStorage
async function handleSaveRecentSearches(payload?: { searches?: string[] }) {
  try {
    if (payload?.searches) {
      await figma.clientStorage.setAsync('tesco-recent-searches', payload.searches);
      console.log('Recent searches saved:', payload.searches);
    }
  } catch (error) {
    console.error('Failed to save recent searches:', error);
  }
}

// Handle populating selected tiles with product data
async function handlePopulateSelectedTiles(payload?: { 
  products?: any[]; 
  selectedProducts?: any[];
  platform?: string; 
  layout?: string; 
}) {
  console.log('Starting population with config:', { 
    platform: payload?.platform, 
    layout: payload?.layout 
  });
  
  if (!payload?.products || payload.products.length === 0) {
    figma.ui.postMessage({ type: 'error', error: 'No products provided' });
    return;
  }

  try {
    const selectedNodes = figma.currentPage.selection;
    
    // Check if selection contains existing tiles
    const existingTiles = findAllProductTiles(selectedNodes);
    
    if (existingTiles.length > 0) {
      // Mode A: Fill existing tiles (ignore platform/layout settings)
      await populateExistingTiles(existingTiles, payload.products);
    } else if (selectedNodes.length === 1 && selectedNodes[0].type === 'FRAME') {
      // Mode B: Selected empty frame - create instances inside
      await createInstancesInFrame(
        selectedNodes[0] as FrameNode, 
        payload.products,
        payload.platform || 'app',
        payload.layout || 'grid',
        payload.selectedProducts?.length || payload.products.length
      );
    } else {
      // Mode C: No selection or invalid selection - create new frame
      await createNewFrameWithInstances(
        payload.products,
        payload.platform || 'app',
        payload.layout || 'grid',
        payload.selectedProducts?.length || payload.products.length
      );
    }
  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: error instanceof Error ? error.message : 'Population failed'
    });
  }
}

// Populate existing tiles (keep current implementation)
async function populateExistingTiles(tiles: SceneNode[], products: any[]) {
  let populatedCount = 0;
  const errors: string[] = [];
  
  // Preload fonts from all tiles
  const fontsToLoad = new Set<string>();
  for (const tile of tiles) {
    collectFontsFromNode(tile, fontsToLoad);
  }
  
  // Load all fonts
  const fontPromises = Array.from(fontsToLoad).map(fontString => {
    const [family, style] = fontString.split(':');
    return figma.loadFontAsync({ family, style });
  });
  
  try {
    await Promise.all(fontPromises);
    console.log(`Preloaded ${fontsToLoad.size} fonts for existing tiles`);
  } catch (error) {
    console.warn('Some fonts failed to load:', error);
  }
  
  for (let i = 0; i < tiles.length && i < products.length; i++) {
    try {
      await populateNodeWithProduct(tiles[i], products[i]);
      populatedCount++;
    } catch (error) {
      errors.push(`Tile ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  figma.ui.postMessage({
    type: 'populateComplete',
    success: true,
    populatedCount,
    totalSelected: tiles.length,
    errors: errors.length > 0 ? errors : undefined
  });
}

// Create instances in existing frame
async function createInstancesInFrame(
  frame: FrameNode, 
  products: any[],
  platform: string,
  layout: string,
  instanceCount: number
) {
  const configKey = `${platform}-${layout}`;
  const config = COMPONENT_MAPPINGS[configKey];
  
  if (!config || !config.componentId) {
    throw new Error(`No component configured for ${platform} ${layout}`);
  }
  
  // Find component by ID or library key
  let component: ComponentNode;
  
  // Check if this looks like a component key (long hex string) or if we have library info
  const isComponentKey = config.componentId.length > 20 && /^[a-f0-9]+$/i.test(config.componentId);
  const hasLibraryInfo = config.libraryId && config.libraryId.length > 0;
  
  if (hasLibraryInfo || isComponentKey) {
    // Component is from a library - use importComponentByKeyAsync
    try {
      component = await figma.importComponentByKeyAsync(config.componentId);
    } catch (error) {
      throw new Error(`Failed to import library component: ${config.componentId}. Make sure the library is published and accessible.`);
    }
  } else {
    // Component is local - use getNodeByIdAsync
    const node = await figma.getNodeByIdAsync(config.componentId);
    if (!node || node.type !== 'COMPONENT') {
      throw new Error(`Local component not found: ${config.componentId}`);
    }
    component = node;
  }
  
  // Preload fonts from the component
  await preloadFontsFromComponent(component);
  
  // Set autolayout on frame
  const layoutConfig = AUTOLAYOUT_CONFIG[layout as keyof typeof AUTOLAYOUT_CONFIG];
  frame.layoutMode = layoutConfig.layoutMode as any;
  frame.layoutWrap = layoutConfig.layoutWrap as any;
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.itemSpacing = 16;
  frame.paddingLeft = 16;
  frame.paddingRight = 16;
  frame.paddingTop = 16;
  frame.paddingBottom = 16;
  
  // Create instances (limit to instanceCount)
  const productsToUse = products.slice(0, instanceCount);
  let createdCount = 0;
  for (const product of productsToUse) {
    const instance = component.createInstance();
    frame.appendChild(instance);
    await populateNodeWithProduct(instance, product);
    createdCount++;
  }
  
  figma.ui.postMessage({
    type: 'populateComplete',
    success: true,
    populatedCount: createdCount,
    totalSelected: createdCount,
  });
}

// Create new frame with instances
async function createNewFrameWithInstances(
  products: any[],
  platform: string,
  layout: string,
  instanceCount: number
) {
  // Create new frame on canvas
  const frame = figma.createFrame();
  frame.name = `${platform} - ${layout} - Product Grid`;
  frame.x = figma.viewport.center.x - 200;
  frame.y = figma.viewport.center.y - 200;
  
  figma.currentPage.appendChild(frame);
  figma.currentPage.selection = [frame];
  
  // Use createInstancesInFrame logic
  await createInstancesInFrame(frame, products, platform, layout, instanceCount);
}

// Helper function to collect fonts from a node
function collectFontsFromNode(node: SceneNode, fontsToLoad: Set<string>) {
  if (node.type === 'TEXT' && typeof node.fontName === 'object' && node.fontName !== null) {
    fontsToLoad.add(`${node.fontName.family}:${node.fontName.style}`);
  }
  
  if ('children' in node && node.children) {
    for (const child of node.children) {
      collectFontsFromNode(child, fontsToLoad);
    }
  }
}

// Preload fonts from a component to avoid font loading errors
async function preloadFontsFromComponent(component: ComponentNode) {
  const fontsToLoad = new Set<string>();
  
  // Use the helper function to collect fonts
  collectFontsFromNode(component, fontsToLoad);
  
  // Load all fonts
  const fontPromises = Array.from(fontsToLoad).map(fontString => {
    const [family, style] = fontString.split(':');
    return figma.loadFontAsync({ family, style });
  });
  
  try {
    await Promise.all(fontPromises);
    console.log(`Preloaded ${fontsToLoad.size} fonts from component`);
  } catch (error) {
    console.warn('Some fonts failed to load:', error);
  }
}

// Component configuration handlers
async function handleSaveComponentMapping(payload?: { 
  platform?: string; 
  layout?: string; 
  componentId?: string;
  libraryId?: string;
  libraryName?: string;
}) {
  // Component mappings are locked and cannot be changed by users
  figma.ui.postMessage({ 
    type: 'error', 
    error: 'Component mappings are locked and cannot be modified. Contact your administrator to update default configurations.' 
  });
}

async function handleGetSelectedComponentId() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({ 
      type: 'error', 
      error: 'Please select a component first' 
    });
    return;
  }
  
  const node = selection[0];
  if (node.type !== 'COMPONENT' && node.type !== 'INSTANCE') {
    figma.ui.postMessage({ 
      type: 'error', 
      error: 'Please select a component or component instance' 
    });
    return;
  }
  
  let componentId: string;
  let libraryId: string | undefined;
  let libraryName: string | undefined;
  
  if (node.type === 'INSTANCE') {
    const mainComponent = node.mainComponent;
    if (!mainComponent) {
      figma.ui.postMessage({ 
        type: 'error', 
        error: 'Could not find main component for instance' 
      });
      return;
    }
    
    // Check if this is a library component
    const isLibraryComponent = mainComponent.remote !== undefined;
    
    if (isLibraryComponent) {
      // For library components, use the key
      componentId = mainComponent.key;
      libraryId = (mainComponent.remote as any)?.key;
      libraryName = (mainComponent.remote as any)?.name;
    } else {
      // For local components, use the ID
      componentId = mainComponent.id;
      libraryId = undefined;
      libraryName = undefined;
    }
  } else {
    // Check if this is a library component
    const isLibraryComponent = node.remote !== undefined;
    
    if (isLibraryComponent) {
      // For library components, use the key
      componentId = node.key;
      libraryId = (node.remote as any)?.key;
      libraryName = (node.remote as any)?.name;
    } else {
      // For local components, use the ID
      componentId = node.id;
      libraryId = undefined;
      libraryName = undefined;
    }
  }
  
  figma.ui.postMessage({
    type: 'selectedComponentId',
    componentId,
    componentName: node.name,
    libraryId,
    libraryName
  });
}

async function handleLoadComponentMappings() {
  try {
    // Always use defaults - users cannot override component mappings
    figma.ui.postMessage({
      type: 'componentMappingsLoaded',
      mappings: COMPONENT_MAPPINGS
    });
  } catch (error) {
    console.error('Failed to load component mappings:', error);
  }
}

async function handleExtractMappings() {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({ 
        type: 'error', 
        error: 'Please select frames to scan for component instances (name them like: "app-grid", "mobile-web-vertical", etc.)'
      });
      return;
    }

    const extractedMappings: Record<string, any> = {};
    let foundCount = 0;

    // Scan selected frames for component instances
    for (const node of selection) {
      if (node.type !== 'FRAME') continue;

      const frameName = node.name.toLowerCase();
      
      // Look for instances within this frame
      async function scanForInstances(parent: any): Promise<void> {
        if (parent.children) {
          for (const child of parent.children) {
            if (child.type === 'INSTANCE') {
              try {
                const mainComponent = await child.getMainComponentAsync();
                if (mainComponent) {
                  // Extract component info
                  let componentId = mainComponent.id;
                  let libraryId = '';
                  let libraryName = 'Local Components';
                  
                  // The child.componentId should contain the library key for imported components
                  const instanceComponentId = child.componentId;
                  
                  // Log for debugging
                  console.log('Instance info:', {
                    instanceComponentId,
                    mainComponentId: mainComponent.id,
                    mainComponentKey: (mainComponent as any).key
                  });
                  
                  // For library components, use the mainComponentKey as the libraryId
                  // This is the full library file key needed for importComponentByKeyAsync
                  if ((mainComponent as any).key) {
                    componentId = mainComponent.id; // e.g., "330:9137"
                    libraryId = (mainComponent as any).key; // e.g., "460285c805ef3d57d4777ada2d578eb344acfb8a"
                    libraryName = 'Imported Library';
                  }
                  
                  // Try to match frame name to platform-layout combination
                  for (const key in COMPONENT_MAPPINGS) {
                    if (frameName.includes(key) || frameName.includes(key.replace('-', ' '))) {
                      extractedMappings[key] = {
                        componentId,
                        libraryId,
                        libraryName,
                        componentName: mainComponent.name
                      };
                      foundCount++;
                      console.log(`Found mapping for ${key}: ${componentId} (libraryId: ${libraryId})`);
                      break;
                    }
                  }
                }
              } catch (error) {
                console.warn('Failed to get main component:', error);
              }
            }
            
            // Recursively scan nested frames
            if (child.type === 'FRAME') {
              await scanForInstances(child);
            }
          }
        }
      }
      
      await scanForInstances(node);
    }

    if (foundCount === 0) {
      figma.ui.postMessage({
        type: 'error',
        error: 'No component instances found. Make sure your frames contain component instances and are named like: "app-grid", "mobile-web-vertical", etc.'
      });
      return;
    }

    figma.ui.postMessage({
      type: 'extractedMappings',
      mappings: extractedMappings,
      foundCount
    });

  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Failed to extract mappings: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
  }
}

// Find all product tiles within the given nodes (recursively searches frames)
function findAllProductTiles(nodes: readonly SceneNode[]): SceneNode[] {
  const tiles: SceneNode[] = [];
  
  function searchNode(node: SceneNode): void {
    // Check if this node is a product tile
    if (isProductTile(node)) {
      tiles.push(node);
      console.log(`Found product tile: ${node.name} (${node.type})`);
    }
    
    // Recursively search children if this node has children
    if ('children' in node && node.children) {
      for (const child of node.children) {
        searchNode(child);
      }
    }
  }
  
  // Search through all selected nodes
  for (const node of nodes) {
    searchNode(node);
  }
  
  return tiles;
}

// Check if a node is a product tile
function isProductTile(node: SceneNode): boolean {
  // Check if it's a frame, component, or instance
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    // Check if the name suggests it's a product tile
    const name = node.name.toLowerCase();
    return name.includes('product') || 
           name.includes('tile') || 
           name.includes('card') ||
           name.includes('item');
  }
  
  // Also check for groups that might contain product tiles
  if (node.type === 'GROUP') {
    const name = node.name.toLowerCase();
    return name.includes('product') || 
           name.includes('tile') || 
           name.includes('card') ||
           name.includes('item');
  }
  
  return false;
}

// Populate a single node with product data
async function populateNodeWithProduct(node: SceneNode, product: any) {
  console.log(`Populating node: ${node.name} with product: ${product.title}`);
  
  // Layer name configuration based on documentation
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

  // Find and populate text layers
  if (product.title) {
    const titleNode = findLayerByName(node, TILE_LAYER_NAMES.title);
    if (titleNode && titleNode.type === 'TEXT') {
      await setTextContent(titleNode, product.title);
    }
  }

  if (product.price?.price) {
    const priceNode = findLayerByName(node, TILE_LAYER_NAMES.price);
    if (priceNode && priceNode.type === 'TEXT') {
      const priceText = `£${product.price.price.toFixed(2)}`;
      await setTextContent(priceNode, priceText);
    }
  }

  if (product.promotions && product.promotions.length > 0) {
    const offerNode = findLayerByName(node, TILE_LAYER_NAMES.offerText);
    if (offerNode && offerNode.type === 'TEXT') {
      await setTextContent(offerNode, product.promotions[0].offerText || 'Special Offer');
    }
  }

  // Handle images
  if (product.defaultImageUrl || product.media?.defaultImage?.url) {
    const imageUrl = product.defaultImageUrl || product.media.defaultImage.url;
    const imageNode = findLayerByName(node, TILE_LAYER_NAMES.image);
    
    if (imageNode && (imageNode.type === 'RECTANGLE' || imageNode.type === 'FRAME')) {
      await setImageFill(imageNode, imageUrl);
    }
  }

  // Handle component variants (Thumbnail)
  const thumbnailNode = findLayerByName(node, TILE_LAYER_NAMES.thumbnail);
  if (thumbnailNode && thumbnailNode.type === 'INSTANCE') {
    // Try to set variant properties if available
    try {
      if (product.defaultImageUrl || product.media?.defaultImage?.url) {
        const imageUrl = product.defaultImageUrl || product.media.defaultImage.url;
        await setImageFill(thumbnailNode, imageUrl);
      }
    } catch (error) {
      console.log('Could not set thumbnail image:', error);
    }
  }
}

// Helper function to find a layer by name recursively
function findLayerByName(node: SceneNode, layerName: string): SceneNode | null {
  if (node.name === layerName) {
    return node;
  }
  
  if ('children' in node) {
    for (const child of node.children) {
      const found = findLayerByName(child, layerName);
      if (found) return found;
    }
  }
  
  return null;
}

// Helper function to set text content
async function setTextContent(textNode: TextNode, content: string) {
  try {
    await figma.loadFontAsync(textNode.fontName as FontName);
    textNode.characters = content;
    console.log(`Set text: "${content}"`);
  } catch (error) {
    console.error('Failed to set text content:', error);
    throw error;
  }
}

// Helper function to set image fill
async function setImageFill(node: RectangleNode | FrameNode | InstanceNode, imageUrl: string) {
  try {
    // Create image fill
    const imageFill = await figma.createImageAsync(imageUrl);
    
    // Apply fill to the node
    if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
      node.fills = [{
        type: 'IMAGE',
        imageHash: imageFill.hash,
        scaleMode: 'FILL'
      }];
    } else if (node.type === 'INSTANCE') {
      // For instances, try to find a rectangle child to fill
      const rectChild = findLayerByName(node, 'Image placeholder') || 
                       findLayerByName(node, 'productImage');
      if (rectChild && (rectChild.type === 'RECTANGLE' || rectChild.type === 'FRAME')) {
        rectChild.fills = [{
          type: 'IMAGE',
          imageHash: imageFill.hash,
          scaleMode: 'FILL'
        }];
      }
    }
    
    console.log(`Set image: ${imageUrl}`);
  } catch (error) {
    console.error('Failed to set image fill:', error);
    throw error;
  }
}
