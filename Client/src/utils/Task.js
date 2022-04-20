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

export const getOneTask  = (id, callback)=>{
    axios.get(url+`/task/${id}`).then((res)=> {callback(res)})
}

export const updateTask  = (id,task, callback)=>{
    axios.post(url+`/task/update/${id}`,task).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const assignTask  = (idClass,Task, callback)=>{
    axios.post(url+`/task/assign/${idClass}`,Task).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const assignTaskAfterSave  = (idClass,Task, callback)=>{
    axios.post(url+`/task/assignTaskAfterSave/${idClass}`,Task).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const getTaskByTeacher  = (idUserr,idClasse,callback)=>{
    axios.get(url+`/task/getTaskByTeacher/${idUserr}/${idClasse}`).then( (res)=>{callback(res)})
}
