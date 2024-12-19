import { createContext, useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = async (id) => {
    try {
      const productRef = doc(db, "item", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        const maxStock = productData.stock;

        setCart((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              const totalInCart = item.quantity;

              if (totalInCart < maxStock) {
                return { ...item, quantity: item.quantity + 1 };
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "Stock agotado",
                  text: "No puedes agregar más cantidad de este producto.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            }
            return item;
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo verificar el stock del producto.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error al consultar el stock:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo verificar el stock. Por favor, inténtalo nuevamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getItemQuantity = (id) => {
    const item = cart.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
