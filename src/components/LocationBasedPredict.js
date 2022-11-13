import Typography from '@mui/material/Typography';
import React,{ useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { addBusiness } from '../features/business';
import { FillingBottle } from "react-cssfx-loading";
import { TypeAnimation } from 'react-type-animation';
import API from '../api';
import axios from 'axios';
import Map from './Map';

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
    alignSelf: "flex-end",
    /* "to left" / "to right" - affects initial color */
    background: 'linear-gradient(to left, #302954 50%, #252744 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },
}));

const LocationBasedPredict = () => {
const theme = createTheme();
const themeColor = useSelector((state) => state.theme.value);
const businessDetails = useSelector((state) => state.business);
const [isResLoading, setIsResLoading] = useState(false);
const [isHotelLoading, setIsHotelLoading] = useState(false);
const dispatch = useDispatch();
let navigate = useNavigate();

const headers = {
    headers: {
        'x-access-token': localStorage.getItem('token')
    }
};

const handleNext = () => {
    console.log("next")
    setIsHotelLoading(true);
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
                            axios.post('https://businesssuccesspredictor.herokuapp.com/hotelLocationBase', mlReqBody)
                                .then(function (ML_Result) {
                                    // console.log("ML_Result1", ML_Result)
                                    // dispatch(addBusiness({
                                    //     ...businessDetails.value[0], HotelFeatures: locationFeatures, HotelbusinessCount: BusinessCount, Hotelml_result: ML_Result.data.data
                                    // })) 
                                        handleRestaurantNext(body,locationFeatures,BusinessCount,ML_Result.data.data);
                                        setIsResLoading(true);
                                        setIsHotelLoading(false);
                                    // handleClose()
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


}

const handleRestaurantNext = (body,HotellocationFeatures,HotelBusinessCount,HotelML_Result) => {
    
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
                                        axios.post('https://businesssuccesspredictor.herokuapp.com/restaurantLocationBase', mlReqBody)
                                            .then(function (ML_Result) {
                                                // console.log("ML_Result2", ML_Result)
                                                dispatch(addBusiness({
                                                    ...businessDetails.value[0],HotelFeatures: HotellocationFeatures, HotelbusinessCount: HotelBusinessCount, Hotelml_result: HotelML_Result, RestaurantFeatures: locationFeatures, RestaurantCount: BusinessCount, Restaurant_ml_result: ML_Result.data.data
                                                }))
                                                setIsResLoading(false);
                                                navigate(`/resultWOTypes`)
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

return (
    <Box
    sx={{
        width:"100%",
        height:"100%",
        background : themeColor.status == 'light' ? '#F7F7F9':'#1c1c1c',
        boxSizing:"border-box",
        // backgroundImage: `url(${require('../images/about-shape-2.svg').default})`,
        backgroundImage:'url(https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
        padding:"10px",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment:'fixed',
    }}
    >

     {isHotelLoading == false && isResLoading == false ?   <ThemeProvider theme={theme}>
                <Container component="main" maxWidth={"md"} sx={{ p: 8 ,boxSizing:"border-box",}}>
                    <Paper variant="outlined" 
                    sx={{
                    p: 3,
                    border:'none',
                    borderRadius:"15px",
                    boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
                    boxSizing:"border-box",
                    display:"flex",
                    flexDirection:"column",
                    }}>
                        
                <Typography variant="h5" gutterBottom 
                sx={{
                    textAlign:"center",
                    mb:"20px",
                }}>
                Location Based Type Analysis
                </Typography>
                <div>
                    <Map/>
                </div>
                <NextBtn  color="primary" onClick={()=> handleNext()} sx={{float:"right"}}>Proceed</NextBtn>
            </Paper>
            </Container>
        </ThemeProvider>:

        isHotelLoading == true ?          
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
                                                'Analyzing Hotel', // Deletes 'One' and types 'Two'
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
                :
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
                        'Analyzing Restaurant', // Deletes 'One' and types 'Two'
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
        }
    </Box>
  )
}

export default LocationBasedPredict