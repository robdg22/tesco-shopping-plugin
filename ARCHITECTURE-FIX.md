# 🔧 Architecture Fix: Proper Figma Plugin Implementation

## ❌ **Previous Issue**
- UI trying to make direct network calls to localhost
- Figma's Content Security Policy blocking localhost connections
- Incorrect use of `networkAccess` in manifest.json

## ✅ **Correct Architecture**

```
UI Thread (Browser/Sandboxed)          Main Thread (Node.js/Full Access)
┌─────────────────────────────┐        ┌──────────────────────────────┐
│  React Component            │        │  Main Plugin Code (code.ts)  │
│  - User interactions        │◄──────►│  - Network requests          │
│  - Display results          │ msgs   │  - API calls to localhost    │
│  - Loading states           │        │  - Data processing           │
└─────────────────────────────┘        └──────────────────────────────┘
                                                       │
                                                       ▼
                                        ┌──────────────────────────────┐
                                        │    Proxy Server (3001)       │
                                        │    - CORS handling           │
                                        │    - Auth headers            │
                                        └──────────────────────────────┘
                                                       │
                                                       ▼
                                        ┌──────────────────────────────┐
                                        │     Tesco API                │
                                        │     api.tesco.com            │
                                        └──────────────────────────────┘
```

## 🔄 **Message Flow**

### 1. User searches for "milk"
```javascript
// UI Thread
this.sendMessage('searchProducts', { query: 'milk', count: 10 })
```

### 2. Main thread receives message
```javascript
// Main Thread (code.ts)
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'searchProducts') {
    await handleSearchProducts(msg.payload)
  }
}
```

### 3. Main thread makes API call
```javascript
// Main Thread - has network access
const result = await fetch('http://localhost:3001/api/tesco', {
  method: 'POST',
  body: JSON.stringify({ query, variables })
})
```

### 4. Main thread sends response back
```javascript
// Main Thread
figma.ui.postMessage({
  type: 'searchProductsResponse',
  data: result
})
```

### 5. UI receives and displays results
```javascript
// UI Thread
window.onmessage = (event) => {
  const msg = event.data.pluginMessage
  if (msg.type === 'searchProductsResponse') {
    this.setState({ products: msg.data.data.search.productItems })
  }
}
```

## 📁 **Updated File Structure**

### `src/code.ts` (Main Thread)
- ✅ Network requests to localhost
- ✅ GraphQL query handling
- ✅ Message routing
- ✅ Error handling

### `src/app/components/app.tsx` (UI Thread)
- ✅ Message-based communication
- ✅ No direct network calls
- ✅ UI state management
- ✅ User interactions

### `manifest.json` (Clean)
- ✅ Only necessary domains listed
- ✅ No localhost configuration needed
- ✅ No CSP violations

## 🎯 **Key Benefits**

1. **Security**: Follows Figma's sandbox model
2. **Reliability**: No CSP violations
3. **Clean**: Proper separation of concerns
4. **Maintainable**: Clear message contracts
5. **Future-proof**: Easy to deploy proxy elsewhere

## 📋 **Testing Instructions**

1. **Ensure proxy is running**: `cd proxy-server && npm run dev`
2. **Build plugin**: `npm run build`
3. **Reload in Figma**: Re-import manifest.json
4. **Test features**:
   - Categories should load automatically
   - Search should work without CSP errors
   - Category browsing should function

## 🚀 **Now Works Without Manifest Issues!**

The plugin now follows proper Figma architecture patterns and doesn't require any special localhost permissions in the manifest. The main thread handles all network operations while the UI focuses purely on presentation and user interaction.

