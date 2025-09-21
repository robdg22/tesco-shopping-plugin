# Tesco API Integration Setup

## Architecture Overview

This plugin uses a **local proxy server** to access the Tesco Shopping Experience API due to CORS restrictions.

```
Figma Plugin (Browser) → Local Proxy (Node.js) → Tesco API (api.tesco.com)
```

## Quick Start

### 1. Start the Proxy Server
```bash
cd proxy-server
npm install
npm run dev
```
Server runs on: `http://localhost:3001`

### 2. Build & Test Plugin
```bash
# In main directory
npm run build
```

### 3. Load in Figma
1. Open Figma Desktop
2. Go to `Plugins > Development > Import plugin from manifest...`
3. Select `manifest.json` from project root
4. Plugin will appear in your plugins menu

## API Features

### Available APIs
- **getTaxonomy()** - Load product categories
- **searchProducts(query)** - Search for products by name
- **getCategoryProducts(categoryId)** - Browse products in a category

### Example Usage
```typescript
import { TescoAPI } from '@/lib/tesco-api'

// Search for products
const result = await TescoAPI.searchProducts({ 
  query: 'milk', 
  count: 10 
})

// Get categories
const categories = await TescoAPI.getTaxonomy()

// Browse category products
const products = await TescoAPI.getCategoryProducts({ 
  categoryId: 'some-category-id' 
})
```

## File Structure

```
src/
├── types/tesco.ts          # TypeScript types for API responses
├── lib/tesco-api.ts        # API client with GraphQL queries
└── app/components/app.tsx  # Main UI component with API integration

proxy-server/
├── app/api/tesco/route.ts  # Proxy endpoint for Tesco API
└── package.json            # Proxy server dependencies
```

## API Configuration

### Proxy Settings
- **URL**: `http://localhost:3001/api/tesco`
- **Method**: POST only
- **Headers**: Handled automatically by proxy

### Tesco API Details
- **Endpoint**: `https://api.tesco.com/shoppingexperience`
- **Type**: GraphQL API
- **Authentication**: API Key (handled by proxy)

## Troubleshooting

### Proxy Server Issues
```bash
# Check if proxy is running
curl http://localhost:3001

# Restart proxy server
cd proxy-server
npm run dev
```

### Network Errors
- Ensure proxy server is running on port 3001
- Check if Tesco API is accessible
- Verify CORS headers in proxy response

### Plugin Issues
- Rebuild plugin: `npm run build`
- Check browser console for errors
- Verify network access in Figma manifest

## Development Workflow

1. **Start proxy**: `cd proxy-server && npm run dev`
2. **Watch plugin**: `npm run watch` (in main directory)
3. **Test in Figma**: Reload plugin after changes
4. **Check logs**: Browser console + proxy server terminal

## Production Deployment

For production, deploy the proxy server to:
- Vercel (recommended)
- Netlify Functions
- Railway
- Your own server

Update `PROXY_URL` in `src/lib/tesco-api.ts` to your deployed proxy URL.

