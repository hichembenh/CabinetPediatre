import React, {useState} from 'react';
import makeStyles,{ModalWrapper, ModalImg, ModalContent, CloseModalButton}  from './styles'
import {Checkbox, Grid, InputLabel, Paper, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {createRdv} from "../../actions/rdv";
import Box from '@material-ui/core/Box';

const RdvModal = ({ kid, showModal, setShowModal }) => {
    const [newRdv, setNewRdv] = useState({
        userId: localStorage.getItem('userId'),
        kidId: kid._id,
        dateDebut:new Date(),
        vaccin: true,
    })
    const dispatch = useDispatch()
    const [selectVaccin,setSelectVaccin] = useState(true)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const classes = makeStyles()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        newRdv.vaccin=selectVaccin
        dispatch(createRdv(newRdv))
        console.log(newRdv)
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleVaccin = () =>{
        setSelectVaccin(!selectVaccin)
    }

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
                                                <TextField
                                                    id="datetime-local"
                                                    label="Date du rendez-vous"
                                                    type="datetime-local"
                                                    defaultValue={new Date(Date.now.toString())}
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={event => {newRdv.dateDebut=new Date(event.target.value)}}
                                                />
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
