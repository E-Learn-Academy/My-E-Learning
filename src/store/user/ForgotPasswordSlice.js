import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword } from "./thunk/actGetUser";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const ForgotPasswordSlice = createSlice({
    name:'forgot',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(forgotPassword.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(forgotPassword.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(forgotPassword.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {forgotPassword};
export default ForgotPasswordSlice.reducer