import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const questionUrl ="https://edu-master-psi.vercel.app/question"
const token = localStorage.getItem("token");

//add question-----------
const addQuestion =createAsyncThunk("questions/addQuestion", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(questionUrl,{
              text: Data.text, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              type: Data.type,
              options: Data.options,
              correctAnswer: Data.correctAnswer,
              exam: Data.exam,
              points: Data.points,
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

//add question T / F-----------
const addQuestionT_F =createAsyncThunk("questions/addQuestionT_F", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(questionUrl,{
              text: Data.text, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              type: Data.type,
              options: Data.options,
              correctAnswer: Data.correctAnswer,
              exam: Data.exam,
              points: Data.points,
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

//add question short ans-----------
const addQuestionShortAns =createAsyncThunk("questions/addQuestionShortAns", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(questionUrl,{
              text: Data.text, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              type: Data.type,
              options: Data.options,
              correctAnswer: Data.correctAnswer,
              exam: Data.exam,
              points: Data.points,
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

//update question-----------
const updateQuestion =createAsyncThunk("questions/updateQuestion", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.put(`${questionUrl}/${Data.id}`,{
              text: Data.text, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              type: Data.type,
              options: Data.options,
              correctAnswer: Data.correctAnswer,
              exam: Data.exam,
              points: Data.points,
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

// get all questions-------------
const getAllQuestion = createAsyncThunk("questions/getAllQuestion", async(_ ,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(questionUrl,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})

// get specific question-------------
const getSpecificQuestion = createAsyncThunk("questions/getSpecificQuestion", async(id,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.get(`${questionUrl}/get/${id}`,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})

// delete question-------------
const deleteQuestion = createAsyncThunk("questions/deleteQuestion", async(id,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await axios.delete(`${questionUrl}/${id}`,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})




export {addQuestion, addQuestionT_F, addQuestionShortAns, updateQuestion, getAllQuestion, getSpecificQuestion, deleteQuestion };