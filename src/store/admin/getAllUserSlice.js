import { createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./thunk/actAdmin";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getAllUserSlice = createSlice({
    name:'admin',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getAllUser.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllUser.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(getAllUser.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getAllUser};
export default getAllUserSlice.reducer