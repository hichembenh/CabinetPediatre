import React, {useState} from "react";
import {Button, Container, Grid, Grow, Paper, TextField, Typography} from "@material-ui/core";
import {updateUser} from "../../actions/auth";
import {useDispatch} from "react-redux";
import useStyles from '../Form/styles'
import validateInfo from "../Form/validateInfo";
import CustomizedTables from "../Table/RdvTable";

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
                            <Grid item xs={2} sm={5}>
                                <Paper>
                                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                                        <Typography variant='h6'>
                                            Mettez a jour votre profile
                                        </Typography>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Adresse email"
                                            value={user.email}
                                            autoComplete="email"
                                            autoFocus
                                            onChange={(e)=> setUser({...user, email:e.target.value})}
                                        />
                                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Prenom"
                                            value={user.firstName}
                                            autoComplete="lastName"
                                            autoFocus
                                            onChange={(e)=> setUser({...user, firstName:e.target.value})}
                                        />
                                        {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Nom de famille"
                                            value={user.lastName}
                                            name="firstName"
                                            autoComplete="firstName"
                                            autoFocus
                                            onChange={(e)=> setUser({...user, lastName:e.target.value})}
                                        />
                                        {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Numero telephone"
                                            value={user.numTel}
                                            autoComplete="numTel"
                                            autoFocus
                                            onChange={(e)=> setUser({...user, numTel:e.target.value})}
                                        />
                                        {errors.numTel && <p style={{ color: 'red' }}>{errors.numTel}</p>}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={user.password}
                                            label="Mot de passe"
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={(e)=>{ setUser({...user, password: e.target.value})}}
                                        />
                                        {errors.password && <p  style={{ color: 'red' }}>{errors.password}</p>}
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            value={user.confirmPassword}
                                            label="Confirmer le mot de passe"
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={(e) => { setUser({...user, confirmPassword: e.target.value})}}
                                        />
                                        {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                        >
                                            Modifier
                                        </Button>
                                    </form>
                                </Paper>
                            </Grid>
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