import { createSlice } from "@reduxjs/toolkit";
import { getScoreStudent } from "./thunk/actStudentExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getScoreStudentSlice = createSlice({
    name:'student',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getScoreStudent.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getScoreStudent.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data = action.payload

        });
        builder.addCase(getScoreStudent.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getScoreStudent};
export default getScoreStudentSlice.reducer