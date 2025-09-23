import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userUrl = "https://edu-master-psi.vercel.app/user/";
const token = localStorage.getItem("token");
const userId = JSON.parse(localStorage.getItem("user"))?.id;


//get user profile----------
const getProfile = createAsyncThunk("profile/getProfile", async(_ ,thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
        const res = await axios.get(userUrl,{
            headers:{token}
        });
        const data = res.data.data;
        return data;
    }catch(error){
            return rejectWithValue(error.res?.data?.message || error.message)
    }
})



//update user profile----------
const updateProfile=createAsyncThunk("Update/updateProfile", async (DataProfile,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.put(`${userUrl}${userId}`,{
          fullName: DataProfile.fullName,
          email: DataProfile.email,
          phoneNumber: DataProfile.phoneNumber,
          classLevel: DataProfile.classLevel
        },
        {
            headers: {token},
        });
        
        return {
            status: res.status,
            data: res.data
        }

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }
});


//update password--------
const updatePassword=createAsyncThunk("update/updatePassword", async (DataPass,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.patch(`${userUrl}update-password`,{
          oldPassword: DataPass.oldPass,    
          newPassword: DataPass.newPass,
          cpassword: DataPass.cPass,
        },  
        {
            headers: {token},
        });    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})    


// Forgot password------------
const forgotPassword=createAsyncThunk("forgot/forgotPassword", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${userUrl}forgot-password`,{
              email: Data.email //Data.(state)اسم المتسيف ال فية الداتا الهتتبعت 
        });    
        
        return {

            
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})    


// reset password------------
const resetPassword=createAsyncThunk("reset/resetPassword", async (Data,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.post(`${userUrl}reset-password`,{
              email: Data.email, //Data.(state)اسم المتسيف ال فية الداتا الهتتبعت 
              otp: Data.otp,
              newPassword: Data.newPassword,
              cpassword: Data.cpassword,
        });    
        
        return {
            status: res.status,
            data: res.data
        }    

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }     
})    


// delete user------------
const deleteUser=createAsyncThunk("Delete/deleteUser", async (_,thunkAPI) =>{
    const {rejectWithValue} = thunkAPI;
    try {
          const res = await axios.delete(userUrl,{
            headers: {token},
        });
        
        return {
            status: res.status,
            data: res.data
        }

    } catch (error) {
         return rejectWithValue(error.response?.data?.message)

    }
});


export  {getProfile, updatePassword ,updateProfile , deleteUser , forgotPassword , resetPassword};