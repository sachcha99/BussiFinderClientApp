import { createSlice } from "@reduxjs/toolkit";

const lightModeValue = { primaryColor: "#F7F7F7", bgColor: 0, fontColor: "#0f0f0f", subFontColor: "#595959",textColor:'#3e3d3d',status:"light" };
const darkModeValue =  { primaryColor: "#303030", bgColor: 0, fontColor: "#f0f0f0", subFontColor: "#c7c7c7",textColor:'#f5f5f5',status:"dark"};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: darkModeValue },
  reducers: {
    // lightMode: (state, action) => {
    //   state.value = action.payload;
    // },
    lightMode: (state) => {
      console.log("call light")
      state.value = lightModeValue;
    },
    darkMode: (state) => {
      console.log("call dark")
      state.value = darkModeValue;
    },
  },
});

export const { lightMode,darkMode } = themeSlice.actions;

export default themeSlice.reducer;