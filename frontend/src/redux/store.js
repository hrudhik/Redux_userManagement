import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import adminReducer from './adminSlice'
import userManagslice from './userManage'


const store= configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
        userManagement:userManagslice
    }
})

export default store