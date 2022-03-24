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
import { Button } from '../Home/Buttons/Button';
function Organizations() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'Name', headerName: 'Name', width: 300 },
        { field: 'Action', headerName: 'Action', width: 150,renderCell: (params)=>{
            return (
                <div>
                    <IconContext.Provider value={{color:'#8EB2CD'}}>
                        <Link to="#"><FaICons.FaEdit></FaICons.FaEdit></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="#"><MDICons.MdDeleteForever></MDICons.MdDeleteForever></Link>
                    </IconContext.Provider>
                </div>
            )} },
       
      ];
      const rows = [
        { id: 1, Name: 'ESPRIT'},
        { id: 2, Name: 'TEK-UP'},
        
      ];

      const Table=styled.div`
        .butoons{
            font-size:2rem;
            background-color:#8EB2CD;
            border:none;
            color:#fff;
            &:hover{
                background-color:#4c7391;
            }
        }
        margin:0px 250px 0px 250px;
        margin-left:auto;
        height: 400px;
        width:50%;
        
      
        img{
            top:0;
            width:450px;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        background-image:url('${Admin}') ;
      .table{
          font-size:15pt;
          border:#8EB2CD;

      }
      .MuiDataGrid-root .MuiDataGrid-cell:focus-within {
            outline: none !important;
            border:none !important;
      }     
      `;
  return (
      <>
   
    <Table>
   
        <img src={Admin} alt="cover" className='img-fluid'></img>
        <button className='butoons'><IOIcons.IoIosAddCircle /></button>
         <Box
                sx={{
                    height: 300,
                    width: 1,
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
    
    </>
  )
}

export default Organizations