import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const studentUrl ="https://edu-master-psi.vercel.app/studentExam/"
const token = localStorage.getItem("token");

//start exam--------------
const startExam =createAsyncThunk("student/startExam", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${studentUrl}start/${id}`,{
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




//submit Exam--------------
const submitExam =createAsyncThunk("student/submitExam", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${studentUrl}submit/${Data.id}`,{
              questionId: Data.questionId, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              selectedAnswer: Data.selectedAnswer,
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

//remaining time--------------
const remainingTime =createAsyncThunk("student/remainingTime", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(`${studentUrl}exams/remaining-time/${id}`,
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

//get Exam Score--------------
const getExamScore =createAsyncThunk("student/getExamScore", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(`${studentUrl}exams/${id}`,
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

//get Score Student--------------
const getScoreStudent =createAsyncThunk("student/getScoreStudent", async (id,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(`${studentUrl}exams/score/${id}`,
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


export {startExam, submitExam, remainingTime, getExamScore, getScoreStudent}