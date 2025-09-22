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
  baseProductId?: string;
  title: string;
  brandName?: string;
  shortDescription?: string;
  defaultImageUrl?: string;
  media?: {
    defaultImage?: {
      url: string;
      aspectRatio?: number;
    };
    images?: Array<{
      url: string;
      aspectRatio?: number;
    }>;
  };
  superDepartmentId?: string;
  superDepartmentName?: string;
  departmentId?: string;
  departmentName?: string;
  aisleId?: string;
  aisleName?: string;
  shelfId?: string;
  shelfName?: string;
  displayType?: string;
  productType?: string;
  averageWeight?: number;
  bulkBuyLimit?: number;
  maxQuantityAllowed?: number;
  groupBulkBuyLimit?: number;
  bulkBuyLimitMessage?: string;
  bulkBuyLimitGroupId?: string;
  timeRestrictedDelivery?: boolean;
  restrictedDelivery?: boolean;
  isForSale?: boolean;
  isNew?: boolean;
  isRestrictedOrderAmendment?: boolean;
  status?: string;
  maxWeight?: number;
  minWeight?: number;
  increment?: number;
  price?: {
    price: number;
    unitPrice?: string;
    unitOfMeasure?: string;
  };
  promotions?: Array<{
    id: string;
    promotionType: string;
    startDate?: string;
    endDate?: string;
    offerText: string;
  }>;
  reviews?: {
    stats: {
      noOfReviews: number;
      overallRating: number;
      overallRatingRange?: number;
    };
  };
  restrictions?: Array<{
    type: string;
    isViolated: boolean;
    message: string;
  }>;
  catchWeightList?: Array<{
    price: number;
    weight: number;
    default: boolean;
  }>;
  restrictedDeliveryTime?: {
    day: string;
    startDateTime: string;
    endDateTime: string;
    message: string;
  };
  restrictedDeliveryDate?: {
    startDate: string;
    endDate: string;
    leadTimeValue: number;
    message: string;
  };
  unavailableDeliveryDateRange?: {
    startDate: string;
    endDate: string;
  };
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

// Category Hierarchy Navigation Types
export interface CategoryBreadcrumb {
  id: string;
  name: string;
  level: 'home' | 'superdepartment' | 'department' | 'aisle' | 'shelf';
}

export interface CategoryNavigationState {
  breadcrumbs: CategoryBreadcrumb[];
  currentCategoryId?: string;
  isShowingProducts: boolean;
}

export interface CategoryHierarchyLevel {
  id: string;
  name: string;
  level: 'superdepartment' | 'department' | 'aisle' | 'shelf';
  parentId?: string;
  hasChildren: boolean;
  hasProducts: boolean;
}
