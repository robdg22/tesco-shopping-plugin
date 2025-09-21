// Types for API communication
interface TescoAPIMessage {
  type: 'searchProducts' | 'getTaxonomy' | 'getCategoryProducts' | 'searchWithSuggestions';
  payload?: {
    query?: string;
    categoryId?: string;
    count?: number;
    suggestionsCount?: number;
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
      case 'searchWithSuggestions':
        await handleSearchWithSuggestions(msg.payload);
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

async function handleSearchProducts(payload?: { query?: string; count?: number }) {
  if (!payload?.query) {
    figma.ui.postMessage({ type: 'error', error: 'Search query is required' });
    return;
  }

  const searchQuery = `
    query SearchProducts($query: String!, $count: Int) {
      search(query: $query, count: $count) {
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
          price {
            price: actual
            unitPrice
            unitOfMeasure
          }
        }
      }
    }
  `;

  try {
    const result = await makeGraphQLRequest(searchQuery, {
      query: payload.query,
      count: payload.count || 10,
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

async function handleCategoryProducts(payload?: { categoryId?: string; count?: number }) {
  if (!payload?.categoryId) {
    figma.ui.postMessage({ type: 'error', error: 'Category ID is required' });
    return;
  }

  const categoryQuery = `
    query GetCategoryProducts($categoryId: ID, $count: Int) {
      category(categoryId: $categoryId, count: $count) {
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
          price {
            price: actual
            unitPrice
            unitOfMeasure
          }
        }
      }
    }
  `;

  try {
    const result = await makeGraphQLRequest(categoryQuery, {
      categoryId: payload.categoryId,
      count: payload.count || 10,
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
