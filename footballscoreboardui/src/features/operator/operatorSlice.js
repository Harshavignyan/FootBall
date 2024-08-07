import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leftCountryName: "",
    leftCountryFlag: "",
    rightCountryName: "",
    rightCountryFlag: "",
    leftCountryScore: 0,
    rightCountryScore: 0,
};

const operatorSlice = createSlice({
    name: 'scoreboard',
    initialState,
    reducers: {
        lcName: (state, action) => {
            console.log(action.payload)
            state.leftCountryName = action.payload.name;
            state.leftCountryFlag = action.payload.flag; // Ensure this is a URL string
        },
        rcName: (state, action) => {
            console.log(action.payload)
            state.rightCountryName = action.payload.name;
            state.rightCountryFlag = action.payload.flag; // Ensure this is a URL string
        },
        lcScore: (state, action) => {
            state.leftCountryScore += action.payload;
        },
        rcScore: (state, action) => {
            state.rightCountryScore += action.payload;
        },
    },
});

export const { lcName, rcName, lcScore, rcScore } = operatorSlice.actions;
export default operatorSlice.reducer;
