import { createSlice } from "@reduxjs/toolkit";
import { getAllAdmins } from "./thunk/actAdmin";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getAllAdminsSlice = createSlice({
    name:'admin',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getAllAdmins.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllAdmins.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(getAllAdmins.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getAllAdmins};
export default getAllAdminsSlice.reducer