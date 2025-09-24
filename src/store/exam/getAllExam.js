import { createSlice } from "@reduxjs/toolkit";
import { getAllExam } from "./thunk/actExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getAllExamSlice = createSlice({
    name:'exam',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getAllExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(getAllExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getAllExam};
export default getAllExamSlice.reducer