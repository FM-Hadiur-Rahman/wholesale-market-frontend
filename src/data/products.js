export const products = [
  {
    id: "p-001",
    name: "Napa 500mg Tablet",
    category: "Pharmaceuticals",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop",
    unit: "Box",
    minOrder: 10,
    bestPrice: 280,
    mrp: 320,
    stock: "Available",
    suppliers: [
      { name: "Rahman Pharma Distribution", price: 280, delivery: "Same day" },
      { name: "Dhaka Medical Supply", price: 292, delivery: "Next day" },
      { name: "Medilink Wholesale", price: 286, delivery: "Same day" },
    ],
  },
  {
    id: "p-002",
    name: "Seclo 20mg Capsule",
    category: "Pharmaceuticals",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1200&auto=format&fit=crop",
    unit: "Box",
    minOrder: 8,
    bestPrice: 410,
    mrp: 460,
    stock: "Low stock",
    suppliers: [
      { name: "Rahman Pharma Distribution", price: 410, delivery: "Same day" },
      { name: "Chittagong Pharma Hub", price: 425, delivery: "2 days" },
    ],
  },
  {
    id: "p-003",
    name: "Premium Office Notebook Pack",
    category: "Stationery",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    unit: "Carton",
    minOrder: 5,
    bestPrice: 950,
    mrp: 1100,
    stock: "Available",
    suppliers: [
      {
        name: "Motijheel Stationery Wholesale",
        price: 950,
        delivery: "Next day",
      },
      { name: "Capital Paper Mart", price: 990, delivery: "Same day" },
    ],
  },
  {
    id: "p-004",
    name: "Salon Shampoo Wholesale Pack",
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1556228724-4f3b7971f528?q=80&w=1200&auto=format&fit=crop",
    unit: "Carton",
    minOrder: 3,
    bestPrice: 1850,
    mrp: 2200,
    stock: "Available",
    suppliers: [
      { name: "BeautyLine Wholesale BD", price: 1850, delivery: "2 days" },
      { name: "Dhaka Cosmetic Supply", price: 1920, delivery: "Next day" },
    ],
  },
];
