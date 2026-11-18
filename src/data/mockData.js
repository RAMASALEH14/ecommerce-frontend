export const categories = [
  { id: 1, name: "Audio", slug: "audio" },
  { id: 2, name: "Laptops", slug: "laptops" },
  { id: 3, name: "Accessories", slug: "accessories" },
  { id: 4, name: "Smartphones", slug: "smartphones" },
  { id: 5, name: "Wearables", slug: "wearables" }
];

export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with active noise cancellation.",
    price: 35,
    stockQuantity: 12,
    category: "Audio",
    image: "/images/headphones.jpg",
    isActive: true
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    description: "Feature-packed smartwatch with health and fitness tracking.",
    price: 120,
    stockQuantity: 5,
    category: "Wearables",
    image: "/images/smartwatch.jpg",
    isActive: true
  },
  {
    id: 3,
    name: "Gaming Laptop X",
    description: "Powerful gaming laptop with high-end graphics card.",
    price: 950,
    stockQuantity: 0, // منتج غير متوفر لتجربة حالة Out of Stock
    category: "Laptops",
    image: "/images/laptop.jpg",
    isActive: true
  }
];

export const users = [
  { id: 1, name: "Rama Customer", email: "customer@ecommerce.com", role: "customer" },
  { id: 2, name: "Admin Rama", email: "admin@ecommerce.com", role: "admin" }
];

export const orders = [
  { id: 101, customerName: "Rama Customer", total: 155, status: "Pending", date: "2026-11-01" }
];