import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'

import makeStyles, {getModalStyle} from './style'
import {now} from "moment";
import {useDispatch, useSelector} from "react-redux"
import {getRdvs} from "../../actions/rdv";

const Calendar = () => {
    const [modalStyle] = useState(getModalStyle())
    const user = JSON.parse(localStorage.getItem('profile'))
    const rdvs = useSelector((state) => state.rdv)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRdvs());
    }, [dispatch]);
    console.log(user)
    const classes = makeStyles()
    function click(info){
        alert('clicked ' + info.dateStr);
    }

        return (
            <div style={modalStyle} className={classes.paper}>
                <FullCalendar
                    plugins={[ interactionPlugin,timeGridPlugin,dayGridPlugin  ]}
                    initialView= 'timeGridWeek'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    editable={true}
                    selectable={true}
                    dateClick={function(info) {
                        alert('Clicked on: ' + info.dateStr);
                        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                        alert('Current view: ' + info.view.type);
                        // change the day's background color just for fun
                        info.dayEl.style.backgroundColor = 'red';
                    }}
                    selectMirror={true}
                    dayMaxEvents={true}
                    slotMinTime={
                        new Date(now())
                    }
                    events={rdvs.map((rdv)=>( {
                        title: !user.result.isSec ? 'Reservé':`${rdv.kid.parent.firstName} ${rdv.kid.parent.lastName}`,
                        start: new Date(rdv.dateDebut),
                        end: new Date(rdv.dateFin)
                            }))}
                />

            </div>
        )
}

export default Calendar