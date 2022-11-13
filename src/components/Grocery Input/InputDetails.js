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
import API from '../../api';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

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

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1 && businessDetails && businessDetails.value[0].type == 'Grocery') {
            handleToggle()
            let body = {
                "latitude": businessDetails.value[0].latitude,
                "longitude": businessDetails.value[0].longitude
            }

            API.post('grocery/grocerycompetitor',body).then((competResult)=>{
                const competitorsCount = competResult.data.CompetitorCount
                
                API.post('grocery/grocerytraffci',body).then((trafficResult)=>{
                    const trafficSum = trafficResult.data.TraffciSummation
                
                    console.log("comp:",competitorsCount,"traffic:",trafficSum)

                    let groceryModelReq = {
                                            "Trafficflow": trafficSum,
                                            "Competitors": competitorsCount,
                                            "Instoreshopping": businessDetails.value[0].serviceDetails.shopping ? 1 : 0,
                                            "Delivery": businessDetails.value[0].serviceDetails.delivery ? 1 : 0,
                                            "Website": businessDetails.value[0].serviceDetails.web ? 1 : 0,
                                            "Sunday": businessDetails.value[0].serviceDetails.sun ? 1 : 0,
                                            "Monday": businessDetails.value[0].serviceDetails.mon ? 1 : 0,
                                            "Tuesday": businessDetails.value[0].serviceDetails.tue ? 1 : 0,
                                            "Wednesday": businessDetails.value[0].serviceDetails.wedn ? 1 : 0,
                                            "Thursday": businessDetails.value[0].serviceDetails.thurs ? 1 : 0,
                                            "Friday": businessDetails.value[0].serviceDetails.fri ? 1 : 0,
                                            "Saturday": businessDetails.value[0].serviceDetails.sat ? 1 : 0,
                                            "ParkingArea": businessDetails.value[0].serviceDetails.parking ? 1 : 0
                    }

                    let locationFeatures = {
                        trafficSum: trafficSum,
                        competitorsCount: competitorsCount,
                                         }
                    axios.post(' http://127.0.0.1:5000/grocery', groceryModelReq)
                                                .then(function (GroceryResult) {
                                                    console.log("Prediction", GroceryResult.data)
                                                    dispatch(addBusiness({
                                                    ...businessDetails.value[0], locationFeatures: locationFeatures, ml_result: GroceryResult.data.data
                                                    }))
                                                    navigate(`/result`)
                                                    handleClose()
                                                }).catch((error)=>{
                                                    console.log("error:",error)
                                                })

                  

                }      
                ).catch((error)=>{
                    return error
                })
            }      
            ).catch((error)=>{
                return error
            })

        


            // API.post('hotel/transportationmodes', body).then(function (transportModesResult) {
            //     API.post('hotel/attractionplaces', body).then(function (attractionplacesResult) {
            //         API.post('hotel/nearbyhotel', body)
            //             .then(function (nearByHotelResult) {
            //                 // let starRating = result.data.rating;
            //                 // let latitude = lat;
            //                 // let longitude = lng;
            //                 let transportationModesCount = transportModesResult.data.transportationmodes_count;
            //                 let attractionPlacesCount = attractionplacesResult.data.attractionplaces_count;
            //                 let nearByHotelReviewCount = nearByHotelResult.data.rating_count;
            //                 let competitors = nearByHotelResult.data.hotel_count;
            //                 console.log("API Result", transportationModesCount, attractionPlacesCount, nearByHotelReviewCount, competitors, businessDetails.value[0].serviceDetails)
            //                 let mlReqBody = {
            //                     "AttractionPlace": attractionPlacesCount,
            //                     "TransportationModes": transportationModesCount,
            //                     "NearByHotelReviewCount": nearByHotelReviewCount,
            //                     "CompetitorsCount": competitors,
            //                     "Wifi": businessDetails.value[0].serviceDetails.wifi ? 1 : 0,
            //                     "PoolAccess": businessDetails.value[0].serviceDetails.pool ? 1 : 0,
            //                     "Aircondition": businessDetails.value[0].serviceDetails.ac ? 1 : 0,
            //                     "ParkingArea": businessDetails.value[0].serviceDetails.parking ? 1 : 0,
            //                     "BeachAccess": businessDetails.value[0].serviceDetails.beach ? 1 : 0

            //                 }
            //                 let locationFeatures = {
            //                     attractionPlacesCount: attractionPlacesCount,
            //                     transportationModesCount: transportationModesCount,
            //                     nearByHotelReviewCount: nearByHotelReviewCount,
            //                     competitors: competitors
            //                 }

            //                 console.log("mlReqBody", mlReqBody)
            //                 API.post('restaurant/BusinessCount', body)
            //                     .then(function (otherBusinessCount) {
            //                         let BusinessCount = otherBusinessCount.data;
            //                         axios.post('https://businesspredictor.herokuapp.com/hotel', mlReqBody)
            //                             .then(function (ML_Result) {
            //                                 console.log("ML_Result", ML_Result)
            //                                 dispatch(addBusiness({
            //                                     ...businessDetails.value[0], locationFeatures: locationFeatures, businessCount: BusinessCount, ml_result: ML_Result.data.data
            //                                 }))
            //                                 navigate(`/result`)
            //                                 handleClose()
            //                             }).catch(function (error) {
            //                                 return error;
            //                             });
            //                     }).catch(function (error) {
            //                         return error;
            //                     });



            //             }).catch(function (error) {
            //                 return error;
            //             });
            //     }).catch(function (error) {
            //         return error;
            //     })
            // }).catch(function (error) {
            //     return error;
            // })


        // } else if (activeStep === steps.length - 1 && businessDetails && businessDetails.value[0].type == 'restaurant') {
        //     handleToggle()
        //     let body = {
        //         "latitude": businessDetails.value[0].latitude,
        //         "longitude": businessDetails.value[0].longitude
        //     }
        //     API.post('restaurant/Competitors', body).then(function (competitors) {
        //         API.post('restaurant/Education', body).then(function (education) {
        //             API.post('restaurant/WorkPlaces', body)
        //                 .then(function (workPlaces) {

        //                     API.post('restaurant/ShoppingMallsCount', body)
        //                         .then(function (response) {
        //                             console.log("ShoppingMallsCount", response.data.totalShoppingMallsCount)
        //                             API.post('restaurant/DistanceToCity', body)
        //                                 .then(function (res) {
        //                                     let distance = (res.data).split(' ');
        //                                     let Competitors = competitors.data.totalRestaurantsCount;
        //                                     let EducationRelatedPlacesCount = education.data.totalEducationRelatedPlacesCount;
        //                                     let WorkPlacesCount = workPlaces.data.totalWorkPlacesCount;
        //                                     let ShoppingMallsCount = response.data.totalShoppingMallsCount;
        //                                     let DistanceToCity = parseFloat(distance[0]);


        //                                     let mlReqBody = {
        //                                         "CompetitorsCount": Competitors,
        //                                         "EducationRelatedPlacesCount": EducationRelatedPlacesCount,
        //                                         "WorkPlacesCount": WorkPlacesCount,
        //                                         "ShoppingMallsCount": ShoppingMallsCount,
        //                                         "DistanceToCity": DistanceToCity,
        //                                         "OpeningHours": businessDetails.value[0].serviceDetails.opening == "24 hours" ? 0 : businessDetails.value[0].serviceDetails.opening == "Morning" ? 1 : 2,
        //                                         "ClosingHours": businessDetails.value[0].serviceDetails.opening == "Late Night" ? 0 : businessDetails.value[0].serviceDetails.opening == "Night" ? 1 : 2,
        //                                         "Delivery": businessDetails.value[0].serviceDetails.delivery == "Contactless Delivery" ? 0 : businessDetails.value[0].serviceDetails.opening == "Delivery" ? 1 : 2, 


        //                                     }
        //                                     let locationFeatures = {
        //                                         competitors: Competitors,
        //                                         educationRelatedPlacesCount: EducationRelatedPlacesCount,
        //                                         workPlacesCount: WorkPlacesCount,
        //                                         shoppingMallsCount: ShoppingMallsCount,
        //                                         distanceToCity: DistanceToCity
        //                                     }

        //                                     console.log("mlReqBody", mlReqBody)
        //                                     API.post('restaurant/BusinessCount', body)
        //                                         .then(function (otherBusinessCount) {
        //                                             let BusinessCount = otherBusinessCount.data;
        //                                             axios.post('https://businesspredictor.herokuapp.com/restaurant', mlReqBody)
        //                                                 .then(function (ML_Result) {
        //                                                     console.log("ML_Result", ML_Result)
        //                                                     dispatch(addBusiness({
        //                                                         ...businessDetails.value[0], locationFeatures: locationFeatures, businessCount: BusinessCount, ml_result: ML_Result.data.data
        //                                                     }))
        //                                                     navigate(`/result`)
        //                                                     handleClose()
        //                                                 }).catch(function (error) {
        //                                                     return error;
        //                                                 });
        //                                         }).catch(function (error) {
        //                                             return error;
        //                                         });


        //                                 })
        //                                 .catch(function (error) {
        //                                     console.log(error);
        //                                 });
        //                         })
        //                         .catch(function (error) {
        //                             console.log(error);
        //                         });

        //                 })
        //                 .catch(function (error) {
        //                     console.log(error);
        //                 });
        //         }).catch(function (error) { })
        //     }).catch(function (error) { });
        }

    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth={activeStep == 0 ? "md" : "sm"} sx={{ mb: 4 ,}}>
                <Paper variant="outlined" 
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } ,
                border:'none',
                borderRadius:"15px",
                boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
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
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            >
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Finalizing the Result.
                                    </Typography>
                                    <CircularProgress color="inherit" />
                                </React.Fragment>


                            </Backdrop>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Proceed' : 'Next'}
                                    </Button>
                                </Box>
                            </React.Fragment>)}
                    </React.Fragment>

                </Paper>
                {/* <Copyright /> */}
            </Container>
        </ThemeProvider>
    );
}