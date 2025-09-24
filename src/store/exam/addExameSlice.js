import { createSlice } from "@reduxjs/toolkit";
import { addExam } from "./thunk/actExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const addExamSlice = createSlice({
    name:'exam',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(addExam.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addExam.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data.push(action.payload);

        });
        builder.addCase(addExam.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {addExam};
export default addExamSlice.reducer