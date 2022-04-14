import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import  {ClassInvitationApi, createClass , getclassApi , getclassByYear} from  "../../utils/Class";


export const addClass = createAsyncThunk (
  "Class" , 
  async (Class ) => {
    const response = await createClass(Class);
    return response.data;
  }
)




let initialState = {
  class: [],
  active: [],
  archived: [],
  request: [],
  invitationclass: [],
  members: [],
  users: [],
  selectedclass: {},
  errors: "",
};

const classlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    selectClass: (state, action) => {
      state.selectedclass = action.payload;
    },
    getClasss: (state, action) => {
      state.class = action.payload;
    },
    getClassArchived: (state, action) => {
      state.archived = action.payload;
    },
    getActive: (state, action) => {
      state.active = action.payload;
    },
    geRequest: (state, action) => {
      state.request = action.payload;
    },
    getInvitationClass: (state, action) => {
      state.invitationclass = action.payload;
    },
    getMembers: (state, action) => {
      state.members = action.payload;
    },
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    addClasss: (state, action) => {
      const payload = action.payload;
      state.class.push(payload);
    },
    addInvitationClass: (state, action) => {
      const payload = action.payload;
      state.invitationclass.push(payload);
    },
    updateClasss: (state, action) => { 
      const payload = action.payload;
      const index = state.class.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.class[index] = payload;
      }
    },
  },
});


//thunk
export const fetchclass = ( iduser,status) => async (dispatch) => {
  
    const resp = getclassApi.getclassByYear(iduser,status);
    resp.then((data) => {
      dispatch(getClasss(data));
    });

};
export const fetchSingleClass = (data) => async (dispatch) => { 

  dispatch(selectClass(data));
};
export const fetchclassArchived = (iduser,status) => async (dispatch) => {

    const res = getclassApi.getclassByYear(iduser,status);
    res.then((data) => {
      dispatch(getClassArchived(data));
  
  
    });
};
export const fetchActiveClass = (d) => async (dispatch) => { 
  const res = getclassApi.CountActiveClass(d);
  res.then((data) => {
    dispatch(getActive(data));
    
  });
};
export const fetchInvitationclass = (email) => async (dispatch) => {
  const res = ClassInvitationApi.getClassInvitation(email);
  res.then((data) => {
    dispatch(getInvitationClass(data));
   
  });
};
export const fetchInvitationclassId = (id) => async (dispatch) => {
  const res = ClassInvitationApi.getClassInvitationClassId(id);
  res.then((data) => {
    dispatch(getMembers(data));
  });
};
export const fetchUsers = () => async (dispatch) => {
  const res = getclassApi.getUsersAll();
  res.then((data) => {
    dispatch(getUsers(data));
  });
};
export const fetchRequestClass = (d) => async (dispatch) => { 
  const res = ClassInvitationApi.CountRequestClass(d);
  res.then((data) => {
    dispatch(geRequest(data));
  });
};
export const selectclass = (state) => {
  return [state.classs.class, state.classs.errors];
};
export const selectclassarchived = (state) => {
  return [state.classs.archived, state.classs.errors];
};
export const selectactiveclass = (state) => {
  return [state.classs.active, state.classs.errors];
};
export const selectedClasses = (state) => {
  return [state.classs.selectedclass, state.classs.errors];
};
export const selectinvitationclass = (state) => {
  return [state.classs.invitationclass, state.classs.errors];
};
export const selectrequestclass = (state) => {
  return [state.classs.request, state.classs.errors];
};
export const selectmembers = (state) => {
  return [state.classs.members, state.classs.errors];
};
export const selectusers = (state) => {
  return [state.classs.users, state.classs.errors];
};

export const {
  getClasss,
  getInvitationClass,
  getMembers,
  setErrors,
  addClasss,
  getUsers,
  geRequest,
  addInvitationClass,
  getClassArchived,
  getActive,
  selectClass,
  updateClasss,
} = classlice.actions;
export default classlice.reducer;





