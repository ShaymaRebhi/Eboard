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
function Organizations() {

    const [checked,setChecked]=React.useState(false);
    const changeRequiredValue = (rq,i) => {
        console.log(i);
        if(checked) {setChecked(false);}
        else{
            setChecked(true);
        }
        
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'Name', headerName: 'Name', width: 600 },
        { field: 'Action', headerName: 'Action', width: 100,renderCell: (params)=>{
            return (
                <div >
                    <IconContext.Provider value={{color:'#8EB2CD',size: '18px'}}>
                        <Link to="#"><FaICons.FaEdit></FaICons.FaEdit></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="#"><MDICons.MdDeleteForever></MDICons.MdDeleteForever></Link>
                    </IconContext.Provider>
                </div>
            )} },{ field: 'Status', headerName: 'Status', width: 100,renderCell: (params)=>{
                return (
                    <div>
                        <Switch onChange={(e)=>changeRequiredValue(e.target.checked,params.id)} checked={checked}/>
                    </div>
                )} }
       
      ];
      const rows = [
        { id: 1, Name: 'ESPRIT',id:1},
        { id: 2, Name: 'TEK-UP'},
        { id: 3, Name: 'ESPRIT'},
        { id: 4, Name: 'ESPRIT'},
        { id: 5, Name: 'ESPRIT'},
        { id: 6, Name: 'ESPRIT'},
      ];

      
  return (
      <>
   
    <Table>
   
       <div className='h1'><h1>Organizations</h1></div>
        <button className='butoons'><IOIcons.IoIosAddCircle /></button>
         <Box
                sx={{
                    height: 430,
                    backgroundColor: '#FFF',
                    
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
    
    </>
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
        height: 400px;
        width:75%;
        
      
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
export default Organizations