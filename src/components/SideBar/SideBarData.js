import React from 'react'

import * as AiIcons from "react-icons/ai";
import * as MDIcons from "react-icons/md";
import * as BSIcons from "react-icons/bs"
import {SiGoogleclassroom} from "react-icons/si"
import {BiArchive} from "react-icons/bi"
export const SidebarData=[
    {
       
        path:'/classroom',
        icon:<SiGoogleclassroom />,
        cName:'nav-text',
        tooltip:"Classroom",
    },{
        
        path:'/forums',
        icon:<MDIcons.MdOutlineForum />,
        cName:'nav-text',
        tooltip:"Forums",
    },
    
    
    {
       
        path:'/chat',
        icon:<BSIcons.BsChatDots />,
        cName:'nav-text',
        tooltip:"Chat",
    },
    {
        
        path:'/calendar',
        icon:<AiIcons.AiOutlineCalendar />,
        cName:'nav-text',
        tooltip:"Calendar",
    },
    
    {
       
        path:'#',
        icon:<BiArchive />,
        cName:'nav-text',
        tooltip:"Archive",
    }
]