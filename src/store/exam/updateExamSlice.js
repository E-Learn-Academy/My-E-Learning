import { createSlice } from "@reduxjs/toolkit";
import { updateExam } from "./thunk/actExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const updateExamSlice = createSlice({
    name:'exam',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(updateExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(updateExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {updateExam};
export default updateExamSlice.reducer