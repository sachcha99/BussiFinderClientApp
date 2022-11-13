import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocationDetails from './LocationDetails';
import ServiceDetailsForm from './ServiceDetailsForm';
import Review from './Review';
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from '../../features/business';
import API from './../../api';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import { FillingBottle } from "react-cssfx-loading";
import { TypeAnimation } from 'react-type-animation';


const NextBtn = styled(Button)(() => ({
    height: "40px",
    width: "110px",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "6px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "plex-sans, sans-serif",
    outline: "none",
    cursor: "pointer",
    textTransform: "none",
    elevation: "1",
    marginTop: "26px",
    /* "to left" / "to right" - affects initial color */
    background: 'linear-gradient(to left, #302954 50%, #252744 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },
}));


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                BussiFinder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Location Details', 'Service Based details', 'Review'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <LocationDetails />;
        case 1:
            return <ServiceDetailsForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function InputDetails() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = React.useState(0);
    const businessDetails = useSelector((state) => state.business)
    let navigate = useNavigate();
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    // useEffect(() => {
    //     dispatch(addBusiness({ 'type': 'restaurant' }))
    // }, []);

    useEffect(() => {
        if (businessDetails && businessDetails.value.length > 0) {
            console.log("businessDetails", businessDetails.value)
        }
    }, [businessDetails]);

    const headers = {
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1 && businessDetails && businessDetails.value[0].type == 'hotel') {
            handleToggle()
            let body = {
                "latitude": businessDetails.value[0].latitude,
                "longitude": businessDetails.value[0].longitude
            }

            API.post('hotel/transportationmodes', body, headers).then(function (transportModesResult) {
                API.post('hotel/attractionplaces', body, headers).then(function (attractionplacesResult) {
                    API.post('hotel/nearbyhotel', body, headers)
                        .then(function (nearByHotelResult) {
                            // let starRating = result.data.rating;
                            // let latitude = lat;
                            // let longitude = lng;
                            let transportationModesCount = transportModesResult.data.transportationmodes_count;
                            let attractionPlacesCount = attractionplacesResult.data.attractionplaces_count;
                            let nearByHotelReviewCount = nearByHotelResult.data.rating_count;
                            let competitors = nearByHotelResult.data.hotel_count;
                            console.log("API Result", transportationModesCount, attractionPlacesCount, nearByHotelReviewCount, competitors, businessDetails.value[0].serviceDetails)
                            let mlReqBody = {
                                "AttractionPlace": attractionPlacesCount,
                                "TransportationModes": transportationModesCount,
                                "NearByHotelReviewCount": nearByHotelReviewCount,
                                "CompetitorsCount": competitors,
                                "Wifi": businessDetails.value[0].serviceDetails.wifi ? 1 : 0,
                                "PoolAccess": businessDetails.value[0].serviceDetails.pool ? 1 : 0,
                                "Aircondition": businessDetails.value[0].serviceDetails.ac ? 1 : 0,
                                "ParkingArea": businessDetails.value[0].serviceDetails.parking ? 1 : 0,
                                "BeachAccess": businessDetails.value[0].serviceDetails.beach ? 1 : 0

                            }
                            let locationFeatures = {
                                attractionPlacesCount: attractionPlacesCount,
                                transportationModesCount: transportationModesCount,
                                nearByHotelReviewCount: nearByHotelReviewCount,
                                competitors: competitors
                            }

                            console.log("mlReqBody", mlReqBody)
                            API.post('restaurant/BusinessCount', body, headers)
                                .then(function (otherBusinessCount) {
                                    let BusinessCount = otherBusinessCount.data;
                                    axios.post('https://businesspredictor.herokuapp.com/hotel', mlReqBody)
                                        .then(function (ML_Result) {
                                            console.log("ML_Result", ML_Result)
                                            dispatch(addBusiness({
                                                ...businessDetails.value[0], locationFeatures: locationFeatures, businessCount: BusinessCount, ml_result: ML_Result.data.data
                                            }))
                                            if (businessDetails.value.length > 1) {
                                                navigate(`/multipleResult`)
                                            } else {
                                                navigate(`/result`)
                                            }
                                            handleClose()
                                        }).catch(function (error) {
                                            return error;
                                        });
                                }).catch(function (error) {
                                    return error;
                                });



                        }).catch(function (error) {
                            return error;
                        });
                }).catch(function (error) {
                    return error;
                })
            }).catch(function (error) {
                return error;
            })


        } else if (activeStep === steps.length - 1 && businessDetails && businessDetails.value[0].type == 'restaurant') {
            handleToggle()
            let body = {
                "latitude": businessDetails.value[0].latitude,
                "longitude": businessDetails.value[0].longitude
            }
            API.post('restaurant/Competitors', body, headers).then(function (competitors) {
                API.post('restaurant/Education', body, headers).then(function (education) {
                    API.post('restaurant/WorkPlaces', body, headers)
                        .then(function (workPlaces) {

                            API.post('restaurant/ShoppingMallsCount', body, headers)
                                .then(function (response) {
                                    console.log("ShoppingMallsCount", response.data.totalShoppingMallsCount)
                                    API.post('restaurant/DistanceToCity', body, headers)
                                        .then(function (res) {
                                            let distance = (res.data).split(' ');
                                            let Competitors = competitors.data.totalRestaurantsCount;
                                            let EducationRelatedPlacesCount = education.data.totalEducationRelatedPlacesCount;
                                            let WorkPlacesCount = workPlaces.data.totalWorkPlacesCount;
                                            let ShoppingMallsCount = response.data.totalShoppingMallsCount;
                                            let DistanceToCity = parseFloat(distance[0]);


                                            let mlReqBody = {
                                                "CompetitorsCount": Competitors,
                                                "EducationRelatedPlacesCount": EducationRelatedPlacesCount,
                                                "WorkPlacesCount": WorkPlacesCount,
                                                "ShoppingMallsCount": ShoppingMallsCount,
                                                "DistanceToCity": DistanceToCity,
                                                "OpeningHours": businessDetails.value[0].serviceDetails.opening == "24 hours" ? 0 : businessDetails.value[0].serviceDetails.opening == "Morning" ? 1 : 2,
                                                "ClosingHours": businessDetails.value[0].serviceDetails.opening == "Late Night" ? 0 : businessDetails.value[0].serviceDetails.opening == "Night" ? 1 : 2,
                                                "Delivery": businessDetails.value[0].serviceDetails.delivery == "Contactless Delivery" ? 0 : businessDetails.value[0].serviceDetails.opening == "Delivery" ? 1 : 2,


                                            }
                                            let locationFeatures = {
                                                competitors: Competitors,
                                                educationRelatedPlacesCount: EducationRelatedPlacesCount,
                                                workPlacesCount: WorkPlacesCount,
                                                shoppingMallsCount: ShoppingMallsCount,
                                                distanceToCity: DistanceToCity
                                            }

                                            console.log("mlReqBody", mlReqBody)
                                            API.post('restaurant/BusinessCount', body, headers)
                                                .then(function (otherBusinessCount) {
                                                    let BusinessCount = otherBusinessCount.data;
                                                    axios.post('https://businesspredictor.herokuapp.com/restaurant', mlReqBody)
                                                        .then(function (ML_Result) {
                                                            console.log("ML_Result", ML_Result)
                                                            dispatch(addBusiness({
                                                                ...businessDetails.value[0], locationFeatures: locationFeatures, businessCount: BusinessCount, ml_result: ML_Result.data.data
                                                            }))
                                                            if (businessDetails.value.length > 1) {
                                                                navigate(`/multipleResult`)
                                                            } else {
                                                                navigate(`/result`)
                                                            }
                                                            handleClose()
                                                        }).catch(function (error) {
                                                            return error;
                                                        });
                                                }).catch(function (error) {
                                                    return error;
                                                });


                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }).catch(function (error) { })
            }).catch(function (error) { });
        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <Container component="main" maxWidth={activeStep == 0 ? "md" : "sm"} sx={{ p: 8 ,boxSizing:"border-box",}}>
                <Paper variant="outlined" 
                sx={{
                p: 3,
                border:'none',
                borderRadius:"15px",
                boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
                boxSizing:"border-box"
                }}>
                    <Typography component="h1" variant="h4" align="center">
                        {businessDetails && businessDetails.value[0].type == 'hotel' ? `Hotel` : businessDetails.value[0].type == 'restaurant' ? `Restaurant` : businessDetails.value[0].type == 'pharmacy' ? `Pharmacy` : `Grocery`} Site Selection
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            // <Backdrop
                            //     sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            //     open={open}
                            //     onClick={handleClose}
                            // >
                                <React.Fragment>
                                    {/* <Typography variant="h5" gutterBottom>
                                        Finalizing the Result.
                                    </Typography>
                                    <CircularProgress color="inherit" /> */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            backgroundColor: '#65646e',
                                            color: 'black',
                                            gap: 2,
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            boxSizing: 'border-box',
                                            backgroundImage:'url(https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
                                            padding:"10px",
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            backgroundBlendMode: 'overlay',
                                            
                                        }}
                                    >
                                        <FillingBottle color="#101554" width="50px" height="50px" duration="3s" />
                                        <TypeAnimation
                                            sequence={[
                                                'Loading', // Types 'One'
                                                2000, // Waits 1s
                                                'Analyzing', // Deletes 'One' and types 'Two'
                                                4000, // Waits 2s
                                                'Finalizing the Result.', // Types 'Three' without deleting 'Two'
                                                () => {
                                                console.log('Done typing!'); // Place optional callbacks anywhere in the array
                                                }
                                            ]}
                                            wrapper="div"
                                            cursor={true}
                                            repeat={Infinity}
                                            style={{ fontSize: '2em',color:"#101554" }}
                                            />
                                       
                                    </Box>
                                
                                </React.Fragment>


                            // </Backdrop>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1, color: '#33449e' }}>
                                            Back
                                        </Button>
                                    )}

                                    <NextBtn
                                        variant="contained"
                                        onClick={handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Proceed' : 'Next'}
                                    </NextBtn>
                                </Box>
                            </React.Fragment>)}
                    </React.Fragment>

                </Paper>
                {/* <Copyright /> */}
            </Container>
        </ThemeProvider>
    );
}