import { createSlice } from "@reduxjs/toolkit";
import { addQuestion } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const addQuestionSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(addQuestion.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addQuestion.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(addQuestion.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {addQuestion};
export default addQuestionSlice.reducer