import React, { useState, useEffect } from 'react';
import {TextField, Button, Typography, InputLabel, Grid} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import "react-datepicker/dist/react-datepicker.css";
import useStyles from './styles';
import {createKid, updateKid} from "../../actions/kids";
import AlertNotification from "../Confirm/alert";


const FormKid = ({ currentId, setCurrentId }) => {

    const kid = useSelector((state) => (currentId ? state.kids.find((message) => message._id === currentId) : null));
    const [kidData, setKidData] =useState(!currentId ?(
        { name: '', lastName: '', photo:'', age: new Date(), gender:'boy', userId:localStorage.getItem('userId')}
        ):(kid))
    const [notify,setNotify]= useState({
        isOpen:false,
        message:'',
        type:''
    })
    const dispatch = useDispatch();
    const classes = useStyles();
    const [sexe, setSexe] = useState(currentId?(kidData.gender):('boy'));

    useEffect(() => {
        if (kid) {
            setKidData(kid)
            kidData.age=kid.age
        }
    }, [kid]);

    const clear = () => {
        setCurrentId(0);
        setKidData({ name: '', lastName: '', photo: '', age:new Date(), gender:'boy', userId:localStorage.getItem('userId')});
    };

    const handleChangeSexe = (event) => {
        kidData.gender=event.target.value
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createKid(kidData));
            setNotify({
                isOpen: true,
                message: 'Enfant créé',
                type: 'success'
            })
            clear();
        } else {
            console.log(kidData)
            dispatch(updateKid(currentId, kidData));
            setNotify({
                isOpen: true,
                message: `${kidData.lastName} modifié`,
                type: 'success'
            })
            clear();
        }
    };

    //Date format
    const year = new Date(kidData.age).getFullYear() ; // Getting current year from the created Date object
    const monthWithOffset = new Date(kidData.age).getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
    const month = // Setting current Month number from current Date object
        monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
            ? `0${monthWithOffset}`
            : monthWithOffset;
    const date =
        new Date(kidData.age).getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
            ? `0${new Date(kidData.age).getUTCDate()}`
            : new Date(kidData.age).getUTCDate();

    const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>


    return (

    <div>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${kid.lastName}"` : null}</Typography>
                <TextField
                    name="lastName"
                    variant="outlined"
                    label="prenom"
                    fullWidth
                    value={kidData.lastName}
                    onChange={(e) => setKidData({ ...kidData, lastName: e.target.value })} />
                <TextField
                    name="name"
                    variant="outlined"
                    label="nom"
                    fullWidth
                    value={kidData.name}
                    onChange={(e) => setKidData({ ...kidData, name: e.target.value })} />
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <div>
                    <InputLabel>Sexe</InputLabel>
                    <Select
                        value={kidData.gender}
                        onChange={handleChangeSexe}
                    >
                        <MenuItem value={'boy'}>Garçon</MenuItem>
                        <MenuItem value={'girl'}>fillette</MenuItem>
                    </Select>
                </div>
                    <TextField
                        id="date"
                        label="Date de naissance"
                        type="date"
                        defaultValue={materialDateInput}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={event => {kidData.age=new Date(event.target.value)}}
                    />

            </Grid>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setKidData({ ...kidData, photo: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
        <AlertNotification
            notify={notify}
            setNotify={setNotify}
        />
    </div>
    );
};

export default FormKid;
