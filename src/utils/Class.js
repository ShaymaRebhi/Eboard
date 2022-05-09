import axios from "axios";
const url = 'https://eboardbackend2022.herokuapp.com/class' ;

export const api = axios.create({
    baseURL: "https://eboardbackend2022.herokuapp.com/",
    responseType: "json",
  });
export const getClassById =  (id) =>   axios.get(url+'/'+id);

export const getclassApi = {
    async getclassByYear(iduser,status) {
        const { data } = await api.get(`class/byyear/${iduser}/${status}`);
      return data;
    },
    async CountActiveClass(id) {
      const { data } = await api.get(`class/countactive/` + id);
      return data;
    },
    async getclassById(idclass) {
      const { data } = await api.get(`class/` + idclass);
      return data;
    },
    async getUserByEmail(email) {
      const { data } = await api.get(`class/email/` + email);
      return data;
    },
    async getUserByid(id) {
      const { data } = await api.get(`class/userid/` + id);
      return data;
    },
    async getUsersAll() {
      const { data } = await api.get(`class/usersall/`);
      return data;
    },
    async getclassByLevel(iduser,status) {
      const { data } = await api.get(`class/bylevel/${iduser}/${status}`);
      return data;
    },
}
export const ClassInvitationApi = {
  async getClassInvitation(email) {
    const { data } = await api.get(`invitationclass/` + email);
    return data;
  },
  async getClassInvitationClassId(id) {
    const { data } = await api.get(`invitationclass/inviteclassid/` + id);
    return data;
  },
  async CountRequestClass(id) {
    const { data } = await api.get(`invitationclass/countrequest/` + id);
    return data;
  },
  async AddClassInvitation(add) {
    const { data } = await api.post(`invitationclass/`,add);
    return data;
  },
  async deleteClassInvitation(id) {
    const { data } = await api.delete(`invitationclass/${id}`);
    return data;
  },
};
export const updatePic=`${url}/upload/`
export const AddclassApi = {
    async addClass(cl) {
      const { data } = await api.post(`class/add`, cl);
      return data;
    },
    async updateClass(id,cl) {
      const { data } = await api.put(`class/update/${id}`, cl);
      return data;
    },
    async updateClassActive(id) {
      const { data } = await api.put(`class/update/archive/${id}`);
      return data;
    },
    async updateClassArchive(id) {
      const { data } = await api.put(`class/update/active/${id}`);
      return data;
    },
    async addUserToClass(idclass,email) {
      const { data } = await api.put(`class/addUserToClass/${idclass}/${email}`);
      return data;
    },
    async removeUserFromClass(idclass,email) {
      const { data } = await api.put(`class/removeUserFromClass/${idclass}/${email}`);
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



