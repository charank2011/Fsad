

export const mockProducts = [
{
  id: '1',
  name: 'Organic Tomatoes',
  category: 'Vegetables',
  price: 3.99,
  unit: 'kg',
  stock: 150,
  lowStockThreshold: 50,
  description: 'Fresh organic tomatoes grown on our farm',
  imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400',
  lastUpdated: '2026-02-25'
},
{
  id: '2',
  name: 'Free Range Eggs',
  category: 'Dairy & Eggs',
  price: 8.00,
  unit: 'dozen',
  stock: 45,
  lowStockThreshold: 50,
  description: 'Farm fresh eggs from free-range chickens',
  imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
  lastUpdated: '2026-02-26'
},
{
  id: '3',
  name: 'Organic Carrots',
  category: 'Vegetables',
  price: 30.00,
  unit: 'kg',
  stock: 200,
  lowStockThreshold: 75,
  description: 'Sweet and crunchy organic carrots',
  imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
  lastUpdated: '2026-02-24'
},
{
  id: '4',
  name: 'Fresh Milk',
  category: 'Dairy & Eggs',
  price: 20.00,
  unit: 'gallon',
  stock: 30,
  lowStockThreshold: 40,
  description: 'Whole milk from grass-fed cows',
  imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
  lastUpdated: '2026-02-26'
},
{
  id: '5',
  name: 'Organic Lettuce',
  category: 'Vegetables',
  price: 15.00,
  unit: 'head',
  stock: 80,
  lowStockThreshold: 30,
  description: 'Crisp organic romaine lettuce',
  imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400',
  lastUpdated: '2026-02-25'
},
{
  id: '6',
  name: 'Raw Honey',
  category: 'Other',
  price: 350.00,
  unit: 'jar',
  stock: 25,
  lowStockThreshold: 20,
  description: 'Pure raw honey from our beehives',
  imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400',
  lastUpdated: '2026-02-23'
},
{
  id: '7',
  name: 'Organic Strawberries',
  category: 'Fruits',
  price: 160.00,
  unit: 'pint',
  stock: 60,
  lowStockThreshold: 40,
  description: 'Sweet organic strawberries picked fresh',
  imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
  lastUpdated: '2026-02-26'
},
{
  id: '8',
  name: 'Organic Apples',
  category: 'Fruits',
  price: 180.49,
  unit: 'lb',
  stock: 120,
  lowStockThreshold: 50,
  description: 'Juicy organic apples',
  imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
  lastUpdated: '2026-02-25'
}];


// Local storage utilities
const STORAGE_KEY = 'farmer-dashboard-products';

export function getProducts() {
  if (typeof window === 'undefined') return mockProducts;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return mockProducts;
    }
  }

  // Initialize with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
  return mockProducts;
}

export function saveProducts(products) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProductById(id) {
  return getProducts().find((p) => p.id === id);
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(),
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id, updates) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...updates,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id) {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}