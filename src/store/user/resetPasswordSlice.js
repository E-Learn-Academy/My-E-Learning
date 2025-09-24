import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "./thunk/actGetUser";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const resetPasswordSlice = createSlice({
    name:'reset',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(resetPassword.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(resetPassword.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(resetPassword.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {resetPassword};
export default resetPasswordSlice.reducer