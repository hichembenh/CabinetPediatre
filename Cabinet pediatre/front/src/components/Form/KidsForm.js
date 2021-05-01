import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useStyles from './styles';
import {createKid, updateKid} from "../../actions/kids";

const FormKid = ({ currentId, setCurrentId }) => {

    const [kidData, setKidData] = useState({ name: '', lastName: '', photo:'', age: new Date()});

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
    const onChangeDate = date => {
        setStartDate(date)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createKid(kidData));
            console.log(startDate.toDateString())
            console.log(kidData.age)
            console.log(kidData)
            clear();
        } else {
            setKidData({...kidData, [e.target.age]: startDate.toDateString()})
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
                <DatePicker
                    selected={startDate}
                    variant="outlined"
                    label="Date de naissance"
                    value={startDate}
                    fullWidth
                    onChange={onChangeDate}
                    isClearable
                    showYearDropdown
                    scrollableMonthYearDropdown
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