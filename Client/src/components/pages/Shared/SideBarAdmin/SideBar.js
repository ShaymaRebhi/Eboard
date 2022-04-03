import React from 'react'

import styled from 'styled-components'
import * as FAIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IOIcons from "react-icons/io";
import * as GIIcons from "react-icons/gi"
import * as MDIcons from "react-icons/md"

export const SidebarData=[
    {
        title:' Home',
        path:'/Eboard/home',
        icon:<AiIcons.AiFillHome />,
        cName:'nav-text'
    },{
        title:' Students',
        path:'/Eboard/Students',
        icon:<FAIcons.FaUsers />,
        cName:'nav-text'
    },
    {
        title:' Teachers',
        path:'/Eboard/Teachers',
        icon:<GIIcons.GiTeacher />,
        cName:'nav-text'
    },
    
    {
        title:' Organizations',
        path:'/Eboard/Organization',
        icon:<FAIcons.FaUserSecret />,
        cName:'nav-text'
    },
    
    {
        title:' Reclamations',
        path:'/Eboard/Reclamations',
        icon:<MDIcons.MdFeedback />,
        cName:'nav-text'
    },
    {
        title:' Support',
        path:'/Eboard/Supports',
        icon:<IOIcons.IoIosHelpCircle />,
        cName:'nav-text'
    }
]