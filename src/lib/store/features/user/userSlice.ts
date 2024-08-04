import { IUser } from "@/models/userModel";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface userState{
    user : IUser | null
}

const initialState : userState = {
    user:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state)=>{
            state.user = null;
        } 
    }
})

export const {login,logout} = userSlice.actions;

export default userSlice.reducer;