import { createSlice } from "@reduxjs/toolkit";
import { updatePassword } from "./thunk/actGetUser";

const initialState ={
    DataPass:[],
    loading:false,
    error:null
}

const updatePasswordSlice = createSlice({
    name:'update',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(updatePassword.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updatePassword.fulfilled,(state,action) =>{
            state.loading =false;
            state.DataPass.push(action.payload);

        });
        builder.addCase(updatePassword.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {updatePassword};
export default updatePasswordSlice.reducer