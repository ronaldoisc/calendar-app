import { fetchWithOutToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";
import Swal from 'sweetalert2'
import { startEventLogout } from "./events";

export const startLogin=(email,password)=>{
    return async(dispatch)=>{

       const resp=await fetchWithOutToken('auth',{email,password},'POST');
       const body=await resp.json();

       if(body.ok){
           localStorage.setItem('token',body.token);
           localStorage.setItem('token-init-date',new Date().getTime());

           dispatch(login({
               uid:body.uid,
               name:body.name
           }))
           
       }else{
           Swal.fire('Error',body.msg,'error');
           
       }

    }
}

export const startRegister=(name,email,password)=>{
    return async(dispatch)=>{
        const resp=await fetchWithOutToken('auth/new',{name,email,password},'POST');
        const body=await resp.json();
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))

           
        }else{
            Swal.fire('Error',body.msg,'error');
        }

    }

}

export const startCheking=()=>{
    return async(dispatch)=>{

        const resp=await fetchWithToken('auth/renew');
        const body=await resp.json();
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))
        }else{

            dispatch(checkingFinish());

        }


    }
}

const login=(user)=>({
    type:types.authLogin,
    payload:user
});



export const startLogout=()=>{


    return (dispatch)=>{
        dispatch(logout());
        dispatch(startEventLogout());
        localStorage.clear();



    }
}

export const logout=()=>({
    type:types.authLogout
})

const checkingFinish=()=>({ type:types.authCheckingFinish});

