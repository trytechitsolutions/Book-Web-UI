import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registerData: [],
    
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        profileSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.registerData = action.payload;
            state.error = null;
        },
        profileFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { profileRequest, profileSuccess, profileFail } = profileSlice.actions;
export default profileSlice.reducer;
