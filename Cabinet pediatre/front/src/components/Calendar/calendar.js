import React, {useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';

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
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    initialView= 'timeGridWeek'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listWeek'
                    }}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    slotMinTime={
                        new Date(now())
                    }
                    events={rdvs.map((rdv)=>(rdv.vaccin ? {
                        title: !user.result.isSec || !user.result.isAdmin ? ' Reservé':`${rdv.kid.parent.firstName} ${rdv.kid.parent.lastName}`,
                        start: new Date(rdv.dateDebut),
                        end: new Date(rdv.dateFin),
                        backgroundColor:'red'
                            }:{
                        title: !user.result.isSec || !user.result.isAdmin ? ' Reservé':`${rdv.kid.parent.firstName} ${rdv.kid.parent.lastName}`,
                        start: new Date(rdv.dateDebut),
                        end: new Date(rdv.dateFin)
                    }))}
                />

            </div>
        )
}

export default Calendar