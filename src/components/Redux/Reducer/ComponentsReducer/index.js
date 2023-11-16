import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    componentsData: [],
};

const componentsSlice = createSlice({
    name: "components",
    initialState,
    reducers: {
        ComponentsRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        ComponentsSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.componentsData =[ ...state.componentsData, action.payload];
            state.error = null;
        },
        ComponentsFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { ComponentsRequest, ComponentsSuccess, ComponentsFail } = componentsSlice.actions;
export default componentsSlice.reducer;