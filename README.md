# Hepsitrend E-Commerce

A modern, full-featured e-commerce website built with Next.js 15, React, and Tailwind CSS. Features user authentication, cart management, wishlist, order tracking, and multilingual support.

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

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/smhdes/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Seed the database**
   ```bash
   npm run seed
   ```

4. **Start development servers**
   ```bash
   npm run dev:all
   ```

   This will start:
   - Next.js development server on `http://localhost:3000`
   - JSON Server API on `http://localhost:3001`

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

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

### Manual Deployment
```bash
npm run build
npm run start
```

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