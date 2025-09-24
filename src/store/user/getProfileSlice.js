import { createSlice } from "@reduxjs/toolkit";
import {getProfile} from "./thunk/actGetUser";


const initialState = {
    profile: [],
    loading: false,
    error:null
}

const getProfileSlice = createSlice({
    name:'profile',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getProfile.pending,(state)=>{
            state.loading =true;
            state.error = null;
        });
        builder.addCase(getProfile.fulfilled,(state,action)=>{
            state.loading =false;
            state.profile = action.payload;
        });
        builder.addCase(getProfile.rejected,(state,action) => {
            state.loading =false;
            state.error = action.payload;
        })
    }
})

export {getProfile};
export default getProfileSlice.reducer;