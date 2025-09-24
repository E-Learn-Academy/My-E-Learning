import { createSlice } from "@reduxjs/toolkit";
import { signUp } from "./thunk/actAuth";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const signUpSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(signUp.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signUp.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(signUp.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {signUp};
export default signUpSlice.reducer