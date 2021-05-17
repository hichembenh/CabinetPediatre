import React, {useState} from "react";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {updateUser} from "../../actions/user";
import {useDispatch} from "react-redux";
import useStyles from './styles'
import validateInfo from "./validateInfo";

const AuthForm = ({old}) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        id:old._id,
        firstName:old.firstName,
        lastName:old.lastName,
        numTel:old.numTel,
        email:old.email,
        password:'',
        confirmPassword:''
    })
    console.log(old)
    const [errors,setErrors] = useState({})

    const handleSubmit = () =>{
        console.log(user)
        setErrors(validateInfo(user))
        dispatch(updateUser(old._id, user));
    }

    return (
        <>
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
        </>
    )
}
export default AuthForm