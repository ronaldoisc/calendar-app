
import React from 'react'
import { useDispatch } from 'react-redux'
import { startOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClickNew=()=>{
        dispatch(startOpenModal());
    }
 
    return (
        <button
        onClick={handleClickNew}
        className='btn btn-primary fab'
        // className='btn btn-primary fab'
       
        >
          
            <i className='fas fa-plus'></i>
            
        </button>
    )
}
