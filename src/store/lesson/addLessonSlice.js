import { createSlice } from "@reduxjs/toolkit";
import {addlesson} from "./thunk/actLesson";



const initialState ={
    data:[],
    loading:false,
    error:null
}

const addlessonSlice = createSlice({
    name:'lessons',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(addlesson.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addlesson.fulfilled,(state,action) =>{
            state.loading =false;
            state.data.push(action.payload);

        });
        builder.addCase(addlesson.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {addlesson};
export default addlessonSlice.reducer