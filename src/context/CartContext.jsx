import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, supplierEntry) => {
    const supplier = supplierEntry.supplier;

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === product._id && item.supplierId === supplier._id,
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + supplierEntry.minOrder }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: `${product._id}-${supplier._id}`,
          productId: product._id,
          name: product.name,
          supplierId: supplier._id,
          supplier: supplier.name,
          supplierWhatsapp: supplier.whatsappNumber,
          price: supplierEntry.price,
          quantity: supplierEntry.minOrder || 1,
          image: product.image,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
