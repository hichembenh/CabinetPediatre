import React, {useState} from "react";
import {Button, Container, Grid, Grow, Typography} from "@material-ui/core";
import {updateUser} from "../../actions/user";
import {useDispatch} from "react-redux";
import useStyles from '../Form/styles'
import validateInfo from "../Form/validateInfo";
import CustomizedTables from "../Table/RdvTable";
import AuthForm from "../Form/authForm";

const Profile = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        firstName:JSON.parse(localStorage.getItem('profile')).result.firstName,
        lastName:JSON.parse(localStorage.getItem('profile')).result.lastName,
        numTel:JSON.parse(localStorage.getItem('profile')).result.numTel,
        email:JSON.parse(localStorage.getItem('profile')).result.email,
        password:'',
        confirmPassword:''
    })
    const [errors,setErrors] = useState({})

    const handleSubmit = () =>{
        console.log(user)
        setErrors(validateInfo(user))
        dispatch(updateUser(localStorage.getItem('userId'), user));
    }

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