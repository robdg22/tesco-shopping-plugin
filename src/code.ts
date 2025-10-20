// Types for API communication
interface TescoAPIMessage {
  type: 'searchProducts' | 'getTaxonomy' | 'getCategoryProducts' | 'getCategoryChildren' | 'searchWithSuggestions' | 'loadRecentSearches' | 'saveRecentSearches' | 'populateSelectedTiles';
  payload?: {
    query?: string;
    categoryId?: string;
    count?: number;
    offset?: number;
    suggestionsCount?: number;
    searches?: string[];
    products?: any[];
    selectedProducts?: string[];
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
  const response = await fetch('https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
async function handlePopulateSelectedTiles(payload?: { products?: any[]; selectedProducts?: string[] }) {
  console.log('🎯 Starting tile population process');
  
  if (!payload?.products || payload.products.length === 0) {
    figma.ui.postMessage({ 
      type: 'error', 
      error: 'No products provided for population' 
    });
    return;
  }

  try {
    // Get currently selected nodes in Figma
    const selectedNodes = figma.currentPage.selection;
    
    if (selectedNodes.length === 0) {
      figma.ui.postMessage({ 
        type: 'error', 
        error: 'Please select some tiles/components to populate' 
      });
      return;
    }

    // Find all product tiles within the selected nodes (including nested tiles in frames)
    const allTiles = findAllProductTiles(selectedNodes);
    
    if (allTiles.length === 0) {
      figma.ui.postMessage({ 
        type: 'error', 
        error: 'No product tiles found in selection. Please select frames containing product tiles.' 
      });
      return;
    }

    console.log(`Found ${allTiles.length} product tiles in ${selectedNodes.length} selected nodes`);
    console.log(`Available products: ${payload.products.length}`);

    let populatedCount = 0;
    const errors: string[] = [];

    // Process each tile
    for (let i = 0; i < allTiles.length && i < payload.products.length; i++) {
      const tile = allTiles[i];
      const product = payload.products[i];
      
      try {
        await populateNodeWithProduct(tile, product);
        populatedCount++;
        console.log(`✅ Populated tile ${i + 1} with product: ${product.title}`);
      } catch (error) {
        const errorMsg = `Failed to populate tile ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    // Send success response
    figma.ui.postMessage({
      type: 'populateComplete',
      success: true,
      populatedCount,
      totalSelected: allTiles.length,
      errors: errors.length > 0 ? errors : undefined
    });

    console.log(`🎉 Population complete: ${populatedCount}/${allTiles.length} tiles populated`);

  } catch (error) {
    figma.ui.postMessage({
      type: 'error',
      error: `Failed to populate tiles: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
