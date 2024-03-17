import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : {};
  });
  const deliveryCost = 60;

  useEffect(() => {
    // Update localStorage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFormCart = (itemId) => {
    // setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (cartItems[itemId]) {
      // Decrease the quantity of the item
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

      // Remove the item from the cart if the quantity becomes 0
      if (cartItems[itemId] === 1) {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[itemId];
        setCartItems(updatedCartItems);
      }

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  console.log("getTotalCartAmount: ", getTotalCartAmount());

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFormCart,
    getTotalCartAmount,
    deliveryCost,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStore = () => {
  return useContext(StoreContext);
};
