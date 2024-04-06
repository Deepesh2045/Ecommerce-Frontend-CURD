import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    searchProduct: '',
    category: "",
    minPrice: 0,
    maxPrice: 0,
    isFilterApplied:false,
  },
  reducers: {
    updateSearchProduct: (state, action) => {
      state.searchProduct = action.payload;
    },
    setProductFilter: (state, action) => {
      state.isFilterApplied= true;
      state.category = action.payload.category;
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    clearProductFilter:(state,action)=>{
      state.category = "";
      state.minPrice = 0;
      state.maxPrice = 0;
      state.isFilterApplied =false;
    }
  },
});
export const { updateSearchProduct, setProductFilter,clearProductFilter } = productSlice.actions;
export default productSlice.reducer;

