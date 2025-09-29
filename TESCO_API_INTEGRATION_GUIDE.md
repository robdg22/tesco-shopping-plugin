# Tesco Shopping Experience API Integration Guide

This guide provides complete implementation details for integrating with the Tesco Shopping Experience API, including proxy server setup, GraphQL queries, and TypeScript types for product search and display functionality.

## 🎯 Overview

The Tesco Shopping Experience API is a GraphQL API that provides access to:
- **Product catalog search** with full-text search capabilities
- **Category taxonomy** for browsing product hierarchies  
- **Product details** including images, pricing, and promotions
- **Real-time product availability** and store information

## 🔧 API Configuration

### Base Endpoint
```
https://api.tesco.com/shoppingexperience
```

### Required Headers
```javascript
{
  "X-Apikey": "TvOSZJHlEk0pjniDGQFAc9Q59WGAR4dA",
  "Content-Type": "application/json",
  "Referer": "https://www.tesco.com/groceries/en-GB/search?query=eggs%5D&inputType=free+text",
  "Region": "UK",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
```

### Store ID Configuration
- **UK Store ID**: `"3060"` (primary store for UK market)
- **Alternative**: `"uk"` (also works for most queries)

## 🌐 Proxy Server (Already Available)

Since the Tesco API doesn't support CORS, we use an existing proxy server that's already deployed and ready to use:

### **Production Proxy URL**
```
https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco
```

This proxy server is already configured with:
- ✅ Proper Tesco API headers and authentication
- ✅ CORS headers for browser access  
- ✅ Error handling and response formatting
- ✅ Deployed on Vercel for high availability

**No additional setup required** - you can use this proxy directly in your implementation.

## 📝 GraphQL Queries

### 1. Product Search Query
```graphql
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
```

### 2. Category Taxonomy Query
```graphql
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
```

### 3. Category Products Query
```graphql
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
```

## 🏗️ TypeScript Types

### Core Types
```typescript
export interface GraphQLResponse<T> {
  data?: T
  errors?: Array<{ message: string }>
}

export interface Image {
  type: string
  url: string
  region?: string
  title?: string
}

export interface TaxonomyItemImageStyle {
  style: string
  images: Image[]
}

export interface TaxonomyItem {
  id: string
  name: string
  label: string
  pageType: string
  images?: TaxonomyItemImageStyle[]
  children?: TaxonomyItem[]
}

export interface Promotion {
  promotionId: string
  promotionType: string
  startDate: string
  endDate: string
  offerText: string
}

export interface ProductItem {
  id: string
  baseProductId: string
  title: string
  brandName: string
  shortDescription: string
  defaultImageUrl: string
  media?: {
    defaultImage?: {
      url: string
      aspectRatio?: number
    }
    images?: Array<{
      url: string
      aspectRatio?: number
    }>
  }
  price?: {
    price: number
    unitPrice: string
    unitOfMeasure: string
  }
  promotions?: Promotion[]
}

export interface PageInformation {
  totalCount: number
  pageNo: number
  count: number
  pageSize: number
  offset: number
}

export interface GetTaxonomyResponse {
  taxonomy: TaxonomyItem[]
}

export interface GetCategoryProductsResponse {
  category: {
    pageInformation: PageInformation
    productItems: ProductItem[]
  }
}

export interface SearchProductsResponse {
  search: {
    pageInformation: PageInformation
    productItems: ProductItem[]
  }
}
```

## 🚀 GraphQL Client Implementation

### Client Function
```typescript
export async function graphqlRequest<T>(
  query: string,
  variables: Record<string, any> = {},
  proxyUrl: string = "https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco"
): Promise<GraphQLResponse<T>> {
  try {
    const response = await fetch(proxyUrl, {
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
```

### API Helper Class
```typescript
export class TescoAPI {
  private static proxyUrl = "https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco"

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
    
    return graphqlRequest<SearchProductsResponse>(SEARCH_PRODUCTS_QUERY, variables, this.proxyUrl)
  }

  static async getTaxonomy(options: {
    storeId?: string
    includeInspirationEvents?: boolean
    style?: string
    categoryId?: string
  } = {}) {
    const variables = {
      storeId: options.storeId || "3060",
      includeInspirationEvents: options.includeInspirationEvents || false,
      style: options.style || "rounded",
      categoryId: options.categoryId,
    }
    
    return graphqlRequest<GetTaxonomyResponse>(TAXONOMY_QUERY, variables, this.proxyUrl)
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
    
    return graphqlRequest<GetCategoryProductsResponse>(CATEGORY_PRODUCTS_QUERY, variables, this.proxyUrl)
  }
}
```

## 💡 Usage Examples

