import * as React from 'react';
import * as FaICons from "react-icons/fa";
import * as MDICons from "react-icons/md"
import { DataGrid } from '@mui/x-data-grid';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import {IconContext} from 'react-icons';
import { Link } from 'react-router-dom';
import * as IOIcons from "react-icons/io";
import Admin  from '../../../Assets/Images/admin.jpg'
import Student from '../../../Assets/Images/student.jpg'
import axios from 'axios';
import { getReclamations, getStudent, signup } from '../../../utils/api';
import { Button, Modal } from "semantic-ui-react";
import Inputs from '../../Inputs'
import { toast, ToastContainer } from 'react-toastify';
import Select from 'react-select';
import Filter from 'bad-words';
import parse from 'date-fns/parse';
import StarRatingComponent from 'react-star-rating-component';
import { ConnectedOverlayScrollHandler } from 'primereact/utils';

function Reclamations() {
  
  const [reclamation,setReclamtion]=React.useState([]);

  const [modalOpen, SetModalOpen] = React.useState(false);
  const [modalOpen2, SetModalOpen2] = React.useState(false);
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  const handleOpen2 = (e) => SetModalOpen2(true);
  const handleClose2 = (e) => SetModalOpen2(false);
  
  const dataset=()=>{
    axios.get(getReclamations,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
    }).then(res=>{
      setReclamtion(res.data);
    }).catch(err=>{
    console.log(err);
    })
  }
  function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);
  
    React.useEffect(() => {
      var filter2 = new Filter({ list: ['some', 'bad', 'word'] }); 
      console.log(filter2.clean("some bad word!"))
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        cb();
      }
    }, [cb, condition]);
  }
  useOnceCall(()=>{
    dataset();
    getAllReclamations();
  })

  const getAllReclamations=()=>{
    axios.get(getReclamations,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
  }).then(res=>{
    setReclamtion(res.data);
  }).catch(err=>{
    console.log(err);
  })
  }
 
  const columns = [

    { field: 'ide', headerName: 'ID', width: 150 },
    
    { field: 'Type', headerName: 'Type', width: 120 },
    { field: 'Subject', headerName: 'Subject', width: 120 },
    { field: 'Message', headerName: 'Message', width: 320 },
    { field: 'User', headerName: 'User', width: 200 },
    { field: 'Ratings', headerName: 'Ratings', width: 75 ,renderCell: (params)=>{
      console.log(params)
      return (
        
          <div>
           
              <IconContext.Provider value={{color:'#FFF',size: '18px'}}>
              <StarRatingComponent 
                name="rate2" 
                editing={false}
                starCount={5}
                value={params.formattedValue}
              />
                 
              </IconContext.Provider>
          </div>
      )} },

    { field: 'Action', headerName: '#', width: 30,renderCell: (params)=>{
        return (
            <div>
                <IconContext.Provider value={{color:'#FFF',size: '18px'}}>
                    
                    <Link to={`/Eboard/Reclamations/delete/${params.id!==null?params.id:null}`}><MDICons.MdDeleteForever></MDICons.MdDeleteForever></Link>
                </IconContext.Provider>
            </div>
        )} },
   
  ];
 
  if(reclamation){
    var filter = new Filter({ list: ["7ram","hram","kalb","sa9et","saket","bhim","bhima"] });
    var array=reclamation.map((rec,key)=>{
      const element = <h1>Bonjour, monde</h1>;
      
      return(
        
          rec ? {id:rec._id, Type: rec.type, Subject: rec.subject!==null ? filter.clean(rec.subject) :"",Message:rec.message!==null ?filter.clean(rec.message) :"" ,User:rec.User.email!==null ?rec.User.email :"",ide:key!==null ?key+1:0,Ratings:rec.rating} :{id: 0}
        
        )
    })
  }
  const options = [
    { value: 'HOMME', label: 'MEN' },
    { value: 'FEMME', label: 'WOMAN' },
  ]
  const [selectedValue, setSelectedValue] = React.useState(3);
  const [values,setValues]=React.useState({
    email:"",
    password:"",
    cpassword:"",
    Adresse:"",
    Cin:"",
    role:"",
    Name:"",
    FirstName:"",
    LastName:"",
    Sexe:"",
    BirthDate:""
  })
 

