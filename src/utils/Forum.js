import axios from "axios";
const url = 'https://eboardbackend2022.herokuapp.com/forum' ;
export const createForum =  (newForum) =>   axios.post(url+'/new' , newForum);
export const getForumById =  (id) =>   axios.get(url+'/get/'+id);
export const getForums =  () =>   axios.get(url+'/all');
export const searchForum =  (search) =>   axios.post(url+'/search' , search);
export const updateForum =  (forum) =>   axios.put(url+'/update',forum);
export const deleteForum =  (id) =>   axios.delete(url+'/delete/'+id);

