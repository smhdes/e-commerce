# Hepsitrend E-Commerce

A modern, full-featured e-commerce website built with Next.js 15, React, and Tailwind CSS. Features user authentication, cart management, wishlist, order tracking, and multilingual support.

## 🌐 Live Demo

**🔗 [View Live Site](https://68e35bea56799a00084bb1ff--magical-selkie-0ec932.netlify.app/)**

The application is deployed on Netlify and ready to use!

## 🚀 Features

### Core Features
- **Modern UI/UX**: Responsive, mobile-first design with Tailwind CSS
- **Product Catalog**: Category filtering, search, and sorting
- **Shopping Cart**: Add/remove products, quantity updates
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure login/logout with session management
- **Order Management**: Order history and status tracking
- **Multilingual Support**: Turkish and English language support

### Technical Features
- **Next.js 15**: Latest App Router with Server/Client Components
- **React 18**: Modern React with hooks and context
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **JSON Server**: Local REST API simulation
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Dynamic meta tags and OpenGraph
- **Performance**: Image optimization and code splitting

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **State Management**: React Context API, Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Authentication**: Cookie-based with Next.js middleware
- **Database**: JSON Server (local development)
- **Deployment**: Netlify ready

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Step-by-Step Setup

#### 1. **Clone the Repository**
```bash
git clone https://github.com/smhdes/e-commerce.git
cd e-commerce
```

#### 2. **Install Dependencies**
```bash
npm install
```
This will install all required packages including Next.js 15, React, Tailwind CSS, and other dependencies.

#### 3. **Seed the Database**
```bash
npm run seed
```
This command will:
- Create sample product data from fakestoreapi.com
- Set up user accounts for testing
- Initialize the JSON server database

#### 4. **Start Development Servers**

**Option A: Run Both Servers Simultaneously (Recommended)**
```bash
npm run dev:all
```
This will start both Next.js development server and JSON server concurrently.

**Option B: Run Servers Separately**
```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Start JSON server  
npm run db
```

#### 5. **Access the Application**
- **Frontend**: http://localhost:3000
- **API Server**: http://localhost:3001
- **Database**: JSON file at `data/db.json`

### 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run db` | Start JSON server for API |
| `npm run dev:all` | Start both servers concurrently |
| `npm run build` | Build for production |
| `npm run seed` | Seed the database with sample data |
| `npm run setup` | Complete setup (install + seed + start) |

## 🚀 Quick Start

```bash
# One-command setup
npm run setup
```

This will:
1. Seed the database with sample data
2. Start both development servers

## 📱 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data
- `npm run db` - Start JSON Server
- `npm run dev:all` - Start both servers concurrently
- `npm run setup` - Complete setup (seed + dev:all)

## 🌐 API Endpoints

The JSON Server provides the following endpoints:

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /users` - Get all users
- `GET /orders` - Get all orders
- `GET /categories` - Get all categories
- `GET /carts` - Get all carts
- `GET /wishlists` - Get all wishlists

## 🔐 Authentication

### Demo Accounts
- **Email**: `user@example.com` | **Password**: `pass123`
- **Email**: `jane@example.com` | **Password**: `pass123`

### Features
- Secure cookie-based authentication
- Session persistence
- User-specific cart and wishlist data
- Automatic logout on session expiry

## 🔐 Demo Credentials

For testing purposes, you can use these demo accounts:

| Email | Password | Name |
|-------|----------|------|
| `user@example.com` | `pass123` | John Doe |
| `jane@example.com` | `pass123` | Jane Smith |

### Test Features
- **Login/Logout**: Use demo credentials above
- **Cart Management**: Add/remove products, update quantities
- **Wishlist**: Save products for later
- **Order History**: View past orders in profile
- **Language Switch**: TR/EN toggle in header

## 🌍 Internationalization

The application supports multiple languages:

- **Turkish (TR)** - Default language
- **English (EN)** - Secondary language

Language can be switched using the dropdown in the header.

## 📱 Pages

- **Home** (`/`) - Hero section, featured products, categories
- **Products** (`/products`) - Product catalog with filters
- **Product Detail** (`/products/[id]`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Wishlist** (`/wishlist`) - Saved products
- **Profile** (`/profile`) - User profile and order history
- **Login** (`/login`) - User authentication

## 🎨 UI Components

### Modern Components
- `ModernNavbar` - Responsive navigation with search
- `ModernFooter` - Comprehensive footer with links
- `ModernHero` - Dynamic hero section with product showcase
- `ModernProductCard` - Enhanced product cards with animations
- `CategoryGrid` - Category showcase with icons

### Utility Components
- `Button` - Reusable button component
- `Card` - Container component
- `Modal` - Modal dialog component
- `ErrorBoundary` - Error handling component

## 🔧 Configuration

### Environment Variables
```env
API_BASE_URL=http://localhost:3001
```

### Next.js Configuration
- Image optimization enabled
- Compression enabled
- Security headers configured
- Performance optimizations

## 📦 Deployment

### 🌐 Live Deployment
The application is currently deployed on Netlify:
- **Live URL**: https://68e35bea56799a00084bb1ff--magical-selkie-0ec932.netlify.app/
- **Platform**: Netlify
- **Build**: Static export with API integration
- **Status**: ✅ Active and running

### 🚀 Netlify Deployment Steps
1. **Connect Repository**: Link your GitHub repository to Netlify
2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: 18
3. **Environment Variables** (if needed):
   - `NODE_VERSION`: 18
   - `NEXT_TELEMETRY_DISABLED`: 1
4. **Deploy**: Netlify will automatically deploy on every push

### 🔧 Manual Deployment
```bash
# Build for production
npm run build

# The build output will be in the 'out' directory
# Upload the 'out' directory to your hosting provider
```

### 📋 Deployment Checklist
- ✅ Static export configured
- ✅ API integration working
- ✅ Image optimization enabled
- ✅ Responsive design tested
- ✅ Performance optimized
- ✅ SEO meta tags configured

## 🚀 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Optimized for production

## 🛡️ Security

- **Authentication**: Secure cookie-based sessions
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Built-in Next.js protection
- **Secure Headers**: Security headers configured

## 📊 Database Schema

### Products
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 29.99,
  "description": "Product description",
  "category": "electronics",
  "image": "https://fakestoreapi.com/img/1.jpg",
  "rating": {
    "rate": 4.5,
    "count": 120
  }
}
```

### Users
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "password": "pass123"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for sample data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 15, React, and Tailwind CSS**