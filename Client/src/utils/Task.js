import axios from "axios";
const url = 'https://eboardbackend2022.herokuapp.com' ;

export const getAllTasks  = (callback)=>{
    axios.get(url+'/task/').then( (res)=>{callback(res)})
}

export const addTask  = (task, callback)=>{
    axios.post(url+'/task/add',task).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const deleteTask  = (id, callback)=>{
    axios.delete(url+`/task/${id}`).then((message)=> callback(message))
        .catch((err)=> callback(err));
}

export const getOneTask  = (id, callback)=>{
    axios.get(url+`/task/${id}`).then((res)=> {callback(res)})
}

export const updateTask  = (id,task, callback)=>{
    axios.post(url+`/task/update/${id}`,task).then((message)  => callback(message))
        .catch((err)=> callback(err));
}
