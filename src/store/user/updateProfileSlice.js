import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./thunk/actGetUser";

const initialState ={
    DataPass:[],
    loading:false,
    error:null
}

const updateProfileSlice = createSlice({
    name:'update',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(updateProfile.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateProfile.fulfilled,(state,action) =>{
            state.loading =false;
            state.DataPass.push(action.payload);

        });
        builder.addCase(updateProfile.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {updateProfile};
export default updateProfileSlice.reducer