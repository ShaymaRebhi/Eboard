import axios from "axios";
    const url = 'http://localhost:3000' ;

export const getAllQuizs  = (callback)=>{
    axios.get(url+'/quiz/').then( (res)=>{callback(res)})
}

export const addQuiz = (quiz, callback)=>{
    axios.post(url+'/quiz/add',quiz).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const deleteQuiz  = (id, callback)=>{
    axios.delete(url+`/quiz/${id}`).then((message)=> callback(message))
        .catch((err)=> callback(err));
}

export const getOneQuiz  = (id, callback)=>{
    axios.get(url+`/quiz/${id}`).then((res)=> {callback(res)})
}

export const updateQuiz  = (id,quiz, callback)=>{
    axios.post(url+`/quiz/update/${id}`,quiz).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const assignQuiz  = (idClass,quiz, callback)=>{
    axios.post(url+`/quiz/assign/${idClass}`,quiz).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const assignQuizAfterSave  = (quiz, callback)=>{
    axios.post(url+'/quiz/assignQuizAfterSave',quiz).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const getQuizByTeacher  = (idUserr,idClasse,callback)=>{
    axios.get(url+`/quiz/getQuizByTeacher/${idUserr}/${idClasse}`).then( (res)=>{callback(res)})
}
