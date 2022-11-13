import React,{ useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Map from './Map';
import Button from '@mui/material/Button';
import API from '../api';
import { useNavigate } from 'react-router';
import axios from 'axios';

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
const useStyles = makeStyles((theme) => ({
    titleTxt:{
        color:'#231D4F',
        fontSize:'29px',
        fontWeight:'600',
        marginBottom:'1rem'
    },
    subTxt:{
        color:'#888888',
        fontSize:'14px',
        fontWeight:'400',
        marginBottom:'1rem'
    },
}));
const FactorDetails = () => {
const theme = createTheme();
const classes = useStyles();
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
                                        // handleRestaurantNext(body,locationFeatures,BusinessCount,ML_Result.data.data);
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

const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);

const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
};

const handleClose = (event) => {
if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
}

setOpen(false);
};

function handleListKeyDown(event) {
    if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
    } else if (event.key === 'Escape') {
    setOpen(false);
    }
}

// return focus to the button when we transitioned from !open -> open
const prevOpen = React.useRef(open);
React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
    anchorRef.current.focus();
    }

    prevOpen.current = open;
}, [open]);
return (
    <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',
            width:'100%',
            backgroundColor:'#E4E6F1',
            padding:'2rem',
            paddingInline:'10rem',
            boxSizing:'border-box',
        }}
    > 
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            boxSizing:'border-box',
            width:'100%',
            height:'100%',
        }}
        >
            <div className={classes.titleTxt}>Predict, the success of your new business</div>
            <div className={classes.subTxt}>Select a method from below two types according to your need.</div>
            <ThemeProvider theme={theme}>
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
                        
                <div>
                    <Map/>
                </div>
                <Stack direction="row" spacing={2}>
                    <div>
                        <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        >
                        Radius
                        </Button>
                        <NextBtn  color="primary" onClick={()=> handleNext()} sx={{float:"right"}}>Proceed</NextBtn>
                        <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        >
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>
                    </div>
                    </Stack>
               
            </Paper>
            </Container>
        </ThemeProvider>
        </Box>
    </Box>
)
}

export default FactorDetails