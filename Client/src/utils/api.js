import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
export const host="https://eboardbackend2022.herokuapp.com";
export const host1="http://localhost:3000";
export const signup=`${host1}/user/signup`;
export const sendMessagesRoute=`${host}/chat/add`;
export const getAllMessagesRoute=`${host}/chat/all`;
export const updatePic=`${host}/user/upload/`
export const getUserConnect=`${host}/user/connect`;
export const getStudent=`${host1}/student/all`;
export const getTeacher=`${host1}/teacher/all`;


export const forgetPwd=`${host1}/user/forgetpassword`;
export const resetPwd=`${host1}/user/resetpassword`;
export const loginGmail=`${host1}/user/gmailLogin`;
export const loginFacebool=`${host1}/user/facebookLogin`;
export const login=`${host1}/user/login`;
export const activate=`${host1}/user/activate`;
export const adminforgetPwd=`${host1}/user/Adminforgetpassword`;
export const getReclamations=`${host1}/reclamation/all`;
export const addReclamation=`${host1}/reclamation/add/`;
export const deleteReclamation=`${host1}/reclamation/`;
export const getUserCredentials=`${host1}/user/getUserCredentials`;
export const getStudentBYid=`${host1}/student/getStudentById/`;
export const getStudentBYids=`${host1}/teacher/getStudentById/`;
export const getOrganizationBYid=`${host1}/organization/getStudentById/`;
export const getallOrganization=`${host1}/organization/all`;
export const deleteStudent=`${host1}/user/delete/`;
export const LinkedInApi = {
    clientId: '78k73vnm4gj65z',
    redirectUrl: host1+'/linkedin',
    oauthUrl: 'https://www.linkedin.com/oauth/v2/authorization?response_type=code',
    scope: 'r_liteprofile%20r_emailaddress',
    state: '123456'
};
export const updateUser = (User,id)=>{
    axios.put(host+'/user/update/'+id,User,{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then((message)  => {toast.success('Profile updated !!')})
    .catch((err)=> { toast.error('Error !!'+err)});
}
