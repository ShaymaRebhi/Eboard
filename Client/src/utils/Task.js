import axios from "axios";
const url = 'http://localhost:3000' ;

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
