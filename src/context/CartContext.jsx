import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const getItemId = (product, supplier) => {
    const productId = product._id || product.id;
    const supplierId = supplier._id || supplier.id;
    return `${productId}-${supplierId}`;
  };

  const isInCart = (product, supplierEntry) => {
    if (!product || !supplierEntry?.supplier) return false;

    const supplier = supplierEntry.supplier;
    const itemId = getItemId(product, supplier);

    return cart.some((item) => item.id === itemId);
  };

  const addToCart = (product, supplierEntry) => {
    const supplier = supplierEntry.supplier;
    const productId = product._id || product.id;
    const supplierId = supplier._id || supplier.id;
    const itemId = `${productId}-${supplierId}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);

      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity + (supplierEntry.minOrder || 1),
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          id: itemId,
          productId,
          name: product.name,
          supplierId,
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

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
