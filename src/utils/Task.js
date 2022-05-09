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

export const getTaskByStudentAssigned  = (idClasse,idUserr,callback)=>{
    axios.get(url+`/task/getTaskByStudentAssigned/${idClasse}/${idUserr}`).then( (res)=>{callback(res)})
}

export const DisplayTaskStudent  = (idUserr,idTask,callback)=>{
    axios.get(url+`/task/displayTask/${idUserr}/${idTask}`).then( (res)=>{callback(res)})
}

export const getTaskByStudentWorked  = (idClasse,idUserr,callback)=>{
    axios.get(url+`/task/getTaskByStudentWorked/${idClasse}/${idUserr}`).then( (res)=>{callback(res)})
}

export const updateTaskStudentStatus = (idEvaluation,evaluation,callback)=> {
    axios.post(url+`/task/updateEvaluationStatus/${idEvaluation}`,evaluation).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const updateTaskStudentScore = (idEvaluation,evaluation,callback)=> {
    axios.post(url+`/task/updateEvaluationScore/${idEvaluation}`,evaluation).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const DetailTask  = (id, callback)=>{
    axios.get(url+`/task/TaskEvaluation/${id}`).then((res)=> {callback(res)})
}

export const GetNumberStudentByTaskEvaluation  = (id, callback)=>{
    axios.get(url+`/task/GetNumberStudentByTaskEvaluation/${id}`).then((res)=> {callback(res)})
}

export const GetNumberStudentWorkedTask  = (id, callback)=>{
    axios.get(url+`/task/GetNumberStudentWorkedTask/${id}`).then((res)=> {callback(res)})
}

export const GetNumberStudentAssignedTask  = (id, callback)=>{
    axios.get(url+`/task/GetNumberStudentAssignedTask/${id}`).then((res)=> {callback(res)})
}

export const updateTaskStatus  = (id,Task, callback)=>{
    axios.post(url+`/task/updateStatus/${id}`,Task).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const GetAverageTaskScore = (id,callback) =>{
    axios.get(url+`/task/AverageScore/${id}`).then((res)=> {callback(res)})
}

export const getListTaskWorkedNotCorrected  = (idClasse,idTask,callback)=>{
    axios.get(url+`/task/getListTaskWorkedNotCorrected/${idClasse}/${idTask}`).then( (res)=>{callback(res)})
}

export const getListTaskWorkedCorrected  = (idClasse,idTask,callback)=>{
    axios.get(url+`/task/getListTaskWorkedCorrected/${idClasse}/${idTask}`).then( (res)=>{callback(res)})
}
export const getAverageScoreTaskByStudentAndClass  = (idUser,id,callback)=>{
    axios.get(url+`/task/getAverageScoreTaskByStudentAndClass/${idUser}/${id}`).then( (res)=>{callback(res)})
}
