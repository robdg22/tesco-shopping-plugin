import * as React from 'react';
import { SearchBar } from '../../components/ui/search-bar';
import { SearchOverlay } from '../../components/ui/search-overlay';
import { FilterChipList } from '../../components/ui/filter-chip';
import { CategoryGrid } from '../../components/ui/category-card';
import type { TaxonomyItem, ProductItem } from '../../types/tesco';

interface AppState {
  searchTerm: string;
  loading: boolean;
  categoriesLoading: boolean;
  categories: TaxonomyItem[];
  products: ProductItem[];
  error: string | null;
  recentSearches: string[];
  isSearchOverlayOpen: boolean;
  searchSuggestions: Array<{ text: string; query: string }>;
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
      recentSearches: ['Cheese', 'Milk', 'Bread', 'Eggs'],
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
    };
  }

  componentDidMount() {
    // Set up message listener for responses from main thread
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      this.handleMessage(msg);
    };

    this.loadCategories();

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
          this.setState({ products: msg.data.data.search.productItems, loading: false });
        } else {
          this.setState({ error: 'No products found', loading: false });
        }
        break;
        
      case 'getCategoryProductsResponse':
        if (msg.data?.data?.category?.productItems) {
          this.setState({ products: msg.data.data.category.productItems, loading: false });
        } else {
          this.setState({ error: 'No products found in category', loading: false });
        }
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

  loadCategories = () => {
    this.setState({ categoriesLoading: true, error: null });
    this.sendMessage('getTaxonomy');
  };

  searchProducts = (searchTerm?: string) => {
    const query = searchTerm || this.state.searchTerm;
    if (!query.trim()) return;
    
    // Add to recent searches if it's a new search
    if (searchTerm && !this.state.recentSearches.includes(searchTerm)) {
      this.setState(prevState => ({
        recentSearches: [searchTerm, ...prevState.recentSearches.slice(0, 3)]
      }));
    }
    
    this.setState({ 
      loading: true, 
      error: null, 
      products: [],
      searchTerm: query
    });
    
    this.sendMessage('searchProducts', {
      query,
      count: 10,
    });
  };

  browseCategoryProducts = (categoryId: string, categoryName?: string) => {
    this.setState({ loading: true, error: null, products: [] });
    this.sendMessage('getCategoryProducts', {
      categoryId,
      count: 10,
    });
  };

  handleRecentSearchSelect = (searchTerm: string) => {
    this.searchProducts(searchTerm);
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ 
      searchTerm: value,
      // Open overlay when user starts typing
      isSearchOverlayOpen: value.length > 0
    });
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
    this.setState({ searchTerm: value });
  };

  handleSuggestionSelect = (suggestion: string) => {
    this.setState({ searchTerm: suggestion });
    this.searchProducts(suggestion);
  };

  // Get filtered suggestions based on current search term
  getFilteredSuggestions = () => {
    const { searchTerm, searchSuggestions } = this.state;
    if (!searchTerm) return searchSuggestions;
    
    return searchSuggestions.filter(suggestion =>
      suggestion.text.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  };

  render() {
    const { searchTerm, loading, error, recentSearches, isSearchOverlayOpen } = this.state;
    const formattedCategories = this.getFormattedCategories();
    const filteredSuggestions = this.getFilteredSuggestions();

    return (
      <div className="bg-[#f6f6f6] flex flex-col items-center justify-start w-full h-full gap-3" style={{ padding: '0.75rem' }}>
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
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <FilterChipList
              chips={recentSearches}
              onChipSelect={this.handleRecentSearchSelect}
              variant="search"
              className="flex gap-2.5 items-start pb-1"
            />
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm w-full max-w-[376px]">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white h-[494px] w-full max-w-[376px] rounded-xl relative shadow-[0px_2px_3px_0px_rgba(0,0,0,0.05)] border border-[#e2e2e2] overflow-hidden">
          <CategoryGrid
            categories={formattedCategories}
            onCategoryClick={this.browseCategoryProducts}
            loading={loading}
            className="p-0"
            columns={4}
          />
          
          {/* Inner shadow overlay */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ boxShadow: '0px -1px 2px 0px inset rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* No footer spacer needed with p-3 on container */}
        
        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOverlayOpen}
          searchTerm={searchTerm}
          suggestions={filteredSuggestions}
          onClose={this.handleSearchOverlayClose}
          onSearchChange={this.handleSearchOverlayChange}
          onSuggestionSelect={this.handleSuggestionSelect}
          onSearch={this.searchProducts}
          loading={loading}
        />
      </div>
    );
  }
}
