import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const adminUrl ="https://edu-master-psi.vercel.app/admin/"
const token = localStorage.getItem("token");

//create admin--------------
const createAdmin =createAsyncThunk("admin/createAdmin", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${adminUrl}create-admin`,{
              fullName: Data.fullName, //Data.(state) اسم المتسيف ال فية الداتا الهتتبعت من المستخدم
              email: Data.email,
              phoneNumber: Data.phoneNumber,
              password: Data.password,
              cpassword: Data.cpassword,
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

//get all admins--------------
const getAllAdmins =createAsyncThunk("admin/getAllAdmins", async (_,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(`${adminUrl}all-admin`,{
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

//get all user--------------
const getAllUser =createAsyncThunk("admin/getAllUser", async (_,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.get(`${adminUrl}all-user`,{
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





export {createAdmin, getAllAdmins, getAllUser}