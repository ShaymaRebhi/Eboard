import axios from "axios";
const url = 'http://localhost:3000/class' ;

export const api = axios.create({
    baseURL: "http://localhost:3000/class",
    responseType: "json",
  });
export const getClassById =  (id) =>   axios.get(url+'/'+id);

export const getclassApi = {
    async getclassByYear(iduser,status) {
        const { data } = await api.get(`/byyear/${iduser}/${status}`);
      return data;
    }
}
export const AddclassApi = {
    async addClass(cl) {
      const { data } = await api.post(`/add`, cl);
      return data;
    },
}

export const getClass  = (callback)=>{
    axios.get(url+'/all/').then( (res)=>{callback(res)})
}

export const createClass = (newClass)=>{
    axios.post(url+'/add',newClass)
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

