import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStyles from './styles';
import {createKid, updateKid} from "../../actions/kids";

const FormKid = ({ currentId, setCurrentId }) => {
    const [kidData, setKidData] = useState({ name: '', lastName: '', photo: '', age: ''});
    const kid = useSelector((state) => (currentId ? state.kids.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (kid) setKidData(kid);
    }, [kid]);

    const clear = () => {
        setCurrentId(0);
        setKidData({ name: '', lastName: '', photo: '', age: ''});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            setKidData({...kidData, [e.target.age]: startDate})
            dispatch(createKid(kidData));
            console.log(kidData)
            clear();
        } else {
            dispatch(updateKid(currentId, kidData));
            console.log(kidData)
            clear();
        }
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${kid.firstName}"` : 'Ajouter un enfant'}</Typography>
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
                <TextField
                    id="date"
                    label="Date de naissance"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={startDate}
                    value={kidData.age}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setKidData({ ...kidData, photo: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default FormKid;
/*<DatePicker
    name="age"
    variant="outlined"
    label="age"
    fullWidth
    value={kidData.age}
    onChange={(e) => setKidData({ ...kidData, lastName: e.target.value })} />*/