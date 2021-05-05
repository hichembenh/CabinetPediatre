import React, {useState} from 'react';
import makeStyles,{ModalWrapper, ModalImg, ModalContent, CloseModalButton}  from './styles'
import {Checkbox, Grid, InputLabel, Paper, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";

const RdvModal = ({ kid, showModal, setShowModal }) => {
    const [newRdv, setNewRdv] = useState({
        userId: localStorage.getItem('userId'),
        kidId: kid._id,
        DateDebut:new Date(),
        vaccin: {
            type:Boolean,
            default:false
        },
    })
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const classes = makeStyles()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        dispatch()
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const test = () =>{
        console.log('test')
    }
    return (
        <>
            {showModal ? (
                <Paper>
                        <ModalWrapper showModal={showModal}>
                            <ModalImg src={kid.photo} alt='camera' />

                               <ModalContent>
                                   <form onSubmit={handleSubmit}>
                                        <p>veuillez remplir le formulaire pour envoyer une demande de rendez-vous</p>

                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center"
                                        >
                                            <TextField
                                                name="lastName"
                                                variant="outlined"
                                                value={kid.lastName}
                                                disabled
                                            />
                                            <TextField
                                                name="lastName"
                                                variant="outlined"
                                                value={kid.name}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center"
                                        >
                                            <TextField
                                                name="lastName"
                                                variant="outlined"
                                                value={kid.gender}
                                                disabled
                                            />
                                            <TextField
                                                name="lastName"
                                                variant="outlined"
                                                value={new Date(kid.age).toDateString()}
                                                disabled
                                            />
                                        </Grid>

                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-evenly"
                                            alignItems="center"
                                        >
                                            <TextField
                                                id="datetime-local"
                                                label="Date du rendez-vous"
                                                type="datetime-local"
                                                defaultValue={new Date(Date.now.toString())}
                                                className={classes.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <div>
                                                <InputLabel>Vaccin ?</InputLabel>
                                                <Checkbox
                                                    checked={false}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid
                                            container
                                            direction="column"
                                            justify="space-evenly"
                                            alignItems="center"
                                        >
                                            <button>Demander</button>
                                        </Grid>
                                   </form>
                                   <button onClick={test}>Consulter le calendrier</button>

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
