import { createGlobalStyle } from "styled-components"

export const lightTheme={
   
}

export const darkTheme={
    body:'#000',
    fontcolor:'#fff',
    navbar:'#000',
    form:"#000",
    formBorder:"1px solid #fff",
    login:'#000',
    btn:'#000',
    signup:"#000"

}

export const Global=createGlobalStyle`
    body{
        background-color:${props=>props.theme.navbar};
        .navbar{
            background:${props=>props.theme.navbar} !important;
        }
       
        .footer-container{
            background:${props=>props.theme.navbar} !important;
        }
        .topbar{
            background:${props=>props.theme.body} !important;
        }
        .btn{
            background:${props=>props.theme.btn} !important;
        }
        .giTfjd{
            background:${props=>props.theme.body} !important;
            form{
                background:${props=>props.theme.form} !important;
                border:${props=>props.theme.formBorder} !important;
            }
            .image-holder{
                background:${props=>props.theme.login} !important;
                
            }
        }
        .signup-photo form {
            background:${props=>props.theme.signup} !important;
        }
    }

`