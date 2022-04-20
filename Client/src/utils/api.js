import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export const host="https://eboardbackend2022.herokuapp.com";
export const host1="http://localhost:3000";
export const signup=`${host1}/user/signup`;
export const sendMessagesRoute=`${host}/chat/add`;
export const getAllMessagesRoute=`${host}/chat/all`;
export const updatePic=`${host}/user/upload/`
export const getUserConnect=`${host}/user/connect`;
export const getStudent=`${host1}/student/all`
export const deleteStudent=`${host1}/user/delete/`
export const forgetPwd=`${host1}/user/forgetpassword`;
export const resetPwd=`${host1}/user/resetpassword`;
export const loginGmail=`${host1}/user/gmailLogin`;
export const loginFacebool=`${host1}/user/facebookLogin`;
export const login=`${host1}/user/login`;
export const activate=`${host1}/user/activate`;
export const adminforgetPwd=`${host1}/user/Adminforgetpassword`;
export const updateUser = (User,id, callback)=>{
    axios.put(host+'/user/update/'+id,User,{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then((message)  => {toast.success('Profile updated !!')})
    .catch((err)=> { toast.error('Error !!'+err)});
}
