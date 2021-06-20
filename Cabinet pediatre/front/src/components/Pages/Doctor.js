import React, {useEffect, useState} from 'react'
import {Button, Card, CardActions, CardContent, Container, Grid, Modal, Typography} from "@material-ui/core";
import useStyles from './style'
import UsersTable from '../Table/UsersTable'
import Kids from "../Pages/Kids";
import Calendar from "../Calendar/calendar";
import {getRdvs} from "../../actions/rdv";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment/moment";

const Doctor = () =>{
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const calendar = (
        <div>
            <Calendar/>
        </div>
    )
    const today = moment()
    const rdvs = useSelector((state) => state.rdv)
    useEffect(() => {
        dispatch(getRdvs());
    }, [dispatch]);
    let todayRDV = 0
    rdvs.map(rdv=>{return moment(rdv.dateDebut)}).forEach(rdv =>{
        if (today.day()===rdv.day()){
            todayRDV++
        }})
    const handleOpen = () => {
        setOpen(!open);
    };

    return(
        <>
            <Container>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <Grid item>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Vous avez {todayRDV} rendez-vous aujourd'hui
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleOpen}>Consulter le calendrier</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Votre dernier rendez-vous pour aujourd'hui est a 16h
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"></Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item>
                <Card className={classes.root} variant="outlined">

                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Les vaccins
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"></Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
                <UsersTable/>
                <Kids/>
            </Container>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {calendar}
            </Modal>
        </>
    )
}

export default Doctor