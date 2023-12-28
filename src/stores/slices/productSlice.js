import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../configs/config";

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("Error fetching products");
  }
});

// Create an async thunk for searching products
export const searchProducts = createAsyncThunk("products/searchProducts", async (query) => {
    console.log("running..............",query)
  try {
    const response = await fetch(`${baseUrl}?title=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw Error("Error searching products");
  }
});

// Define the product slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [], // Array to store the products
    status: "idle", // Status of the async operation: "idle", "loading", "succeeded", "failed"
    error: null, // Error message if the async operation fails
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default productSlice.reducer;
