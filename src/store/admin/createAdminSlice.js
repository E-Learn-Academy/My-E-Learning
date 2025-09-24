import { createSlice } from "@reduxjs/toolkit";
import { createAdmin } from "./thunk/actAdmin";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const createAdminSlice = createSlice({
    name:'admin',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(createAdmin.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createAdmin.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(createAdmin.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {createAdmin};
export default createAdminSlice.reducer