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
        <div  >
        <h1>Calendar</h1>
        <h2 >Add New Event</h2>
        <div  >
            <Input focus placeholder='Add Title' value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}/>
            
            <DatePicker placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} timeInputLabel="Time:" showTimeInput dateFormat="dd/MM/yyyy h:mm aa" />
            <DatePicker placeholderText="End Date"  selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} timeInputLabel="Time:" showTimeInput dateFormat="dd/MM/yyyy h:mm aa" />
            <Button primary onClick={handleAddEvent}>
                Add Event
            </Button>
            
        </div>
        <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </div>
    )
  }
export default CalendarCourse
