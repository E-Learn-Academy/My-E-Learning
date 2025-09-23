import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const lessonUrl ='https://edu-master-psi.vercel.app/lesson';
const token =localStorage.getItem("token");



// get lessons admin-------------
const getLessonsAdmin = createAsyncThunk("lessons/getLessonsAdmin", async(_ ,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(`${lessonUrl}/?classLevel=Grade 1 Secondary`,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})



// get lessons-------------
const getLessons = createAsyncThunk("lessons/getLessons", async(_ ,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(`${lessonUrl}/?isPaid=true&sortBy=scheduledDate&sortOrder=asc&scheduledAfter=2025-07-01`,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})


// get lesson by id-------------
const getLessonById = createAsyncThunk("lessons/getLessonById", async( id ,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(`${lessonUrl}/${id}`,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})


// get Purchased Lessons-------------
const getPurchasedLessons = createAsyncThunk("lessons/getPurchasedLessons", async(_ ,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(`${lessonUrl}/my/purchased`,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})
 

// add lesson------------
const addlesson =createAsyncThunk("lessons/addlesson", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(lessonUrl,{
              title: Data.title,         //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              description: Data.description,
              video: Data.video,
              classLevel: Data.classLevel,
              scheduledDate: Data.scheduledDate,
              price: Data.price,
        },
        {
            headers:{token}
        });    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})  


// update lesson------------
const updateLesson =createAsyncThunk("lessons/updateLesson", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.put(`${lessonUrl}/${Data.id}`,{
              title: Data.title,  //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              price: Data.price,
        },
        {
            headers:{token}
        });    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})  


// pay lesson------------
const payLesson =createAsyncThunk("lessons/payLesson", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${lessonUrl}/pay/${id}`,{
            headers:{token}
        });    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
});


// delete lesson------------
const deleteLesson=createAsyncThunk("lessons/deleteLesson", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.delete(`${lessonUrl}/${id}`);
        return {
            status: res.status,
            data: res.data
        }

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }
});





export {getLessonsAdmin, getLessons, getLessonById, getPurchasedLessons , addlesson , payLesson , deleteLesson , updateLesson};