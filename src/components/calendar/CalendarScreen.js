import React, { useState } from 'react';
import {Calendar,momentLocalizer} from 'react-big-calendar';

import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { startOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, setActive, startEventLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';

moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer


export const CalendarScreen = () => {

    const dispatch = useDispatch();
     const {events,activeEvent} = useSelector( state => state.calendar );
     const {uid} = useSelector( state => state.auth );

    const [lasView, setstate] = useState( localStorage.getItem('lasView')|| 'month');

    useEffect(() => {
        dispatch(startEventLoading());
    }, [dispatch]);
    

    const onDoubleClickEvent=(e)=>{
        dispatch(startOpenModal())

    }
    const onSelectEvent=(e)=>{
        // console.log(e);;
        dispatch(setActive(e))
     
    }
    const onViewChange=(e)=>{
      
        localStorage.setItem('lasView',e);
        setstate(e)
        
    }

    const onSelectSlot=()=>{
        dispatch(eventClearActiveEvent());
    }

 
    const eventStyleGetter=(event)=>{
         
        const style={
            backgroundColor:(uid === event.user._id) ? '#367cf7' : '#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white',
           

        };

        return {
            style
        }
    };
    return (
        <div className='calendar-screen'>
            <Navbar/>
            <h1>Calendar Screen</h1>
            <hr />
            <Calendar

              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onDoubleClickEvent={onDoubleClickEvent}
              onSelectEvent={onSelectEvent}
              onView={onViewChange}
              onSelectSlot={onSelectSlot}
              selectable={true}
              view={lasView}
              messages={messages}
              eventPropGetter={eventStyleGetter}
              components={{
                  event:CalendarEvent
              }}
             />
              <AddNewFab/>
              { 
                (activeEvent) && <DeleteEventFab/> 
              }
             <CalendarModal/>
        </div>
    )
}
