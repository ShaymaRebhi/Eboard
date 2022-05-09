import axios from "axios";
    const url = 'https://eboardbackend2022.herokuapp.com' ;

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

export const assignQuizAfterSave  = (idClass,quiz, callback)=>{
    axios.post(url+`/quiz/assignQuizAfterSave/${idClass}`,quiz).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const getQuizByTeacher  = (idUserr,idClasse,callback)=>{
    axios.get(url+`/quiz/getQuizByTeacher/${idUserr}/${idClasse}`).then( (res)=>{callback(res)})
}

export const getQuizByStudentAssigned  = (idClasse,idUserr,callback)=>{
    axios.get(url+`/quiz/getQuizByStudentAssigned/${idClasse}/${idUserr}`).then( (res)=>{callback(res)})
}

export const DisplayQuizStudent  = (idUserr,idQuiz,callback)=>{
    axios.get(url+`/quiz/displayQuiz/${idUserr}/${idQuiz}`).then( (res)=>{callback(res)})
}

export const getQuizByStudentWorked  = (idClasse,idUserr,callback)=>{
    axios.get(url+`/quiz/getQuizByStudentWorked/${idClasse}/${idUserr}`).then( (res)=>{callback(res)})
}

export const updateStudentScore = (idEvaluation,evaluation,callback)=> {
    axios.post(url+`/quiz/updateEvaluation/${idEvaluation}`,evaluation).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const DetailQuiz  = (id, callback)=>{
    axios.get(url+`/quiz/quizEvaluation/${id}`).then((res)=> {callback(res)})
}

export const GetNumberStudentByQuizEvaluation  = (id, callback)=>{
    axios.get(url+`/quiz/GetNumberStudentByQuizEvaluation/${id}`).then((res)=> {callback(res)})
}

export const GetNumberStudentWorkedQuiz  = (id, callback)=>{
    axios.get(url+`/quiz/GetNumberStudentWorkedQuiz/${id}`).then((res)=> {callback(res)})
}

export const GetNumberStudentAssignedQuiz  = (id, callback)=>{
    axios.get(url+`/quiz/GetNumberStudentAssignedQuiz/${id}`).then((res)=> {callback(res)})
}

export const updateQuizStatus  = (id,quiz, callback)=>{
    axios.post(url+`/quiz/updateStatus/${id}`,quiz).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const GetAverageScore = (id,callback) =>{
    axios.get(url+`/quiz/AverageScore/${id}`).then((res)=> {callback(res)})
}

export const getStudentListByQuizWorked  = (idClasse,idQuiz,callback)=>{
    axios.get(url+`/quiz/getStudentListByQuizWorked/${idClasse}/${idQuiz}`).then( (res)=>{callback(res)})
}

export const getAverageScoreQuizByStudentAndClass  = (idUser,id,callback)=>{
    axios.get(url+`/quiz/getAverageScoreQuizByStudentAndClass/${idUser}/${id}`).then( (res)=>{callback(res)})
}

export const getAverageScoreQuizAndTaskByStudentAndClass  = (idUser,id,callback)=>{
    axios.get(url+`/quiz/getAverageScoreQuizAndTaskByStudentAndClass/${idUser}/${id}`).then( (res)=>{callback(res)})
}

export const getAverageScoreStudent  = (idUser,callback)=>{
    axios.get(url+`/quiz/getAverageScoreStudent/${idUser}`).then( (res)=>{callback(res)})
}

export const getNumberEvaluationWorked  = (idUser,callback)=>{
    axios.get(url+`/quiz/getNumberEvaluationWorked/${idUser}`).then( (res)=>{callback(res)})
}

export const getNumberEvaluationAssigned  = (idUser,callback)=>{
    axios.get(url+`/quiz/getNumberEvaluationAssigned/${idUser}`).then( (res)=>{callback(res)})
}




