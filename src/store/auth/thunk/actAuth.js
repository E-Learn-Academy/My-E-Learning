import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authUrl ="https://edu-master-psi.vercel.app/auth/"

//sign up--------------
const signUp =createAsyncThunk("auth/signUp", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${authUrl}signup`,{
              fullName: Data.fullName, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              email: Data.email,
              password: Data.password,
              cpassword: Data.cpassword,
              phoneNumber: Data.phoneNumber,
              classLevel: Data.classLevel,
        },);    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})
//log in--------------
const logIn =createAsyncThunk("auth/logIn", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${authUrl}login`,{
              email: Data.email,//Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              password: Data.password,
        },);    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})

export {signUp, logIn}