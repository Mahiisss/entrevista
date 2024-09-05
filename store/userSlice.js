import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"creds",
    initialState:{
        creds:{
            username:"",
            token:""
        }
    },
    reducers:{
        setCreds:(state,action)=>{
            state.creds = action.payload;
        }
    }
});

export default userSlice.reducer;
export const selectCreds = (state)=>state.creds.creds;
export const {setCreds} = userSlice.actions;