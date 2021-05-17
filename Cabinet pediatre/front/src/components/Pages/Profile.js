import React, {useState} from "react";
import {Container, Grid, Grow, Typography} from "@material-ui/core";
import useStyles from '../Form/styles'
import CustomizedTables from "../Table/RdvTable";
import AuthForm from "../Form/authForm";

const Profile = () =>{
    const classes = useStyles()
    const [user,setUser] = useState({
        firstName:JSON.parse(localStorage.getItem('profile')).result.firstName,
        lastName:JSON.parse(localStorage.getItem('profile')).result.lastName,
        numTel:JSON.parse(localStorage.getItem('profile')).result.numTel,
        email:JSON.parse(localStorage.getItem('profile')).result.email,
        password:'',
        confirmPassword:''
    })


    return (
        <>
            <Container maxWidth='lg'>
                <Grow in>
                    <Container>
                        <Grid
                            container
                            justify="space-between"
                            alignItems="stretch"
                            spacing={2}
                        >
                            <AuthForm old={user}/>
                            <Grid item xs={7} sm={7}>
                                <Typography variant='h6'>
                                    Mes rendez-vous
                                </Typography>
                                <div className={classes.table}>
                                <CustomizedTables/>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    )
}
export default Profile