import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "./thunk/actGetUser";

const initialState ={
    delete:[],
    loading:false,
    error:null
}

const deleteUserSlice = createSlice({
    name:'Delete',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(deleteUser.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteUser.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload
        });
        builder.addCase(deleteUser.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {deleteUser};
export default deleteUserSlice.reducer