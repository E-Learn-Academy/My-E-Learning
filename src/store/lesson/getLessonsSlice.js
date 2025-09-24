import { createSlice } from "@reduxjs/toolkit";
import {getLessons} from "./thunk/actLesson";



const initialState = {
    data: [],
    loading: false,
    error:null
}

const getLessonsSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getLessons.pending,(state)=>{
            state.loading =true;
            state.error = null;
        });
        builder.addCase(getLessons.fulfilled,(state,action)=>{
            state.loading =false;
            state.data = action.payload;
        });
        builder.addCase(getLessons.rejected,(state,action) => {
            state.loading =false;
            state.error = action.payload;
        })
    }
})

export {getLessons};
export default getLessonsSlice.reducer;