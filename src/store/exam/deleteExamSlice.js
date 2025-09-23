import { createSlice } from "@reduxjs/toolkit";
import { deleteExam } from "./thunk/actExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const deleteExamSlice = createSlice({
    name:'exam',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(deleteExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(deleteExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {deleteExam};
export default deleteExamSlice.reducer