// Tesco API Types

export interface TaxonomyImage {
  type: string;
  url: string;
  region?: string;
  title?: string;
  __typename?: string;
}

export interface TaxonomyImageStyle {
  style: string;
  images: TaxonomyImage[];
  __typename?: string;
}

export interface TaxonomyItem {
  id: string;
  name: string;
  label?: string;
  pageType?: string;
  children?: TaxonomyItem[];
  images?: TaxonomyImageStyle[];
  __typename?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description?: string;
  price?: {
    amount: number;
    currency: string;
  };
  images?: {
    url: string;
    width?: number;
    height?: number;
  }[];
  availability?: string;
  brand?: string;
  category?: string;
}

export interface SearchResponse {
  products: ProductItem[];
  totalCount: number;
  pagination?: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface TaxonomyResponse {
  categories: TaxonomyItem[];
}

export interface TescoApiRequest {
  query?: string;
  operation: 'search' | 'taxonomy' | 'product';
  filters?: {
    category?: string;
    brand?: string;
    priceRange?: {
      min: number;
      max: number;
    };
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface TescoApiResponse {
  success: boolean;
  data?: SearchResponse | TaxonomyResponse | ProductItem;
  error?: string;
}

// GraphQL Response Types
export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
}

export interface GetTaxonomyResponse {
  taxonomy: TaxonomyItem[];
}

export interface GetCategoryProductsResponse {
  products?: {
    results?: ProductItem[];
    totalCount?: number;
  };
}

export interface SearchProductsResponse {
  productSearch?: {
    results?: ProductItem[];
    totalCount?: number;
  };
}

export interface SearchSuggestion {
  suggestionQuery: string;
}

export interface SearchSuggestionsInfo {
  count: number;
  query: string;
}

export interface SearchWithSuggestionsResponse {
  search: {
    suggestions: {
      searchTerms: SearchSuggestion[];
      info: SearchSuggestionsInfo;
    };
  };
}
