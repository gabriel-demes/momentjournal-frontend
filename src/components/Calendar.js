import React, {useEffect, useState} from "react"
import {useHistory} from 'react-router-dom'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment)
const MyCalendar = ({user}) => {
    const [entries, setEntries] = useState([{date:new Date(), title:"today"}])
    const history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:3000/users/${user.id}`)
            .then(r => r.json())
            .then(user => setEntries(user["my_entries"]))
        }, [user.id])

    const makeEvents = () => {
        return(entries?.map(entry => {
            return (
                {
                    title: entry.title,
                    start: moment(entry.date).toDate(),
                    end: moment(entry.date).toDate(),
                    id: entry.id,
                    journal: entry.journal
                }
            )
        }))
    }

    return(
        <div>
    <Calendar
      localizer={localizer}
    events={makeEvents()}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={e=> history.push(`/journals/${e.journal}/${e.id}`)}
    />
  </div>
    )
}

export default MyCalendar
