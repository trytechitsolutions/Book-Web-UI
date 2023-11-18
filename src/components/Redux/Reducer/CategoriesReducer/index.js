import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriesData: [],
    
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        CategoriesRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        CategoriesSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.categoriesData = [...state.categoriesData, action.payload];
            state.error = null;
        },
        CategoriesFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { CategoriesRequest, CategoriesSuccess, CategoriesFail } = categoriesSlice.actions;
export default categoriesSlice.reducer;
