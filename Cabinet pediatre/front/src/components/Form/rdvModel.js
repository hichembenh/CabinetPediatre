import React, {useEffect, useState} from 'react';
import {ModalWrapper, ModalImg, ModalContent, CloseModalButton}  from './styles'
import {Checkbox, Grid, InputLabel, Modal, Paper, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createRdv, getRdvs} from "../../actions/rdv";
import {MuiPickersUtilsProvider, DatePicker,TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Calendar from "../Calendar/calendar";
import moment from "moment";
import {useGoogleLogin} from "react-google-login";
import AlertNotification from "../Confirm/alert";

const RdvModal = ({ kid, showModal, setShowModal }) => {
    const [newRdv] = useState({
        userId: localStorage.getItem('userId'),
        kidId: kid._id,
        dateDebut:new Date(),
        vaccin: true,
    })
    const rdvs = useSelector((state) => state.rdv)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getRdvs());
    }, [dispatch]);
    const [notify,setNotify]= useState({
        isOpen:false,
        message:'',
        type:''
    })
    const [selectVaccin,setSelectVaccin] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date(moment().hours(8).minutes(0)));
    const [open, setOpen] = useState(false);
    const [validDate,setValidDate] = useState(false);
    const calendar = (
        <div>
            <Calendar/>
        </div>
    )

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        newRdv.vaccin=selectVaccin
        newRdv.dateDebut= selectedDate
        console.log(newRdv.dateDebut)
        dispatch(createRdv(newRdv))
        setNotify({
            isOpen: true,
            message: 'Rendez-vous ajouté',
            type: 'success'
        })
    }
    function isBooked () {
        var check = false
        rdvs.forEach((rdv)=>{
            if (
                selectedDate.getYear() === moment(rdv.dateDebut).year() &&
                selectedDate.getMonth() === moment(rdv.dateDebut).month() &&
                selectedDate.getDay() === moment(rdv.dateDebut).day() &&
                selectedDate.getHours() === moment(rdv.dateDebut).hour() &&
                selectedDate.getMinutes() === moment(rdv.dateDebut).minutes()
            ) {
                check = true;
            }
            })
        return check
    }
    const handleDateChange = (date) =>{
        setSelectedDate(date);
    };
    function disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    const handleVaccin = () =>{
        setSelectVaccin(!selectVaccin)
    }

    return (
        <>
            {showModal ? (
                <>
                <Paper>
                        <ModalWrapper showModal={showModal}>
                            <ModalImg src={kid.photo} alt='camera' />

                               <ModalContent>
                                   <form onSubmit={handleSubmit}>
                                             <Grid
                                                 container
                                                 direction="column"
                                                 justify="space-between"
                                                 alignItems="center"
                                                 spacing={3}
                                             >
                                            <p>veuillez remplir le formulaire pour envoyer une demande de rendez-vous</p>
                                            <Grid
                                                item
                                                xs={12}
                                                container
                                                direction="row"
                                                justify="space-evenly"
                                                alignItems="center"
                                            >
                                                <TextField
                                                    name="lastName"
                                                    variant="outlined"
                                                    label='Prenom'
                                                    value={kid.lastName}
                                                    disabled
                                                />
                                                <TextField
                                                    name="lastName"
                                                    variant="outlined"
                                                    label='Nom'
                                                    value={kid.name}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                container
                                                direction="row"
                                                justify="space-evenly"
                                                alignItems="center"
                                            >
                                                <TextField
                                                    name="lastName"
                                                    variant="outlined"
                                                    label='Sexe'
                                                    value={kid.gender}
                                                    disabled
                                                />
                                                <TextField
                                                    name="lastName"
                                                    variant="outlined"
                                                    label='Age'
                                                    value={new Date(kid.age).toDateString()}
                                                    disabled
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                container
                                                direction="row"
                                                justify="space-evenly"
                                                alignItems="center"
                                            >
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DatePicker
                                                        autoOk
                                                        label="Date du rendez-vous"
                                                        clearable
                                                        disablePast
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        shouldDisableDate={disableWeekends}
                                                    />
                                                    <TimePicker
                                                    clearable
                                                    minutesStep={30}
                                                    label="Heure du rendez-vous"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                />
                                                </MuiPickersUtilsProvider>
                                                {validDate ? (<div>date reservé</div>):null}
                                                <div>
                                                    <InputLabel>Vaccin ?</InputLabel>
                                                    <Checkbox
                                                        value={selectVaccin}
                                                        checked={selectVaccin}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        onChange={handleVaccin}
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                container
                                                direction="column"
                                                justify="space-evenly"
                                                alignItems="center"
                                            >
                                                <button>Demander</button>
                                            </Grid>
                                             </Grid>
                                   </form>
                                         <button onClick={handleOpen}>Consulter le calendrier</button>
                                        <Modal
                                            open={open}
                                            onClose={handleOpen}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            {calendar}
                                        </Modal>
                               </ModalContent>
                            <CloseModalButton
                                aria-label='Close modal'
                                onClick={() => setShowModal(prev => !prev)}
                            />
                        </ModalWrapper>
                </Paper>
                <AlertNotification
                    notify={notify}
                    setNotify={setNotify}
                />
                </>
            ) : null}
        </>
    );
};
export default RdvModal
