/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/component-config.ts":
/*!****************************************!*\
  !*** ./src/config/component-config.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUTOLAYOUT_CONFIG: () => (/* binding */ AUTOLAYOUT_CONFIG),
/* harmony export */   COMPONENT_MAPPINGS: () => (/* binding */ COMPONENT_MAPPINGS),
/* harmony export */   DEFAULT_COMPONENT_MAPPINGS: () => (/* binding */ DEFAULT_COMPONENT_MAPPINGS),
/* harmony export */   resetToDefaults: () => (/* binding */ resetToDefaults)
/* harmony export */ });
// Default component mappings - UPDATE THESE WITH YOUR COMPONENT IDS FOR END USERS
// These will be the default mappings that end users get without having to configure anything
const DEFAULT_COMPONENT_MAPPINGS = {
    'app-grid': { platform: 'app', layout: 'grid', componentId: '330:9137', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'app-vertical': { platform: 'app', layout: 'vertical', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'app-horizontal': { platform: 'app', layout: 'horizontal', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'mobile-web-grid': { platform: 'mobile-web', layout: 'grid', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'mobile-web-vertical': { platform: 'mobile-web', layout: 'vertical', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'mobile-web-horizontal': { platform: 'mobile-web', layout: 'horizontal', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'desktop-web-grid': { platform: 'desktop-web', layout: 'grid', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'desktop-web-vertical': { platform: 'desktop-web', layout: 'vertical', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
    'desktop-web-horizontal': { platform: 'desktop-web', layout: 'horizontal', componentId: '', libraryName: 'DDS Shopping native domain library', libraryId: '330' },
};
// Initialize with default mappings
const COMPONENT_MAPPINGS = Object.assign({}, DEFAULT_COMPONENT_MAPPINGS);
// Helper function to reset to defaults (useful for development)
function resetToDefaults() {
    Object.keys(COMPONENT_MAPPINGS).forEach(key => {
        COMPONENT_MAPPINGS[key] = Object.assign({}, DEFAULT_COMPONENT_MAPPINGS[key]);
    });
}
const AUTOLAYOUT_CONFIG = {
    'grid': { layoutMode: 'HORIZONTAL', layoutWrap: 'WRAP' },
    'vertical': { layoutMode: 'VERTICAL', layoutWrap: 'NO_WRAP' },
    'horizontal': { layoutMode: 'HORIZONTAL', layoutWrap: 'NO_WRAP' },
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_component_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/component-config */ "./src/config/component-config.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Import component configuration

// This shows the HTML page in "ui.html"
figma.showUI(__html__, { width: 400, height: 600 });
// Handle messages from the UI
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Received message:', msg);
    try {
        switch (msg.type) {
            case 'searchProducts':
                yield handleSearchProducts(msg.payload);
                break;
            case 'getTaxonomy':
                yield handleGetTaxonomy();
                break;
            case 'getCategoryProducts':
                yield handleCategoryProducts(msg.payload);
                break;
            case 'getCategoryChildren':
                yield handleCategoryChildren(msg.payload);
                break;
            case 'searchWithSuggestions':
                yield handleSearchWithSuggestions(msg.payload);
                break;
            case 'loadRecentSearches':
                yield handleLoadRecentSearches();
                break;
            case 'saveRecentSearches':
                yield handleSaveRecentSearches(msg.payload);
                break;
            case 'populateSelectedTiles':
                yield handlePopulateSelectedTiles(msg.payload);
                break;
            case 'saveComponentMapping':
                yield handleSaveComponentMapping(msg.payload);
                break;
            case 'getSelectedComponentId':
                yield handleGetSelectedComponentId();
                break;
            case 'loadComponentMappings':
                yield handleLoadComponentMappings();
                break;
            case 'extractMappings':
                yield handleExtractMappings();
                break;
            default:
                figma.ui.postMessage({ type: 'error', error: 'Unknown message type' });
        }
    }
    catch (error) {
        console.error('Plugin error:', error);
        figma.ui.postMessage({
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// API Helper Functions
function makeGraphQLRequest(query_1) {
    return __awaiter(this, arguments, void 0, function* (query, variables = {}) {
        const response = yield fetch('https://origin-preview1-mango.omnichannel.tescocloud.com/api', {
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
    });
}
function handleSearchProducts(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(payload === null || payload === void 0 ? void 0 : payload.query)) {
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
            const result = yield makeGraphQLRequest(searchQuery, {
                query: payload.query,
                count: payload.count || 20,
                offset: payload.offset || 0,
            });
            figma.ui.postMessage({
                type: 'searchProductsResponse',
                data: result,
            });
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        }
    });
}
function handleGetTaxonomy() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield makeGraphQLRequest(taxonomyQuery, {
                storeId: "3060", // UK store ID as per documentation
                style: "rounded"
            });
            // Filter for superdepartments as per documentation
            if (result.data && result.data.taxonomy) {
                const superDepartments = result.data.taxonomy.filter((item) => {
                    return item.label === "superdepartment" || item.__typename === "TaxonomyItemType";
                });
                figma.ui.postMessage({
                    type: 'getTaxonomyResponse',
                    data: Object.assign(Object.assign({}, result), { data: Object.assign(Object.assign({}, result.data), { taxonomy: superDepartments }) }),
                });
            }
            else {
                figma.ui.postMessage({
                    type: 'getTaxonomyResponse',
                    data: result,
                });
            }
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: `Failed to load categories: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        }
    });
}
function handleCategoryProducts(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(payload === null || payload === void 0 ? void 0 : payload.categoryId)) {
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
            const result = yield makeGraphQLRequest(categoryQuery, {
                categoryId: payload.categoryId,
                pageName: "browse",
                count: payload.count || 20,
                offset: payload.offset || 0,
            });
            figma.ui.postMessage({
                type: 'getCategoryProductsResponse',
                data: result,
            });
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: `Failed to load category products: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        }
    });
}
function handleCategoryChildren(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(payload === null || payload === void 0 ? void 0 : payload.categoryId)) {
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
            const result = yield makeGraphQLRequest(childrenQuery, {
                categoryId: payload.categoryId,
                storeId: "3060",
            });
            figma.ui.postMessage({
                type: 'getCategoryChildrenResponse',
                data: result,
            });
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: `Failed to load category children: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        }
    });
}
function handleSearchWithSuggestions(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(payload === null || payload === void 0 ? void 0 : payload.query)) {
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
            const result = yield makeGraphQLRequest(searchWithSuggestionsQuery, variables);
            console.log('Search suggestions API response:', result);
            figma.ui.postMessage({
                type: 'searchWithSuggestionsResponse',
                data: result,
            });
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: `Failed to search with suggestions: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        }
    });
}
// Handle loading recent searches from clientStorage
function handleLoadRecentSearches() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recentSearches = yield figma.clientStorage.getAsync('tesco-recent-searches');
            figma.ui.postMessage({
                type: 'recentSearchesLoaded',
                data: recentSearches || []
            });
        }
        catch (error) {
            console.error('Failed to load recent searches:', error);
            figma.ui.postMessage({
                type: 'recentSearchesLoaded',
                data: []
            });
        }
    });
}
// Handle saving recent searches to clientStorage
function handleSaveRecentSearches(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (payload === null || payload === void 0 ? void 0 : payload.searches) {
                yield figma.clientStorage.setAsync('tesco-recent-searches', payload.searches);
                console.log('Recent searches saved:', payload.searches);
            }
        }
        catch (error) {
            console.error('Failed to save recent searches:', error);
        }
    });
}
// Handle populating selected tiles with product data
function handlePopulateSelectedTiles(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log('Starting population with config:', {
            platform: payload === null || payload === void 0 ? void 0 : payload.platform,
            layout: payload === null || payload === void 0 ? void 0 : payload.layout
        });
        if (!(payload === null || payload === void 0 ? void 0 : payload.products) || payload.products.length === 0) {
            figma.ui.postMessage({ type: 'error', error: 'No products provided' });
            return;
        }
        try {
            const selectedNodes = figma.currentPage.selection;
            // Check if selection contains existing tiles
            const existingTiles = findAllProductTiles(selectedNodes);
            if (existingTiles.length > 0) {
                // Mode A: Fill existing tiles (ignore platform/layout settings)
                yield populateExistingTiles(existingTiles, payload.products);
            }
            else if (selectedNodes.length === 1 && selectedNodes[0].type === 'FRAME') {
                // Mode B: Selected empty frame - create instances inside
                yield createInstancesInFrame(selectedNodes[0], payload.products, payload.platform || 'app', payload.layout || 'grid', ((_a = payload.selectedProducts) === null || _a === void 0 ? void 0 : _a.length) || payload.products.length);
            }
            else {
                // Mode C: No selection or invalid selection - create new frame
                yield createNewFrameWithInstances(payload.products, payload.platform || 'app', payload.layout || 'grid', ((_b = payload.selectedProducts) === null || _b === void 0 ? void 0 : _b.length) || payload.products.length);
            }
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: error instanceof Error ? error.message : 'Population failed'
            });
        }
    });
}
// Populate existing tiles (keep current implementation)
function populateExistingTiles(tiles, products) {
    return __awaiter(this, void 0, void 0, function* () {
        let populatedCount = 0;
        const errors = [];
        // Preload fonts from all tiles
        const fontsToLoad = new Set();
        for (const tile of tiles) {
            collectFontsFromNode(tile, fontsToLoad);
        }
        // Load all fonts
        const fontPromises = Array.from(fontsToLoad).map(fontString => {
            const [family, style] = fontString.split(':');
            return figma.loadFontAsync({ family, style });
        });
        try {
            yield Promise.all(fontPromises);
            console.log(`Preloaded ${fontsToLoad.size} fonts for existing tiles`);
        }
        catch (error) {
            console.warn('Some fonts failed to load:', error);
        }
        for (let i = 0; i < tiles.length && i < products.length; i++) {
            try {
                yield populateNodeWithProduct(tiles[i], products[i]);
                populatedCount++;
            }
            catch (error) {
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
    });
}
// Create instances in existing frame
function createInstancesInFrame(frame, products, platform, layout, instanceCount) {
    return __awaiter(this, void 0, void 0, function* () {
        const configKey = `${platform}-${layout}`;
        const config = _config_component_config__WEBPACK_IMPORTED_MODULE_0__.COMPONENT_MAPPINGS[configKey];
        if (!config || !config.componentId) {
            throw new Error(`No component configured for ${platform} ${layout}`);
        }
        // Find component by ID or library key
        let component;
        // Check if this looks like a component key (long hex string) or if we have library info
        const isComponentKey = config.componentId.length > 20 && /^[a-f0-9]+$/i.test(config.componentId);
        const hasLibraryInfo = config.libraryId && config.libraryId.length > 0;
        if (hasLibraryInfo || isComponentKey) {
            // Component is from a library - use importComponentByKeyAsync
            try {
                component = yield figma.importComponentByKeyAsync(config.componentId);
            }
            catch (error) {
                throw new Error(`Failed to import library component: ${config.componentId}. Make sure the library is published and accessible.`);
            }
        }
        else {
            // Component is local - use getNodeByIdAsync
            const node = yield figma.getNodeByIdAsync(config.componentId);
            if (!node || node.type !== 'COMPONENT') {
                throw new Error(`Local component not found: ${config.componentId}`);
            }
            component = node;
        }
        // Preload fonts from the component
        yield preloadFontsFromComponent(component);
        // Set autolayout on frame
        const layoutConfig = _config_component_config__WEBPACK_IMPORTED_MODULE_0__.AUTOLAYOUT_CONFIG[layout];
        frame.layoutMode = layoutConfig.layoutMode;
        frame.layoutWrap = layoutConfig.layoutWrap;
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
            yield populateNodeWithProduct(instance, product);
            createdCount++;
        }
        figma.ui.postMessage({
            type: 'populateComplete',
            success: true,
            populatedCount: createdCount,
            totalSelected: createdCount,
        });
    });
}
// Create new frame with instances
function createNewFrameWithInstances(products, platform, layout, instanceCount) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create new frame on canvas
        const frame = figma.createFrame();
        frame.name = `${platform} - ${layout} - Product Grid`;
        frame.x = figma.viewport.center.x - 200;
        frame.y = figma.viewport.center.y - 200;
        figma.currentPage.appendChild(frame);
        figma.currentPage.selection = [frame];
        // Use createInstancesInFrame logic
        yield createInstancesInFrame(frame, products, platform, layout, instanceCount);
    });
}
// Helper function to collect fonts from a node
function collectFontsFromNode(node, fontsToLoad) {
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
function preloadFontsFromComponent(component) {
    return __awaiter(this, void 0, void 0, function* () {
        const fontsToLoad = new Set();
        // Use the helper function to collect fonts
        collectFontsFromNode(component, fontsToLoad);
        // Load all fonts
        const fontPromises = Array.from(fontsToLoad).map(fontString => {
            const [family, style] = fontString.split(':');
            return figma.loadFontAsync({ family, style });
        });
        try {
            yield Promise.all(fontPromises);
            console.log(`Preloaded ${fontsToLoad.size} fonts from component`);
        }
        catch (error) {
            console.warn('Some fonts failed to load:', error);
        }
    });
}
// Component configuration handlers
function handleSaveComponentMapping(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        // Component mappings are locked and cannot be changed by users
        figma.ui.postMessage({
            type: 'error',
            error: 'Component mappings are locked and cannot be modified. Contact your administrator to update default configurations.'
        });
    });
}
function handleGetSelectedComponentId() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
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
        let componentId;
        let libraryId;
        let libraryName;
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
                libraryId = (_a = mainComponent.remote) === null || _a === void 0 ? void 0 : _a.key;
                libraryName = (_b = mainComponent.remote) === null || _b === void 0 ? void 0 : _b.name;
            }
            else {
                // For local components, use the ID
                componentId = mainComponent.id;
                libraryId = undefined;
                libraryName = undefined;
            }
        }
        else {
            // Check if this is a library component
            const isLibraryComponent = node.remote !== undefined;
            if (isLibraryComponent) {
                // For library components, use the key
                componentId = node.key;
                libraryId = (_c = node.remote) === null || _c === void 0 ? void 0 : _c.key;
                libraryName = (_d = node.remote) === null || _d === void 0 ? void 0 : _d.name;
            }
            else {
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
    });
}
function handleLoadComponentMappings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Always use defaults - users cannot override component mappings
            figma.ui.postMessage({
                type: 'componentMappingsLoaded',
                mappings: _config_component_config__WEBPACK_IMPORTED_MODULE_0__.COMPONENT_MAPPINGS
            });
        }
        catch (error) {
            console.error('Failed to load component mappings:', error);
        }
    });
}
function handleExtractMappings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const selection = figma.currentPage.selection;
            if (selection.length === 0) {
                figma.ui.postMessage({
                    type: 'error',
                    error: 'Please select frames to scan for component instances (name them like: "app-grid", "mobile-web-vertical", etc.)'
                });
                return;
            }
            const extractedMappings = {};
            let foundCount = 0;
            // Scan selected frames for component instances
            for (const node of selection) {
                if (node.type !== 'FRAME')
                    continue;
                const frameName = node.name.toLowerCase();
                // Look for instances within this frame
                function scanForInstances(parent) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (parent.children) {
                            for (const child of parent.children) {
                                if (child.type === 'INSTANCE') {
                                    try {
                                        const mainComponent = yield child.getMainComponentAsync();
                                        if (mainComponent) {
                                            // Extract component info
                                            let componentId = mainComponent.id;
                                            let libraryId = '';
                                            let libraryName = 'Local Components';
                                            // The child.componentId should contain the library key for imported components
                                            const instanceComponentId = child.componentId;
                                            // Check if this is a library component (componentId contains ':')
                                            if (instanceComponentId && instanceComponentId.includes(':')) {
                                                componentId = instanceComponentId;
                                                const keyParts = instanceComponentId.split(':');
                                                if (keyParts.length >= 2) {
                                                    libraryId = keyParts[0];
                                                    libraryName = 'Imported Library';
                                                }
                                            }
                                            else if (mainComponent.id && mainComponent.id.includes(':')) {
                                                // Fallback to mainComponent.id if it has the key format
                                                componentId = mainComponent.id;
                                                const keyParts = mainComponent.id.split(':');
                                                if (keyParts.length >= 2) {
                                                    libraryId = keyParts[0];
                                                    libraryName = 'Imported Library';
                                                }
                                            }
                                            // Try to match frame name to platform-layout combination
                                            for (const key in _config_component_config__WEBPACK_IMPORTED_MODULE_0__.COMPONENT_MAPPINGS) {
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
                                    }
                                    catch (error) {
                                        console.warn('Failed to get main component:', error);
                                    }
                                }
                                // Recursively scan nested frames
                                if (child.type === 'FRAME') {
                                    yield scanForInstances(child);
                                }
                            }
                        }
                    });
                }
                yield scanForInstances(node);
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
        }
        catch (error) {
            figma.ui.postMessage({
                type: 'error',
                error: `Failed to extract mappings: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        }
    });
}
// Find all product tiles within the given nodes (recursively searches frames)
function findAllProductTiles(nodes) {
    const tiles = [];
    function searchNode(node) {
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
function isProductTile(node) {
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
function populateNodeWithProduct(node, product) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
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
                yield setTextContent(titleNode, product.title);
            }
        }
        if ((_a = product.price) === null || _a === void 0 ? void 0 : _a.price) {
            const priceNode = findLayerByName(node, TILE_LAYER_NAMES.price);
            if (priceNode && priceNode.type === 'TEXT') {
                const priceText = `£${product.price.price.toFixed(2)}`;
                yield setTextContent(priceNode, priceText);
            }
        }
        if (product.promotions && product.promotions.length > 0) {
            const offerNode = findLayerByName(node, TILE_LAYER_NAMES.offerText);
            if (offerNode && offerNode.type === 'TEXT') {
                yield setTextContent(offerNode, product.promotions[0].offerText || 'Special Offer');
            }
        }
        // Handle images
        if (product.defaultImageUrl || ((_c = (_b = product.media) === null || _b === void 0 ? void 0 : _b.defaultImage) === null || _c === void 0 ? void 0 : _c.url)) {
            const imageUrl = product.defaultImageUrl || product.media.defaultImage.url;
            const imageNode = findLayerByName(node, TILE_LAYER_NAMES.image);
            if (imageNode && (imageNode.type === 'RECTANGLE' || imageNode.type === 'FRAME')) {
                yield setImageFill(imageNode, imageUrl);
            }
        }
        // Handle component variants (Thumbnail)
        const thumbnailNode = findLayerByName(node, TILE_LAYER_NAMES.thumbnail);
        if (thumbnailNode && thumbnailNode.type === 'INSTANCE') {
            // Try to set variant properties if available
            try {
                if (product.defaultImageUrl || ((_e = (_d = product.media) === null || _d === void 0 ? void 0 : _d.defaultImage) === null || _e === void 0 ? void 0 : _e.url)) {
                    const imageUrl = product.defaultImageUrl || product.media.defaultImage.url;
                    yield setImageFill(thumbnailNode, imageUrl);
                }
            }
            catch (error) {
                console.log('Could not set thumbnail image:', error);
            }
        }
    });
}
// Helper function to find a layer by name recursively
function findLayerByName(node, layerName) {
    if (node.name === layerName) {
        return node;
    }
    if ('children' in node) {
        for (const child of node.children) {
            const found = findLayerByName(child, layerName);
            if (found)
                return found;
        }
    }
    return null;
}
// Helper function to set text content
function setTextContent(textNode, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield figma.loadFontAsync(textNode.fontName);
            textNode.characters = content;
            console.log(`Set text: "${content}"`);
        }
        catch (error) {
            console.error('Failed to set text content:', error);
            throw error;
        }
    });
}
// Helper function to set image fill
function setImageFill(node, imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create image fill
            const imageFill = yield figma.createImageAsync(imageUrl);
            // Apply fill to the node
            if (node.type === 'RECTANGLE' || node.type === 'FRAME') {
                node.fills = [{
                        type: 'IMAGE',
                        imageHash: imageFill.hash,
                        scaleMode: 'FILL'
                    }];
            }
            else if (node.type === 'INSTANCE') {
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
        }
        catch (error) {
            console.error('Failed to set image fill:', error);
            throw error;
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y28tc2hvcHBpbmctcGx1Z2luLy4vc3JjL2NvbmZpZy9jb21wb25lbnQtY29uZmlnLnRzIiwid2VicGFjazovL3Rlc2NvLXNob3BwaW5nLXBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXNjby1zaG9wcGluZy1wbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc2NvLXNob3BwaW5nLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Rlc2NvLXNob3BwaW5nLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc2NvLXNob3BwaW5nLXBsdWdpbi8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIERlZmF1bHQgY29tcG9uZW50IG1hcHBpbmdzIC0gVVBEQVRFIFRIRVNFIFdJVEggWU9VUiBDT01QT05FTlQgSURTIEZPUiBFTkQgVVNFUlNcbi8vIFRoZXNlIHdpbGwgYmUgdGhlIGRlZmF1bHQgbWFwcGluZ3MgdGhhdCBlbmQgdXNlcnMgZ2V0IHdpdGhvdXQgaGF2aW5nIHRvIGNvbmZpZ3VyZSBhbnl0aGluZ1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09NUE9ORU5UX01BUFBJTkdTID0ge1xuICAgICdhcHAtZ3JpZCc6IHsgcGxhdGZvcm06ICdhcHAnLCBsYXlvdXQ6ICdncmlkJywgY29tcG9uZW50SWQ6ICczMzA6OTEzNycsIGxpYnJhcnlOYW1lOiAnRERTIFNob3BwaW5nIG5hdGl2ZSBkb21haW4gbGlicmFyeScsIGxpYnJhcnlJZDogJzMzMCcgfSxcbiAgICAnYXBwLXZlcnRpY2FsJzogeyBwbGF0Zm9ybTogJ2FwcCcsIGxheW91dDogJ3ZlcnRpY2FsJywgY29tcG9uZW50SWQ6ICcnLCBsaWJyYXJ5TmFtZTogJ0REUyBTaG9wcGluZyBuYXRpdmUgZG9tYWluIGxpYnJhcnknLCBsaWJyYXJ5SWQ6ICczMzAnIH0sXG4gICAgJ2FwcC1ob3Jpem9udGFsJzogeyBwbGF0Zm9ybTogJ2FwcCcsIGxheW91dDogJ2hvcml6b250YWwnLCBjb21wb25lbnRJZDogJycsIGxpYnJhcnlOYW1lOiAnRERTIFNob3BwaW5nIG5hdGl2ZSBkb21haW4gbGlicmFyeScsIGxpYnJhcnlJZDogJzMzMCcgfSxcbiAgICAnbW9iaWxlLXdlYi1ncmlkJzogeyBwbGF0Zm9ybTogJ21vYmlsZS13ZWInLCBsYXlvdXQ6ICdncmlkJywgY29tcG9uZW50SWQ6ICcnLCBsaWJyYXJ5TmFtZTogJ0REUyBTaG9wcGluZyBuYXRpdmUgZG9tYWluIGxpYnJhcnknLCBsaWJyYXJ5SWQ6ICczMzAnIH0sXG4gICAgJ21vYmlsZS13ZWItdmVydGljYWwnOiB7IHBsYXRmb3JtOiAnbW9iaWxlLXdlYicsIGxheW91dDogJ3ZlcnRpY2FsJywgY29tcG9uZW50SWQ6ICcnLCBsaWJyYXJ5TmFtZTogJ0REUyBTaG9wcGluZyBuYXRpdmUgZG9tYWluIGxpYnJhcnknLCBsaWJyYXJ5SWQ6ICczMzAnIH0sXG4gICAgJ21vYmlsZS13ZWItaG9yaXpvbnRhbCc6IHsgcGxhdGZvcm06ICdtb2JpbGUtd2ViJywgbGF5b3V0OiAnaG9yaXpvbnRhbCcsIGNvbXBvbmVudElkOiAnJywgbGlicmFyeU5hbWU6ICdERFMgU2hvcHBpbmcgbmF0aXZlIGRvbWFpbiBsaWJyYXJ5JywgbGlicmFyeUlkOiAnMzMwJyB9LFxuICAgICdkZXNrdG9wLXdlYi1ncmlkJzogeyBwbGF0Zm9ybTogJ2Rlc2t0b3Atd2ViJywgbGF5b3V0OiAnZ3JpZCcsIGNvbXBvbmVudElkOiAnJywgbGlicmFyeU5hbWU6ICdERFMgU2hvcHBpbmcgbmF0aXZlIGRvbWFpbiBsaWJyYXJ5JywgbGlicmFyeUlkOiAnMzMwJyB9LFxuICAgICdkZXNrdG9wLXdlYi12ZXJ0aWNhbCc6IHsgcGxhdGZvcm06ICdkZXNrdG9wLXdlYicsIGxheW91dDogJ3ZlcnRpY2FsJywgY29tcG9uZW50SWQ6ICcnLCBsaWJyYXJ5TmFtZTogJ0REUyBTaG9wcGluZyBuYXRpdmUgZG9tYWluIGxpYnJhcnknLCBsaWJyYXJ5SWQ6ICczMzAnIH0sXG4gICAgJ2Rlc2t0b3Atd2ViLWhvcml6b250YWwnOiB7IHBsYXRmb3JtOiAnZGVza3RvcC13ZWInLCBsYXlvdXQ6ICdob3Jpem9udGFsJywgY29tcG9uZW50SWQ6ICcnLCBsaWJyYXJ5TmFtZTogJ0REUyBTaG9wcGluZyBuYXRpdmUgZG9tYWluIGxpYnJhcnknLCBsaWJyYXJ5SWQ6ICczMzAnIH0sXG59O1xuLy8gSW5pdGlhbGl6ZSB3aXRoIGRlZmF1bHQgbWFwcGluZ3NcbmV4cG9ydCBjb25zdCBDT01QT05FTlRfTUFQUElOR1MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0NPTVBPTkVOVF9NQVBQSU5HUyk7XG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcmVzZXQgdG8gZGVmYXVsdHMgKHVzZWZ1bCBmb3IgZGV2ZWxvcG1lbnQpXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRUb0RlZmF1bHRzKCkge1xuICAgIE9iamVjdC5rZXlzKENPTVBPTkVOVF9NQVBQSU5HUykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBDT01QT05FTlRfTUFQUElOR1Nba2V5XSA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfQ09NUE9ORU5UX01BUFBJTkdTW2tleV0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGNvbnN0IEFVVE9MQVlPVVRfQ09ORklHID0ge1xuICAgICdncmlkJzogeyBsYXlvdXRNb2RlOiAnSE9SSVpPTlRBTCcsIGxheW91dFdyYXA6ICdXUkFQJyB9LFxuICAgICd2ZXJ0aWNhbCc6IHsgbGF5b3V0TW9kZTogJ1ZFUlRJQ0FMJywgbGF5b3V0V3JhcDogJ05PX1dSQVAnIH0sXG4gICAgJ2hvcml6b250YWwnOiB7IGxheW91dE1vZGU6ICdIT1JJWk9OVEFMJywgbGF5b3V0V3JhcDogJ05PX1dSQVAnIH0sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbi8vIEltcG9ydCBjb21wb25lbnQgY29uZmlndXJhdGlvblxuaW1wb3J0IHsgQ09NUE9ORU5UX01BUFBJTkdTLCBBVVRPTEFZT1VUX0NPTkZJRyB9IGZyb20gJy4vY29uZmlnL2NvbXBvbmVudC1jb25maWcnO1xuLy8gVGhpcyBzaG93cyB0aGUgSFRNTCBwYWdlIGluIFwidWkuaHRtbFwiXG5maWdtYS5zaG93VUkoX19odG1sX18sIHsgd2lkdGg6IDQwMCwgaGVpZ2h0OiA2MDAgfSk7XG4vLyBIYW5kbGUgbWVzc2FnZXMgZnJvbSB0aGUgVUlcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBtZXNzYWdlOicsIG1zZyk7XG4gICAgdHJ5IHtcbiAgICAgICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc2VhcmNoUHJvZHVjdHMnOlxuICAgICAgICAgICAgICAgIHlpZWxkIGhhbmRsZVNlYXJjaFByb2R1Y3RzKG1zZy5wYXlsb2FkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2dldFRheG9ub215JzpcbiAgICAgICAgICAgICAgICB5aWVsZCBoYW5kbGVHZXRUYXhvbm9teSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZ2V0Q2F0ZWdvcnlQcm9kdWN0cyc6XG4gICAgICAgICAgICAgICAgeWllbGQgaGFuZGxlQ2F0ZWdvcnlQcm9kdWN0cyhtc2cucGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdnZXRDYXRlZ29yeUNoaWxkcmVuJzpcbiAgICAgICAgICAgICAgICB5aWVsZCBoYW5kbGVDYXRlZ29yeUNoaWxkcmVuKG1zZy5wYXlsb2FkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NlYXJjaFdpdGhTdWdnZXN0aW9ucyc6XG4gICAgICAgICAgICAgICAgeWllbGQgaGFuZGxlU2VhcmNoV2l0aFN1Z2dlc3Rpb25zKG1zZy5wYXlsb2FkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xvYWRSZWNlbnRTZWFyY2hlcyc6XG4gICAgICAgICAgICAgICAgeWllbGQgaGFuZGxlTG9hZFJlY2VudFNlYXJjaGVzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzYXZlUmVjZW50U2VhcmNoZXMnOlxuICAgICAgICAgICAgICAgIHlpZWxkIGhhbmRsZVNhdmVSZWNlbnRTZWFyY2hlcyhtc2cucGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwb3B1bGF0ZVNlbGVjdGVkVGlsZXMnOlxuICAgICAgICAgICAgICAgIHlpZWxkIGhhbmRsZVBvcHVsYXRlU2VsZWN0ZWRUaWxlcyhtc2cucGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzYXZlQ29tcG9uZW50TWFwcGluZyc6XG4gICAgICAgICAgICAgICAgeWllbGQgaGFuZGxlU2F2ZUNvbXBvbmVudE1hcHBpbmcobXNnLnBheWxvYWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZ2V0U2VsZWN0ZWRDb21wb25lbnRJZCc6XG4gICAgICAgICAgICAgICAgeWllbGQgaGFuZGxlR2V0U2VsZWN0ZWRDb21wb25lbnRJZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbG9hZENvbXBvbmVudE1hcHBpbmdzJzpcbiAgICAgICAgICAgICAgICB5aWVsZCBoYW5kbGVMb2FkQ29tcG9uZW50TWFwcGluZ3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2V4dHJhY3RNYXBwaW5ncyc6XG4gICAgICAgICAgICAgICAgeWllbGQgaGFuZGxlRXh0cmFjdE1hcHBpbmdzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ2Vycm9yJywgZXJyb3I6ICdVbmtub3duIG1lc3NhZ2UgdHlwZScgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsdWdpbiBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcidcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG4vLyBBUEkgSGVscGVyIEZ1bmN0aW9uc1xuZnVuY3Rpb24gbWFrZUdyYXBoUUxSZXF1ZXN0KHF1ZXJ5XzEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIGFyZ3VtZW50cywgdm9pZCAwLCBmdW5jdGlvbiogKHF1ZXJ5LCB2YXJpYWJsZXMgPSB7fSkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKCdodHRwczovL29yaWdpbi1wcmV2aWV3MS1tYW5nby5vbW5pY2hhbm5lbC50ZXNjb2Nsb3VkLmNvbS9hcGknLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdSZWdpb24nOiAnVUsnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcXVlcnksIHZhcmlhYmxlcyB9KSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQVBJIHJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoYW5kbGVTZWFyY2hQcm9kdWN0cyhwYXlsb2FkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCEocGF5bG9hZCA9PT0gbnVsbCB8fCBwYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXlsb2FkLnF1ZXJ5KSkge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZXJyb3InLCBlcnJvcjogJ1NlYXJjaCBxdWVyeSBpcyByZXF1aXJlZCcgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VhcmNoUXVlcnkgPSBgXG4gICAgcXVlcnkgU2VhcmNoUHJvZHVjdHMoJHF1ZXJ5OiBTdHJpbmchLCAkY291bnQ6IEludCwgJG9mZnNldDogSW50KSB7XG4gICAgICBzZWFyY2gocXVlcnk6ICRxdWVyeSwgY291bnQ6ICRjb3VudCwgb2Zmc2V0OiAkb2Zmc2V0KSB7XG4gICAgICAgIHBhZ2VJbmZvcm1hdGlvbjogaW5mbyB7XG4gICAgICAgICAgdG90YWxDb3VudDogdG90YWxcbiAgICAgICAgICBwYWdlTm86IHBhZ2VcbiAgICAgICAgICBjb3VudFxuICAgICAgICB9XG4gICAgICAgIHByb2R1Y3RJdGVtczogcHJvZHVjdHMge1xuICAgICAgICAgIGlkXG4gICAgICAgICAgYmFzZVByb2R1Y3RJZFxuICAgICAgICAgIHRpdGxlXG4gICAgICAgICAgYnJhbmROYW1lXG4gICAgICAgICAgc2hvcnREZXNjcmlwdGlvblxuICAgICAgICAgIGRlZmF1bHRJbWFnZVVybFxuICAgICAgICAgIG1lZGlhIHtcbiAgICAgICAgICAgIGRlZmF1bHRJbWFnZSB7XG4gICAgICAgICAgICAgIHVybFxuICAgICAgICAgICAgICBhc3BlY3RSYXRpb1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1hZ2VzIHtcbiAgICAgICAgICAgICAgdXJsXG4gICAgICAgICAgICAgIGFzcGVjdFJhdGlvXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzTmV3XG4gICAgICAgICAgcHJpY2Uge1xuICAgICAgICAgICAgcHJpY2U6IGFjdHVhbFxuICAgICAgICAgICAgdW5pdFByaWNlXG4gICAgICAgICAgICB1bml0T2ZNZWFzdXJlXG4gICAgICAgICAgfVxuICAgICAgICAgIHByb21vdGlvbnMge1xuICAgICAgICAgICAgcHJvbW90aW9uSWQ6IGlkXG4gICAgICAgICAgICBwcm9tb3Rpb25UeXBlXG4gICAgICAgICAgICBzdGFydERhdGVcbiAgICAgICAgICAgIGVuZERhdGVcbiAgICAgICAgICAgIG9mZmVyVGV4dDogZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV2aWV3cyB7XG4gICAgICAgICAgICBzdGF0cyB7XG4gICAgICAgICAgICAgIG5vT2ZSZXZpZXdzXG4gICAgICAgICAgICAgIG92ZXJhbGxSYXRpbmdcbiAgICAgICAgICAgICAgb3ZlcmFsbFJhdGluZ1JhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBgO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgbWFrZUdyYXBoUUxSZXF1ZXN0KHNlYXJjaFF1ZXJ5LCB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHBheWxvYWQucXVlcnksXG4gICAgICAgICAgICAgICAgY291bnQ6IHBheWxvYWQuY291bnQgfHwgMjAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBwYXlsb2FkLm9mZnNldCB8fCAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3NlYXJjaFByb2R1Y3RzUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBTZWFyY2ggZmFpbGVkOiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFuZGxlR2V0VGF4b25vbXkoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdGF4b25vbXlRdWVyeSA9IGBcbiAgICBxdWVyeSBUYXhvbm9teVN1cGVyRGVwdHMoJHN0b3JlSWQ6IElELCAkc3R5bGU6IFN0cmluZykge1xuICAgICAgdGF4b25vbXkoc3RvcmVJZDogJHN0b3JlSWQpIHtcbiAgICAgICAgaWRcbiAgICAgICAgbmFtZVxuICAgICAgICBsYWJlbFxuICAgICAgICBpbWFnZXMoc3R5bGU6ICRzdHlsZSkge1xuICAgICAgICAgIHN0eWxlXG4gICAgICAgICAgaW1hZ2VzIHtcbiAgICAgICAgICAgIHR5cGVcbiAgICAgICAgICAgIHVybFxuICAgICAgICAgICAgX190eXBlbmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfX3R5cGVuYW1lXG4gICAgICAgIH1cbiAgICAgICAgX190eXBlbmFtZVxuICAgICAgfVxuICAgIH1cbiAgYDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIG1ha2VHcmFwaFFMUmVxdWVzdCh0YXhvbm9teVF1ZXJ5LCB7XG4gICAgICAgICAgICAgICAgc3RvcmVJZDogXCIzMDYwXCIsIC8vIFVLIHN0b3JlIElEIGFzIHBlciBkb2N1bWVudGF0aW9uXG4gICAgICAgICAgICAgICAgc3R5bGU6IFwicm91bmRlZFwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIEZpbHRlciBmb3Igc3VwZXJkZXBhcnRtZW50cyBhcyBwZXIgZG9jdW1lbnRhdGlvblxuICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhICYmIHJlc3VsdC5kYXRhLnRheG9ub215KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VwZXJEZXBhcnRtZW50cyA9IHJlc3VsdC5kYXRhLnRheG9ub215LmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5sYWJlbCA9PT0gXCJzdXBlcmRlcGFydG1lbnRcIiB8fCBpdGVtLl9fdHlwZW5hbWUgPT09IFwiVGF4b25vbXlJdGVtVHlwZVwiO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dldFRheG9ub215UmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHJlc3VsdCksIHsgZGF0YTogT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCByZXN1bHQuZGF0YSksIHsgdGF4b25vbXk6IHN1cGVyRGVwYXJ0bWVudHMgfSkgfSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdnZXRUYXhvbm9teVJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGBGYWlsZWQgdG8gbG9hZCBjYXRlZ29yaWVzOiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFuZGxlQ2F0ZWdvcnlQcm9kdWN0cyhwYXlsb2FkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCEocGF5bG9hZCA9PT0gbnVsbCB8fCBwYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXlsb2FkLmNhdGVnb3J5SWQpKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlcnJvcicsIGVycm9yOiAnQ2F0ZWdvcnkgSUQgaXMgcmVxdWlyZWQnIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5UXVlcnkgPSBgXG4gICAgcXVlcnkgR2V0Q2F0ZWdvcnlQcm9kdWN0cyhcbiAgICAgICRmYWNldDogSURcbiAgICAgICRwYWdlOiBJbnRcbiAgICAgICRjb3VudDogSW50XG4gICAgICAkc29ydEJ5OiBTdHJpbmdcbiAgICAgICRvZmZzZXQ6IEludFxuICAgICAgJHN1cGVyRGVwYXJ0bWVudDogU3RyaW5nXG4gICAgICAkZGVwYXJ0bWVudDogU3RyaW5nXG4gICAgICAkYWlzbGU6IFN0cmluZ1xuICAgICAgJHNoZWxmOiBTdHJpbmdcbiAgICAgICRvZmZlcnM6IEJvb2xlYW5cbiAgICAgICRuZXc6IEJvb2xlYW5cbiAgICAgICRmYXZvdXJpdGVzOiBCb29sZWFuXG4gICAgICAkYnJhbmQ6IFN0cmluZ1xuICAgICAgJGJyYW5kczogW1N0cmluZ11cbiAgICAgICRkaWV0YXJ5OiBTdHJpbmdcbiAgICAgICRjYXRlZ29yeUlkOiBJRFxuICAgICAgJHBhZ2VOYW1lOiBTdHJpbmdcbiAgICApIHtcbiAgICAgIGNhdGVnb3J5KFxuICAgICAgICBwYWdlOiAkcGFnZVxuICAgICAgICBjb3VudDogJGNvdW50XG4gICAgICAgIHNvcnRCeTogJHNvcnRCeVxuICAgICAgICBvZmZzZXQ6ICRvZmZzZXRcbiAgICAgICAgZmFjZXQ6ICRmYWNldFxuICAgICAgICBzdXBlckRlcGFydG1lbnQ6ICRzdXBlckRlcGFydG1lbnRcbiAgICAgICAgZGVwYXJ0bWVudDogJGRlcGFydG1lbnRcbiAgICAgICAgYWlzbGU6ICRhaXNsZVxuICAgICAgICBzaGVsZjogJHNoZWxmXG4gICAgICAgIG9mZmVyczogJG9mZmVyc1xuICAgICAgICBuZXc6ICRuZXdcbiAgICAgICAgZmF2b3VyaXRlczogJGZhdm91cml0ZXNcbiAgICAgICAgYnJhbmQ6ICRicmFuZFxuICAgICAgICBicmFuZHM6ICRicmFuZHNcbiAgICAgICAgZGlldGFyeTogJGRpZXRhcnlcbiAgICAgICAgY2F0ZWdvcnlJZDogJGNhdGVnb3J5SWRcbiAgICAgICkge1xuICAgICAgICBwYWdlSW5mb3JtYXRpb246IGluZm8ge1xuICAgICAgICAgIC4uLlBhZ2VJbmZvcm1hdGlvblxuICAgICAgICB9XG4gICAgICAgIHByb2R1Y3RJdGVtczogcHJvZHVjdHMge1xuICAgICAgICAgIC4uLlByb2R1Y3RJdGVtXG4gICAgICAgIH1cbiAgICAgICAgZmFjZXRMaXN0czogZmFjZXRHcm91cHMge1xuICAgICAgICAgIC4uLkZhY2V0TGlzdHNcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zIHtcbiAgICAgICAgICBzb3J0QnlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZyYWdtZW50IFBhZ2VJbmZvcm1hdGlvbiBvbiBMaXN0SW5mb0ludGVyZmFjZSB7XG4gICAgICB0b3RhbENvdW50OiB0b3RhbFxuICAgICAgcGFnZU5vOiBwYWdlXG4gICAgICBjb3VudFxuICAgICAgcGFnZVNpemVcbiAgICAgIG9mZnNldFxuICAgIH1cblxuICAgIGZyYWdtZW50IFByb2R1Y3RJdGVtIG9uIFByb2R1Y3RJbnRlcmZhY2Uge1xuICAgICAgaWRcbiAgICAgIGJhc2VQcm9kdWN0SWRcbiAgICAgIHRpdGxlXG4gICAgICBicmFuZE5hbWVcbiAgICAgIHNob3J0RGVzY3JpcHRpb25cbiAgICAgIGRlZmF1bHRJbWFnZVVybFxuICAgICAgbWVkaWEge1xuICAgICAgICBkZWZhdWx0SW1hZ2Uge1xuICAgICAgICAgIHVybFxuICAgICAgICAgIGFzcGVjdFJhdGlvXG4gICAgICAgIH1cbiAgICAgICAgaW1hZ2VzIHtcbiAgICAgICAgICB1cmxcbiAgICAgICAgICBhc3BlY3RSYXRpb1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBiYWRnZURldGFpbHMocGFnZU5hbWU6ICRwYWdlTmFtZSkge1xuICAgICAgICBiYWRnZXNcbiAgICAgICAgc3ViVGV4dFxuICAgICAgfVxuICAgICAgc3VwZXJEZXBhcnRtZW50SWRcbiAgICAgIHN1cGVyRGVwYXJ0bWVudE5hbWVcbiAgICAgIGRlcGFydG1lbnRJZFxuICAgICAgZGVwYXJ0bWVudE5hbWVcbiAgICAgIGFpc2xlSWRcbiAgICAgIGFpc2xlTmFtZVxuICAgICAgc2hlbGZJZFxuICAgICAgc2hlbGZOYW1lXG4gICAgICBkaXNwbGF5VHlwZVxuICAgICAgcHJvZHVjdFR5cGVcbiAgICAgIGF2ZXJhZ2VXZWlnaHRcbiAgICAgIGJ1bGtCdXlMaW1pdFxuICAgICAgbWF4UXVhbnRpdHlBbGxvd2VkOiBidWxrQnV5TGltaXRcbiAgICAgIGdyb3VwQnVsa0J1eUxpbWl0XG4gICAgICBidWxrQnV5TGltaXRNZXNzYWdlXG4gICAgICBidWxrQnV5TGltaXRHcm91cElkXG4gICAgICB0aW1lUmVzdHJpY3RlZERlbGl2ZXJ5XG4gICAgICByZXN0cmljdGVkRGVsaXZlcnlcbiAgICAgIGlzRm9yU2FsZVxuICAgICAgaXNOZXdcbiAgICAgIGlzUmVzdHJpY3RlZE9yZGVyQW1lbmRtZW50XG4gICAgICBzdGF0dXNcbiAgICAgIG1heFdlaWdodFxuICAgICAgbWluV2VpZ2h0XG4gICAgICBpbmNyZW1lbnRcbiAgICAgIGNhdGNoV2VpZ2h0TGlzdCB7XG4gICAgICAgIHByaWNlXG4gICAgICAgIHdlaWdodFxuICAgICAgICBkZWZhdWx0XG4gICAgICB9XG4gICAgICByZXN0cmljdGVkRGVsaXZlcnlUaW1lIHtcbiAgICAgICAgZGF5XG4gICAgICAgIHN0YXJ0RGF0ZVRpbWVcbiAgICAgICAgZW5kRGF0ZVRpbWVcbiAgICAgICAgbWVzc2FnZVxuICAgICAgfVxuICAgICAgcmVzdHJpY3RlZERlbGl2ZXJ5RGF0ZSB7XG4gICAgICAgIHN0YXJ0RGF0ZVxuICAgICAgICBlbmREYXRlXG4gICAgICAgIGxlYWRUaW1lVmFsdWVcbiAgICAgICAgbWVzc2FnZVxuICAgICAgfVxuICAgICAgcHJpY2Uge1xuICAgICAgICBwcmljZTogYWN0dWFsXG4gICAgICAgIHVuaXRQcmljZVxuICAgICAgICB1bml0T2ZNZWFzdXJlXG4gICAgICB9XG4gICAgICBwcm9tb3Rpb25zIHtcbiAgICAgICAgcHJvbW90aW9uSWQ6IGlkXG4gICAgICAgIHByb21vdGlvblR5cGVcbiAgICAgICAgc3RhcnREYXRlXG4gICAgICAgIGVuZERhdGVcbiAgICAgICAgb2ZmZXJUZXh0OiBkZXNjcmlwdGlvblxuICAgICAgfVxuICAgICAgcmV2aWV3cyB7XG4gICAgICAgIHN0YXRzIHtcbiAgICAgICAgICBub09mUmV2aWV3c1xuICAgICAgICAgIG92ZXJhbGxSYXRpbmdcbiAgICAgICAgICBvdmVyYWxsUmF0aW5nUmFuZ2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZyYWdtZW50IEZhY2V0TGlzdHMgb24gUHJvZHVjdExpc3RGYWNldEdyb3VwSW50ZXJmYWNlIHtcbiAgICAgIGNhdGVnb3J5SWRcbiAgICAgIGNhdGVnb3J5XG4gICAgICBmYWNldHMge1xuICAgICAgICBmYWNldElkOiBpZFxuICAgICAgICBmYWNldE5hbWU6IG5hbWVcbiAgICAgICAgYmluQ291bnQ6IGNvdW50XG4gICAgICAgIGlzU2VsZWN0ZWQ6IHNlbGVjdGVkXG4gICAgICB9XG4gICAgfVxuICBgO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgbWFrZUdyYXBoUUxSZXF1ZXN0KGNhdGVnb3J5UXVlcnksIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeUlkOiBwYXlsb2FkLmNhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgcGFnZU5hbWU6IFwiYnJvd3NlXCIsXG4gICAgICAgICAgICAgICAgY291bnQ6IHBheWxvYWQuY291bnQgfHwgMjAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBwYXlsb2FkLm9mZnNldCB8fCAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldENhdGVnb3J5UHJvZHVjdHNSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBlcnJvcjogYEZhaWxlZCB0byBsb2FkIGNhdGVnb3J5IHByb2R1Y3RzOiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFuZGxlQ2F0ZWdvcnlDaGlsZHJlbihwYXlsb2FkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCEocGF5bG9hZCA9PT0gbnVsbCB8fCBwYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXlsb2FkLmNhdGVnb3J5SWQpKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlcnJvcicsIGVycm9yOiAnQ2F0ZWdvcnkgSUQgaXMgcmVxdWlyZWQnIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuUXVlcnkgPSBgXG4gICAgcXVlcnkgR2V0Q2F0ZWdvcnlDaGlsZHJlbigkY2F0ZWdvcnlJZDogU3RyaW5nLCAkc3RvcmVJZDogSUQpIHtcbiAgICAgIHRheG9ub215KHN0b3JlSWQ6ICRzdG9yZUlkLCBjYXRlZ29yeUlkOiAkY2F0ZWdvcnlJZCkge1xuICAgICAgICBpZFxuICAgICAgICBuYW1lXG4gICAgICAgIGxhYmVsXG4gICAgICAgIHBhZ2VUeXBlXG4gICAgICAgIGltYWdlcyB7XG4gICAgICAgICAgc3R5bGVcbiAgICAgICAgICBpbWFnZXMge1xuICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgdXJsXG4gICAgICAgICAgICBfX3R5cGVuYW1lXG4gICAgICAgICAgfVxuICAgICAgICAgIF9fdHlwZW5hbWVcbiAgICAgICAgfVxuICAgICAgICBjaGlsZHJlbiB7XG4gICAgICAgICAgaWRcbiAgICAgICAgICBuYW1lXG4gICAgICAgICAgbGFiZWxcbiAgICAgICAgICBwYWdlVHlwZVxuICAgICAgICAgIGltYWdlcyB7XG4gICAgICAgICAgICBzdHlsZVxuICAgICAgICAgICAgaW1hZ2VzIHtcbiAgICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgICB1cmxcbiAgICAgICAgICAgICAgX190eXBlbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX190eXBlbmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgICBfX3R5cGVuYW1lXG4gICAgICAgIH1cbiAgICAgICAgX190eXBlbmFtZVxuICAgICAgfVxuICAgIH1cbiAgYDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIG1ha2VHcmFwaFFMUmVxdWVzdChjaGlsZHJlblF1ZXJ5LCB7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlJZDogcGF5bG9hZC5jYXRlZ29yeUlkLFxuICAgICAgICAgICAgICAgIHN0b3JlSWQ6IFwiMzA2MFwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldENhdGVnb3J5Q2hpbGRyZW5SZXNwb25zZScsXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBlcnJvcjogYEZhaWxlZCB0byBsb2FkIGNhdGVnb3J5IGNoaWxkcmVuOiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaGFuZGxlU2VhcmNoV2l0aFN1Z2dlc3Rpb25zKHBheWxvYWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIShwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQucXVlcnkpKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlcnJvcicsIGVycm9yOiAnU2VhcmNoIHF1ZXJ5IGlzIHJlcXVpcmVkJyB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWFyY2hXaXRoU3VnZ2VzdGlvbnNRdWVyeSA9IGBcbiAgICBxdWVyeSBTZWFyY2hXaXRoU3VnZ2VzdGlvbnMoXG4gICAgICAkcXVlcnk6IFN0cmluZyFcbiAgICAgICRzdWdnZXN0aW9uc0NvdW50OiBJbnRcbiAgICAgICRwYXJhbXM6IEJyb3dzZVNlYXJjaENvbmZpZ1xuICAgICAgJGNvbmZpZ3M6IFtDb25maWdBcmdUeXBlXVxuICAgICkge1xuICAgICAgc2VhcmNoKFxuICAgICAgICBxdWVyeTogJHF1ZXJ5XG4gICAgICAgIGNvbmZpZzogJHBhcmFtc1xuICAgICAgICBjb25maWdzOiAkY29uZmlnc1xuICAgICAgKSB7XG4gICAgICAgIHN1Z2dlc3Rpb25zKHN1Z2dlc3Rpb25zQ291bnQ6ICRzdWdnZXN0aW9uc0NvdW50KSB7XG4gICAgICAgICAgc2VhcmNoVGVybXMge1xuICAgICAgICAgICAgc3VnZ2VzdGlvblF1ZXJ5XG4gICAgICAgICAgfVxuICAgICAgICAgIGluZm8ge1xuICAgICAgICAgICAgY291bnRcbiAgICAgICAgICAgIHF1ZXJ5XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBgO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdmFyaWFibGVzID0ge1xuICAgICAgICAgICAgICAgIHF1ZXJ5OiBwYXlsb2FkLnF1ZXJ5LFxuICAgICAgICAgICAgICAgIHN1Z2dlc3Rpb25zQ291bnQ6IHBheWxvYWQuc3VnZ2VzdGlvbnNDb3VudCB8fCAxMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNYWtpbmcgc2VhcmNoIHN1Z2dlc3Rpb25zIHJlcXVlc3Qgd2l0aCB2YXJpYWJsZXM6JywgdmFyaWFibGVzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIG1ha2VHcmFwaFFMUmVxdWVzdChzZWFyY2hXaXRoU3VnZ2VzdGlvbnNRdWVyeSwgdmFyaWFibGVzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWFyY2ggc3VnZ2VzdGlvbnMgQVBJIHJlc3BvbnNlOicsIHJlc3VsdCk7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3NlYXJjaFdpdGhTdWdnZXN0aW9uc1Jlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIGVycm9yOiBgRmFpbGVkIHRvIHNlYXJjaCB3aXRoIHN1Z2dlc3Rpb25zOiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InfWAsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gSGFuZGxlIGxvYWRpbmcgcmVjZW50IHNlYXJjaGVzIGZyb20gY2xpZW50U3RvcmFnZVxuZnVuY3Rpb24gaGFuZGxlTG9hZFJlY2VudFNlYXJjaGVzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZWNlbnRTZWFyY2hlcyA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ3Rlc2NvLXJlY2VudC1zZWFyY2hlcycpO1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyZWNlbnRTZWFyY2hlc0xvYWRlZCcsXG4gICAgICAgICAgICAgICAgZGF0YTogcmVjZW50U2VhcmNoZXMgfHwgW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgcmVjZW50IHNlYXJjaGVzOicsIGVycm9yKTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAncmVjZW50U2VhcmNoZXNMb2FkZWQnLFxuICAgICAgICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gSGFuZGxlIHNhdmluZyByZWNlbnQgc2VhcmNoZXMgdG8gY2xpZW50U3RvcmFnZVxuZnVuY3Rpb24gaGFuZGxlU2F2ZVJlY2VudFNlYXJjaGVzKHBheWxvYWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHBheWxvYWQgPT09IG51bGwgfHwgcGF5bG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGF5bG9hZC5zZWFyY2hlcykge1xuICAgICAgICAgICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ3Rlc2NvLXJlY2VudC1zZWFyY2hlcycsIHBheWxvYWQuc2VhcmNoZXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZWNlbnQgc2VhcmNoZXMgc2F2ZWQ6JywgcGF5bG9hZC5zZWFyY2hlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc2F2ZSByZWNlbnQgc2VhcmNoZXM6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBIYW5kbGUgcG9wdWxhdGluZyBzZWxlY3RlZCB0aWxlcyB3aXRoIHByb2R1Y3QgZGF0YVxuZnVuY3Rpb24gaGFuZGxlUG9wdWxhdGVTZWxlY3RlZFRpbGVzKHBheWxvYWQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zb2xlLmxvZygnU3RhcnRpbmcgcG9wdWxhdGlvbiB3aXRoIGNvbmZpZzonLCB7XG4gICAgICAgICAgICBwbGF0Zm9ybTogcGF5bG9hZCA9PT0gbnVsbCB8fCBwYXlsb2FkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXlsb2FkLnBsYXRmb3JtLFxuICAgICAgICAgICAgbGF5b3V0OiBwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQubGF5b3V0XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIShwYXlsb2FkID09PSBudWxsIHx8IHBheWxvYWQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBheWxvYWQucHJvZHVjdHMpIHx8IHBheWxvYWQucHJvZHVjdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlcnJvcicsIGVycm9yOiAnTm8gcHJvZHVjdHMgcHJvdmlkZWQnIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE5vZGVzID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgc2VsZWN0aW9uIGNvbnRhaW5zIGV4aXN0aW5nIHRpbGVzXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ1RpbGVzID0gZmluZEFsbFByb2R1Y3RUaWxlcyhzZWxlY3RlZE5vZGVzKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1RpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBNb2RlIEE6IEZpbGwgZXhpc3RpbmcgdGlsZXMgKGlnbm9yZSBwbGF0Zm9ybS9sYXlvdXQgc2V0dGluZ3MpXG4gICAgICAgICAgICAgICAgeWllbGQgcG9wdWxhdGVFeGlzdGluZ1RpbGVzKGV4aXN0aW5nVGlsZXMsIHBheWxvYWQucHJvZHVjdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0ZWROb2Rlcy5sZW5ndGggPT09IDEgJiYgc2VsZWN0ZWROb2Rlc1swXS50eXBlID09PSAnRlJBTUUnKSB7XG4gICAgICAgICAgICAgICAgLy8gTW9kZSBCOiBTZWxlY3RlZCBlbXB0eSBmcmFtZSAtIGNyZWF0ZSBpbnN0YW5jZXMgaW5zaWRlXG4gICAgICAgICAgICAgICAgeWllbGQgY3JlYXRlSW5zdGFuY2VzSW5GcmFtZShzZWxlY3RlZE5vZGVzWzBdLCBwYXlsb2FkLnByb2R1Y3RzLCBwYXlsb2FkLnBsYXRmb3JtIHx8ICdhcHAnLCBwYXlsb2FkLmxheW91dCB8fCAnZ3JpZCcsICgoX2EgPSBwYXlsb2FkLnNlbGVjdGVkUHJvZHVjdHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sZW5ndGgpIHx8IHBheWxvYWQucHJvZHVjdHMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vZGUgQzogTm8gc2VsZWN0aW9uIG9yIGludmFsaWQgc2VsZWN0aW9uIC0gY3JlYXRlIG5ldyBmcmFtZVxuICAgICAgICAgICAgICAgIHlpZWxkIGNyZWF0ZU5ld0ZyYW1lV2l0aEluc3RhbmNlcyhwYXlsb2FkLnByb2R1Y3RzLCBwYXlsb2FkLnBsYXRmb3JtIHx8ICdhcHAnLCBwYXlsb2FkLmxheW91dCB8fCAnZ3JpZCcsICgoX2IgPSBwYXlsb2FkLnNlbGVjdGVkUHJvZHVjdHMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5sZW5ndGgpIHx8IHBheWxvYWQucHJvZHVjdHMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6ICdQb3B1bGF0aW9uIGZhaWxlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyBQb3B1bGF0ZSBleGlzdGluZyB0aWxlcyAoa2VlcCBjdXJyZW50IGltcGxlbWVudGF0aW9uKVxuZnVuY3Rpb24gcG9wdWxhdGVFeGlzdGluZ1RpbGVzKHRpbGVzLCBwcm9kdWN0cykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCBwb3B1bGF0ZWRDb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgICAvLyBQcmVsb2FkIGZvbnRzIGZyb20gYWxsIHRpbGVzXG4gICAgICAgIGNvbnN0IGZvbnRzVG9Mb2FkID0gbmV3IFNldCgpO1xuICAgICAgICBmb3IgKGNvbnN0IHRpbGUgb2YgdGlsZXMpIHtcbiAgICAgICAgICAgIGNvbGxlY3RGb250c0Zyb21Ob2RlKHRpbGUsIGZvbnRzVG9Mb2FkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBMb2FkIGFsbCBmb250c1xuICAgICAgICBjb25zdCBmb250UHJvbWlzZXMgPSBBcnJheS5mcm9tKGZvbnRzVG9Mb2FkKS5tYXAoZm9udFN0cmluZyA9PiB7XG4gICAgICAgICAgICBjb25zdCBbZmFtaWx5LCBzdHlsZV0gPSBmb250U3RyaW5nLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICByZXR1cm4gZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseSwgc3R5bGUgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeWllbGQgUHJvbWlzZS5hbGwoZm9udFByb21pc2VzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQcmVsb2FkZWQgJHtmb250c1RvTG9hZC5zaXplfSBmb250cyBmb3IgZXhpc3RpbmcgdGlsZXNgKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU29tZSBmb250cyBmYWlsZWQgdG8gbG9hZDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aWxlcy5sZW5ndGggJiYgaSA8IHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHBvcHVsYXRlTm9kZVdpdGhQcm9kdWN0KHRpbGVzW2ldLCBwcm9kdWN0c1tpXSk7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVkQ291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGBUaWxlICR7aSArIDF9OiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogJ1Vua25vd24gZXJyb3InfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3B1bGF0ZUNvbXBsZXRlJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBwb3B1bGF0ZWRDb3VudCxcbiAgICAgICAgICAgIHRvdGFsU2VsZWN0ZWQ6IHRpbGVzLmxlbmd0aCxcbiAgICAgICAgICAgIGVycm9yczogZXJyb3JzLmxlbmd0aCA+IDAgPyBlcnJvcnMgOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyBDcmVhdGUgaW5zdGFuY2VzIGluIGV4aXN0aW5nIGZyYW1lXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZXNJbkZyYW1lKGZyYW1lLCBwcm9kdWN0cywgcGxhdGZvcm0sIGxheW91dCwgaW5zdGFuY2VDb3VudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ0tleSA9IGAke3BsYXRmb3JtfS0ke2xheW91dH1gO1xuICAgICAgICBjb25zdCBjb25maWcgPSBDT01QT05FTlRfTUFQUElOR1NbY29uZmlnS2V5XTtcbiAgICAgICAgaWYgKCFjb25maWcgfHwgIWNvbmZpZy5jb21wb25lbnRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBjb21wb25lbnQgY29uZmlndXJlZCBmb3IgJHtwbGF0Zm9ybX0gJHtsYXlvdXR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmluZCBjb21wb25lbnQgYnkgSUQgb3IgbGlicmFyeSBrZXlcbiAgICAgICAgbGV0IGNvbXBvbmVudDtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBsb29rcyBsaWtlIGEgY29tcG9uZW50IGtleSAobG9uZyBoZXggc3RyaW5nKSBvciBpZiB3ZSBoYXZlIGxpYnJhcnkgaW5mb1xuICAgICAgICBjb25zdCBpc0NvbXBvbmVudEtleSA9IGNvbmZpZy5jb21wb25lbnRJZC5sZW5ndGggPiAyMCAmJiAvXlthLWYwLTldKyQvaS50ZXN0KGNvbmZpZy5jb21wb25lbnRJZCk7XG4gICAgICAgIGNvbnN0IGhhc0xpYnJhcnlJbmZvID0gY29uZmlnLmxpYnJhcnlJZCAmJiBjb25maWcubGlicmFyeUlkLmxlbmd0aCA+IDA7XG4gICAgICAgIGlmIChoYXNMaWJyYXJ5SW5mbyB8fCBpc0NvbXBvbmVudEtleSkge1xuICAgICAgICAgICAgLy8gQ29tcG9uZW50IGlzIGZyb20gYSBsaWJyYXJ5IC0gdXNlIGltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmNcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50ID0geWllbGQgZmlnbWEuaW1wb3J0Q29tcG9uZW50QnlLZXlBc3luYyhjb25maWcuY29tcG9uZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gaW1wb3J0IGxpYnJhcnkgY29tcG9uZW50OiAke2NvbmZpZy5jb21wb25lbnRJZH0uIE1ha2Ugc3VyZSB0aGUgbGlicmFyeSBpcyBwdWJsaXNoZWQgYW5kIGFjY2Vzc2libGUuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBDb21wb25lbnQgaXMgbG9jYWwgLSB1c2UgZ2V0Tm9kZUJ5SWRBc3luY1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHlpZWxkIGZpZ21hLmdldE5vZGVCeUlkQXN5bmMoY29uZmlnLmNvbXBvbmVudElkKTtcbiAgICAgICAgICAgIGlmICghbm9kZSB8fCBub2RlLnR5cGUgIT09ICdDT01QT05FTlQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2NhbCBjb21wb25lbnQgbm90IGZvdW5kOiAke2NvbmZpZy5jb21wb25lbnRJZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbXBvbmVudCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJlbG9hZCBmb250cyBmcm9tIHRoZSBjb21wb25lbnRcbiAgICAgICAgeWllbGQgcHJlbG9hZEZvbnRzRnJvbUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAvLyBTZXQgYXV0b2xheW91dCBvbiBmcmFtZVxuICAgICAgICBjb25zdCBsYXlvdXRDb25maWcgPSBBVVRPTEFZT1VUX0NPTkZJR1tsYXlvdXRdO1xuICAgICAgICBmcmFtZS5sYXlvdXRNb2RlID0gbGF5b3V0Q29uZmlnLmxheW91dE1vZGU7XG4gICAgICAgIGZyYW1lLmxheW91dFdyYXAgPSBsYXlvdXRDb25maWcubGF5b3V0V3JhcDtcbiAgICAgICAgZnJhbWUucHJpbWFyeUF4aXNTaXppbmdNb2RlID0gJ0FVVE8nO1xuICAgICAgICBmcmFtZS5jb3VudGVyQXhpc1NpemluZ01vZGUgPSAnQVVUTyc7XG4gICAgICAgIGZyYW1lLml0ZW1TcGFjaW5nID0gMTY7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdMZWZ0ID0gMTY7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdSaWdodCA9IDE2O1xuICAgICAgICBmcmFtZS5wYWRkaW5nVG9wID0gMTY7XG4gICAgICAgIGZyYW1lLnBhZGRpbmdCb3R0b20gPSAxNjtcbiAgICAgICAgLy8gQ3JlYXRlIGluc3RhbmNlcyAobGltaXQgdG8gaW5zdGFuY2VDb3VudClcbiAgICAgICAgY29uc3QgcHJvZHVjdHNUb1VzZSA9IHByb2R1Y3RzLnNsaWNlKDAsIGluc3RhbmNlQ291bnQpO1xuICAgICAgICBsZXQgY3JlYXRlZENvdW50ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBwcm9kdWN0IG9mIHByb2R1Y3RzVG9Vc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gY29tcG9uZW50LmNyZWF0ZUluc3RhbmNlKCk7XG4gICAgICAgICAgICBmcmFtZS5hcHBlbmRDaGlsZChpbnN0YW5jZSk7XG4gICAgICAgICAgICB5aWVsZCBwb3B1bGF0ZU5vZGVXaXRoUHJvZHVjdChpbnN0YW5jZSwgcHJvZHVjdCk7XG4gICAgICAgICAgICBjcmVhdGVkQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAncG9wdWxhdGVDb21wbGV0ZScsXG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgcG9wdWxhdGVkQ291bnQ6IGNyZWF0ZWRDb3VudCxcbiAgICAgICAgICAgIHRvdGFsU2VsZWN0ZWQ6IGNyZWF0ZWRDb3VudCxcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyBDcmVhdGUgbmV3IGZyYW1lIHdpdGggaW5zdGFuY2VzXG5mdW5jdGlvbiBjcmVhdGVOZXdGcmFtZVdpdGhJbnN0YW5jZXMocHJvZHVjdHMsIHBsYXRmb3JtLCBsYXlvdXQsIGluc3RhbmNlQ291bnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBDcmVhdGUgbmV3IGZyYW1lIG9uIGNhbnZhc1xuICAgICAgICBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKCk7XG4gICAgICAgIGZyYW1lLm5hbWUgPSBgJHtwbGF0Zm9ybX0gLSAke2xheW91dH0gLSBQcm9kdWN0IEdyaWRgO1xuICAgICAgICBmcmFtZS54ID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnggLSAyMDA7XG4gICAgICAgIGZyYW1lLnkgPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueSAtIDIwMDtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQoZnJhbWUpO1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBbZnJhbWVdO1xuICAgICAgICAvLyBVc2UgY3JlYXRlSW5zdGFuY2VzSW5GcmFtZSBsb2dpY1xuICAgICAgICB5aWVsZCBjcmVhdGVJbnN0YW5jZXNJbkZyYW1lKGZyYW1lLCBwcm9kdWN0cywgcGxhdGZvcm0sIGxheW91dCwgaW5zdGFuY2VDb3VudCk7XG4gICAgfSk7XG59XG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29sbGVjdCBmb250cyBmcm9tIGEgbm9kZVxuZnVuY3Rpb24gY29sbGVjdEZvbnRzRnJvbU5vZGUobm9kZSwgZm9udHNUb0xvYWQpIHtcbiAgICBpZiAobm9kZS50eXBlID09PSAnVEVYVCcgJiYgdHlwZW9mIG5vZGUuZm9udE5hbWUgPT09ICdvYmplY3QnICYmIG5vZGUuZm9udE5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgZm9udHNUb0xvYWQuYWRkKGAke25vZGUuZm9udE5hbWUuZmFtaWx5fToke25vZGUuZm9udE5hbWUuc3R5bGV9YCk7XG4gICAgfVxuICAgIGlmICgnY2hpbGRyZW4nIGluIG5vZGUgJiYgbm9kZS5jaGlsZHJlbikge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbGxlY3RGb250c0Zyb21Ob2RlKGNoaWxkLCBmb250c1RvTG9hZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyBQcmVsb2FkIGZvbnRzIGZyb20gYSBjb21wb25lbnQgdG8gYXZvaWQgZm9udCBsb2FkaW5nIGVycm9yc1xuZnVuY3Rpb24gcHJlbG9hZEZvbnRzRnJvbUNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBmb250c1RvTG9hZCA9IG5ldyBTZXQoKTtcbiAgICAgICAgLy8gVXNlIHRoZSBoZWxwZXIgZnVuY3Rpb24gdG8gY29sbGVjdCBmb250c1xuICAgICAgICBjb2xsZWN0Rm9udHNGcm9tTm9kZShjb21wb25lbnQsIGZvbnRzVG9Mb2FkKTtcbiAgICAgICAgLy8gTG9hZCBhbGwgZm9udHNcbiAgICAgICAgY29uc3QgZm9udFByb21pc2VzID0gQXJyYXkuZnJvbShmb250c1RvTG9hZCkubWFwKGZvbnRTdHJpbmcgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2ZhbWlseSwgc3R5bGVdID0gZm9udFN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuIGZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHksIHN0eWxlIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIFByb21pc2UuYWxsKGZvbnRQcm9taXNlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUHJlbG9hZGVkICR7Zm9udHNUb0xvYWQuc2l6ZX0gZm9udHMgZnJvbSBjb21wb25lbnRgKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignU29tZSBmb250cyBmYWlsZWQgdG8gbG9hZDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIENvbXBvbmVudCBjb25maWd1cmF0aW9uIGhhbmRsZXJzXG5mdW5jdGlvbiBoYW5kbGVTYXZlQ29tcG9uZW50TWFwcGluZyhwYXlsb2FkKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gQ29tcG9uZW50IG1hcHBpbmdzIGFyZSBsb2NrZWQgYW5kIGNhbm5vdCBiZSBjaGFuZ2VkIGJ5IHVzZXJzXG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICBlcnJvcjogJ0NvbXBvbmVudCBtYXBwaW5ncyBhcmUgbG9ja2VkIGFuZCBjYW5ub3QgYmUgbW9kaWZpZWQuIENvbnRhY3QgeW91ciBhZG1pbmlzdHJhdG9yIHRvIHVwZGF0ZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb25zLidcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoYW5kbGVHZXRTZWxlY3RlZENvbXBvbmVudElkKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgZXJyb3I6ICdQbGVhc2Ugc2VsZWN0IGEgY29tcG9uZW50IGZpcnN0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZSA9IHNlbGVjdGlvblswXTtcbiAgICAgICAgaWYgKG5vZGUudHlwZSAhPT0gJ0NPTVBPTkVOVCcgJiYgbm9kZS50eXBlICE9PSAnSU5TVEFOQ0UnKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBlcnJvcjogJ1BsZWFzZSBzZWxlY3QgYSBjb21wb25lbnQgb3IgY29tcG9uZW50IGluc3RhbmNlJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbXBvbmVudElkO1xuICAgICAgICBsZXQgbGlicmFyeUlkO1xuICAgICAgICBsZXQgbGlicmFyeU5hbWU7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdJTlNUQU5DRScpIHtcbiAgICAgICAgICAgIGNvbnN0IG1haW5Db21wb25lbnQgPSBub2RlLm1haW5Db21wb25lbnQ7XG4gICAgICAgICAgICBpZiAoIW1haW5Db21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAnQ291bGQgbm90IGZpbmQgbWFpbiBjb21wb25lbnQgZm9yIGluc3RhbmNlJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoaXMgaXMgYSBsaWJyYXJ5IGNvbXBvbmVudFxuICAgICAgICAgICAgY29uc3QgaXNMaWJyYXJ5Q29tcG9uZW50ID0gbWFpbkNvbXBvbmVudC5yZW1vdGUgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChpc0xpYnJhcnlDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgbGlicmFyeSBjb21wb25lbnRzLCB1c2UgdGhlIGtleVxuICAgICAgICAgICAgICAgIGNvbXBvbmVudElkID0gbWFpbkNvbXBvbmVudC5rZXk7XG4gICAgICAgICAgICAgICAgbGlicmFyeUlkID0gKF9hID0gbWFpbkNvbXBvbmVudC5yZW1vdGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXk7XG4gICAgICAgICAgICAgICAgbGlicmFyeU5hbWUgPSAoX2IgPSBtYWluQ29tcG9uZW50LnJlbW90ZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBGb3IgbG9jYWwgY29tcG9uZW50cywgdXNlIHRoZSBJRFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudElkID0gbWFpbkNvbXBvbmVudC5pZDtcbiAgICAgICAgICAgICAgICBsaWJyYXJ5SWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgbGlicmFyeU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgbGlicmFyeSBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbnN0IGlzTGlicmFyeUNvbXBvbmVudCA9IG5vZGUucmVtb3RlICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaXNMaWJyYXJ5Q29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGxpYnJhcnkgY29tcG9uZW50cywgdXNlIHRoZSBrZXlcbiAgICAgICAgICAgICAgICBjb21wb25lbnRJZCA9IG5vZGUua2V5O1xuICAgICAgICAgICAgICAgIGxpYnJhcnlJZCA9IChfYyA9IG5vZGUucmVtb3RlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Mua2V5O1xuICAgICAgICAgICAgICAgIGxpYnJhcnlOYW1lID0gKF9kID0gbm9kZS5yZW1vdGUpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRm9yIGxvY2FsIGNvbXBvbmVudHMsIHVzZSB0aGUgSURcbiAgICAgICAgICAgICAgICBjb21wb25lbnRJZCA9IG5vZGUuaWQ7XG4gICAgICAgICAgICAgICAgbGlicmFyeUlkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGxpYnJhcnlOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdzZWxlY3RlZENvbXBvbmVudElkJyxcbiAgICAgICAgICAgIGNvbXBvbmVudElkLFxuICAgICAgICAgICAgY29tcG9uZW50TmFtZTogbm9kZS5uYW1lLFxuICAgICAgICAgICAgbGlicmFyeUlkLFxuICAgICAgICAgICAgbGlicmFyeU5hbWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBoYW5kbGVMb2FkQ29tcG9uZW50TWFwcGluZ3MoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEFsd2F5cyB1c2UgZGVmYXVsdHMgLSB1c2VycyBjYW5ub3Qgb3ZlcnJpZGUgY29tcG9uZW50IG1hcHBpbmdzXG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NvbXBvbmVudE1hcHBpbmdzTG9hZGVkJyxcbiAgICAgICAgICAgICAgICBtYXBwaW5nczogQ09NUE9ORU5UX01BUFBJTkdTXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNvbXBvbmVudCBtYXBwaW5nczonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZUV4dHJhY3RNYXBwaW5ncygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAnUGxlYXNlIHNlbGVjdCBmcmFtZXMgdG8gc2NhbiBmb3IgY29tcG9uZW50IGluc3RhbmNlcyAobmFtZSB0aGVtIGxpa2U6IFwiYXBwLWdyaWRcIiwgXCJtb2JpbGUtd2ViLXZlcnRpY2FsXCIsIGV0Yy4pJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZE1hcHBpbmdzID0ge307XG4gICAgICAgICAgICBsZXQgZm91bmRDb3VudCA9IDA7XG4gICAgICAgICAgICAvLyBTY2FuIHNlbGVjdGVkIGZyYW1lcyBmb3IgY29tcG9uZW50IGluc3RhbmNlc1xuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIHNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdGUkFNRScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lTmFtZSA9IG5vZGUubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIC8vIExvb2sgZm9yIGluc3RhbmNlcyB3aXRoaW4gdGhpcyBmcmFtZVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNjYW5Gb3JJbnN0YW5jZXMocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdJTlNUQU5DRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFpbkNvbXBvbmVudCA9IHlpZWxkIGNoaWxkLmdldE1haW5Db21wb25lbnRBc3luYygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYWluQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgY29tcG9uZW50IGluZm9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudElkID0gbWFpbkNvbXBvbmVudC5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpYnJhcnlJZCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGlicmFyeU5hbWUgPSAnTG9jYWwgQ29tcG9uZW50cyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjaGlsZC5jb21wb25lbnRJZCBzaG91bGQgY29udGFpbiB0aGUgbGlicmFyeSBrZXkgZm9yIGltcG9ydGVkIGNvbXBvbmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2VDb21wb25lbnRJZCA9IGNoaWxkLmNvbXBvbmVudElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgbGlicmFyeSBjb21wb25lbnQgKGNvbXBvbmVudElkIGNvbnRhaW5zICc6JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlQ29tcG9uZW50SWQgJiYgaW5zdGFuY2VDb21wb25lbnRJZC5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJZCA9IGluc3RhbmNlQ29tcG9uZW50SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXlQYXJ0cyA9IGluc3RhbmNlQ29tcG9uZW50SWQuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXlQYXJ0cy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnJhcnlJZCA9IGtleVBhcnRzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpYnJhcnlOYW1lID0gJ0ltcG9ydGVkIExpYnJhcnknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1haW5Db21wb25lbnQuaWQgJiYgbWFpbkNvbXBvbmVudC5pZC5pbmNsdWRlcygnOicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayB0byBtYWluQ29tcG9uZW50LmlkIGlmIGl0IGhhcyB0aGUga2V5IGZvcm1hdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SWQgPSBtYWluQ29tcG9uZW50LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5UGFydHMgPSBtYWluQ29tcG9uZW50LmlkLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5UGFydHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5SWQgPSBrZXlQYXJ0c1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5TmFtZSA9ICdJbXBvcnRlZCBMaWJyYXJ5JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnkgdG8gbWF0Y2ggZnJhbWUgbmFtZSB0byBwbGF0Zm9ybS1sYXlvdXQgY29tYmluYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gQ09NUE9ORU5UX01BUFBJTkdTKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJhbWVOYW1lLmluY2x1ZGVzKGtleSkgfHwgZnJhbWVOYW1lLmluY2x1ZGVzKGtleS5yZXBsYWNlKCctJywgJyAnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0ZWRNYXBwaW5nc1trZXldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlicmFyeUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaWJyYXJ5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZTogbWFpbkNvbXBvbmVudC5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3VuZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kIG1hcHBpbmcgZm9yICR7a2V5fTogJHtjb21wb25lbnRJZH0gKGxpYnJhcnlJZDogJHtsaWJyYXJ5SWR9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdGYWlsZWQgdG8gZ2V0IG1haW4gY29tcG9uZW50OicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzY2FuIG5lc3RlZCBmcmFtZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdGUkFNRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHNjYW5Gb3JJbnN0YW5jZXMoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeWllbGQgc2NhbkZvckluc3RhbmNlcyhub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3VuZENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ05vIGNvbXBvbmVudCBpbnN0YW5jZXMgZm91bmQuIE1ha2Ugc3VyZSB5b3VyIGZyYW1lcyBjb250YWluIGNvbXBvbmVudCBpbnN0YW5jZXMgYW5kIGFyZSBuYW1lZCBsaWtlOiBcImFwcC1ncmlkXCIsIFwibW9iaWxlLXdlYi12ZXJ0aWNhbFwiLCBldGMuJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXh0cmFjdGVkTWFwcGluZ3MnLFxuICAgICAgICAgICAgICAgIG1hcHBpbmdzOiBleHRyYWN0ZWRNYXBwaW5ncyxcbiAgICAgICAgICAgICAgICBmb3VuZENvdW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIGVycm9yOiBgRmFpbGVkIHRvIGV4dHJhY3QgbWFwcGluZ3M6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcid9YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIEZpbmQgYWxsIHByb2R1Y3QgdGlsZXMgd2l0aGluIHRoZSBnaXZlbiBub2RlcyAocmVjdXJzaXZlbHkgc2VhcmNoZXMgZnJhbWVzKVxuZnVuY3Rpb24gZmluZEFsbFByb2R1Y3RUaWxlcyhub2Rlcykge1xuICAgIGNvbnN0IHRpbGVzID0gW107XG4gICAgZnVuY3Rpb24gc2VhcmNoTm9kZShub2RlKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoaXMgbm9kZSBpcyBhIHByb2R1Y3QgdGlsZVxuICAgICAgICBpZiAoaXNQcm9kdWN0VGlsZShub2RlKSkge1xuICAgICAgICAgICAgdGlsZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBGb3VuZCBwcm9kdWN0IHRpbGU6ICR7bm9kZS5uYW1lfSAoJHtub2RlLnR5cGV9KWApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlYXJjaCBjaGlsZHJlbiBpZiB0aGlzIG5vZGUgaGFzIGNoaWxkcmVuXG4gICAgICAgIGlmICgnY2hpbGRyZW4nIGluIG5vZGUgJiYgbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoTm9kZShjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU2VhcmNoIHRocm91Z2ggYWxsIHNlbGVjdGVkIG5vZGVzXG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIHNlYXJjaE5vZGUobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiB0aWxlcztcbn1cbi8vIENoZWNrIGlmIGEgbm9kZSBpcyBhIHByb2R1Y3QgdGlsZVxuZnVuY3Rpb24gaXNQcm9kdWN0VGlsZShub2RlKSB7XG4gICAgLy8gQ2hlY2sgaWYgaXQncyBhIGZyYW1lLCBjb21wb25lbnQsIG9yIGluc3RhbmNlXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0ZSQU1FJyB8fCBub2RlLnR5cGUgPT09ICdDT01QT05FTlQnIHx8IG5vZGUudHlwZSA9PT0gJ0lOU1RBTkNFJykge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmFtZSBzdWdnZXN0cyBpdCdzIGEgcHJvZHVjdCB0aWxlXG4gICAgICAgIGNvbnN0IG5hbWUgPSBub2RlLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIG5hbWUuaW5jbHVkZXMoJ3Byb2R1Y3QnKSB8fFxuICAgICAgICAgICAgbmFtZS5pbmNsdWRlcygndGlsZScpIHx8XG4gICAgICAgICAgICBuYW1lLmluY2x1ZGVzKCdjYXJkJykgfHxcbiAgICAgICAgICAgIG5hbWUuaW5jbHVkZXMoJ2l0ZW0nKTtcbiAgICB9XG4gICAgLy8gQWxzbyBjaGVjayBmb3IgZ3JvdXBzIHRoYXQgbWlnaHQgY29udGFpbiBwcm9kdWN0IHRpbGVzXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ0dST1VQJykge1xuICAgICAgICBjb25zdCBuYW1lID0gbm9kZS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBuYW1lLmluY2x1ZGVzKCdwcm9kdWN0JykgfHxcbiAgICAgICAgICAgIG5hbWUuaW5jbHVkZXMoJ3RpbGUnKSB8fFxuICAgICAgICAgICAgbmFtZS5pbmNsdWRlcygnY2FyZCcpIHx8XG4gICAgICAgICAgICBuYW1lLmluY2x1ZGVzKCdpdGVtJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIFBvcHVsYXRlIGEgc2luZ2xlIG5vZGUgd2l0aCBwcm9kdWN0IGRhdGFcbmZ1bmN0aW9uIHBvcHVsYXRlTm9kZVdpdGhQcm9kdWN0KG5vZGUsIHByb2R1Y3QpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lO1xuICAgICAgICBjb25zb2xlLmxvZyhgUG9wdWxhdGluZyBub2RlOiAke25vZGUubmFtZX0gd2l0aCBwcm9kdWN0OiAke3Byb2R1Y3QudGl0bGV9YCk7XG4gICAgICAgIC8vIExheWVyIG5hbWUgY29uZmlndXJhdGlvbiBiYXNlZCBvbiBkb2N1bWVudGF0aW9uXG4gICAgICAgIGNvbnN0IFRJTEVfTEFZRVJfTkFNRVMgPSB7XG4gICAgICAgICAgICBwcmljZTogXCJwcm9kdWN0UHJpY2VcIixcbiAgICAgICAgICAgIHRpdGxlOiBcInByb2R1Y3ROYW1lXCIsXG4gICAgICAgICAgICBpbWFnZTogXCJwcm9kdWN0SW1hZ2VcIixcbiAgICAgICAgICAgIHRodW1ibmFpbDogXCJUaHVtYm5haWxcIixcbiAgICAgICAgICAgIG9mZmVyVGV4dDogXCJvZmZlclRleHRcIixcbiAgICAgICAgICAgIG9mZmVyRW5kRGF0ZTogXCJvZmZlckVuZERhdGVcIixcbiAgICAgICAgICAgIHN3YXRjaGVzOiBcInZhcmlhdGlvblN3YXRjaGVzXCIsXG4gICAgICAgICAgICB2YWx1ZUJhcjogXCJ2YWx1ZUJhclwiLFxuICAgICAgICAgICAgcmF0aW5nOiBcIlJhdGluZ1wiXG4gICAgICAgIH07XG4gICAgICAgIC8vIEZpbmQgYW5kIHBvcHVsYXRlIHRleHQgbGF5ZXJzXG4gICAgICAgIGlmIChwcm9kdWN0LnRpdGxlKSB7XG4gICAgICAgICAgICBjb25zdCB0aXRsZU5vZGUgPSBmaW5kTGF5ZXJCeU5hbWUobm9kZSwgVElMRV9MQVlFUl9OQU1FUy50aXRsZSk7XG4gICAgICAgICAgICBpZiAodGl0bGVOb2RlICYmIHRpdGxlTm9kZS50eXBlID09PSAnVEVYVCcpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBzZXRUZXh0Q29udGVudCh0aXRsZU5vZGUsIHByb2R1Y3QudGl0bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgoX2EgPSBwcm9kdWN0LnByaWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucHJpY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHByaWNlTm9kZSA9IGZpbmRMYXllckJ5TmFtZShub2RlLCBUSUxFX0xBWUVSX05BTUVTLnByaWNlKTtcbiAgICAgICAgICAgIGlmIChwcmljZU5vZGUgJiYgcHJpY2VOb2RlLnR5cGUgPT09ICdURVhUJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaWNlVGV4dCA9IGDCoyR7cHJvZHVjdC5wcmljZS5wcmljZS50b0ZpeGVkKDIpfWA7XG4gICAgICAgICAgICAgICAgeWllbGQgc2V0VGV4dENvbnRlbnQocHJpY2VOb2RlLCBwcmljZVRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9kdWN0LnByb21vdGlvbnMgJiYgcHJvZHVjdC5wcm9tb3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IG9mZmVyTm9kZSA9IGZpbmRMYXllckJ5TmFtZShub2RlLCBUSUxFX0xBWUVSX05BTUVTLm9mZmVyVGV4dCk7XG4gICAgICAgICAgICBpZiAob2ZmZXJOb2RlICYmIG9mZmVyTm9kZS50eXBlID09PSAnVEVYVCcpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBzZXRUZXh0Q29udGVudChvZmZlck5vZGUsIHByb2R1Y3QucHJvbW90aW9uc1swXS5vZmZlclRleHQgfHwgJ1NwZWNpYWwgT2ZmZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgaW1hZ2VzXG4gICAgICAgIGlmIChwcm9kdWN0LmRlZmF1bHRJbWFnZVVybCB8fCAoKF9jID0gKF9iID0gcHJvZHVjdC5tZWRpYSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRlZmF1bHRJbWFnZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnVybCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVXJsID0gcHJvZHVjdC5kZWZhdWx0SW1hZ2VVcmwgfHwgcHJvZHVjdC5tZWRpYS5kZWZhdWx0SW1hZ2UudXJsO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VOb2RlID0gZmluZExheWVyQnlOYW1lKG5vZGUsIFRJTEVfTEFZRVJfTkFNRVMuaW1hZ2UpO1xuICAgICAgICAgICAgaWYgKGltYWdlTm9kZSAmJiAoaW1hZ2VOb2RlLnR5cGUgPT09ICdSRUNUQU5HTEUnIHx8IGltYWdlTm9kZS50eXBlID09PSAnRlJBTUUnKSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHNldEltYWdlRmlsbChpbWFnZU5vZGUsIGltYWdlVXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgY29tcG9uZW50IHZhcmlhbnRzIChUaHVtYm5haWwpXG4gICAgICAgIGNvbnN0IHRodW1ibmFpbE5vZGUgPSBmaW5kTGF5ZXJCeU5hbWUobm9kZSwgVElMRV9MQVlFUl9OQU1FUy50aHVtYm5haWwpO1xuICAgICAgICBpZiAodGh1bWJuYWlsTm9kZSAmJiB0aHVtYm5haWxOb2RlLnR5cGUgPT09ICdJTlNUQU5DRScpIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBzZXQgdmFyaWFudCBwcm9wZXJ0aWVzIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdC5kZWZhdWx0SW1hZ2VVcmwgfHwgKChfZSA9IChfZCA9IHByb2R1Y3QubWVkaWEpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5kZWZhdWx0SW1hZ2UpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS51cmwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlVXJsID0gcHJvZHVjdC5kZWZhdWx0SW1hZ2VVcmwgfHwgcHJvZHVjdC5tZWRpYS5kZWZhdWx0SW1hZ2UudXJsO1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBzZXRJbWFnZUZpbGwodGh1bWJuYWlsTm9kZSwgaW1hZ2VVcmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZCBub3Qgc2V0IHRodW1ibmFpbCBpbWFnZTonLCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGEgbGF5ZXIgYnkgbmFtZSByZWN1cnNpdmVseVxuZnVuY3Rpb24gZmluZExheWVyQnlOYW1lKG5vZGUsIGxheWVyTmFtZSkge1xuICAgIGlmIChub2RlLm5hbWUgPT09IGxheWVyTmFtZSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgaWYgKCdjaGlsZHJlbicgaW4gbm9kZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gZmluZExheWVyQnlOYW1lKGNoaWxkLCBsYXllck5hbWUpO1xuICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgdGV4dCBjb250ZW50XG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudCh0ZXh0Tm9kZSwgY29udGVudCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKHRleHROb2RlLmZvbnROYW1lKTtcbiAgICAgICAgICAgIHRleHROb2RlLmNoYXJhY3RlcnMgPSBjb250ZW50O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFNldCB0ZXh0OiBcIiR7Y29udGVudH1cImApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNldCB0ZXh0IGNvbnRlbnQ6JywgZXJyb3IpO1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgaW1hZ2UgZmlsbFxuZnVuY3Rpb24gc2V0SW1hZ2VGaWxsKG5vZGUsIGltYWdlVXJsKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBpbWFnZSBmaWxsXG4gICAgICAgICAgICBjb25zdCBpbWFnZUZpbGwgPSB5aWVsZCBmaWdtYS5jcmVhdGVJbWFnZUFzeW5jKGltYWdlVXJsKTtcbiAgICAgICAgICAgIC8vIEFwcGx5IGZpbGwgdG8gdGhlIG5vZGVcbiAgICAgICAgICAgIGlmIChub2RlLnR5cGUgPT09ICdSRUNUQU5HTEUnIHx8IG5vZGUudHlwZSA9PT0gJ0ZSQU1FJykge1xuICAgICAgICAgICAgICAgIG5vZGUuZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0lNQUdFJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGFzaDogaW1hZ2VGaWxsLmhhc2gsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZU1vZGU6ICdGSUxMJ1xuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ0lOU1RBTkNFJykge1xuICAgICAgICAgICAgICAgIC8vIEZvciBpbnN0YW5jZXMsIHRyeSB0byBmaW5kIGEgcmVjdGFuZ2xlIGNoaWxkIHRvIGZpbGxcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0Q2hpbGQgPSBmaW5kTGF5ZXJCeU5hbWUobm9kZSwgJ0ltYWdlIHBsYWNlaG9sZGVyJykgfHxcbiAgICAgICAgICAgICAgICAgICAgZmluZExheWVyQnlOYW1lKG5vZGUsICdwcm9kdWN0SW1hZ2UnKTtcbiAgICAgICAgICAgICAgICBpZiAocmVjdENoaWxkICYmIChyZWN0Q2hpbGQudHlwZSA9PT0gJ1JFQ1RBTkdMRScgfHwgcmVjdENoaWxkLnR5cGUgPT09ICdGUkFNRScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RDaGlsZC5maWxscyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0lNQUdFJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUhhc2g6IGltYWdlRmlsbC5oYXNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlTW9kZTogJ0ZJTEwnXG4gICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgU2V0IGltYWdlOiAke2ltYWdlVXJsfWApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHNldCBpbWFnZSBmaWxsOicsIGVycm9yKTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=