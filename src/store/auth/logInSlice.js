import { createSlice } from "@reduxjs/toolkit";
import { logIn } from "./thunk/actAuth";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const logInSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(logIn.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(logIn.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(logIn.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {logIn};
export default logInSlice.reducer