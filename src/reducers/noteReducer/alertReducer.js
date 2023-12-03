import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const setAlert = createAsyncThunk(
  "alert/setalert",
  async (inputData) => {
    let alertData = {};
    if (inputData) {
      alertData = {
        msg: inputData.message,
        type: inputData.type,
      };
    } else {
      return null;
    }
    return alertData;
  }
);

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAlert.rejected, (state, action) => {
        console.log("Alert Rejected");
      })
      .addCase(setAlert.fulfilled, (state, action) => {
        state = action.payload;
        return state;
      });
  },
});

export default alertSlice.reducer;