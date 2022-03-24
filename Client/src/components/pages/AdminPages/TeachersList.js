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
export default function TeachersList() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'FirstName', headerName: 'FirstName', width: 120 },
    { field: 'LastName', headerName: 'LastName', width: 120 },
    { field: 'Email', headerName: 'Email', width: 220 },
    { field: 'CIN', headerName: 'CIN', width: 120 },
    { field: 'Gender', headerName: 'Gender', width: 80 },
    { field: 'Action', headerName: 'Action', width: 80,renderCell: (params)=>{
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
    { id: 1, FirstName: 'Mouheb',LastName:"Mhamdi",Email:"mhamdi.mouheb@esprit.tn",CIN:19463158,Gender:"M"},
    { id: 2, FirstName: 'Shayma',LastName:"Rebhi",Email:"shayma.rebhi@esprit.tn",CIN:12547963,Gender:"W"},
    { id: 3, FirstName: 'Hassen',LastName:"Oueslati",Email:"hassen.oueslati@esprit.tn",CIN:19436658,Gender:"M"},
    { id: 4, FirstName: 'Wael',LastName:"Amri",Email:"wael.amri@esprit.tn",CIN:19463753,Gender:"M"},
    { id: 5, FirstName: 'Badis',LastName:"Raissi",Email:"badis.raissi@esprit.tn",CIN:12547853,Gender:"M"}
    
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
    margin:0px 100px 0px 250px;
    margin-left:auto;
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
      font-size:15pt;
      border:#8EB2CD;

  }
  .MuiDataGrid-root .MuiDataGrid-cell:focus-within {
        outline: none !important;
        border:none !important;
  }     
  `;
  return (
    <div>
         <Table>
                    
                    <img src={Admin} alt="cover" className='img-fluid'></img>
                    <button className='butoons'><IOIcons.IoIosAddCircle /></button>
                      <Box
                            sx={{
                                height: 300,
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
