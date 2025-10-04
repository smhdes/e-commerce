const fs = require('fs');
const path = require('path');


const API_URL = 'https://fakestoreapi.com/products';

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
}

function createUsers() {
  return [
    {
      id: 1,
      email: 'user@example.com',
      password: 'pass123',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      email: 'jane@example.com',
      password: 'pass123',
      name: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      phone: '+1 (555) 987-6543',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      createdAt: new Date().toISOString()
    }
  ];
}

function createOrders(users) {
  const orders = [];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  users.forEach(user => {
    // Create 2-4 orders per user
    const orderCount = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < orderCount; i++) {
      const orderDate = new Date();
      orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30));
      
      orders.push({
        id: orders.length + 1,
        userId: user.id,
        date: orderDate.toISOString(),
        items: [
          {
            productId: Math.floor(Math.random() * 20) + 1,
            title: `Sample Product ${Math.floor(Math.random() * 20) + 1}`,
            price: Math.floor(Math.random() * 100) + 10,
            quantity: Math.floor(Math.random() * 3) + 1,
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
          }
        ],
        total: Math.floor(Math.random() * 200) + 50,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        shippingAddress: user.address,
        paymentMethod: 'credit_card',
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      });
    }
  });
  
  return orders.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createCategories() {
  return [
    { id: 1, name: "electronics", displayName: "Electronics", icon: "📱" },
    { id: 2, name: "jewelery", displayName: "Jewelry", icon: "💎" },
    { id: 3, name: "men's clothing", displayName: "Men's Clothing", icon: "👔" },
    { id: 4, name: "women's clothing", displayName: "Women's Clothing", icon: "👗" }
  ];
}

async function createDatabase() {
  try {
    console.log('🌱 Starting database seed process...');
    
    // Fetch products from FakeStore API
    const products = await fetchProducts();
    
    // Create users
    const users = createUsers();
    console.log(`✅ Created ${users.length} users`);
    
    // Create orders
    const orders = createOrders(users);
    console.log(`✅ Created ${orders.length} orders`);
    
    // Create categories
    const categories = createCategories();
    console.log(`✅ Created ${categories.length} categories`);
    
    // Create carts (empty initially)
    const carts = users.map(user => ({
      id: user.id,
      userId: user.id,
      items: [],
      total: 0,
      updatedAt: new Date().toISOString()
    }));
    
    // Create wishlists (empty initially)
    const wishlists = users.map(user => ({
      id: user.id,
      userId: user.id,
      items: [],
      updatedAt: new Date().toISOString()
    }));
    
    // Combine all data
    const database = {
      products,
      users,
      orders,
      categories,
      carts,
      wishlists
    };
    
    // Write to db.json
    const dbPath = path.join(__dirname, '..', 'db.json');
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
    
    console.log('🎉 Database seed completed successfully!');
    console.log(`📊 Database contains:`);
    console.log(`   - ${products.length} products`);
    console.log(`   - ${users.length} users`);
    console.log(`   - ${orders.length} orders`);
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${carts.length} carts`);
    console.log(`   - ${wishlists.length} wishlists`);
    console.log(`\n📁 Database saved to: ${dbPath}`);
    console.log(`\n🚀 To start the JSON server, run: npm run db`);
    
  } catch (error) {
    console.error('💥 Seed process failed:', error.message);
    process.exit(1);
  }
}

// Run the seed process
createDatabase();
