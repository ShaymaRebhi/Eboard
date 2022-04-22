import axios from "axios";

export const host="https://eboardbackend2022.herokuapp.com";

export const sendMessagesRoute=`${host}/chat/add`;
export const getAllMessagesRoute=`${host}/chat/all`;
export const updatePic=`${host}/user/upload/`
export const getUserConnect=`${host}/user/connect`;

export const api = axios.create({
    baseURL: "http://localhost:3000/",
    responseType: "json",
  });
export const CommentsApi = {
    async getCommentsCourse(id) {
      
      const { data } = await api.get(`coursesComment/course/${id}`);
     
      return data;
    },
    async getCommentsTask(id) {
      const { data } = await api.get(`coursesComment/task/${id}`);
      return data;
    },
    
    async postComments(comment) {
      const { data } = await api.post(`coursesComment/add/`, comment);
      return data;
    },
    async deleteComments(id) {
      const { data } = await api.delete(`coursesComment/delete/${id}`);
      return data;
    },
    async putComments(newcomment, id) {
      const { data } = await api.put(`coursesComment/update/${id}`, newcomment);
      return data;
    }};