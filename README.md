# 🔥 Firefly

[![npm version](https://badge.fury.io/js/firefly-store.svg)](https://badge.fury.io/js/firefly-store)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🌟 An elegant Active Record implementation for Firebase's Firestore

## ✨ Features

- 📝 Simple CRUD operations with `create`, `update`, `delete`, and `save`
- 🔍 Powerful querying with `filter`, `where`, and `whereKeyExists`
- 📚 Bulk operations with `saveMany`
- 🎯 Easy record retrieval with `find` and `get`

## 🚀 Installation

```bash
npm install firefly
```

## 📋 Quick Start

```javascript
import { createUser } from 'firefly';

const User = createUser();
const user = new User({ name: 'Jane Doe' });
await user.save();
```


## 🧪 Testing

```bash
npm test
```

## 📜 License

MIT © [Rob Conery]
