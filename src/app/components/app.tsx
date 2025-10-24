import * as React from 'react';
import { SearchBar } from '../../components/ui/search-bar';
import { SearchOverlay } from '../../components/ui/search-overlay';
import { FilterChipList } from '../../components/ui/filter-chip';
import { CategoryGrid } from '../../components/ui/category-card';
import { ProductGrid } from '../../components/ui/product-grid';
import { Breadcrumb } from '../../components/ui/breadcrumb';
import { MeshGradient } from '../../components/ui/mesh-gradient';
import { PopulateFooter } from '../../components/ui/populate-footer';
import { HorizontalScroll } from '../../components/ui/horizontal-scroll';
import { SettingsPanel } from '../../components/ui/settings-panel';
import type { TaxonomyItem, ProductItem, CategoryBreadcrumb, CategoryNavigationState } from '../../types/tesco';

interface AppState {
  searchTerm: string;
  loading: boolean;
  categoriesLoading: boolean;
  categories: TaxonomyItem[];
  products: ProductItem[];
  error: string | null;
  successMessage: string | null;
  recentSearches: string[];
  isSearchOverlayOpen: boolean;
  searchSuggestions: Array<{ text: string; query: string }>;
  viewMode: 'categories' | 'search';
  selectedProducts: string[];
  totalResults: number;
  hasMoreResults: boolean;
  loadingMore: boolean;
  // Category navigation state
  categoryNavigation: CategoryNavigationState;
  // Scroll fade effects
  scrollState: {
    scrollTop: number;
    canScrollDown: boolean;
  };
  // Component configuration
  platform: 'app' | 'mobile-web' | 'desktop-web';
  layout: 'grid' | 'vertical' | 'horizontal';
  isSettingsOpen: boolean;
  componentMappings: Record<string, any>;
  capturedComponentId: string | null;
  capturedComponentName: string | null;
  capturedLibraryId: string | null;
  capturedLibraryName: string | null;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      loading: false,
      categoriesLoading: false,
      categories: [],
      products: [],
      error: null,
      successMessage: null,
      recentSearches: this.loadRecentSearches(),
      isSearchOverlayOpen: false,
      searchSuggestions: [
        { text: 'cheese', query: 'cheese' },
        { text: 'chicken', query: 'chicken' },
        { text: 'chocolate', query: 'chocolate' },
        { text: 'chips', query: 'chips' },
        { text: 'cherries', query: 'cherries' },
        { text: 'bread', query: 'bread' },
        { text: 'milk', query: 'milk' },
        { text: 'eggs', query: 'eggs' },
        { text: 'butter', query: 'butter' },
        { text: 'yogurt', query: 'yogurt' },
      ],
      viewMode: 'categories',
      selectedProducts: [],
      totalResults: 0,
      hasMoreResults: false,
      loadingMore: false,
      categoryNavigation: {
        breadcrumbs: [{ id: 'home', name: 'All Categories', level: 'home' }],
        currentCategoryId: undefined,
        isShowingProducts: false
      },
      scrollState: {
        scrollTop: 0,
        canScrollDown: false
      },
      // Component configuration
      platform: 'app',
      layout: 'grid',
      isSettingsOpen: false,
      componentMappings: {},
      capturedComponentId: null,
      capturedComponentName: null,
      capturedLibraryId: null,
      capturedLibraryName: null
    };
  }

  // Load recent searches from Figma clientStorage
  loadRecentSearches = (): string[] => {
    // Initial empty array - will be loaded from storage after mount
    return [];
  }

  // Save recent searches to Figma clientStorage
  saveRecentSearches = (searches: string[]) => {
    this.sendMessage('saveRecentSearches', { searches });
  }

  componentDidMount() {
    // Set up message listener for responses from main thread
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      this.handleMessage(msg);
    };

    this.loadCategories();
    
    // Load recent searches from storage
    this.sendMessage('loadRecentSearches');
    
    // Load component mappings
    this.sendMessage('loadComponentMappings');

    // Expose populateTiles function globally so Figma UI button can call it
    (window as any).populateTiles = this.populateTiles;

    // Auto-focus the search bar
    const focusSearchInput = () => {
      const searchInput = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    };

    // Try multiple times with increasing delays
    setTimeout(focusSearchInput, 100);
    setTimeout(focusSearchInput, 300);
    setTimeout(focusSearchInput, 500);
    
    // Also try on window load
    window.addEventListener('load', focusSearchInput);
  }

  componentWillUnmount() {
    window.onmessage = null;
  }

  handleMessage = (msg: any) => {
    console.log('UI received message:', msg);
    
    switch (msg.type) {
      case 'getTaxonomyResponse':
        if (msg.data?.data?.taxonomy) {
          this.setState({ categories: msg.data.data.taxonomy, categoriesLoading: false });
        } else {
          this.setState({ error: 'Failed to load categories', categoriesLoading: false });
        }
        break;
        
      case 'searchProductsResponse':
        if (msg.data?.data?.search?.productItems) {
          const searchData = msg.data.data.search;
          const pageInfo = searchData.pageInformation;
          const isLoadMore = this.state.loadingMore;
          
          this.setState({ 
            products: isLoadMore 
              ? [...this.state.products, ...searchData.productItems]
              : searchData.productItems,
            loading: false,
            loadingMore: false,
            viewMode: 'search',
            error: null,
            totalResults: pageInfo?.totalCount || 0,
            hasMoreResults: (pageInfo?.totalCount || 0) > (this.state.products.length + searchData.productItems.length)
          });
        } else {
          this.setState({ 
            error: 'No products found', 
            loading: false,
            viewMode: 'search',
            products: []
          });
        }
        break;
        
      case 'getCategoryProductsResponse':
        if (msg.data?.data?.category?.productItems) {
          const categoryData = msg.data.data.category;
          const pageInfo = categoryData.pageInformation;
          
          this.setState(prevState => ({
            products: categoryData.productItems,
            loading: false,
            error: null,
            totalResults: pageInfo?.totalCount || 0,
            hasMoreResults: (pageInfo?.totalCount || 0) > categoryData.productItems.length,
            categoryNavigation: {
              ...prevState.categoryNavigation,
              isShowingProducts: true
            },
            viewMode: 'search' // Show products in the same view as search results
          }));
        } else {
          this.setState({ error: 'No products found in category', loading: false });
        }
        break;
        
      case 'getCategoryChildrenResponse':
        if (msg.data?.data?.taxonomy?.[0]?.children) {
          const children = msg.data.data.taxonomy[0].children;
          this.setState({ 
            categories: children,
            categoriesLoading: false,
            loading: false,
            error: null
          });
        } else {
          this.setState({ 
            error: 'No child categories found', 
            categoriesLoading: false,
            loading: false 
          });
        }
        break;
        
      case 'searchWithSuggestionsResponse':
        console.log('Search suggestions response:', msg.data);
        if (msg.data?.data?.search?.suggestions?.searchTerms) {
          const suggestions = msg.data.data.search.suggestions.searchTerms.map((term: any) => ({
            text: term.suggestionQuery,
            query: term.suggestionQuery
          }));
          console.log('Mapped suggestions:', suggestions);
          this.setState({ searchSuggestions: suggestions });
        } else {
          console.log('No suggestions found in response, checking structure...');
          console.log('msg.data:', msg.data);
          console.log('msg.data.data:', msg.data?.data);
          console.log('msg.data.data.search:', msg.data?.data?.search);
          console.log('msg.data.data.search.suggestions:', msg.data?.data?.search?.suggestions);
        }
        break;
        
      case 'tilesDetected':
        console.log(`✅ Detected ${msg.data.total} tiles:`, msg.data.tiles);
        // You could store detected tiles in state if needed
        break;
        
      case 'populateProductTilesResponse':
        console.log('✅ Tile population completed:', msg.data.summary);
        const { successful, failed, total } = msg.data.summary;
        if (successful > 0) {
          this.setState({ 
            error: null,
            // You could show a success message here
          });
          console.log(`🎉 Successfully populated ${successful}/${total} tiles`);
        }
        if (failed > 0) {
          console.warn(`⚠️ Failed to populate ${failed}/${total} tiles`);
        }
        break;
        
      case 'recentSearchesLoaded':
        if (msg.data && Array.isArray(msg.data)) {
          this.setState({ recentSearches: msg.data });
        }
        break;
        
      case 'populateComplete':
        if (msg.success) {
          const message = `Successfully populated ${msg.populatedCount}/${msg.totalSelected} tiles`;
          this.setState({ 
            error: null,
            // Show success message briefly
            successMessage: msg.errors && msg.errors.length > 0 
              ? `${message}. Some errors occurred: ${msg.errors.join(', ')}`
              : message
          });
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.setState({ successMessage: null });
          }, 3000);
        } else {
          this.setState({ error: 'Failed to populate tiles' });
        }
        break;
        
      case 'componentMappingsLoaded':
        this.setState({ componentMappings: msg.mappings });
        break;

      case 'selectedComponentId':
        this.setState({ 
          capturedComponentId: msg.componentId,
          capturedComponentName: msg.componentName,
          capturedLibraryId: msg.libraryId || null,
          capturedLibraryName: msg.libraryName || null
        });
        break;

      case 'componentMappingSaved':
        this.setState({ 
          successMessage: 'Component mapping saved!',
          capturedComponentId: null,
          capturedComponentName: null,
          capturedLibraryId: null,
          capturedLibraryName: null
        });
        this.sendMessage('loadComponentMappings');
        break;
        
      case 'error':
        this.setState({ error: msg.error, loading: false });
        break;
        
      default:
        console.log('Unknown message type:', msg.type);
    }
  };

  sendMessage = (type: string, payload?: any) => {
    parent.postMessage({ pluginMessage: { type, payload } }, '*');
  };

  // Component configuration handlers
  handlePlatformChange = (platform: string) => {
    this.setState({ platform: platform as any });
  };

  handleLayoutChange = (layout: string) => {
    this.setState({ layout: layout as any });
  };

  handleOpenSettings = () => {
    this.setState({ isSettingsOpen: true });
  };

  handleCloseSettings = () => {
    this.setState({ 
      isSettingsOpen: false, 
      capturedComponentId: null,
      capturedLibraryId: null,
      capturedLibraryName: null
    });
  };

  handleCaptureComponent = () => {
    this.sendMessage('getSelectedComponentId');
  };

  handleSaveMapping = (componentId: string, libraryId?: string, libraryName?: string) => {
    this.sendMessage('saveComponentMapping', {
      platform: this.state.platform,
      layout: this.state.layout,
      componentId,
      libraryId,
      libraryName
    });
  };

  loadCategories = () => {
    this.setState({ categoriesLoading: true, error: null });
    this.sendMessage('getTaxonomy');
  };

  searchProducts = (searchTerm?: string) => {
    const query = searchTerm || this.state.searchTerm;
    if (!query.trim()) return;
    
    // Add to recent searches if it's a new search
    if (searchTerm && !this.state.recentSearches.includes(searchTerm)) {
      const newRecentSearches = [searchTerm, ...this.state.recentSearches.slice(0, 9)]; // Keep last 10
      this.setState({ recentSearches: newRecentSearches });
      this.saveRecentSearches(newRecentSearches);
    }
    
    this.setState({ 
      loading: true, 
      error: null, 
      products: [],
      searchTerm: query,
      viewMode: 'search',
      totalResults: 0,
      hasMoreResults: false,
      loadingMore: false,
      selectedProducts: []  // Reset selection when running new search
    });
    
    this.sendMessage('searchProducts', {
      query,
      count: 20,
      offset: 0
    });
  };

  loadMoreProducts = () => {
    const { searchTerm, products, hasMoreResults, loadingMore } = this.state;
    
    if (!hasMoreResults || loadingMore || !searchTerm.trim()) return;
    
    this.setState({ loadingMore: true });
    
    this.sendMessage('searchProducts', {
      query: searchTerm,
      count: 20,
      offset: products.length
    });
  };

  navigateToCategory = (categoryId: string, categoryName: string) => {
    // Determine level based on current navigation depth
    const currentDepth = this.state.categoryNavigation.breadcrumbs.length;
    const levelMap = ['home', 'superdepartment', 'department', 'aisle', 'shelf'] as const;
    const level = levelMap[currentDepth] || 'shelf';
    
    // Update breadcrumbs
    const newBreadcrumb: CategoryBreadcrumb = {
      id: categoryId,
      name: categoryName,
      level: level
    };

    this.setState(prevState => {
      const newBreadcrumbs = [...prevState.categoryNavigation.breadcrumbs, newBreadcrumb];
      const shouldShowProducts = level === 'aisle' || level === 'shelf'; // Show products for aisle and shelf
      
      return {
        loading: true,
        categoriesLoading: !shouldShowProducts, // Loading categories unless showing products
        error: null,
        products: [],
        categories: shouldShowProducts ? [] : prevState.categories, // Clear categories only when showing products
        categoryNavigation: {
          breadcrumbs: newBreadcrumbs,
          currentCategoryId: categoryId,
          isShowingProducts: shouldShowProducts
        },
        viewMode: shouldShowProducts ? 'search' : 'categories' // Switch to search view for products
      };
    });

    // Decide whether to load children categories or products
    if (level === 'aisle' || level === 'shelf') {
      // Load products for aisle/shelf level
      this.sendMessage('getCategoryProducts', {
        categoryId,
        count: 20,
      });
    } else {
      // Load child categories for superdepartment/department levels
      this.sendMessage('getCategoryChildren', {
        categoryId,
      });
    }
  };

  determineCategoryLevel = (categoryId: string): 'superdepartment' | 'department' | 'aisle' | 'shelf' => {
    if (categoryId.startsWith('superdepartment:')) return 'superdepartment';
    if (categoryId.startsWith('department:')) return 'department';
    if (categoryId.startsWith('aisle:')) return 'aisle';
    if (categoryId.startsWith('shelf:')) return 'shelf';
    // Default fallback - assume superdepartment for taxonomy items
    return 'superdepartment';
  };

  getLevelOrder = (level: string): number => {
    const order = { home: 0, superdepartment: 1, department: 2, aisle: 3, shelf: 4 };
    return order[level as keyof typeof order] || 0;
  };

  navigateBack = (targetBreadcrumbId: string) => {
    const { categoryNavigation } = this.state;
    const targetIndex = categoryNavigation.breadcrumbs.findIndex(crumb => crumb.id === targetBreadcrumbId);
    
    if (targetIndex === -1) return;

    const targetBreadcrumb = categoryNavigation.breadcrumbs[targetIndex];
    
    if (targetBreadcrumb.id === 'home') {
      // Navigate back to home - load superdepartments
      this.setState({
        loading: false,
        categoriesLoading: false,
        error: null,
        products: [],
        categoryNavigation: {
          breadcrumbs: [{ id: 'home', name: 'All Categories', level: 'home' }],
          currentCategoryId: undefined,
          isShowingProducts: false
        },
        viewMode: 'categories'
      });
      
      // Load the original superdepartments
      this.sendMessage('getTaxonomy');
    } else {
      // Navigate back to a specific category level
      const newBreadcrumbs = categoryNavigation.breadcrumbs.slice(0, targetIndex + 1);
      const shouldShowProducts = targetBreadcrumb.level === 'aisle' || targetBreadcrumb.level === 'shelf';
      
      this.setState({
        loading: true,
        categoriesLoading: !shouldShowProducts,
        error: null,
        products: [],
        categoryNavigation: {
          breadcrumbs: newBreadcrumbs,
          currentCategoryId: targetBreadcrumb.id,
          isShowingProducts: shouldShowProducts
        },
        viewMode: shouldShowProducts ? 'search' : 'categories'
      });

      // Load appropriate data for the target level
      if (shouldShowProducts) {
        // Load products for aisle/shelf level
        this.sendMessage('getCategoryProducts', {
          categoryId: targetBreadcrumb.id,
          count: 20,
        });
      } else {
        // Load child categories for superdepartment/department levels
        this.sendMessage('getCategoryChildren', {
          categoryId: targetBreadcrumb.id,
        });
      }
    }
  };

  // Legacy method name for backward compatibility
  browseCategoryProducts = this.navigateToCategory;

  handleContentScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const canScrollDown = scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 1;

    this.setState({
      scrollState: {
        scrollTop,
        canScrollDown
      }
    });
  };

  handleProductSelect = (productId: string) => {
    this.setState(prevState => ({
      selectedProducts: prevState.selectedProducts.includes(productId)
        ? prevState.selectedProducts.filter(id => id !== productId)
        : [...prevState.selectedProducts, productId]
    }));
  };

  backToCategories = () => {
    this.setState({ 
      viewMode: 'categories',
      searchTerm: '',
      products: [],
      error: null
    });
  };

  handleRecentSearchSelect = (searchTerm: string) => {
    this.searchProducts(searchTerm);
  };

  private searchSuggestionsTimeout: number | null = null;

  fetchSearchSuggestions = async (query: string) => {
    // Clear any existing timeout
    if (this.searchSuggestionsTimeout) {
      clearTimeout(this.searchSuggestionsTimeout);
    }

    // Debounce the search suggestions request
    this.searchSuggestionsTimeout = window.setTimeout(() => {
      try {
        console.log('Fetching suggestions for:', query);
        // Send message to Figma plugin code to fetch suggestions
        parent.postMessage({ 
          pluginMessage: { 
            type: 'searchWithSuggestions', 
            payload: { query, suggestionsCount: 10 }
          } 
        }, '*');
      } catch (error) {
        console.error('Failed to fetch search suggestions:', error);
      }
    }, 300); // 300ms debounce
  };

  // Populate tiles function triggered by the populate button
  populateTiles = () => {
    console.log('🎯 Populate tiles button clicked');
    
    // Check if we have products to populate with
    if (this.state.products.length === 0) {
      this.setState({ 
        error: 'No products available. Please search for products first.' 
      });
      return;
    }
    
    // Send message to backend to populate selected tiles
    this.sendMessage('populateSelectedTiles', {
      products: this.state.products,
      selectedProducts: this.state.selectedProducts,
      platform: this.state.platform,
      layout: this.state.layout
    });
  };

  handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('handleSearchChange called with value:', value);
    this.setState({ 
      searchTerm: value,
      // Open overlay when user starts typing
      isSearchOverlayOpen: value.length > 0
    });

    // Fetch search suggestions if there's a query
    if (value.trim().length > 0) {
      console.log('Triggering fetchSearchSuggestions for:', value.trim());
      this.fetchSearchSuggestions(value.trim());
    } else {
      console.log('Clearing suggestions - empty value');
      this.setState({ searchSuggestions: [] });
    }
  };

  // Transform categories for the grid component
  getFormattedCategories = () => {
    return this.state.categories.map(category => {
      // Smart image selection based on documentation
      let imageUrl = undefined;
      
      if (category.images && category.images.length > 0) {
        // For superdepartments, prefer "rounded" style
        const preferredStyle = category.label === "superdepartment" ? "rounded" : "thumbnail";
        
        // Try to find preferred style first
        for (let i = 0; i < category.images.length; i++) {
          const imageGroup = category.images[i];
          if (imageGroup && imageGroup.style === preferredStyle && imageGroup.images && imageGroup.images.length > 0) {
            imageUrl = imageGroup.images[0].url;
            break;
          }
        }
        
        // Fallback to any available image
        if (!imageUrl) {
          for (let i = 0; i < category.images.length; i++) {
            const imageGroup = category.images[i];
            if (imageGroup && imageGroup.images && imageGroup.images.length > 0) {
              imageUrl = imageGroup.images[0].url;
              break;
            }
          }
        }
      }
      
      return {
        id: category.id,
        name: category.name,
        imageUrl
      };
    });
  };

  // Search overlay handlers
  handleSearchClick = () => {
    this.setState({ isSearchOverlayOpen: true });
  };

  handleSearchOverlayClose = () => {
    this.setState({ isSearchOverlayOpen: false });
  };

  handleSearchOverlayChange = (value: string) => {
    console.log('handleSearchOverlayChange called with value:', value);
    this.setState({ searchTerm: value });
    
    // Fetch search suggestions if there's a query
    if (value.trim().length > 0) {
      console.log('Triggering fetchSearchSuggestions from overlay for:', value.trim());
      this.fetchSearchSuggestions(value.trim());
    } else {
      console.log('Clearing suggestions from overlay - empty value');
      this.setState({ searchSuggestions: [] });
    }
  };

  // Visual-only update for arrow key navigation (no new API calls)
  handleSearchFieldVisualUpdate = (value: string) => {
    console.log('handleSearchFieldVisualUpdate called with value:', value);
    this.setState({ searchTerm: value });
  };

  handleSuggestionSelect = (suggestion: string) => {
    this.setState({ searchTerm: suggestion });
    this.searchProducts(suggestion);
  };

  // Get all suggestions from API without filtering
  getFilteredSuggestions = () => {
    const { searchSuggestions } = this.state;
    // Don't filter suggestions - the API already returns relevant suggestions
    return searchSuggestions;
  };


  render() {
    const { searchTerm, loading, categoriesLoading, error, successMessage, recentSearches, isSearchOverlayOpen, viewMode, products, selectedProducts } = this.state;
    const formattedCategories = this.getFormattedCategories();
    const filteredSuggestions = this.getFilteredSuggestions();

    return (
      <MeshGradient className="w-full h-full">
        <div className="flex flex-col items-center justify-start w-full h-full gap-3" style={{ padding: '0.75rem' }}>
          {/* Header */}
          <div className="flex flex-col gap-3 items-start justify-start w-full">
          {/* Search Bar */}
          <div className="flex gap-6 items-center justify-start w-full">
            <SearchBar
              value={searchTerm}
              onChange={this.handleSearchChange}
              onSearch={this.searchProducts}
              onClick={this.handleSearchClick}
              loading={loading}
              className="flex-1"
            />
          </div>

          
          {/* Recent Searches - only show when at home level */}
          {viewMode === 'categories' && recentSearches.length > 0 && this.state.categoryNavigation.breadcrumbs.length === 1 && (
            <HorizontalScroll className="w-full">
              <FilterChipList
                chips={recentSearches}
                onChipSelect={this.handleRecentSearchSelect}
                variant="search"
                className="flex gap-2.5 items-start pb-1 flex-nowrap"
              />
            </HorizontalScroll>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm w-full max-w-[376px]">
            {error}
          </div>
        )}

        {/* Success Message Display */}
        {successMessage && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm w-full max-w-[376px]">
            {successMessage}
          </div>
        )}

        {/* Main Content */}
        <div 
          className="bg-white h-[494px] w-full max-w-[376px] rounded-xl relative overflow-hidden flex flex-col"
          style={{
            boxShadow: '0 -1px 0 0 rgba(0, 0, 0, 0.04) inset, 0 1px 0 0 rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.08), 0 1px 1px -0.5px rgba(0, 0, 0, 0.04), 0 2px 2px -1px rgba(0, 0, 0, 0.04), 0 4px 4px -2px rgba(0, 0, 0, 0.04), 0 8px 8px -4px rgba(0, 0, 0, 0.04), 0 0 0 2px rgba(255, 255, 255, 0.20)'
          }}
        >
          {/* Breadcrumb Header - Inside Main Content */}
          {(viewMode === 'search' || this.state.categoryNavigation.breadcrumbs.length > 1) && (
            <div 
              className="w-full bg-[#f6f6f6] px-2 py-2 shrink-0 rounded-tl-xl rounded-tr-xl sticky top-0 z-10"
              style={{
                boxShadow: '0px 1px 0px 0px rgba(0,0,0,0.03), 0px 1px 1px -0.5px rgba(0,0,0,0.04), 0px 2px 2px -1px rgba(0,0,0,0.04), 0px 4px 4px -2px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(255,255,255,0.5)'
              }}
            >
              <Breadcrumb 
                breadcrumbs={this.state.categoryNavigation.breadcrumbs}
                onBreadcrumbClick={this.navigateBack}
                resultCount={viewMode === 'search' && !this.state.categoryNavigation.isShowingProducts ? this.state.totalResults : undefined}
              />
            </div>
          )}
          {viewMode === 'categories' ? (
            <>
              {/* Category Content with Scroll Detection */}
              <div 
                className="flex-1 overflow-y-auto scrollbar-hide relative"
                onScroll={this.handleContentScroll}
              >
                <CategoryGrid
                  categories={formattedCategories}
                  onCategoryClick={this.browseCategoryProducts}
                  loading={categoriesLoading}
                  columns={4}
                  className="px-1 py-1"
                />
              </div>
            </>
          ) : (
            <>
              {/* Search Results with Scroll Detection */}
              <div 
                className="flex-1 overflow-y-auto scrollbar-hide relative"
                onScroll={this.handleContentScroll}
              >
                <ProductGrid
                  products={products}
                  loading={loading}
                  selectedProducts={selectedProducts}
                  onProductSelect={this.handleProductSelect}
                  columns={3}
                  className="px-1 py-1"
                  emptyMessage={searchTerm ? `No products found for "${searchTerm}"` : "No products found"}
                  hasMoreResults={this.state.hasMoreResults}
                  loadingMore={this.state.loadingMore}
                  onLoadMore={this.loadMoreProducts}
                />
              </div>
            </>
          )}
          
          {/* Inner shadow overlay */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ boxShadow: '0px -1px 2px 0px inset rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* Populate Footer - Outside main container, only when products are shown */}
        {viewMode === 'search' && products.length > 0 && !loading && (
          <div className="w-full max-w-[376px]">
            <PopulateFooter 
              onPopulate={this.populateTiles}
              productCount={selectedProducts.length > 0 ? selectedProducts.length : products.length}
              platform={this.state.platform}
              layout={this.state.layout}
              onPlatformChange={this.handlePlatformChange}
              onLayoutChange={this.handleLayoutChange}
              onOpenSettings={this.handleOpenSettings}
            />
          </div>
        )}

        {/* No footer spacer needed with p-3 on container */}
        
        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOverlayOpen}
          searchTerm={searchTerm}
          suggestions={filteredSuggestions}
          onClose={this.handleSearchOverlayClose}
          onSearchChange={this.handleSearchOverlayChange}
          onSearchFieldVisualUpdate={this.handleSearchFieldVisualUpdate}
          onSuggestionSelect={this.handleSuggestionSelect}
          onSearch={this.searchProducts}
          loading={loading}
        />
        
        {/* Settings Panel */}
        <SettingsPanel
          isOpen={this.state.isSettingsOpen}
          onClose={this.handleCloseSettings}
          platform={this.state.platform}
          layout={this.state.layout}
          componentMappings={this.state.componentMappings}
          onCaptureComponent={this.handleCaptureComponent}
          onSaveMapping={this.handleSaveMapping}
          capturedComponentId={this.state.capturedComponentId}
          capturedComponentName={this.state.capturedComponentName}
          capturedLibraryId={this.state.capturedLibraryId}
          capturedLibraryName={this.state.capturedLibraryName}
        />
        </div>
      </MeshGradient>
    );
  }
}
