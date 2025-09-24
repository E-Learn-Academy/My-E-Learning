import { createSlice } from "@reduxjs/toolkit";
import {startExam} from "./thunk/actStudentExam";



const initialState ={
    data:[],
    loading:false,
    error:null
}

const startExamSlice = createSlice({
    name:'student',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(startExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(startExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.data.push(action.payload);

        });
        builder.addCase(startExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {startExam};
export default startExamSlice.reducer