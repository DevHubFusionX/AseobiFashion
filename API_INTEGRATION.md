# API Integration Setup

## Overview
This project is now configured with TanStack Query (React Query) for efficient data fetching and state management, along with other modern libraries for forms and validation.

## Installed Libraries

- **@tanstack/react-query** - Data fetching and caching
- **@tanstack/react-query-devtools** - Development tools for React Query
- **axios** - HTTP client for API requests
- **react-hook-form** - Form state management
- **zod** - Schema validation
- **@hookform/resolvers** - Zod integration with React Hook Form
- **react-hot-toast** - Toast notifications

## Project Structure

```
src/
├── lib/
│   ├── axios.js              # Axios instance with interceptors
│   └── queryClient.js        # React Query client configuration
├── services/
│   ├── productApi.js         # Product API endpoints
│   ├── cartApi.js            # Cart API endpoints
│   └── orderApi.js           # Order API endpoints
├── hooks/
│   ├── useProducts.js        # Product-related React Query hooks
│   ├── useCart.js            # Cart-related React Query hooks
│   └── useOrders.js          # Order-related React Query hooks
├── features/
│   ├── products/components/  # Product-related components
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductHeader.jsx
│   │   ├── ColorSelector.jsx
│   │   ├── QuantitySelector.jsx
│   │   ├── ImageGallery.jsx
│   │   └── ProductSpecs.jsx
│   └── checkout/components/  # Checkout-related components
│       ├── ContactForm.jsx
│       ├── ShippingForm.jsx
│       └── OrderSummary.jsx
└── pages/                    # Page components (refactored)
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WHATSAPP_BUSINESS_NUMBER=2348012345678
```

## Backend API Endpoints

The frontend expects the following API endpoints:

### Products
- `GET /api/products` - Get all products (with optional query params: category, sort)
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PATCH /api/cart/items/:itemId` - Update cart item
- `DELETE /api/cart/items/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all user orders

## API Response Format

### Products Response
```json
{
  "products": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": 100.00,
      "unit": "yard",
      "colors": ["#ffffff", "#000000"],
      "image": "https://...",
      "tag": "Bestseller",
      "category": "Silk"
    }
  ]
}
```

### Cart Response
```json
{
  "items": [
    {
      "id": 1,
      "productId": 1,
      "name": "Product Name",
      "price": 100.00,
      "quantity": 2,
      "selectedColor": "#ffffff",
      "image": "https://..."
    }
  ],
  "total": 200.00
}
```

## Usage Examples

### Fetching Products
```jsx
import { useProducts } from '../hooks/useProducts';

function ProductList() {
  const { data, isLoading, error } = useProducts({ 
    category: 'Silk',
    sort: 'price-asc' 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return <div>{/* Render products */}</div>;
}
```

### Adding to Cart
```jsx
import { useAddToCart } from '../hooks/useCart';

function AddToCartButton({ product }) {
  const addToCart = useAddToCart();

  const handleClick = () => {
    addToCart.mutate({
      productId: product.id,
      quantity: 1,
      color: '#ffffff'
    });
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### Form Validation
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1)
});

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

## Features

### Automatic Caching
React Query automatically caches API responses and manages cache invalidation.

### Optimistic Updates
Cart operations show immediate UI feedback before server confirmation.

### Error Handling
Axios interceptors handle authentication errors and token refresh.

### Loading States
All hooks provide `isLoading`, `error`, and `data` states.

### Toast Notifications
Success and error messages are displayed using react-hot-toast.

## Development

1. Start the development server:
```bash
npm run dev
```

2. Open React Query DevTools (bottom-left corner) to inspect queries and mutations.

3. Mock data is used when the backend is not available.

## Next Steps

1. Set up your backend API with the expected endpoints
2. Update the `.env` file with your API URL
3. Replace mock data with real API calls
4. Add authentication if needed
5. Implement error boundaries for better error handling
