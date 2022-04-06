import axios from "axios";
const url = 'https://eboardbackend2022.herokuapp.com/class' ;

export const getClassById =  (id) =>   axios.get(url+'/'+id);


export const getClass  = (callback)=>{
    axios.get(url+'/all/').then( (res)=>{callback(res)})
}

export const createClass = (newClass, callback)=>{
    axios.post(url+'/add',newClass).then((message)  => callback(message))
        .catch((err)=> callback(err));
}

export const deleteClass  = (id, callback)=>{
    axios.delete(url+`/${id}`).then((message)=> callback(message))
        .catch((err)=> callback(err));
}
export const getclassByYear =(iduser,status , callback) =>{
    axios.get(url+`/byyear/${iduser}/${status}`).then((res)=> {callback(res)})
  }

export const getOneQuiz  = (id, callback)=>{
    axios.get(url+`/quiz/${id}`).then((res)=> {callback(res)})
}

