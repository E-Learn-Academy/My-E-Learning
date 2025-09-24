import { createSlice } from "@reduxjs/toolkit";
import {getLessonById} from "./thunk/actLesson";



const initialState = {
    data: [],
    loading: false,
    error:null
}

const getLessonByIdSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getLessonById.pending,(state)=>{
            state.loading =true;
            state.error = null;
        });
        builder.addCase(getLessonById.fulfilled,(state,action)=>{
            state.loading =false;
            state.data = action.payload;
        });
        builder.addCase(getLessonById.rejected,(state,action) => {
            state.loading =false;
            state.error = action.payload;
        })
    }
})

export {getLessonById};
export default getLessonByIdSlice.reducer;