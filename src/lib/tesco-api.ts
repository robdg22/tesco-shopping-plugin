import type { 
  GraphQLResponse, 
  GetTaxonomyResponse, 
  GetCategoryProductsResponse,
  SearchProductsResponse 
} from '../types/tesco'

// GraphQL Queries
export const TAXONOMY_SUPERDEPTS_QUERY = `
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
`

export const TAXONOMY_QUERY = `
  query GetTaxonomy(
    $storeId: ID
    $includeInspirationEvents: Boolean
    $style: String
    $categoryId: String
  ) {
    taxonomy(
      storeId: $storeId
      includeInspirationEvents: $includeInspirationEvents
      categoryId: $categoryId
    ) {
      id
      name
      label
      pageType
      images(style: $style) {
        style
        images {
          type
          url
          region
          title
        }
      }
      children {
        id
        name
        label
        pageType
        images(style: $style) {
          style
          images {
            type
            url
            region
            title
          }
        }
        children {
          id
          name
          label
          pageType
          images(style: $style) {
            style
            images {
              type
              url
              region
              title
            }
          }
          children {
            id
            name
            label
            pageType
            images(style: $style) {
              style
              images {
                type
                url
                region
                title
              }
            }
          }
        }
      }
    }
  }
`

export const CATEGORY_PRODUCTS_QUERY = `
  query GetCategoryProducts(
    $categoryId: ID
    $page: Int
    $count: Int
    $sortBy: String
    $offers: Boolean
  ) {
    category(
      page: $page
      count: $count
      sortBy: $sortBy
      categoryId: $categoryId
      offers: $offers
    ) {
      pageInformation: info {
        totalCount: total
        pageNo: page
        count
        pageSize
        offset
      }
      productItems: products {
        id
        baseProductId
        title
        brandName
        shortDescription
        defaultImageUrl
        images {
          display {
            default {
              url
              originalUrl
            }
          }
          default {
            url
            originalUrl
          }
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
      }
    }
  }
`

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts(
    $query: String!
    $page: Int
    $count: Int
    $sortBy: String
    $filters: [String]
  ) {
    search(
      query: $query
      page: $page
      count: $count
      sortBy: $sortBy
      filters: $filters
    ) {
      pageInformation: info {
        totalCount: total
        pageNo: page
        count
        pageSize
        offset
      }
      productItems: products {
        id
        baseProductId
        title
        brandName
        shortDescription
        defaultImageUrl
        images {
          display {
            default {
              url
              originalUrl
            }
          }
          default {
            url
            originalUrl
          }
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
      }
    }
  }
`

// API Client Configuration
const PROXY_URL = 'https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco'

// GraphQL Client
export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<GraphQLResponse<T>> {
  try {
    const response = await fetch(PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GraphQL request failed:", response.status, errorData)
      return { errors: [{ message: `API request failed with status ${response.status}` }] }
    }

    const result: GraphQLResponse<T> = await response.json()
    return result
  } catch (error) {
    console.error("Network or parsing error:", error)
    return {
      errors: [{ message: `Network or parsing error: ${error instanceof Error ? error.message : String(error)}` }],
    }
  }
}

// API Helper Functions
export class TescoAPI {
  static async getTaxonomySuperDepts(options: {
    storeId?: string
    style?: string
  } = {}) {
    const variables = {
      storeId: options.storeId || "3060", // UK store ID as per documentation
      style: options.style || "rounded",
    }
    
    return graphqlRequest<GetTaxonomyResponse>(TAXONOMY_SUPERDEPTS_QUERY, variables)
  }

  static async getTaxonomy(options: {
    storeId?: string
    includeInspirationEvents?: boolean
    style?: string
    categoryId?: string
  } = {}) {
    const variables = {
      storeId: options.storeId || "3060", // UK store ID as per documentation
      includeInspirationEvents: options.includeInspirationEvents || false,
      style: options.style || "rounded",
      categoryId: options.categoryId,
    }
    
    return graphqlRequest<GetTaxonomyResponse>(TAXONOMY_QUERY, variables)
  }

  static async getCategoryProducts(options: {
    categoryId: string
    page?: number
    count?: number
    sortBy?: string
    offers?: boolean
  }) {
    const variables = {
      categoryId: options.categoryId,
      page: options.page || 0,
      count: options.count || 20,
      sortBy: options.sortBy,
      offers: options.offers || false,
    }
    
    return graphqlRequest<GetCategoryProductsResponse>(CATEGORY_PRODUCTS_QUERY, variables)
  }

  static async searchProducts(options: {
    query: string
    page?: number
    count?: number
    sortBy?: string
    filters?: string[]
  }) {
    const variables = {
      query: options.query,
      page: options.page || 0,
      count: options.count || 20,
      sortBy: options.sortBy,
      filters: options.filters,
    }
    
    return graphqlRequest<SearchProductsResponse>(SEARCH_PRODUCTS_QUERY, variables)
  }
}

