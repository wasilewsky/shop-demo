# 🛍️ Shop Demo

Simple React + TypeScript shop app with routing, product fetch from Fake Store API, and a cart persisted in `localStorage`.

## ✨ Features
- Routing: Home, Products, 404 (React Router DOM)
- Cart: add/remove items, badge in header, reset button, persisted in `localStorage`
- Products from `https://fakestoreapi.com/`: image, title, price, category, rating
- Sorting: default, title, price (low-high / high-low)
- Home page shows a random product and cart actions
- Loading and error states for product fetch

## 🛠️ Tech Stack
- React + TypeScript
- Vite
- React Router DOM
- Fetch API
- localStorage (cart persistence)

## 🚀 Getting Started
1) Install dependencies:
```bash
npm install
```
2) Start dev server:
```bash
npm run dev
```
3) Open the app:
```
http://localhost:5173
```

## 🔗 API
- Products: `https://fakestoreapi.com/products`

## 🧭 Pages
- `/` Home – random product and cart actions
- `/products` – product list with sorting and cart actions
- `*` 404

## 🛒 Cart
- Shared via context
- Badge in the header (item count)
- Reset button clears cart
- Persists to `localStorage` (survives refresh)
