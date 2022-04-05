import axios from "axios";
const url = 'http://localhost:3000/forum' ;
export const createForum =  (newForum) =>   axios.post(url+'/new' , newForum);
export const getForumById =  (id) =>   axios.get(url+'/get/'+id);
export const getForums =  () =>   axios.get(url+'/all');
export const searchForum =  (search) =>   axios.post(url+'/search' , search);
export const updateForum =  (forum) =>   axios.put(url+'/update',forum);
export const deleteForum =  (id) =>   axios.delete(url+'/delete/'+id);

