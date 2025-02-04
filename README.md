# 🔥 Firefly

[![npm version](https://badge.fury.io/js/firefly-store.svg)](https://badge.fury.io/js/firefly-store)
[![Build Status](https://github.com/username/firefly/workflows/CI/badge.svg)](https://github.com/username/firefly/actions)
[![Coverage Status](https://coveralls.io/repos/github/username/firefly/badge.svg?branch=main)](https://coveralls.io/github/username/firefly?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🌟 An elegant Active Record implementation for Firebase's Firestore

## ✨ Features

- 📝 Simple CRUD operations with `create`, `update`, `delete`, and `save`
- 🔍 Powerful querying with `filter`, `where`, and `whereKeyExists`
- 📚 Bulk operations with `saveMany`
- 🎯 Easy record retrieval with `find` and `get`

## 🚀 Installation

```bash
npm install firefly-store
```

## 📋 Quick Start

```javascript
import { createUser } from 'firefly-store';

const User = createUser();
const user = new User({ name: 'Jane Doe' });
await user.save();
```

## 📖 Documentation

See our [full documentation](https://username.github.io/firefly) for detailed usage instructions.

## 🧪 Testing

```bash
npm test
```

## 📜 License

MIT © [Your Name]
