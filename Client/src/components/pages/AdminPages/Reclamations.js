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
function Reclamations() {

    const [checked,setChecked]=React.useState(false);
    const changeRequiredValue = (rq,i) => {
        console.log(i);
        if(checked) setChecked(false);
        setChecked(true);
    }
    const columns = [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'Type', headerName: 'Type', width: 150 },
        { field: 'Subject', headerName: 'Subject', width: 150 },
        { field: 'Messages', headerName: 'Messages', width: 400 },
        { field: 'User', headerName: 'User Email', width: 200 },
        { field: 'Action', headerName: '#', width: 100,renderCell: (params)=>{
            return (
                <div >
                    <IconContext.Provider value={{color:'#8EB2CD',size: '18px'}}>
                        <Link to="#"><FaICons.FaEdit></FaICons.FaEdit></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="#"><MDICons.MdDeleteForever></MDICons.MdDeleteForever></Link>
                    </IconContext.Provider>
                </div>
            )} }
       
      ];
      const rows = [
        { id: 1, Type: 'About Payement',Subject:"Error payement",Messages:"Hi, i have an error in payement please contact me",User:"badis.raissi@esprit.tn"},
        { id: 2, Type: 'About Teacher',Subject:"Teacher absent",Messages:"Hi, bla bla bla bla bla bla ",User:"badis.raissi@esprit.tn"},
        { id: 3, Type: 'About Organization',Subject:"Bad organization",Messages:"Hi, bla bla bla bla bla bla",User:"badis.raissi@esprit.tn"},
        { id: 4, Type: 'About Student',Subject:"Account not working",Messages:"Hi, bla bla bla bla bla bla",User:"badis.raissi@esprit.tn"},
        { id: 5, Type: 'About Website',Subject:"bad colors",Messages:"Hi, bla bla bla bla bla bla",User:"badis.raissi@esprit.tn"},
        { id: 6, Type: 'Others',Subject:"I don't know",Messages:"Hi, bla bla bla bla bla bla",User:"badis.raissi@esprit.tn"},
      ];

      
  return (
      <>
   
    <Table>
   
       <div className='h1'><h1>Reclamations</h1></div>
        
         <Box
                sx={{
                    height: 400,
                    width: 1050,
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
            margin-bottom:30px;
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
export default Reclamations