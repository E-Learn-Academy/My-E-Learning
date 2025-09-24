import { createSlice } from "@reduxjs/toolkit";
import {submitExam} from "./thunk/actStudentExam";



const initialState ={
    data:[],
    loading:false,
    error:null
}

const submitExamSlice = createSlice({
    name:'student',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(submitExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(submitExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.data.push(action.payload);

        });
        builder.addCase(submitExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {submitExam};
export default submitExamSlice.reducer