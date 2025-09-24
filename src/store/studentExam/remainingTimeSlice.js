import { createSlice } from "@reduxjs/toolkit";
import { remainingTime } from "./thunk/actStudentExam";

const initialState ={
    Data:[],
    loading:false,
    error:null
}

const remainingTimeSlice = createSlice({
    name:'student',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(remainingTime.pending,(state) =>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(remainingTime.fulfilled,(state,action) =>{
            state.loading =false;
            state.Data = action.payload

        });
        builder.addCase(remainingTime.rejected,(state,action) =>{
            state.loading =false;
            state.error = action.payload;
        })
    }
})
export {remainingTime};
export default remainingTimeSlice.reducer