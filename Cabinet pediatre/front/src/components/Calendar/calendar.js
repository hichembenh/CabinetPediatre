import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';

import makeStyles, {getModalStyle} from './style'
import {now} from "moment";
import {useDispatch, useSelector} from "react-redux"
import {getRdvs} from "../../actions/rdv";

const Calendar = () => {
    const [modalStyle] = useState(getModalStyle())
    const rdvs = useSelector((state) => state.rdv)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRdvs());
    }, [dispatch]);
    console.log(rdvs)
    const classes = makeStyles()

        return (
            <div style={modalStyle} className={classes.paper}>
                <FullCalendar
                    plugins={[ timeGridPlugin,dayGridPlugin  ]}
                    initialView= 'timeGridWeek'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    slotMinTime={
                        new Date(now())
                    }
                    events={rdvs.map((rdv)=>( {
                        title: 'Reserved',
                        start: new Date(rdv.dateDebut),
                        end: new Date(rdv.dateFin)
                            }))}
                />

            </div>
        )
}

export default Calendar