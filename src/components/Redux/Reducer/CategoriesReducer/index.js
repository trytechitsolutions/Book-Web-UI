import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriesData: [],
    
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        categoriesRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        categoriesSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.categoriesData = action.payload;
            state.error = null;
        },
        categoriesFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { categoriesRequest, categoriesSuccess, categoriesFail } = categoriesSlice.actions;
export default categoriesSlice.reducer;
