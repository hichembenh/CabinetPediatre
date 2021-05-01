import React, {useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    Typography,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
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

const initialState={firstName:'', lastName:'',numTel:'',email:'',password:'',confirmPassword:''};
const Login= () => {

    const [isSignUp,setIsSignUp]=useState(false);
    const classes = useStyles();
    const [form, setForm] = useState(initialState);
    const disp = useDispatch();
    const history = useHistory();

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
        if (form.email.length<=4){

        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (form.email.length<=4){
            alert("email incorrect")
        }else {
            if (isSignUp){

                disp(signup(form,history))
            }else{
                disp(signin(form,history))
            }
        }

    }
    const switchMode = () =>{
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp)
    }
    const googleSuccess = (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try{
            disp({type: 'AUTH', data:{result,token}})
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
                        {isSignUp ?('Sign up'):('Sign in')}
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}

                        />
                        {isSignUp && (
                            <>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    autoComplete="lastName"
                                    autoFocus
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Num telephone"
                                    name="numTel"
                                    autoComplete="numTel"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        {isSignUp && (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        )}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {isSignUp? ('Sign up'):('Sign in')}
                        </Button>
                        <GoogleLogin
                            clientId={"790897231344-t3gdj672gnr7sk6n1eftal9fvgf9u1r2.apps.googleusercontent.com"}
                            render={(renderProps)=>(
                                <Button className={classes.googleButton} fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                    Sign up with google
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
                                        Forgot password?
                                    </Link>
                                </Grid>
                            )}

                            <Grid item>
                                <Link onClick={switchMode} variant="body2">
                                    {isSignUp ? ("Already have an account? Sing In"):("Don't have an account? Sign Up")}
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