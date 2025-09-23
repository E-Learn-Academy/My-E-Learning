import { configureStore } from "@reduxjs/toolkit";
import logIn from "./auth/logInSlice"
import signUp from"./auth/signUpSlice"
import profile from "./user/getProfileSlice";
import updatePassword from "./user/updatePasswordSlice";
import updateProfile from "./user/updateProfileSlice";
import deleteUser from "./user/deleteUserSlice";
import resetPassword from "./user/resetPasswordSlice";
import forgotPassword from "./user/ForgotPasswordSlice";
import getLessonsAdmin from './lesson/getLessonsAdminSlice';
import getLessonById from './lesson/getLessonByIdSlice';
import getLessons from './lesson/getLessonsSlice'
import getPurchasedLessons from './lesson/getPurchasedLessonsSlice'
import updateLesson from './lesson/updateLessonSlice'
import addlesson from './lesson/addLessonSlice'
import payLesson from './lesson/payLessonSlice'
import deleteLesson from './lesson/deleteLessonSlice'
import addQuestionShortAns from './question/addQuestionShortAnsSlice'
import addQuestion from "./question/addQuestionSlice"
import addQuestionT_F from "./question/addQuestionT&FSlice"
import deleteQuestion from "./question/deleteQuestionSlice"
import updateQuestion from "./question/updateQuestionSlice"
import getAllQuestion from "./question/getAllQuestionSlice"
import getSpecificQuestion from "./question/getSpecificQuestionSlice"
import addExam from "./exam/addExameSlice"
import deleteExam from "./exam/deleteExamSlice"
import getAllExam from "./exam/getAllExam"
import getSpecificExam from "./exam/getSpecificExam"
import updateExam from "./exam/updateExamSlice"
import getExamScore from "./studentExam/getExamScoreSlice"
import getScoreStudent from "./studentExam/getScoreStudentSlice"
import remainingTime from "./studentExam/remainingTimeSlice"
import startExam from "./studentExam/startExamSlice"
import submitExam from "./studentExam/submitExamSlice"
import createAdmin from "./admin/createAdminSlice"
import getAllAdmins from "./admin/getAllAdminsSlice"
import getAllUser from "./admin/getAllUserSlice"






export const store = configureStore({
  reducer: {
    //auth
    logIn,
    signUp,

    //user----------
    profile,
    updatePassword,
    updateProfile,
    deleteUser,
    forgotPassword,
    resetPassword,

    //Lesson--------
    getLessonsAdmin,
    getLessonById,
    getLessons,
    getPurchasedLessons,
    updateLesson,
    addlesson,
    payLesson,
    deleteLesson,

    //question------
    addQuestionShortAns,
    addQuestion,
    addQuestionT_F,
    deleteQuestion,
    updateQuestion,
    getAllQuestion,
    getSpecificQuestion,

    //exam----------------
    addExam,
    deleteExam,
    getAllExam,
    getSpecificExam,
    updateExam,

    //Student exam-------
    getExamScore,
    getScoreStudent,
    remainingTime,
    startExam,
    submitExam,

    //admin---------
    createAdmin,
    getAllAdmins,
    getAllUser,

  },
  devTools:process.env.NODE_ENV !=="production",
});
