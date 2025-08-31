# 🔥 Firefly - Firebase Firestore Active Record

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
![The Build](https://github.com/robred4/Firefly/actions/workflows/build.yml/badge.svg)

> 🌟 An elegant Active Record implementation for Firebase's Firestore - making database operations as simple as they should be!

Firefly brings the familiar Active Record pattern to Firebase Firestore, giving you intuitive CRUD operations, powerful querying capabilities, and seamless data management. 

## 🚀 Quick Installation

```bash
npm install firefly
```

## ⚙️ Setup & Configuration

### 1. Firebase Project Setup 🏗️

First, you'll need Firebase Admin SDK credentials. Create a service account in your Firebase console and download the JSON key file.

### 2. Environment Configuration 🔧

Create a `.env` file in your project root with your Firebase credentials:

```env
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
```

### 3. Basic Setup 🎯

```javascript
// Import the Firefly base class
const Firefly = require('firefly').Firefly;

// Create your model by extending Firefly
class User extends Firefly {
  // Your model is ready to use! 🎉
}

// Or use the factory approach
const { Firefly } = require('firefly');
class Product extends Firefly {}
```

## 💾 Writing Data - Save, Create & Delete Operations

### Creating Records 📝

```javascript
// Method 1: Create and save manually
const user = new User({
  name: 'Alice Johnson',
  email: 'alice@example.com',
  age: 28
});
await user.save(); // 💾 Saves to Firestore
console.log(`User saved with ID: ${user.id}`); // Auto-generated ID

// Method 2: Create and save in one step
const product = await Product.create({
  name: 'Gaming Laptop',
  price: 1299.99,
  category: 'Electronics'
});
console.log('Product created! 🎮', product.id);

// Method 3: Create with custom ID
const customUser = new User({
  id: 'user_12345',
  name: 'Bob Smith',
  email: 'bob@example.com'
});
await customUser.save();
```

### Bulk Operations - Save Many 📦

Perfect for importing data or batch operations:

```javascript
const users = [
  new User({ name: 'Charlie', email: 'charlie@example.com' }),
  new User({ name: 'Diana', email: 'diana@example.com' }),
  new User({ name: 'Eve', email: 'eve@example.com' })
];

const savedUsers = await User.saveMany(users);
console.log(`💫 Saved ${savedUsers.length} users!`);
```

### Updating Records ✏️

```javascript
// Update individual fields
await User.update('user_12345', { age: 29, lastLogin: new Date() });

// Or load, modify, and save
const user = await User.get('user_12345');
user.age = 30;
user.status = 'premium';
await user.save(); // 🔄 Updates existing record
```

### Deleting Records 🗑️

```javascript
// Delete by ID (static method)
await User.delete('user_12345');
console.log('User deleted! 👋');

// Delete instance method
const user = await User.get('user_12345');
await user.delete();

// Bulk delete by criteria
const deletedCount = await User.deleteMany({ status: 'inactive' });
console.log(`🗑️ Deleted ${deletedCount} inactive users`);
```

## 📖 Reading Data 

### Basic Retrieval 🎯

```javascript
// Get by ID
const user = await User.get('user_12345');
if (user) {
  console.log(`Found: ${user.name}`); // 🎉
} else {
  console.log('User not found 😢');
}

// Check if record exists
const exists = await User.exists('user_12345');
console.log(`User exists: ${exists ? '✅' : '❌'}`);

// Get all records
const allUsers = await User.all();
console.log(`📊 Total users: ${allUsers.length}`);
```

### Single Record Queries 🔍

```javascript
// Find first match by criteria
const premiumUser = await User.find({ status: 'premium' });
if (premiumUser) {
  console.log(`Premium user: ${premiumUser.name} ⭐`);
}

// Find by email
const userByEmail = await User.find({ email: 'alice@example.com' });
```

### Multiple Record Queries 📋

```javascript
// Filter records by criteria
const activeUsers = await User.filter({ status: 'active' });
console.log(`👥 Active users: ${activeUsers.length}`);

// Filter by category
const electronics = await Product.filter({ category: 'Electronics' });
```

### Advanced Querying 🔬

```javascript
// Where queries with operators
const expensiveProducts = await Product.where('price', '>', 1000);
console.log(`💰 Found ${expensiveProducts.length} expensive products`);

// Available operators: '==', '!=', '<', '<=', '>', '>=', 'array-contains', 'in', 'not-in'
const recentUsers = await User.where('created_at', '>=', new Date('2024-01-01'));
const specificUsers = await User.where('id', 'in', ['user1', 'user2', 'user3']);
```

### Ordering & Sorting 📊

```javascript
// Order by field (ascending by default)
const usersByAge = await User.whereKeyExists('age'); // Returns users ordered by age
const newestProducts = await Product.orderBy('created_at', 'desc', 100); // Limit 100

// Custom ordering
const topProducts = await Product.orderBy('rating', 'desc', 10);
console.log('🏆 Top 10 products by rating');
```

### Complex Queries 🧩

```javascript
// Multiple conditions (AND logic)
const query = await User.whereAnd([
  { key: 'age', op: '>=', val: 18 },
  { key: 'status', op: '==', val: 'active' },
  { key: 'country', op: '==', val: 'USA' }
]);
console.log(`🎯 Found ${query.length} matching users`);
```

## 🏗️ Working with Models

### Model Definition 📋

```javascript
class BlogPost extends Firefly {
  // Models automatically get:
  // - id (auto-generated or custom)
  // - created_at (UTC timestamp)
  // - timestamp (milliseconds)
  
  // Add custom methods
  isPublished() {
    return this.status === 'published';
  }
  
  publish() {
    this.status = 'published';
    this.published_at = new Date();
    return this.save(); // 🚀
  }
}

// Usage
const post = new BlogPost({
  title: 'My First Post',
  content: 'Hello, world!',
  status: 'draft'
});

await post.save();
console.log('📝 Blog post saved!');

// Later...
await post.publish();
console.log('📰 Post published!');
```

### Nested Data Support 🌳

Firefly handles complex nested objects seamlessly:

```javascript
const user = new User({
  name: 'Sarah',
  profile: {
    bio: 'Software developer',
    skills: ['JavaScript', 'Python', 'React'],
    social: {
      twitter: '@sarah_dev',
      github: 'sarah-codes'
    }
  },
  preferences: {
    theme: 'dark',
    notifications: true
  }
});

await user.save(); // 💾 All nested data preserved!
```

### Collection Naming 📁

Firefly automatically converts your class names to appropriate collection names:

```javascript
class User extends Firefly {} // → 'users' collection
class BlogPost extends Firefly {} // → 'blog_posts' collection  
class ProductCategory extends Firefly {} // → 'product_categories' collection

// Check your collection name
const user = new User({ name: 'Test' });
console.log(user.collection()); // 'users'
```

## 🎨 Real-World Examples

### E-commerce Store 🛍️

```javascript
class Product extends Firefly {}
class Order extends Firefly {}
class Customer extends Firefly {}

// Create products
const laptop = await Product.create({
  name: 'MacBook Pro',
  price: 2399.99,
  category: 'Computers',
  inStock: true,
  tags: ['laptop', 'apple', 'professional']
});

// Find products
const computers = await Product.filter({ category: 'Computers' });
const inStockItems = await Product.filter({ inStock: true });
const expensiveItems = await Product.where('price', '>', 1000);

// Create an order
const order = await Order.create({
  customerId: 'cust_123',
  items: [
    { productId: laptop.id, quantity: 1, price: laptop.price }
  ],
  total: laptop.price,
  status: 'pending'
});

console.log('🛒 Order created successfully!');
```

### Blog System 📚

```javascript
class Author extends Firefly {}
class Post extends Firefly {}
class Comment extends Firefly {}

// Create author
const author = await Author.create({
  name: 'Jane Doe',
  email: 'jane@blog.com',
  bio: 'Tech writer and developer'
});

// Create post
const post = await Post.create({
  title: 'Getting Started with Firefly',
  content: 'Firefly makes Firebase development a breeze...',
  authorId: author.id,
  tags: ['firebase', 'javascript', 'tutorial'],
  status: 'published'
});

// Find posts by author
const authorPosts = await Post.filter({ authorId: author.id });
const publishedPosts = await Post.filter({ status: 'published' });

// Recent posts
const recentPosts = await Post.orderBy('created_at', 'desc', 10);

console.log(`📖 Found ${recentPosts.length} recent posts`);
```

## 🧪 Testing Your Setup

Run the included tests to verify everything works:

```bash
npm test
```

## 🔧 Advanced Configuration

### Custom Firebase Config

```javascript
// lib/custom-db.js
const admin = require('firebase-admin');
const { DB } = require('firefly/lib/db');

// Custom initialization
const customConfig = {
  credential: admin.credential.cert(require('./path-to-service-account.json')),
  databaseURL: 'https://your-project.firebaseio.com'
};

admin.initializeApp(customConfig);
```


## 🎉 You're All Set!

Firefly gives you the power of Firebase Firestore with the simplicity of Active Record. Start building amazing applications with clean, readable code that just works! 

## 📜 License

MIT © [Rob Conery]

## 🤝 Want to Help Out?

Love contributions and issues! Have a look at [CONTRIBUTING](/CONTRIBUTING.md)!

---

Made with ❤️ and lots of ☕ by developers who believe database operations should be simple and elegant.