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
