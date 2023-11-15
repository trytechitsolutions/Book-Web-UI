import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginData: [],
    
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.loginData = action.payload;
            state.error = null;
            },
        loginFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { loginRequest, loginSuccess, loginFail } = loginSlice.actions;
export default loginSlice.reducer;
