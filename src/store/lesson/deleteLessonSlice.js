import { createSlice } from "@reduxjs/toolkit";
import {deleteLesson} from "./thunk/actLesson";

const initialState ={
    data:[],
    loading:false,
    error:null
}

const deleteLessonSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(deleteLesson.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteLesson.fulfilled,(state,action) =>{
            state.loading =false;
            state.data = action.payload
        });
        builder.addCase(deleteLesson.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {deleteLesson};
export default deleteLessonSlice.reducer