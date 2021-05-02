import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { deleteKid } from '../../../actions/kids';
import useStyles from './styles';
import RdvModel from '../../RDV/rdvModel'
import {Button, Card, CardActions, CardMedia, Grid, Typography} from "@material-ui/core";


const Kid = ({ kid, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [rdvModeltest,setRdvModeltest]=useState(false)

    const showRdvModel = () =>{
        setRdvModeltest(!rdvModeltest)
    }

    return (
        <>
            <Card className={classes.card}>
        {rdvModeltest ? (
            <RdvModel
                showModal={rdvModeltest}
                setShowModal={setRdvModeltest}
                kid={kid}
            />        ):(
                <Card>
                <CardMedia className={classes.media} image={kid.photo || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={kid.firstName} />
                <div className={classes.overlay}>
                    <Typography variant="h1">{kid.lastName} {kid.name}</Typography>
                    <Typography variant="h4">{new Date(kid.age).toLocaleDateString()}</Typography>
                    <Typography variant="h6">{kid.gender}</Typography>
                </div>
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={() => {
                        setCurrentId(kid._id)
                        console.log(new Date(kid.age).getFullYear())
                    }}><MoreHorizIcon fontSize="default" /></Button>
                </div>
                <Typography className={classes.age} gutterBottom variant="h5" component="h2">{kid.title}</Typography>

                </Card>
                )}
                <CardActions className={classes.cardActions}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Button size="small" color="primary" onClick={() => dispatch(deleteKid(kid._id))}><DeleteIcon fontSize="small" /> Supprimer</Button>
                        <Button size="small" color="primary"><AssignmentIcon fontSize="small"/> Fiche patient</Button>
                        <Button size="large" color="primary" onClick={showRdvModel}><AddBoxIcon fontSize="small"/> Demander un rendez-vous</Button>
                    </Grid>
                </CardActions>
            </Card>
        </>
    );
};

export default Kid;
