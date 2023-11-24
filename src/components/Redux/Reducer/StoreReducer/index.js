import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    storeData: [],
};

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        StoreRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        StoreSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.componentsData =[ ...state.componentsData, action.payload];
            state.error = null;
        },
        StoreFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { StoreRequest, StoreSuccess, StoreFail } = storeSlice.actions;
export default storeSlice.reducer;