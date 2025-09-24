import { createSlice } from "@reduxjs/toolkit";
import { addQuestionShortAns } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const addQuestionShortAnsSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(addQuestionShortAns.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addQuestionShortAns.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(addQuestionShortAns.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {addQuestionShortAns};
export default addQuestionShortAnsSlice.reducer