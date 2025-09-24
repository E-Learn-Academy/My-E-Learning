import { createSlice } from "@reduxjs/toolkit";
import { deleteQuestion } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const deleteQuestionSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(deleteQuestion.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteQuestion.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(deleteQuestion.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {deleteQuestion};
export default deleteQuestionSlice.reducer