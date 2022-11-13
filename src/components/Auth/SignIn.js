import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BgImage from './../../images/signupBg.png'
import Rectangle from './../../images/Rectangle.png'
import { addHeader } from '../../features/header';
import Social from './../../images/social.gif'
import Businessman from './../../images/businessman.png'
import { makeStyles } from '@mui/styles';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Logo from './../../images/logo-new-dark.png'
import API from '../../api';
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';
import { login, register, userInfo } from '../../features/user';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FacebookButton = styled(Button)(() => ({
    transitionProperty: "box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    borderRadius: "4px",
    height: "48px",
    width: "100%",
    fontSize: "15px",
    fontWeight: "bold",
    background: "#4c69ba",
    border: "none",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "plex-sans, sans-serif",
    outline: "none",
    cursor: "pointer",
    textTransform: "none",
    elevation: "0",
    marginBottom: "16px",
    '&:hover': {
        backgroundColor: "#4c69ba",
    },

}));

const GoogleButton = styled(Button)(() => ({
    transitionProperty: "box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    borderRadius: "4px",
    height: "48px",
    width: "100%",
    fontSize: "15px",
    fontWeight: "600",
    background: "none",
    border: "1px solid #a3afaf",
    color: "#2e3333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    outline: "none",
    cursor: "pointer",
    WebkitFontSmoothing: "antialiased",
    textDecoration: "none",
    webkitAppearance: "none",
    mozAppearance: "none",
    appearance: "none",
    fontFamily: "plex-sans, sans-serif",
    minHeight: "48px",
    padding: " 12px 24px",
    textTransform: "none",
    elevation: "0",
    marginBottom: "16px",
    '&:hover': {
        background: "none",
    },

}));

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const useStyles = makeStyles({
    titleTxt: {
        color: "#000",
        fontSize: "38px",
        fontWeight: "bold",
        textAlign: "center",


    },
    subTitleTxt: {
        paddingTop: '18px',
        paddingBottom: '40px',
        color: "#000",
        fontSize: "18px",
        textAlign: "center",
    },

})
export default function SignIn() {

    let navigate = useNavigate();
    const headerVisibility = useSelector((state) => state.header)
    const classes = useStyles();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.user)
    const clientId = '380810221970-6p2h323ibdoknuaddgrb432skkdm157o.apps.googleusercontent.com'
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Error");

    useEffect(() => {
        console.log("userDetails", userDetails);

    }, [userDetails]);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.GOOGLE_CLIENT_ID,
                scope: ""
            })
        }
        gapi.load('client:auth2', start)
    }, []);


    const responseFacebook = (response) => {
        console.log("FB", response);
    }

    const handleError = () => {
        setError(true);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    }

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS!", res.profileObj)
        if (res.profileObj) {
            let body = {
                fullName: res.profileObj.name,
                email: res.profileObj.email,
                password: res.profileObj.googleId,
                role: 'user',
                emailToken: null,
                isVerified: true,
                predictionCount : 0,
                predictionCountLimit : 0,
                subscriptionType : 'none',
                paymentType: 'none',
                paymentID: 'none',
                subscriptionPlan: 'none',
                subscriptionEndDate : 'none',
                subscriptionDate : 'none',
                subscriptionStatus : 'none',

            }

            API.post('/user/getUser', body)
                .then(function (response) {
                    console.log("responseeeeeeeee",response)
                    if (response.data.length === 0) {


                        API.post('user/createGoogleUser', body)
                            .then(function (response) {
                                API.post('user/validate', body).then(function (result) {
                                    console.log("result", result)
                                    let decodedToken = jwt_decode(result.data.user)
                                    localStorage.setItem('token', result.data.user)
                                    dispatch(login({ 'fullName': decodedToken.fullName, 'email': decodedToken.email }))
                                    dispatch(userInfo(result.data.userDetails))
                                    dispatch(addHeader({ 'header': true, 'footer': true }))
                                    navigate('/')
                                })
                                    .catch(function (error) {
                                        console.log(error);
                                        setErrorMsg(error.response.data.message)
                                        handleError()
                                    });

                            })
                            .catch(function (error) {
                                console.log(error);
                                setErrorMsg(error.response.data.message)
                                handleError()
                            });
                    } else {
                        API.post('user/validate', body).then(function (result) {
                            console.log("result", result)
                            let decodedToken = jwt_decode(result.data.user)
                            console.log("decodedToken", decodedToken)

                            localStorage.setItem('token', result.data.user)
                            dispatch(login({ 'fullName': decodedToken.fullName, 'email': decodedToken.email }))
                            dispatch(userInfo(result.data.userDetails))
                            dispatch(addHeader({ 'header': true, 'footer': true }))
                            navigate('/')
                        })
                            .catch(function (error) {
                                console.log(error);
                                setErrorMsg(error.response.data.message)
                                handleError()
                            });

                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setErrorMsg(error.response.data.message)
                    handleError()
                });
        }
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED!", res)
        setErrorMsg("Google Login Failed")
        handleError()
    }

    useEffect(() => {
        dispatch(addHeader({ 'header': false, 'footer': false }))
    }, []);

    useEffect(() => {
        console.log("headerVisibilityeee", headerVisibility.value)
    }, [headerVisibility]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        let body = {
            email: data.get('email'),
            password: data.get('password')
        }


        try {
            const result = await API.post('user/validate', body)
            console.log("result", result)
            let decodedToken = jwt_decode(result.data.user)
            console.log("decodedToken", decodedToken)

            localStorage.setItem('token', result.data.user)
            dispatch(login({ 'fullName': decodedToken.fullName, 'email': decodedToken.email }))
            dispatch(userInfo(result.data.userDetails))
            dispatch(addHeader({ 'header': true, 'footer': true }))
            navigate('/')
        } catch (error) {
            console.log("errrrr",error)
            setErrorMsg(error.response.data.message)
            handleError()
        }


    };

    return (
        <div style={{
            paddingTop: '50px',
            backgroundImage: `url(${BgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">{errorMsg}</Alert>
            </Snackbar>
            <ThemeProvider theme={theme}>
                <div style={{
                    paddingTop: '50px',
                    // backgroundImage: `url(${Rectangle})`,
                    backgroundColor: '#fff',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 'fit-content',
                    width: '80%',
                    padding: '15px',
                    borderRadius: '35px',
                    boxShadow: '4px 5px 45px #070707',
                }} component="main" maxWidth="md">

                    <img src={Logo} onClick={() => { navigate(`/`); dispatch(addHeader({ 'header': true, 'footer': true })) }} style={{ cursor: 'pointer', position: 'absolute', left: '0', top: '0', width: '180px' }} />
                    <CssBaseline />
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}> */}
                    <div style={{ display: 'flex ' }}>

                        <Box
                            sx={{
                                width: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                paddingInline: '30px'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="Remember Me"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Typography variant="overline" color="text.secondary" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                                    <span style={{ fontWeight: 'bold' }}>or</span>
                                </Typography>
                                <FacebookLogin
                                    appId="728817248189489"
                                    callback={responseFacebook}
                                    fields="name,email,picture"
                                    render={renderProps => (
                                        <FacebookButton onClick={renderProps.onClick} variant="contained" startIcon={<FacebookRoundedIcon />}>Continue With Facebook</FacebookButton>
                                    )}
                                />

                                <GoogleLogin
                                    clientId={clientId}
                                    render={renderProps => (
                                        <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" startIcon={<FcGoogle />}>Continue With Google</GoogleButton>
                                    )}
                                    buttonText="Login"
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                // isSignedIn={true}
                                />
                            </Box>
                        </Box>
                        <div style={{ display: 'flex ', width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img style={{ height: '500px', align: 'center', }} src={Businessman} />
                        </div>
                        <div style={{ width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className={classes.titleTxt}>Hello Friend! </div>
                            <div className={classes.subTitleTxt}>To keep connected with us please login wih your personal information</div>
                            <Typography variant="overline" color="text.secondary" style={{ position: "relative" }}>
                                Need an account? <span onClick={() => { navigate(`/signUp`) }} style={{ color: '#3200e6', fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</span>
                            </Typography>
                        </div>

                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}