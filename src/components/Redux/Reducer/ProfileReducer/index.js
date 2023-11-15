import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: [],
    
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
            state.profileData = action.payload;
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
