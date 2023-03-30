import React from "react";
import RootContext from "../context";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(RootContext);
  const totalPrice = cartItems.reduce((accum, obj) => Number(obj.price) + accum, 0);
  return { cartItems, setCartItems, totalPrice };
};
