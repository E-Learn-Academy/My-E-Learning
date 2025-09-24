import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const examUrl ="https://edu-master-psi.vercel.app/exam";
const token = localStorage.getItem("token");

//add exam--------------
const addExam =createAsyncThunk("exam/addExam", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(examUrl,{
              title: Data.title, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              description: Data.description,
              duration: Data.duration,
              classLevel: Data.classLevel,
              startDate: Data.startDate,
              endDate: Data.endDate,
              isPublished: Data.isPublished,
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

//update exam--------------
const updateExam =createAsyncThunk("exam/updateExam", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.put(`${examUrl}/${Data.id}`,{
              title: Data.title, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              description: Data.description,
              duration: Data.duration,
              classLevel: Data.classLevel,
              isPublished: Data.isPublished,
              startDate: Data.startDate,
              endDate: Data.endDate,
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

//get all exam--------------
const getAllExam =createAsyncThunk("exam/getAllExam", async (_,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(examUrl,
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

//get specific exam--------------
const getSpecificExam =createAsyncThunk("exam/getSpecificExam", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(`${examUrl}/get/${id}`,
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

//delete exam--------------
const deleteExam =createAsyncThunk("exam/deleteExam", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.delete(`${examUrl}/${id}`,
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



export {addExam, updateExam, getAllExam, getSpecificExam, deleteExam}