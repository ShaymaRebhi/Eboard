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
import Switch from '@material-ui/core/Switch';
export default function TeachersList() {
  const [checked,setChecked]=React.useState(false);
    const changeRequiredValue = (rq,i) => {
        console.log(i);
        if(checked) {setChecked(false);}
        else{
            setChecked(true);
        }
    }
  const columns = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'FirstName', headerName: 'FirstName', width: 120 },
    { field: 'LastName', headerName: 'LastName', width: 120 },
    { field: 'Email', headerName: 'Email', width: 230 },
    { field: 'CIN', headerName: 'CIN', width: 120 },
    { field: 'Gender', headerName: 'Gender', width: 100 },
    { field: 'Status', headerName: 'Status', width: 100,renderCell: (params)=>{
      return (
          <div>
              <Switch onChange={(e)=>changeRequiredValue(e.target.checked,params.id)} checked={checked}/>
          </div>
      )} },
    { field: 'Action', headerName: 'Action', width: 80,renderCell: (params)=>{
        return (
            <div>
                <IconContext.Provider value={{color:'#8EB2CD',size: '18px'}}>
                    <Link to="#"><FaICons.FaEdit></FaICons.FaEdit></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="#"><MDICons.MdDeleteForever></MDICons.MdDeleteForever></Link>
                </IconContext.Provider>
            </div>
        )} }
   
  ];
  const rows = [
    { id: 1, FirstName: 'Mouheb',LastName:"Mhamdi",Email:"mhamdi.mouheb@esprit.tn",CIN:19463158,Gender:"M"},
    { id: 2, FirstName: 'Shayma',LastName:"Rebhi",Email:"shayma.rebhi@esprit.tn",CIN:12547963,Gender:"W"},
    { id: 3, FirstName: 'Hassen',LastName:"Oueslati",Email:"hassen.oueslati@esprit.tn",CIN:19436658,Gender:"M"},
    { id: 4, FirstName: 'Wael',LastName:"Amri",Email:"wael.amri@esprit.tn",CIN:19463753,Gender:"M"},
    { id: 5, FirstName: 'Badis',LastName:"Raissi",Email:"badis.raissi@esprit.tn",CIN:12547853,Gender:"M"},
    { id: 6, FirstName: 'Badis',LastName:"Raissi",Email:"badis.raissi@esprit.tn",CIN:12547853,Gender:"M"}
    
    
  ];

  
  return (
    <div>
         <Table>
                    
                    <div className='h1'><h1>Teachers</h1></div>
                    <button className='butoons'><IOIcons.IoIosAddCircle /></button>
                      <Box
                            sx={{
                                height: 400,
                                backgroundColor: '#FFF',
                                fontSize:'50px'
                            }}
                  >
                        <DataGrid
                          disableSelectionOnClick={true}
                          rows={rows}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          className='table'
                          VerticalContentAlignment="Center"
                            HorizontalContentAlignment="Center" 
                        />
                        </Box>

          </Table>
    </div>
  )
}
const Table=styled.div`
  h1:last-child{
  font-size:4rem !important;
  text-transform:uppercase;
}
.h1{
  width:100%;
  height:200px;
  display:flex;
  align-items:center;
  justify-content:center;
  
  background-color:#8cb1cc;
  color:white;
}
button{
            margin-bottom:10px;
        }
    .butoons{
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
    height: 800px;
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