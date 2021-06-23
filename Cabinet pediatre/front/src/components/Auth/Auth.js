import React, {useEffect, useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Typography,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid
} from '@material-ui/core';
import useStyles from "./styles";
import GoogleLogin from "react-google-login";
import Icon from './icon';
import {useDispatch} from "react-redux";
import {useHistory}from "react-router-dom";
import {signup,signin} from '../../actions/auth'
import validateInfo, {isEmpty} from "../Form/validateInfo";
import ReactGA from "react-ga";

const initialState={firstName:'', lastName:'',numTel:'',email:'',password:'',confirmPassword:''};
const Login= () => {

    const [isSignUp,setIsSignUp]=useState(false);
    const [form, setForm] = useState(initialState);
    const [errors,setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [validate,setValidate]= useState(false)
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
            if (isSignUp){
                setErrors(validateInfo(form))
                if (isEmpty(errors))
                {
                    dispatch(signup(form,history))
                    ReactGA.event({
                        category:'User',
                        action:"Ajout d'utilisateur"
                    })
                }
            }else{
                dispatch(signin(form,history))
            }
    }
    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && submitting) {
                setValidate(true);
            }
        },
        [errors]
    );
    const switchMode = () =>{
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp)
    }
    const googleSuccess = (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            dispatch({type: 'AUTH', data:{result,token}})
            history.push('./')
        }catch (error){
            console.log(error);
        }
    }
    const googleFailure = () =>{
        console.log('Google sign in failed')
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {!isSignUp ?("S'identifier"):('Créer un compte')}
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Adresse email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                        {isSignUp && (
                            <>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Prenom"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    onChange={handleChange}
                                />
                                {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Nom de famille"
                                    name="lastName"
                                    autoComplete="lastName"
                                    autoFocus
                                    onChange={handleChange}
                                />
                                {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Numero telephone"
                                    name="numTel"
                                    autoComplete="numTel"
                                    autoFocus
                                    onChange={handleChange}
                                />
                                {errors.numTel && <p style={{ color: 'red' }}>{errors.numTel}</p>}
                            </>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        {errors.password && <p  style={{ color: 'red' }}>{errors.password}</p>}
                        {isSignUp && (
                            <>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmer le mot de passe"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
                            </>
                            )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {!isSignUp? ("S'identifier"):('Créer un compte')}
                        </Button>
                        <GoogleLogin
                            clientId={"790897231344-t3gdj672gnr7sk6n1eftal9fvgf9u1r2.apps.googleusercontent.com"}
                            render={(renderProps)=>(
                                <Button className={classes.googleButton} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                    S'inscrire avec Google
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"

                        >
                        </GoogleLogin>
                        <Grid container>
                            {!isSignUp && (<Grid item xs>
                                    <Link href="#" variant="body2">
                                        Mot de passe oublié ?
                                    </Link>
                                </Grid>
                            )}

                            <Grid item>
                                <Link onClick={switchMode} variant="body2">
                                    {isSignUp ? ("Vous avez deja un compte ? s'identifier"):("Vous n'avez pas de compte ? Créer un compte")}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}


export default Login;