import { createSlice } from "@reduxjs/toolkit";

const initialState={
    statusUpdate:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.statusUpdate=true;
            state.userData=action.payload.userData
        },
        logout:(state,action)=>{
            state.statusUpdate=false;
            state.userData=null
        }
    }
})

export const {login,logout}=authSlice.actions

export default authSlice.reducer