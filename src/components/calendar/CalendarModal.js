import React, {  useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { startCloseModal } from '../../actions/ui';
import {eventClearActiveEvent, eventStartAddNew,startEventUpdate } from '../../actions/events';
import { useEffect } from 'react';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

const now=moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus1=now.clone().add(1,'hours');

const initEvent={
   title:'Evento',
   notes:'',
   start:now.toDate(),
   end:nowPlus1.toDate()
}

export const CalendarModal = () => {
  const dispatch = useDispatch();

  const {modalOpen} = useSelector( state => state.ui );
  const {activeEvent} = useSelector( state => state.calendar );
  


  const [dateStart, setdateStart] = useState(now.toDate());

  const [dateEnd, setdateEnd] = useState(nowPlus1.toDate());


  const [titleValid, settitleValid] = useState(true)

 const [formValues, setformValues] = useState(initEvent);


 const {title,notes,start,end}=formValues;

 useEffect(() => {
   if(activeEvent){

     setformValues(activeEvent)
   }else{
     setformValues(initEvent);
   }
  
 }, [activeEvent,setformValues])

 const handleInputChange =({target})=>{
   
     setformValues({
       ...formValues,
       [target.name]:target.value
     })
 }

  const handleStartDateChange =(e)=>{
      setdateStart(e);
      setformValues({
        ...formValues,
        start:e
      })
  }

  const handleEndDateChange =(e)=>{
       setdateEnd(e);
       setformValues({
        ...formValues,
        end:e
      })
  }

  const closeModal = () => {
    dispatch(startCloseModal());
    setformValues(initEvent);
    dispatch(eventClearActiveEvent());
  }

  const handleSubmitForm =(e)=>{
    e.preventDefault();
    
    const momentStart=moment(start);
    const momentEnd=moment(end);

  

    if(momentStart.isSameOrAfter(momentEnd,'hour')){
      return Swal.fire('Error','La fecha fin debe ser mayor a la fecha de inicio','error')
    }
    if(title.trim().length <2){
      return settitleValid(false)
    }
    
    if(activeEvent){
      dispatch(startEventUpdate(formValues));
    }else{

      dispatch(eventStartAddNew(formValues));
    }



    settitleValid(true);
    closeModal();
   

  }

  return (
    <Modal
    
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      style={customStyles}

      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{ (activeEvent) ? 'Editar Evento' : 'Nuevo Evento'}</h1>
      <hr />
      <form className="container"
      onSubmit={handleSubmitForm}
      >

        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
             onChange={handleStartDateChange}
             value={dateStart}
            
             name='dateStart'
             className='form-control'
           />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            
             onChange={handleEndDateChange}
             value={dateEnd}
             minDate={dateStart}
             name='dateEnd'
             className='form-control'
           />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid  && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            value={title}
          
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>

  )
}
