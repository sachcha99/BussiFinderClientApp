import { createSlice } from '@reduxjs/toolkit';
import api from '../api';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: [],
        userDetails: [],
    },
    reducers: {
        login: (state, action) => {
            console.log("action.payload", action.payload)
            state.value.push(action.payload)
        },
        register: (state, action) => {
            state.value.push(action.payload)
        },
        userInfo: (state, action) => {
            state.userDetails.push(action.payload)
        },
        updateUser: (state, action) => {
        const  updateSubscription = async ()=>{
            await api.put(`/users/updateUser/`, action.payload);
        }
        if(action.payload){
            state.userDetails.push(updateSubscription())
        }
        },
        logout: (state) => {
            state.value = [];
            state.userDetails = null;
        },
    }
});
export const { login: login, register: register, logout:logout,userInfo:userInfo } = userSlice.actions;
export default userSlice.reducer;