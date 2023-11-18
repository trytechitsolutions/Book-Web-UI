import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    kycData: [],
};

const kycSlice = createSlice({
    name: "kyc",
    initialState,
    reducers: {
        KycRequest: (state) => {
            alert("reducer called");
            state.isLoading = true;
        },
        KycSuccess: (state, action) => {
            alert(action.type)
            state.isLoading = false;
            state.componentsData =[ ...state.componentsData, action.payload];
            state.error = null;
        },
        KycFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { KycRequest, KycSuccess, KycFail } = kycSlice.actions;
export default kycSlice.reducer;