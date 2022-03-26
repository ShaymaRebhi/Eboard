import axios from "axios";
const url = 'http://localhost:3000/forum' ;
export const createForum =  (newForum) =>   axios.post(url+'/new' , newForum);
export const getForumById =  (id) =>   axios.get(url+'/'+id);
export const getForums =  () =>   axios.get(url+'/all');
export const deleteForum =  (id) =>   axios.delete(url+'/delete/'+id);

