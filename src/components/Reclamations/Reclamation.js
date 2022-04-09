import Select from 'react-select'
import React, { useState } from 'react'

import styled from 'styled-components'
import login from '../../Assets/Images/reclamation.jpg'
import { Button } from 'semantic-ui-react'
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
function Reclamation() {
    let [loading, setLoading] = useState(false);
    const options = [
        { value: 'ORGANIZATION', label: 'About organization' },
        { value: 'TEACHER', label: 'About teacher' },
        { value: 'STUDENT', label: 'About Student' },
        { value: 'WEB', label: 'About the website' },
        { value: 'PAYEMENT', label: 'About payement' },
        { value: 'OTHER', label: 'Others' },
      ]
    const [selectedValue, setSelectedValue] = useState(3);
    const [values,setValues]=useState({
      type:"",
      subject:"",
      message:""
    })

    const handleChange = e => {
        setSelectedValue(e.value);
        setValues({...values,['type']:e.value});
        console.log(values.type);
    }
    const onChange=(e)=>{
        
        setValues({...values,[e.target.name]:e.target.value});
        console.log(values);
    }

    const handleSubmit =(e)=>{
        const id=JSON.parse(localStorage.getItem("login")).User._id;
        e.preventDefault();
        
        const Data= new FormData(e.target)
      
        console.log(Object.fromEntries(Data.entries()).role)
        setLoading(true)
        axios.post(`http://localhost:3000/reclamation/add/${id}`,{
            "type":values.type,
            "subject":values.subject,
            "message":values.message
        }).then(Response=>{
          
          toast.success('Reclamation saved successfuly', {
            position: "bottom-right" 
          });
          setLoading(false)
        }).catch(err => {
              
              toast.error('Error', {
                        position: "bottom-right" 
                });
                setLoading(false)
            //addToast("test error", { appearance: 'error' });
        }).finally(res=>{
          setLoading(false)
        })

    }    
     
  return (
    <Container>
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
              theme={'colored'}
      />
        <div className='form_container'>
            <div className='image_holder'>
             
            </div>
            <form method='POST' onSubmit={handleSubmit}>
                <h1>Reclamation</h1>
              
                <Select options={options} className="mb-3" name="type" onChange={handleChange } value={options.find(obj => obj.value === selectedValue)}  placeholder="Type"/>
                <input type="text" name="subject" onChange={onChange} className="form-control mb-3" placeholder='Subject'></input>
                <textarea name="message" onChange={onChange} placeholder='Message'  rows="5" className="form-control " cols="33"></textarea>
                <Button className='btn' type="submit">{loading ? <ClipLoader  color='#FFF' loading={loading}  size={20} /> : "Send"}</Button>
            </form>

        </div>
    </Container>
  )
}
const Container =styled.div`
   
height: 100%;
 
.form_container{
    border-radius: 0% 10% 10% 0% !important;
    display: table;
    max-width: 900px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
}
.image_holder{
    display: table-cell;
    width: auto;
    background: url(${login}) center center no-repeat; 
    background-size: cover;
    height:500px;
    
}
form{
    border-radius: 0% 3% 3% 0% !important; 
    display: table-cell;
    height: 100% !important;
    width: 420px;
    background: #8EB2CD;
    padding: 20px 30px;
    color:#676767 ;
    h1{
        margin-top:50px;
    }
    span{
        color:white;
    }
    .btn{
        margin-top:20px;
        width:100%;
        height:3rem;
    }
}
h1{
   color:white;
   margin:30px 0px;
}
`;
export default Reclamation