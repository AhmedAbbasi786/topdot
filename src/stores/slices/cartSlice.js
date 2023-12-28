// cartSlice.js
import { createSlice, createDraftSafeSelector } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
  gifts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      state.total += +product.price;
    },
    removeFromCart: (state, action) => {
      // Implement logic to remove item from the cart
      const productId = action.payload;
      const existingProduct = state.products.find((p) => p.id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products = state.products.filter((p) => p.id !== productId);
        }

        state.total -= existingProduct.price;
      }
    },
    resetCart: (state, action) => {
      state.products = [];
      state.total = 0;
    },
  },
});

export const totalSelector = createDraftSafeSelector(
  (state) => state.cart.products,
  (products) =>
    products.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0)
);

export const {
  addToCart,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
