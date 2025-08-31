# 🔥 Firefly - Firebase Firestore Active Record

A lightweight, ActiveRecord-style ORM for Firebase Firestore that makes working with your data as easy as spreading wings! 🦋

[![npm version](https://badge.fury.io/js/firefly.svg)](https://badge.fury.io/js/firefly)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Features

- 🎯 **ActiveRecord Pattern**: Familiar API for developers coming from Rails, Laravel, or similar frameworks
- 🔥 **Firebase Firestore**: Powered by Google's scalable NoSQL database
- 📝 **Simple Syntax**: Write less code, do more
- 🚀 **Automatic Timestamps**: Created and updated timestamps handled automatically
- 🔍 **Flexible Querying**: Multiple query methods for different use cases

## 🛠 Installation

```bash
npm install firefly
```

## ⚙️ Setup & Configuration

### 1. Firebase Project Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Generate a service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

### 2. Environment Configuration

Create a `.env` file in your project root:

```env
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
YOUR PRIVATE KEY HERE
-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://accounts.google.com/o/oauth2/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account@your-project.iam.gserviceaccount.com
```

### 3. Basic Usage

```javascript
const Firefly = require('firefly');

// Create your model by extending Firefly
class User extends Firefly {}
class Post extends Firefly {}
```

## 🚀 Quick Start

### Creating (Writing) Data

```javascript
const User = require('./lib/admin'); // Extend Firefly

// Method 1: Create and save
const user = new User({ 
  name: "Alice", 
  email: "alice@example.com",
  role: "admin" 
});
await user.save();

// Method 2: Create directly
const user2 = await User.create({
  name: "Bob",
  email: "bob@example.com", 
  role: "user"
});

// Method 3: Save nested data
const userWithPrefs = new User({
  name: "Charlie",
  email: "charlie@example.com",
  preferences: {
    theme: "dark",
    notifications: true
  },
  tags: ["developer", "javascript"]
});
await userWithPrefs.save();
```

### Updating Data

```javascript
// Method 1: Update instance
const user = await User.get("user-id");
user.email = "newemail@example.com";
user.role = "moderator";
await user.save();

// Method 2: Static update
await User.update("user-id", { 
  email: "updated@example.com",
  last_login: new Date().toISOString()
});
```

### Deleting Data

```javascript
// Method 1: Delete instance
const user = await User.get("user-id");
await user.delete(); // Returns true

// Method 2: Static delete
await User.delete("user-id");

// Method 3: Delete multiple records
const deletedCount = await User.deleteMany({ role: "inactive" });
console.log(`Deleted ${deletedCount} users`);
```

## 🔍 Query Methods

### Basic Retrieval

```javascript
// Get by ID
const user = await User.get("user-id");
// Returns User instance or null

// Check if exists
const exists = await User.exists("user-id");
// Returns boolean

// Get all records
const allUsers = await User.all();
// Returns array of User instances
```

### Finding Records

```javascript
// Find single record by criteria
const admin = await User.find({ role: "admin" });
// Returns first matching User instance or null

// Find multiple records by criteria
const admins = await User.filter({ role: "admin" });
// Returns array of User instances

// Advanced where queries
const activeUsers = await User.where("status", "==", "active");
// Returns array matching the criteria

const recentUsers = await User.where("created_at", ">", "2024-01-01");
// Supports ==, !=, <, <=, >, >=, array-contains, in, not-in
```

### Advanced Querying

```javascript
// Order by field
const usersByName = await User.whereKeyExists("name");
// Orders by the specified field (ascending by default)

// Save multiple records
const users = [
  new User({ name: "User1", email: "user1@example.com" }),
  new User({ name: "User2", email: "user2@example.com" })
];
const savedUsers = await User.saveMany(users);
```

### Query Operators

Firefly supports all Firestore query operators:

- `==` - Equal to
- `!=` - Not equal to  
- `<` - Less than
- `<=` - Less than or equal to
- `>` - Greater than
- `>=` - Greater than or equal to
- `array-contains` - Array contains value
- `in` - Value in array
- `not-in` - Value not in array

```javascript
// Examples of different operators
const posts = await Post.where("likes", ">", 100);
const draftPosts = await Post.where("status", "in", ["draft", "pending"]);
const taggedPosts = await Post.where("tags", "array-contains", "javascript");
```

## 📋 Complete API Reference

### Static Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `create(data)` | Create and save new record | Promise\<Instance\> |
| `get(id)` | Find record by ID | Promise\<Instance\|null\> |
| `find(criteria)` | Find single record by criteria | Promise\<Instance\|null\> |
| `filter(criteria)` | Find multiple records by criteria | Promise\<Array\<Instance\>\> |
| `all()` | Get all records | Promise\<Array\<Instance\>\> |
| `where(key, op, val)` | Query with operator | Promise\<Array\<Instance\>\> |
| `whereKeyExists(key)` | Order by key | Promise\<Array\<Instance\>\> |
| `exists(id)` | Check if record exists | Promise\<boolean\> |
| `update(id, data)` | Update record by ID | Promise\<Object\> |
| `delete(id)` | Delete record by ID | Promise\<boolean\> |
| `deleteMany(criteria)` | Delete multiple records | Promise\<number\> |
| `saveMany(instances)` | Save multiple instances | Promise\<Array\<Instance\>\> |

### Instance Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `save()` | Save current instance | Promise\<Instance\> |
| `delete()` | Delete current instance | Promise\<boolean\> |
| `collection()` | Get collection name | string |

## 🏗 Collection Naming

Firefly automatically converts your class names to collection names using Rails-style conventions:

- `User` → `users`
- `BlogPost` → `blog_posts`  
- `UserPreference` → `user_preferences`

## 📚 Examples

### Blog System

```javascript
class User extends Firefly {}
class Post extends Firefly {}
class Comment extends Firefly {}

// Create a user
const author = await User.create({
  name: "Jane Doe",
  email: "jane@example.com"
});

// Create a post
const post = await Post.create({
  title: "Getting Started with Firefly",
  content: "Firefly makes Firebase Firestore feel like ActiveRecord...",
  author_id: author.id,
  published: true
});

// Add comments
await Comment.create({
  post_id: post.id,
  author: "Reader",
  content: "Great article!",
  approved: true
});

// Query published posts
const publishedPosts = await Post.filter({ published: true });

// Find post with comments
const postWithComments = await Post.get(post.id);
const comments = await Comment.filter({ post_id: post.id, approved: true });
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The test suite includes examples of all CRUD operations and query methods.

## 📄 License

ISC License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues & Support

Found a bug or need help? [Open an issue](https://github.com/your-username/firefly/issues) on GitHub.

---

Made with ❤️ for developers who love clean, simple APIs