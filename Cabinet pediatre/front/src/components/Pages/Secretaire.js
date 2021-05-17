import React, {useEffect, useState} from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import useStyles from './style'
import {Button, Container, Grid, Modal, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getKids} from "../../actions/kids";
import Kid from "../Posts/Post/Kid";
import CustomizedTables from "../Table/RdvTable";
import Calendar from "../Calendar/calendar";
import KidsPost from "../Posts/Kids";

const Secretaire = ()=> {
    const [openCalendar,setOpenCalendar] = useState(false)
    const classes = useStyles()
    const kids = useSelector((state)=>  state.kids )
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getKids())
    },[dispatch]);

    const handleOpenCalendar = () => {
        setOpenCalendar(!openCalendar);
    };
    console.log(kids)
    return(
        <>
            <Container>
                <Modal
                    open={openCalendar}
                    onClose={handleOpenCalendar}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Calendar/>
                </Modal>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Button variant="outlined" color="primary" onClick={handleOpenCalendar} className={classes.buttons}>Calendrier</Button>
                </Grid>
                <div>
                    <CustomizedTables/>
                </div>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={1}>
                                <Paper>
                                    <KidsPost/>
                                </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            </>
    )
}
export default Secretaire

