import { createSlice } from "@reduxjs/toolkit";
import {getPurchasedLessons} from "./thunk/actLesson";



const initialState = {
    data: [],
    loading: false,
    error:null
}

const getPurchasedLessonsSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getPurchasedLessons.pending,(state)=>{
            state.loading =true;
            state.error = null;
        });
        builder.addCase(getPurchasedLessons.fulfilled,(state,action)=>{
            state.loading =false;
            state.data = action.payload;
        });
        builder.addCase(getPurchasedLessons.rejected,(state,action) => {
            state.loading =false;
            state.error = action.payload;
        })
    }
})

export {getPurchasedLessons};
export default getPurchasedLessonsSlice.reducer;