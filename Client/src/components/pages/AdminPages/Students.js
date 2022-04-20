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
import { getStudent } from '../../../utils/api';
import { Button, Modal } from "semantic-ui-react";
import Inputs from '../../Inputs'
function Students() {
  
  const [student,setStudent]=React.useState([]);

  const [modalOpen, SetModalOpen] = React.useState(false);
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  const dataset=()=>{
    axios.get(getStudent,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
    }).then(res=>{
      setStudent(res.data);
    }).catch(err=>{
    console.log(err);
    })
  }
  function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);
  
    React.useEffect(() => {
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        cb();
      }
    }, [cb, condition]);
  }
  useOnceCall(()=>{
    dataset()
  })

  const getAllUsers=()=>{
    axios.get(getStudent,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
  }).then(res=>{
      setStudent(res.data);
  }).catch(err=>{
    console.log(err);
  })
  }

  const deleteBac = (text) => {

}
  const columns = [

    { field: 'ide', headerName: 'ID', width: 150 },
    
    { field: 'FirstName', headerName: 'FirstName', width: 120 },
    { field: 'LastName', headerName: 'LastName', width: 120 },
    { field: 'Email', headerName: 'Email', width: 230 },
    { field: 'CIN', headerName: 'CIN', width: 120 },
    { field: 'Gender', headerName: 'Gender', width: 100 },
    
    { field: 'Action', headerName: 'Action', width: 80,renderCell: (params)=>{
        return (
            <div>
                <IconContext.Provider value={{color:'#FFF',size: '18px'}}>
                    <Link to="#" onClick={handleOpen}><FaICons.FaEdit></FaICons.FaEdit></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`/Eboard/Students/delete/${params.id}`}><MDICons.MdDeleteForever></MDICons.MdDeleteForever></Link>
                </IconContext.Provider>
            </div>
        )} },
   
  ];
 
  if(student){
    
    var array=student.map((stud,key)=>{
      return(
        stud.User &&{ id: stud.User._id!==null ?stud.User._id:0 , FirstName: stud.FirstName!==null ? stud.FirstName :"",LastName:stud.LastName!==null ?stud.LastName :"" ,Email:stud.User.email!==null ?stud.User.email :"",CIN:stud.Cin!==null ?stud.Cin :"",Gender:stud.Sexe!==null ?stud.Sexe :"",ide:key!==null ?key+1:0}
      )
    })
  }
  

  return (
    <STUDENT>
     
    <Table>
       
              <div className='h1' img={Student}> <h1>Students</h1></div>
               <button className='butoons'><IOIcons.IoIosAddCircle /></button>
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
</STUDENT>
  )
}

const STUDENT=styled.div`
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
export default Students