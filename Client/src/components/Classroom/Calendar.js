import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Input } from "semantic-ui-react";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styled from 'styled-components'
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2021, 6, 0),
        end: new Date(2021, 6, 0),
    }
    
];


function CalendarCourse () {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }
  
    return (
        <Containers >
       
        
        <div className="container row" >
        <h1 className="text-secondary">Calendar</h1>
        <div className="col-sm-1">&ensp;</div>
            <div className="col-sm-3">
             <Input focus placeholder='Add Title' value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>

            </div>
            <div className="col-sm-3">
            <DatePicker className="form-control" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} timeInputLabel="Time:" showTimeInput dateFormat="dd/MM/yyyy h:mm aa" />

            </div>
            <div className="col-sm-3">
            <DatePicker className="form-control" placeholderText="End Date"  selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} timeInputLabel="Time:" showTimeInput dateFormat="dd/MM/yyyy h:mm aa" />

            </div>
            <div className="col-sm-2">
                <Button primary onClick={handleAddEvent}>
                    Add Event
                </Button>
            </div>
            
            
           
            
        </div>
        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </Containers>
    )
  }
  const Containers=styled.div`
    margin-left:150px;
    margin-right:auto;
    @media(max-width:615px){
        width:100%;
        margin-left:0px;
        margin-right:auto;
    }
  `;
export default CalendarCourse
