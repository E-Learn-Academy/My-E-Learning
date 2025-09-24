import { createSlice } from "@reduxjs/toolkit";
import { getSpecificExam } from "./thunk/actExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getSpecificExamSlice = createSlice({
    name:'exam',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getSpecificExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSpecificExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(getSpecificExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getSpecificExam};
export default getSpecificExamSlice.reducer