import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew=(event)=>{
  
  return async(dispatch,getState)=>{

    const {uid,name}=getState().auth;
  
   try {
    const resp=await fetchWithToken('events',event,'POST');
    const body=await resp.json();
    if(body.ok){

      event.id=body.event.id;
      event.user={
        _id:uid,
        name:name
      }
      dispatch(eventAddNew(event));
    
    }
     
   } catch (error) {
     console.log(error);
     
   }

  }
}
const eventAddNew=(event)=>({
    type:types.eventAddNew,
    payload:event

});

export const setActive=(event)=>({
    type:types.setActive,
    payload:event

});

export const eventClearActiveEvent=()=>({
  type:types.eventClearActiveEvent
});
export const startEventUpdate=(event)=>{
  return async(dispatch)=>{

    const resp=await fetchWithToken(`events/${event.id}`,event,'PUT');
    const body=await resp.json();

    if(body.ok){
      dispatch(eventUpdated(event));
    }else{
      Swal.fire('Error',body.msg,'error');
    }

  }
}

const eventUpdated=(event)=>({
  type:types.eventUpdated,
  payload:event
});
export const eventStartDeleted=()=>{
  return async(dispatch,getState)=>{

    const {id}=getState().calendar.activeEvent;
    console.log(id);
    const resp=await fetchWithToken(`events/${id}`,{},'DELETE');
    const body=await resp.json();
    if(body.ok){
      dispatch(eventDeleted())

    }else{
      Swal.fire('Error',body.msg,'error');
    }

  }
}

const eventDeleted=()=>({
  type:types.eventDeleted,

});


export const startEventLoading=()=>{
  return async(dispatch)=>{
  const resp=await fetchWithToken('events');
  const body=await resp.json();
  
  const events= prepareEvents(body.events);
  if(body.ok){
    dispatch(eventLoaded(events))

  }
  }
}

const eventLoaded=(events)=>({
  type:types.eventLoaded,
  payload:events
})


export const startEventLogout=()=>({
  type:types.eventLogout

});

