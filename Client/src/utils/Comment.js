import axios from "axios";
const url = 'http://localhost:3000/comment' ;
export const createComment =  (newComment) =>   axios.post(url+'/new' , newComment);
export const getCommentById =  (id) =>   axios.get(url+'/forum/'+id);
export const getComments =  () =>   axios.get(url+'/all');
export const updateComment =  (comment) =>   axios.put(url+'/update',comment);
export const deleteComment =  (id) =>   axios.delete(url+'/delete/'+id);
