import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leftCountryName:"",
    rightCountryName:"",
    leftCountryScore: 0,
    rightCountryScore: 0,
};

const operatorSlice = createSlice({
  name: 'scoreboard',
  initialState,
  reducers: {
    lcName:(state,action) => {
        state.leftCountryName = action.payload
    },
    rcName:(state,action) => {
        state.rightCountryName = action.payload
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
var operatorReducer = operatorSlice.reducer
export default operatorReducer;
