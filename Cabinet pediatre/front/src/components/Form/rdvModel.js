import React, {useState} from 'react';
import {ModalWrapper, ModalImg, ModalContent, CloseModalButton}  from './styles'
import {Checkbox, Grid, InputLabel, Modal, Paper, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {createRdv} from "../../actions/rdv";
import {MuiPickersUtilsProvider, DatePicker,TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Calendar from "../Calendar/calendar";
import moment from "moment";

const RdvModal = ({ kid, showModal, setShowModal }) => {
    const [newRdv] = useState({
        userId: localStorage.getItem('userId'),
        kidId: kid._id,
        dateDebut:new Date(),
        vaccin: true,
    })
    const dispatch = useDispatch()
    const [selectVaccin,setSelectVaccin] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date(moment().hours(8).minutes(0)));
    const [open, setOpen] = React.useState(false);
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
        dispatch(createRdv(newRdv))
        console.log(newRdv)
    }
    const handleDateChange = (date) => {
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
                                                    minDate={Date(moment().hours(''))}
                                                    maxDate={Date(moment().hours(''))}
                                                    value={selectedDate}
                                                    minDateMessage
                                                    onChange={handleDateChange}
                                                />
                                                </MuiPickersUtilsProvider>
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
            ) : null}
        </>
    );
};
export default RdvModal
