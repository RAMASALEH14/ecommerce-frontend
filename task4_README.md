# E-Commerce Frontend - Task 4 (Batman Technology)

## Project Overview
A responsive and modern e-commerce web application developed using React, Vite, and React Router[cite: 2]. This project implements a complete customer shopping experience, persistent state management using LocalStorage, and a fully functional Admin Dashboard powered by structured mock data[cite: 2].

---

## Tech Stack & Tools
- **Core Library:** React (Vite)[cite: 2]
- **Routing:** React Router[cite: 2]
- **Styling:** CSS Design System (CSS Variables)[cite: 2]
- **State Management:** Context API (AuthContext, CartContext, StoreContext)[cite: 2]
- **Data Persistence:** LocalStorage[cite: 2]

---

## Project Structure
```text
ecommerce-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── admin/
│   │   ├── cart/
│   │   ├── common/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── products/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```[cite: 2]

---

## Project Setup & Installation

1. **Clone or download the repository:**
   ```bash
   git clone <repository-url>
   cd ecommerce-frontend
   ```[cite: 2]

2. **Install dependencies:**
   ```bash
   npm install
   ```[cite: 2]

3. **Run the development server:**
   ```bash
   npm run dev
   ```[cite: 2]

4. **Build for production:**
   ```bash
   npm run build
   ```[cite: 2]

---

## Demo Accounts
- **Customer Account:** `customer@store.com` / `password123`
- **Admin Account:** `admin@store.com` / `admin123`

---

## Pages & Routes
- **Home (`/`):** Hero section, category cards, featured products, and promotional banners[cite: 2].
- **Products (`/products`):** Full catalog featuring real-time search, category filtering, price range slider, and sorting options[cite: 2].
- **Product Details (`/products/:id`):** Stock status display, dynamic quantity selection within stock limits, and related products[cite: 2].
- **Cart (`/cart`):** Shopping cart synced with LocalStorage, quantity updates, item removal confirmation, and subtotal calculations[cite: 2].
- **Checkout (`/checkout`):** Shipping details form with validation, payment method selection, and order confirmation simulation[cite: 2].
- **Authentication (`/login`, `/register`):** Login and registration forms with input validation and password visibility toggles[cite: 2].
- **User Profile (`/profile`):** Protected route displaying user details, password update form, and mock order history[cite: 2].
- **Admin Dashboard (`/admin`):** Protected admin panel for viewing store statistics, managing products/categories, and updating order statuses[cite: 2].
- **Not Found (`*`):** Custom 404 error page for invalid routes[cite: 2].

---

## Screenshots & Live Preview
- **Live Preview Link:** `[Add your Vercel / Netlify link here]`[cite: 2]
- **Screenshots:** Included in the repository / submission folder covering Desktop (1440px), Tablet (768px), and Mobile (390px) viewports, along with a successful `npm run build` output[cite: 2].

---

*Note: This frontend operates entirely on static mock data as specified for Task 4 and is architected to seamlessly integrate with a real REST API and Neon database in the upcoming phase[cite: 2].*