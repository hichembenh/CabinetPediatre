import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import makeStyles, {getModalStyle} from './style'

const Calendar = () => {
    const [modalStyle] = useState(getModalStyle())
    const classes = makeStyles()

        return (
            <div style={modalStyle} className={classes.paper}>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                />
            </div>
        )
}

export default Calendar