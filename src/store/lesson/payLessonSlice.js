import { createSlice } from "@reduxjs/toolkit";
import {payLesson} from "./thunk/actLesson";



const initialState ={
    data:[],
    loading:false,
    error:null
}

const payLessonSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(payLesson.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(payLesson.fulfilled,(state,action) =>{
            state.loading =false;
            state.data.push(action.payload);

        });
        builder.addCase(payLesson.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {payLesson};
export default payLessonSlice.reducer