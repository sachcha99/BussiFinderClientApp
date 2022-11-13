import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from './../../features/business';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { MdOutlinePool } from 'react-icons/md';
import { RiParkingBoxLine } from 'react-icons/ri';
import { BsWind } from 'react-icons/bs';
import {BsClockHistory} from 'react-icons/bs';
import {BsClock} from 'react-icons/bs';
import {MdOutlineDeliveryDining} from 'react-icons/md';
import {AiOutlineClockCircle} from 'react-icons/ai';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    titleTxtFlex: {
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
      

    }
});


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

export default function ServiceDetailsForm() {
    const businessDetails = useSelector((state) => state.business)
    const classes = useStyles();
    const [hotelServiceDetails, setHotelServiceDetails] = useState({
        pool: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.pool ? businessDetails.value[0].serviceDetails.pool : false,
        beach: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.beach ? businessDetails.value[0].serviceDetails.beach : false,
        wifi: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.wifi ? businessDetails.value[0].serviceDetails.wifi : false,
        ac: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.ac ? businessDetails.value[0].serviceDetails.ac : false,
        parking: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.parking ? businessDetails.value[0].serviceDetails.parking : false,
    })
    const [restaurantServiceDetails, setRestaurantServiceDetails] = useState({
        opening: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.opening ? businessDetails.value[0].serviceDetails.opening : "Morning",
        closing: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.closing ? businessDetails.value[0].serviceDetails.closing : "Night",
        delivery: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.delivery ? businessDetails.value[0].serviceDetails.delivery : "Contactless Delivery",
    })
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(addBusiness({ 'type': 'restaurant' }))
    // }, []);

    useEffect(() => {
        if (businessDetails && businessDetails.value.length > 0) {
            console.log("businessDetails", businessDetails.value)
            setHotelServiceDetails(businessDetails.value[0].serviceDetails);
        }
    }, [businessDetails]);

    useEffect(() => {
        if (businessDetails.value[0].type == 'hotel') {
            console.log("serviceDetails", hotelServiceDetails)
            dispatch(addBusiness({
                ...businessDetails.value[0], serviceDetails: hotelServiceDetails
            }))
        }

    }, [hotelServiceDetails]);


    useEffect(() => {
        if (businessDetails.value[0].type == 'restaurant') {

            console.log("serviceDetails", restaurantServiceDetails)

            dispatch(addBusiness({
                ...businessDetails.value[0], serviceDetails: restaurantServiceDetails
            }))
        }
    }, [restaurantServiceDetails]);

    const handleSwitchChange = e => {
        const { name, checked } = e.target;
        setHotelServiceDetails({ ...hotelServiceDetails, [name]: checked });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurantServiceDetails({ ...restaurantServiceDetails, [name]: value });
    };

    return (
        businessDetails && businessDetails.value[0].type == 'hotel' ?
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Availability of the services
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <FaUmbrellaBeach style={{ color: '#ff802f', fontSize: '18px' }} />
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        sx={{ m: 1, }}
                                        name="beach"
                                        onChange={handleSwitchChange}
                                        checked={hotelServiceDetails.beach} />
                                }
                                label="Beach Access"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <MdOutlinePool style={{ color: '#344ab1', fontSize: '20px' }} />
                            <FormControlLabel
                                control={

                                    <IOSSwitch
                                        sx={{ m: 1 }}
                                        name="pool"
                                        onChange={handleSwitchChange}
                                        checked={hotelServiceDetails.pool} />}
                                label="Pool Availability"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <AiOutlineWifi style={{ color: '#4534b1', fontSize: '20px' }} />
                            <FormControlLabel
                                control={<IOSSwitch
                                    sx={{ m: 1 }}
                                    name="wifi"
                                    onChange={handleSwitchChange}
                                    checked={hotelServiceDetails.wifi} />}
                                label="WiFi Availability"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <RiParkingBoxLine style={{ color: '#b13434', fontSize: '20px' }} />
                            <FormControlLabel
                                control={<IOSSwitch
                                    sx={{ m: 1 }}
                                    name="parking"
                                    onChange={handleSwitchChange}
                                    checked={hotelServiceDetails.parking} />}
                                label="Parking Availability"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <BsWind style={{ color: '#34b13f', fontSize: '20px' }} />
                            <FormControlLabel
                                control={<IOSSwitch
                                    sx={{ m: 1 }}
                                    name="ac"
                                    onChange={handleSwitchChange}
                                    checked={hotelServiceDetails.ac} />}
                                label="A/C Availability"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
            :
            businessDetails && businessDetails.value[0].type == 'restaurant' ?
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Availability of the services
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <FormControl
                                sx={{
                                    color: '#434445',
                                    mt: 1,
                                }}
                            >
                                <FormLabel id="demo-radio-buttons-group-label" className={classes.titleTxtFlex}><AiOutlineClockCircle style={{ color: '#1d7e20', fontSize: '22px' }} /> Opening Hours</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="opening"
                                    value={restaurantServiceDetails.opening}
                                    onChange={handleChange}
                                    sx={{
                                        ml:3
                                    }}
                                >
                                    <FormControlLabel value="Morning" control={<Radio />} label="Morning" />
                                    <FormControlLabel value="Evening" control={<Radio />} label="Evening" />
                                    <FormControlLabel value="24 hours" control={<Radio />} label="24 hours" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl
                            sx={{
                                color: '#434445',
                            }}
                            >
                                <FormLabel id="demo-radio-buttons-group-label" className={classes.titleTxtFlex}><AiOutlineClockCircle style={{ color: '#ff462f', fontSize: '22px' }}/>Closing Hours</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="closing"
                                    value={restaurantServiceDetails.closing}
                                    onChange={handleChange}
                                    sx={{
                                        ml:3
                                    }}
                                >
                                    <FormControlLabel value="Night" control={<Radio />} label="Night" />
                                    <FormControlLabel value="Late Night" control={<Radio />} label="Late Night" />
                                    <FormControlLabel value="24 hours" control={<Radio />} label="24 hours" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} >
                            <FormControl
                                sx={{
                                    color: '#434445',
                                }}
                            >
                                <FormLabel id="demo-radio-buttons-group-label" className={classes.titleTxtFlex}><MdOutlineDeliveryDining style={{ color: '#2f8eff', fontSize: '22px',fontWeight:200 }} /> Delivery Availability</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="delivery"
                                    value={restaurantServiceDetails.delivery}
                                    onChange={handleChange}
                                    sx={{
                                        ml:3
                                    }}
                                >
                                    <FormControlLabel value="Contactless Delivery" control={<Radio />} label="Contactless Delivery" />
                                    <FormControlLabel value="Delivery" control={<Radio />} label="Delivery" />
                                    <FormControlLabel value="No Delivery" control={<Radio />} label="No Delivery" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </React.Fragment>
                : <div></div>
    );
}