import { createSlice } from "@reduxjs/toolkit";
import {getLessonsAdmin} from "./thunk/actLesson";



const initialState = {
    data: [],
    loading: false,
    error:null
}

const getLessonsAdminSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getLessonsAdmin.pending,(state)=>{
            state.loading =true;
            state.error = null;
        });
        builder.addCase(getLessonsAdmin.fulfilled,(state,action)=>{
            state.loading =false;
            state.data = action.payload;
        });
        builder.addCase(getLessonsAdmin.rejected,(state,action) => {
            state.loading =false;
            state.error = action.payload;
        })
    }
})

export {getLessonsAdmin};
export default getLessonsAdminSlice.reducer;