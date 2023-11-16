import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registerData: [],
    
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        registerSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.registerData = [...state.registerData,action.payload];
            state.error = null;
        },
        registerFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { registerRequest, registerSuccess, registerFail } = registerSlice.actions;
export default registerSlice.reducer;
