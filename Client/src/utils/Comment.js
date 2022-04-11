import axios from "axios";
const url = 'https://eboardbackend2022.herokuapp.com/comment' ;
export const createComment =  (newComment) =>   axios.post(url+'/new' , newComment);
export const getCommentById =  (id) =>   axios.get(url+'/forum/'+id);
export const getComments =  () =>   axios.get(url+'/all');
export const updateComment =  (comment) =>   axios.put(url+'/update',comment);
export const deleteComment =  (id) =>   axios.delete(url+'/delete/'+id);
export const likeComment =  (like) =>   axios.post(url+'/like' , like);
