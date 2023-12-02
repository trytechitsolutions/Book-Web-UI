import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    
};

const productSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        ProductRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        ProductSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.productData =[...state.productData,action.payload];
            state.error = null;
        },
        ProductFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { ProductRequest, ProductSuccess, ProductFail } = productSlice.actions;
export default productSlice.reducer;
