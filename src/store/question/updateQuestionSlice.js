import { createSlice } from "@reduxjs/toolkit";
import { updateQuestion } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const updateQuestionSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(updateQuestion.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateQuestion.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(updateQuestion.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {updateQuestion};
export default updateQuestionSlice.reducer