import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   count: 0,
};

const countersSlice = createSlice({
   name: "articles",
   initialState,
   reducers: {
      increaseCount: (state) => {
         state.count += 1;
      },
      decreaseCount: (state) => {
         state.count -= 1;
      },
   },
});

export default countersSlice.reducer;

export const { increaseCount, decreaseCount } = countersSlice.actions;
