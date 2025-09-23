import { createSlice } from "@reduxjs/toolkit";
import {updateLesson} from "./thunk/actLesson";



const initialState ={
    data:[],
    loading:false,
    error:null
}

const updateLessonSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(updateLesson.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateLesson.fulfilled,(state,action) =>{
            state.loading =false;
            state.data.push(action.payload);

        });
        builder.addCase(updateLesson.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {updateLesson};
export default updateLessonSlice.reducer