const input1=[
  {
    id:1,
    name:"email",
    type:"email",
    className:"form-control ",
    placeholder:"Email ID",
    errorMessage:"It should be a valid email adress!",
    required:true
  
  }
]

const password1=[
  {
    id:2,
    name:"password",
    type:"password",
    className:"form-control",
    placeholder:"Password",
    errorMessage:"Wrong password ",
    pattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
    required:true

  },
  {
    id:3,
    name:"cpassword",
    type:"password",
    className:"form-control",
    placeholder:"Confirme password",
    errorMessage:"Wrong password match ",
    pattern: values.password,
    required:true
  }
  
]


  const handleSubmit =(e)=>{
    e.preventDefault();
    
    const Data= new FormData(e.target)
  
    console.log(Object.fromEntries(Data.entries()).role)

    
    axios.post(signup,{
      "email":values.email,
      "Password":values.password,
      "role":"STUDENT",
      "Adresse":values.Adresse,
      "Cin":Number(values.Cin),
      "Name":values.Name,
      "FirstName":values.FirstName,
      "LastName":values.LastName,
      "Sexe":selectedValue,
      "BirthDate":values.BirthDate
   
      
    }).then(Response=>{
      toast.success('student added successfully !! ');
      SetModalOpen2(false);
      dataset();
      getAllReclamations();
    }).catch(err => {
          
          toast.error('Account already exist ');
       
        //addToast("test error", { appearance: 'error' });
    }).finally(res=>{
      dataset();
      getAllReclamations();
    })
  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
    console.log(values)
    console.log(selectedValue)
    
  }
  const handleChange = e => {
    setSelectedValue(e.value);
  }
  return (
    <STUDENT>
     
    <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
       />
   <Table>
      
             <div className='h1' img={Student}> <h1>Reclamations</h1></div>
              
                <Box
                      sx={{
                          height: 375,
                           backgroundColor:'#8cb1cc',
                          color: 'text.white'
                      }}
                      className='text-white'
            >
                   {array &&<DataGrid
                    disableSelectionOnClick={true}
                    rows={array}
                    columns={columns}
                    className='text-white'
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    VerticalContentAlignment="Center"
                   HorizontalContentAlignment="Center" 
                  />}
                  </Box>

    </Table>
    <Modal className="add"
       open={modalOpen}
       onClose={handleClose}
       dimmer="inverted"
       size="tiny"
     >
       <Modal.Header>
         <h1>Update student</h1>
       </Modal.Header>
       <Modal.Content>
         <form>
           <div className='row'>
             <div className='col-sm-6 pb-4'>
               <div className='form-group'>
                 <Inputs type="text" className="form-control" placeholder="FirstName" name="FirstName" required/>
               </div>
             </div>
             <div className='col-sm-6 pb-4'>
             <div className='form-group'>
                 <Inputs type="text" className="form-control" placeholder="LastName" name="FirstName" required/>
             </div>
             </div>
             <div className='col-sm-12 pb-4'>
               <div className='form-group'>
                   <Inputs type="email" className="form-control" placeholder="Email ID" name="email" required/>
               </div>
             </div>
             <div className='col-sm-6 pb-4'>
               <div className='form-group'>
                   <Inputs type="number" className="form-control" placeholder="CIN" name="Cin" required/>
               </div>
             </div>
             <div className='col-sm-6 pb-4'>
               <div className='form-group'>
                   <Inputs type="text" className="form-control" placeholder="GENRE" name="Sexe" required/>
               </div>
             </div>
           </div>
           
         </form>
       </Modal.Content>
       <Modal.Actions>
           <Button onClick={handleClose} color="black">
             Update
           </Button>
           <Button onClick={handleClose} color="black">
             CLose
           </Button>
       </Modal.Actions>
     </Modal>

     <Modal className="modal add pt-5"
       open={modalOpen2}
       onClose={handleClose}
       dimmer="inverted"
       size="tiny"
       style={{overlay: {zIndex: 1}}}
     >
       <Modal.Header className='contentModel'>
         <h1>Add student</h1>
       </Modal.Header>
       <Modal.Content className='contentModel'>
       <form method="post" onSubmit={handleSubmit}> 
              <div className="mb-3 ">
                <div className='row'>
                  <div className='col-sm-6'>
                     <Inputs name="FirstName" type="text" className="form-control" placeholder="FirstName" errorMessage="FirstName required " disabled={values.role==="ORGANIZATION"} onChange={onChange} hide={values.role==="ORGANIZATION"} required></Inputs>
                    
                  </div>
                  <div className='col-sm-6'>
                   <Inputs name="LastName" type="text" className="form-control" placeholder="LastName" errorMessage="LastName required " disabled={values.role==="ORGANIZATION"} onChange={onChange} hide={values.role==="ORGANIZATION"} required></Inputs>
  
                  </div>
                  <div className='col-sm-12 mt-3 mb-2'>
                   <Inputs name="BirthDate" type="date" className="form-control"  errorMessage="Birth Date required " disabled={values.role==="ORGANIZATION"} onChange={onChange} hide={values.role==="ORGANIZATION"} required></Inputs>

                  </div>
                </div>
                <div className="col">
                  
                   <div className=" col-sm-12 mb-2 mt-2" >
                      
                   <Inputs name="Name" type="text" className="form-control" placeholder="Name" errorMessage="Name required " disabled={values.role!=="ORGANIZATION"} onChange={onChange} hide={values.role!=="ORGANIZATION"} required></Inputs>
                    <div className='row'>
                      <div className='col-sm-6'>
                        <Inputs name="Cin" type="text" className="form-control" placeholder="Cin" maxLength={8} minLength={8} errorMessage="Cin required " onChange={onChange} disabled={values.role==="ORGANIZATION"} hide={values.role==="ORGANIZATION"} required></Inputs>

                      </div>
                      <div className='col-sm-6'>
                        {values.role!=="ORGANIZATION" && <Select options={options} name="Sexe" onChange={handleChange} value={options.find(obj => obj.value === selectedValue)}  placeholder="Gender"/>}
                      </div>
                    </div>

                      {input1.map(input=>(
                          <div className=" col-sm-12 mb-2 mt-2"key={input.id} >
                              <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                          </div>
                      ))}
                      
                   </div>
                   <div className='row'>
                      {password1.map(input=>(
                          <div className='col-sm-6 mb-2' key={input.id}>
                              <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                          </div>
                      ))}
                    <div className='col-sm-12 mb-5'>
                      <Inputs name="Adresse" type="text" className="form-control" placeholder="Adresse" errorMessage="Adresse required " onChange={onChange} required></Inputs>
                    </div>
               </div>
                
                </div>
               
              </div>
             
              
              <Modal.Actions>
              
              <Button  type="submit">Add</Button>
              <Button  type="button" onClick={handleClose2}>Concel</Button>

             </Modal.Actions>
          </form>
       </Modal.Content>
       
     </Modal>
</STUDENT>
 )
}

const STUDENT=styled.div`
.add{
 z-index:99999;
}
 form{
   input[type='text']{
     background-color:red;
   }
 }
`
const Table=styled.div`
h1:last-child{
 font-size:4rem !important;
 text-transform:uppercase;
}
.h1{
 width:100%;
 height:140px;
 display:flex;
 align-items:center;
 justify-content:center;
 
 background-color:#8cb1cc;
 color:white;
}
button{
 color:white;
}
.butoons{
 margin-bottom:10px;
           display:flex;
           justify-content:end;
   font-size:2rem;
   background-color:#8EB2CD;
   border:none;
   color:#fff;
   &:hover{
       background-color:#4c7391;
   }
}
margin-left:auto;
margin-right:auto;
width:70%;


img{
   top:0;
   width:450px;
   display:flex;
   justify-content:center;
   align-items:center;
}
background-image:url('${Admin}') ;
.table{

 border:#8EB2CD;

}
.MuiDataGrid-root .MuiDataGrid-cell:focus-within {
   outline: none !important;
   border:none !important;
}     
`;
const customStyles = {
 
 overlay: {zIndex: 1000}
};
export default Reclamations