import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDeleted } from '../../actions/events';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();
    const handleDeleteEvent=()=>{
        dispatch(eventStartDeleted());

    }
    return (
        <button
        onClick={handleDeleteEvent}
        className='btn btn-danger fab-danger'
        >
          <i className='fas fa-trash'></i>
          <span> Borrar evento</span>
        </button>
    )
}
