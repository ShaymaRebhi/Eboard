
import React, {useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import { getUserConnect } from '../../utils/api';
import {SidebarData} from "./SideBarData";
import {IconContext} from 'react-icons';
import { Avatar } from 'primereact/avatar';
import { Tooltip } from 'primereact/tooltip';

function SideBar(){
  const [hideNav,setHideNav]=useState(false);
  const [sidebar,setSidebar]=useState(false);
  const [connect,SetConnect]=useState(undefined);
  const showSidebar=()=>setSidebar(!sidebar)
  const history=useHistory();


const [Bool, setBool] = useState(Boolean);
const logout=()=>{
  localStorage.clear();
  setBool(false);
  history.push("/Eboard/auth/admin")
}

const hidenavbar=()=>{
  if(hideNav){
      setHideNav(false);
  }else{
      setHideNav(true);
  }
}
useEffect(()=>{
        
  axios.get(getUserConnect,{
       headers: {
           'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
       }
   }).then(res=>{
       SetConnect(res.data[0]);
  
   })

},[])
  return (
    <>
    <IconContext.Provider value={{color:'#fff'}}>


    </IconContext.Provider>
    <SideBars>
        <nav className={sidebar  ?'nav_menu active':'nav_menu'}>
            
            <ul className='nav-menu-items' >
                
                {SidebarData.map((item,index)=>{
                    return(
                      
                      <div className="flex align-items-center" key={index}>
                        
                        
                         <li  className={`${item.cName} hel-${index}`} >
                              <Tooltip target={`.hel-${index}`} content={`${item.tooltip}`} />
                             <Link  to={item.path} onClick={showSidebar}>
                                 {item.icon}
                                 
                             </Link>
                         </li>
                         </div>
                    );
                })}
                 <Link to="/profile">
                 <Tooltip target=".imageAvatar" content="Profile" />
                   <div className='avatar'>
                   
                   {connect && connect.User.file!=null ?  <Avatar image={connect.User.file} className='imageAvatar' shape="circle"  /> :<Avatar image={`https://ui-avatars.com/api/?name=mouheb+mhamdi`} shape="circle"  className='imageAvatar' />}
                </div></Link>
            </ul>
             
        </nav>
        </SideBars>
{/*<Grid stackable  >
        <Card stackable  >         
            <Menu size="small" fluid vertical className="menuS">
              <Link to="/classroom">
                <Menu.Item>                    
                <Icon  name='list alternate outline' size='large' />
                </Menu.Item>
              </Link>
              <Link to="/forums">
                <Menu.Item>
                <Icon  name='comment outline' size='large'  />
                </Menu.Item>
              </Link>

              <Link to="/calendar">
                <Menu.Item>
                <Icon  name='calendar outline' size='large'  />
                </Menu.Item>
              </Link>
              <Link to="/">
                <Menu.Item>
                <Icon  name='file archive outline' size='large'  />
                </Menu.Item>
              </Link>
              
            </Menu>
        
          <Card.Content extra>
            <a>
            
                <div className="avatar">
                  <img src='images/asma.jpg' alt="user" />
                </div>
       
            </a>
          </Card.Content>
        </Card>
  </Grid>*/}
      
    </>

    
  )
}


const SideBars=styled.div`
.blue-tooltip .p-tooltip .p-tooltip-arrow {
    border-top-color: red;
}
.blue-tooltip  {
    background-color: red !important;
}
display:initial;
.avatar{
  position:absolute;
  margin:0% 50px -50px -20px ;
  top:75%;
  color:red;
}
@media(max-width:615px){
  display:none;
}
.active{
        left:0px !important;
       transition: all 1s;
}
   

.nav_menu{
    
   background: linear-gradient(90deg, rgb(2,0,36) 0%, rgb(140,177,192) 0%, rgb(140,177,192) 100%);
   width:46px;
   height:100vh;
   display:flex;
   justify-content:center;
   position:fixed;
   top:120px;
    left:0px;
    transition: all 0.5s;
    overflow-x: hidden;
    z-index: 1;
   
   .nav-menu-items{
       width:100%;
       height:90%;
       .navbar-toggle{
           .menu-close-bars{
               background-color:#060b26;
               text-decoration:none;
               font-size:25px;
               display:flex;
               align-items:center;
               justify-content:end;
               margin:30px;
           }
       }
       .nav-text{
           display:flex;
           justify-content:start;
           align-items:center;
           padding:8px 0px 8px 0px;
           margin-left:-15px;
           list-style:none; 
           height:60px;
           span{
               margin-left:16px;
           }
           a{
               text-decoration:none;
               color:#f5f5f5;
               font-size:18px;
              
           }
           
       }
   }
}


`;
export default SideBar;
