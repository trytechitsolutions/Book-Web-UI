import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brandsData: [],
};

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        BrandsRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        BrandsSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.brandsData =[ ...state.brandsData, action.payload];
            state.error = null;
        },
        BrandsFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { BrandsRequest, BrandsSuccess, BrandsFail } = brandsSlice.actions;
export default brandsSlice.reducer;