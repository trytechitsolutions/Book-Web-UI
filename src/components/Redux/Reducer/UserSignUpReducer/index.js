import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        userSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.userData =[ ...state.userData, action.payload];
            state.error = null;
        },
        userFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { userRequest, userSuccess, userFail } = userSlice.actions;
export default userSlice.reducer;