# VRIDHI - Agricultural Marketplace

A complete frontend rebuild of the VRIDHI agricultural marketplace platform connecting farmers, wholesalers, and visitors.

## Project Overview

VRIDHI is a comprehensive platform that facilitates connections between:
- **Sellers (Farmers)**: List products, record sales, find transporters
- **Wholesalers**: Browse and purchase agricultural products
- **Visitors**: View market insights and trends

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: TailwindCSS v4
- **Charts**: Recharts
- **UI Components**: shadcn/ui
- **Language**: TypeScript

## Project Structure

\`\`\`
/app
  /dashboard
    /seller - Seller dashboard with graphs and analytics
    /wholesaler - Product browsing and purchasing interface
    /visitor - Market insights and trends
  /login - Login page
  /register
    /seller - Seller registration
    /wholesaler - Wholesaler registration
    /visitor - Visitor registration
  /transporters - Transporter directory
  page.tsx - Landing page with role selection

/components
  seller-sidebar.tsx - Seller dashboard sidebar
  seller-overview.tsx - Dashboard overview with charts
  record-sales.tsx - Sales recording interface
  product-listings.tsx - Product management
  transporter-section.tsx - Transporter listing
  chat-button.tsx - Chat interface component

/data
  products.json - Product data
  transporters.json - Transporter information
  users.json - User profiles
  sales.json - Sales records
  market-data.json - Market trends and analytics
  messages.json - Chat messages
\`\`\`

## Features

### Landing Page
- Three role selection buttons (Seller, Wholesaler, Visitor)
- Pastel gradient background
- Transparent card design

### Registration Pages
- Separate forms for each user type
- Comprehensive field validation (frontend only)
- Automatic routing to appropriate dashboard

### Seller Dashboard
- **Overview**: Stats cards, price trends graph, weather forecast, demand chart
- **Record Sales**: Form to log new sales transactions
- **Product Listings**: Grid view of seller's products
- **Transporters**: Table of available transport services
- Sidebar navigation
- Chat interface

### Wholesaler Dashboard
- Product gallery with images and details
- Search and filter functionality
- Product detail modal popup
- Contact seller features
- Chat interface

### Visitor Dashboard
- Market statistics overview
- Price trend line charts
- Regional production bar charts
- Market insights cards
- Popular products showcase

### Transporter Page
- Comprehensive transporter table
- Search by name/location
- Filter by vehicle type
- Contact information
- Stats summary

### Chat Feature
- Floating chat button
- Message interface (UI only)
- Sample conversation display

## Static Data

All data is stored in JSON files in the `/data` directory:
- `products.json` - 7 sample products
- `transporters.json` - 6 transport services
- `users.json` - Sample sellers, wholesalers, visitors
- `sales.json` - Transaction records
- `market-data.json` - Charts and trends data
- `messages.json` - Chat conversations

## Design System

### Colors
- Pastel gradient backgrounds (purple, pink, blue, green, orange, yellow)
- Transparent white cards with backdrop blur
- Role-specific accent colors:
  - Seller: Green
  - Wholesaler: Blue
  - Visitor: Purple
  - Transporter: Orange

### Typography
- Font: Geist (sans-serif)
- Clear hierarchy with bold headings
- Readable body text

### Layout
- Responsive grid layouts
- Card-based design
- Consistent spacing and padding

## Installation

1. Clone or download the project
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel with one click using the "Publish" button in the v0 interface, or:

\`\`\`bash
vercel
\`\`\`

## Notes

- **Frontend Only**: No backend integration - all data is static
- **No Authentication**: Login redirects based on role selection only
- **No API Calls**: All features are UI demonstrations
- **Ready for Backend**: Structure is prepared for API integration

## Next Steps (Not Included in This Build)

- Backend API integration
- Real authentication system
- Database connection
- Payment processing
- Real-time chat functionality
- File upload capabilities
- Email notifications
- Advanced filtering and search

---

Built with v0 by Vercel
