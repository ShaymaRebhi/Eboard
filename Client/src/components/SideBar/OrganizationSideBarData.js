import React from 'react'

import * as GIIcons from "react-icons/gi";
import * as BSIcons from "react-icons/bs"
export const OrganizationSidebarData=[
    {
       
        path:'/Organization',
        icon:<GIIcons.GiTeacher />,
        cName:'nav-text',
        tooltip:"Teachers",
    },{
       
        path:'/Organization/payement',
        icon:<BSIcons.BsRecordBtn />,
        cName:'nav-text',
        tooltip:"Paying for record functionality",
    }
    
]