import { createSlice } from "@reduxjs/toolkit";
import { addQuestionT_F } from "./thunk/actQuestion";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const addQuestionT_FSlice = createSlice({
    name:'questions',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(addQuestionT_F.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addQuestionT_F.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(addQuestionT_F.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {addQuestionT_F};
export default addQuestionT_FSlice.reducer