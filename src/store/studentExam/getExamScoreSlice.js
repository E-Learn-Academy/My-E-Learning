import { createSlice } from "@reduxjs/toolkit";
import { getExamScore } from "./thunk/actStudentExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getExamScoreSlice = createSlice({
    name:'student',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getExamScore.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getExamScore.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data = action.payload

        });
        builder.addCase(getExamScore.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getExamScore};
export default getExamScoreSlice.reducer