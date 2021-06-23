import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, Grid, Modal, Paper, TextField, Typography} from "@material-ui/core";
import {updateUser} from "../../actions/user";
import {useDispatch} from "react-redux";
import useStyles from './styles'
import validateInfo, {isEmpty} from "./validateInfo";
import AlertNotification from "../Confirm/alert";
import ReactGA from "react-ga";

const AuthForm = ({old}) => {

    const actifUser= JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles()
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        id:old._id,
        firstName:old.firstName,
        lastName:old.lastName,
        numTel:old.numTel,
        email:old.email,
        isSec:Boolean(old.isSec),
        password:'',
        confirmPassword:''
    })
    console.log(user)
    const [errors,setErrors] = useState({})
    const [notify,setNotify] = useState({
        isOpen:false,
        message:'',
        type:''
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors(validateInfo(user))
        if(isEmpty(errors)) {
            dispatch(updateUser(old._id, user));
            setNotify({
                isOpen: true,
                message: `${user.firstName} ${user.lastName} mis a jour`,
                type: 'success'
            })
            ReactGA.event({
                category:'User',
                action:"Modification d'un utilisateur"
            })
        }}

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
                        <br></br>
                        {actifUser.result.isAdmin &&
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={user.isSec}
                                    onChange={(e)=>{
                                        setUser({...user,isSec: Boolean(e.target.value)})
                                    }}
                                    color="primary"
                                />
                            }
                            label="Secretaire ?"
                        />
                        }
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
            <AlertNotification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
export default AuthForm