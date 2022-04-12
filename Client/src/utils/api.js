import axios from "axios";

export const host="https://eboardbackend2022.herokuapp.com";

export const sendMessagesRoute=`${host}/chat/add`;
export const getAllMessagesRoute=`${host}/chat/all`;
export const updatePic=`${host}/user/upload/`
export const getUserConnect=`${host}/user/connect`;

export const updateUser = (User,id, callback)=>{
    axios.put(host+'/user/update/'+id,User,{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then((message)  => callback(message))
    .catch((err)=> callback(err));
}
