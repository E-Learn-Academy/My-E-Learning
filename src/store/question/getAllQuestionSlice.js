import { createSlice } from "@reduxjs/toolkit";
import { getAllQuestion } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const getAllQuestionSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getAllQuestion.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getAllQuestion.fulfilled,(state,action) =>{
            state.loading =false;
            state.delete = action.payload

        });
        builder.addCase(getAllQuestion.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {getAllQuestion};
export default getAllQuestionSlice.reducer