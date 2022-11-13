import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
    name: "header",
    initialState: {
        value: [{ 'header': true, footer: true }]
    },
    reducers: {
        addHeader: (state, action) => {
            // state.value.push(action.payload)
            state.value[0] = action.payload
        },

    }
});
export const { addHeader: addHeader } = headerSlice.actions;
export default headerSlice.reducer;