### Product Search
```typescript
// Search for products
const searchResult = await TescoAPI.searchProducts({
  query: "organic milk",
  count: 10,
  page: 0
})

if (searchResult.data) {
  const products = searchResult.data.search.productItems
  const pagination = searchResult.data.search.pageInformation
  
  console.log(`Found ${pagination.totalCount} products`)
  products.forEach(product => {
    console.log(`${product.title} - £${product.price?.price}`)
  })
}
```

### Category Browsing
```typescript
// Get top-level categories
const taxonomyResult = await TescoAPI.getTaxonomy({
  storeId: "3060"
})

if (taxonomyResult.data) {
  const categories = taxonomyResult.data.taxonomy
  categories.forEach(category => {
    console.log(`Category: ${category.name} (${category.id})`)
  })
}

// Get products in a category
const categoryResult = await TescoAPI.getCategoryProducts({
  categoryId: "4004",
  count: 20
})

if (categoryResult.data) {
  const products = categoryResult.data.category.productItems
  products.forEach(product => {
    console.log(`${product.title} - ${product.brandName}`)
  })
}
```

## 🔍 Search Functionality

### Search Parameters
- **query**: Search term (required)
- **page**: Zero-based page number (default: 0)
- **count**: Products per page (default: 20, max: 100)
- **sortBy**: Sort criteria (optional)
  - `"relevance"` (default)
  - `"price_asc"`
  - `"price_desc"`
  - `"brand_asc"`
  - `"brand_desc"`
- **filters**: Array of filter strings (optional)

### Product Display Fields
- **id**: Unique product identifier
- **title**: Product name
- **brandName**: Brand name
- **shortDescription**: Brief description
- **defaultImageUrl**: Primary product image (fallback)
- **media.defaultImage.url**: High-quality product image
- **media.defaultImage.aspectRatio**: Image aspect ratio (0.8 = 4:5, 1.0 = 1:1)
- **media.images**: Array of additional product images with aspect ratios
- **price.price**: Current price in pounds
- **price.unitPrice**: Price per unit (e.g., "£1.50/kg")
- **promotions**: Array of active promotions

## 🎨 Image Handling

Products include multiple image formats with aspect ratio information:
```typescript
// Primary image (always available)
const primaryImage = product.defaultImageUrl

// High-quality images with aspect ratio (when available)
const defaultImage = product.media?.defaultImage?.url
const defaultImageAspectRatio = product.media?.defaultImage?.aspectRatio

// Additional images from media array
const additionalImages = product.media?.images || []

// Use fallback chain for image URL
const imageUrl = defaultImage || primaryImage

// Aspect ratio handling for layout
const getAspectRatioClass = (aspectRatio?: number) => {
  if (!aspectRatio) return "aspect-square" // Default fallback
  
  if (Math.abs(aspectRatio - 0.8) < 0.1) {
    return "aspect-[4/5]" // 4:5 ratio
  } else if (Math.abs(aspectRatio - 1.0) < 0.1) {
    return "aspect-square" // 1:1 ratio
  } else if (aspectRatio < 1) {
    return "aspect-[4/5]" // Portrait
  } else {
    return "aspect-square" // Default to square
  }
}

const aspectRatioClass = getAspectRatioClass(defaultImageAspectRatio)
```

## 🛡️ Error Handling

```typescript
const result = await TescoAPI.searchProducts({ query: "milk" })

if (result.errors) {
  console.error("API Error:", result.errors[0].message)
  return
}

if (!result.data) {
  console.error("No data returned")
  return
}

// Process successful result
const products = result.data.search.productItems
```

## 🚀 Deployment Options

### Vercel (Recommended)
1. Deploy your Next.js app to Vercel
2. The API route will automatically be deployed as a serverless function
3. Update your client code to use the production URL

### Alternative Platforms
- **Netlify Functions**
- **Railway**
- **AWS Lambda**
- **Google Cloud Functions**

## 📊 Performance Considerations

- **Pagination**: Use appropriate page sizes (20-50 products)
- **Caching**: Implement response caching for taxonomy data
- **Rate Limiting**: Be mindful of API rate limits
- **Image Optimization**: Use image CDN for product images
- **Error Boundaries**: Implement proper error handling for UI

## 🔧 Testing

### Test the Proxy
```bash
curl -X POST https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco \
  -H "Content-Type: application/json" \
  -d '{"query": "query { taxonomy(storeId: \"3060\") { id name } }"}'
```

### Test Search
```javascript
const testSearch = await fetch('https://tesco-proxy-b4fena2ys-robdgraham-gmailcoms-projects.vercel.app/api/tesco', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'query SearchProducts($query: String!) { search(query: $query) { products { id title } } }',
    variables: { query: 'milk' }
  })
})
```

This guide provides everything needed to implement a complete Tesco product search and display system. The API is powerful and supports complex product browsing scenarios with real-time data from Tesco's live catalog.
