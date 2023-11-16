import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rolesData: [],
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        RolesRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        RolesSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.rolesData =[ ...state.rolesData, action.payload];
            state.error = null;
        },
        RolesFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { RolesRequest, RolesSuccess, RolesFail } = rolesSlice.actions;
export default rolesSlice.reducer;