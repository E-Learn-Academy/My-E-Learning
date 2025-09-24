import { createSlice } from "@reduxjs/toolkit";
import { getSpecificQuestion } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getSpecificQuestionSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getSpecificQuestion.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getSpecificQuestion.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(getSpecificQuestion.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getSpecificQuestion};
export default getSpecificQuestionSlice.reducer