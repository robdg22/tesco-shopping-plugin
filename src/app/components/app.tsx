import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export class App extends React.Component {
  render() {
    return (
      <div className='p-6 max-w-md mx-auto bg-background text-foreground'>
        <h1 className="text-2xl font-bold mb-6">Shopify Collection</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="store-url" className="block mb-2">
              Store URL
            </Label>
            <Input id="store-url" placeholder="your-store.myshopify.com" />
          </div>
          
          <div>
            <Label htmlFor="api-key" className="block mb-2">
              API Key
            </Label>
            <Input id="api-key" type="password" placeholder="Enter your API key" />
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1">
              Connect Store
            </Button>
            <Button variant="outline">
              Test Connection
            </Button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full">
                Browse Products
              </Button>
              <Button variant="ghost" className="w-full">
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
