import React, { useEffect, useState, useRef } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { addHeader } from '../../features/header';
import Social from './../../images/social.gif'
import Woman from './../../images/woman.png'
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import Logo from './../../images/logo-new-dark.png'
import API from '../../api';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
        fontSize: "20px",
        textAlign: "center",
    },

})

export default function SignUp() {

    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("Error");
    const [successMsg, setSuccessMsg] = React.useState("Successful");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const headerVisibility = useSelector((state) => state.header)
    const classes = useStyles();
    const inputFNameRef = useRef()
    const inputLNameRef = useRef()
    const inputEmailRef = useRef()
    const inputPasswordRef = useRef()

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleError = () => {
        setError(true);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
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
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
        });
        let body = {
            fullName: data.get('firstName') + ' ' + data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            role: 'user',
            predictionCount : 0,
            predictionCountLimit : 0,
            paymentType: 'none',
            paymentID: 'none',
            subscriptionPlan: 'none',
            subscriptionType: 'none',
            subscriptionEndDate : 'none',
            subscriptionDate : 'none',
            subscriptionStatus : 'none'
        }
        try {
            const result = await API.post('user/create', body)
            console.log("hh", result)
            setSuccessMsg(result.data.message)
            handleClick()
            // navigate('/signIn')
            console.log("result", result)
            if (inputFNameRef.current || inputLNameRef.current || inputEmailRef.current || inputPasswordRef.current) {
                inputFNameRef.current.value = "";
                inputLNameRef.current.value = "";
                inputEmailRef.current.value = "";
                inputPasswordRef.current.value = "";
            }
        } catch (error) {
            setErrorMsg(error.response.data.message)
            handleError()
            console.log("error", error.response.data.message)
            if (inputFNameRef.current || inputLNameRef.current || inputEmailRef.current || inputPasswordRef.current) {
                inputFNameRef.current.value = "";
                inputLNameRef.current.value = "";
                inputEmailRef.current.value = "";
                inputPasswordRef.current.value = "";
            }
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
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {successMsg}
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error">{errorMsg}</Alert>
            </Snackbar>
            <img src={Logo} onClick={() => { navigate(`/`); dispatch(addHeader({ 'header': true, 'footer': true })) }} style={{ cursor: 'pointer', position: 'absolute', left: '0', top: '0', width: '180px' }} />
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
                    <CssBaseline />
                    {/* <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}> */}
                    <div style={{ display: 'flex ' }}>
                        <div style={{ width: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className={classes.titleTxt}>New Here? </div>
                            <div className={classes.subTitleTxt}>Sign up and discover great amount of new opportunities </div>
                            <Typography variant="overline" color="text.secondary" style={{ position: "relative" }}>
                                Already have an account? <span onClick={() => { navigate(`/signIn`); }} style={{ color: '#3200e6', fontWeight: 'bold', cursor: 'pointer' }}>Sign In</span>
                            </Typography>
                        </div>
                        <div style={{ display: 'flex ', width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img style={{ height: '350px', align: 'center', }} src={Woman} />
                        </div>
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
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            inputRef={inputFNameRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            inputRef={inputLNameRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            inputRef={inputEmailRef}
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
                                            inputRef={inputPasswordRef}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                {/* <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid> */}
                            </Box>
                        </Box>
                    </div>
                    {/* </Grid>
                        <Grid item xs={0} sm={6}>
                        <img style={{height:'100%',align:'center',}} src={Social}/>
                        </Grid >
                    </Grid> */}
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </div>
            </ThemeProvider>



        </div>
    );
}