// Types for API communication
interface TescoAPIMessage {
  type: 'searchProducts' | 'getTaxonomy' | 'getCategoryProducts' | 'getCategoryChildren' | 'searchWithSuggestions';
  payload?: {
    query?: string;
    categoryId?: string;
    count?: number;
    offset?: number;
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
      case 'getCategoryChildren':
        await handleCategoryChildren(msg.payload);
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
