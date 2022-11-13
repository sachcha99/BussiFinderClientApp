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
import {FaUmbrellaBeach} from 'react-icons/fa';
import {AiOutlineWifi} from 'react-icons/ai';
import {MdOutlinePool} from 'react-icons/md';
import {RiParkingBoxLine} from 'react-icons/ri';
import {BiWorld} from 'react-icons/bi';
import { AiOutlineShoppingCart,AiFillCalendar } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";

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
    // const [hotelServiceDetails, setHotelServiceDetails] = useState({
    //     pool: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.pool ? businessDetails.value[0].serviceDetails.pool : false,
    //     beach: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.beach ? businessDetails.value[0].serviceDetails.beach : false,
    //     wifi: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.wifi ? businessDetails.value[0].serviceDetails.wifi : false,
    //     ac: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.ac ? businessDetails.value[0].serviceDetails.ac : false,
    //     parking: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.parking ? businessDetails.value[0].serviceDetails.parking : false,
    // })

    const [groceryServiceDetails, setGroceryServiceDetails] = useState({
        shopping: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.shopping ? businessDetails.value[0].serviceDetails.shopping : false,
        delivery: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.delivery ? businessDetails.value[0].serviceDetails.delivery : false,
        web: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.web ? businessDetails.value[0].serviceDetails.web : false,
        parking: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.parking ? businessDetails.value[0].serviceDetails.parking : false,
        sun: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.sun ? businessDetails.value[0].serviceDetails.sun : false,
        mon: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.mon ? businessDetails.value[0].serviceDetails.mon : false,
        tue: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.tue ? businessDetails.value[0].serviceDetails.tue : false,
        wedn: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.wedn ? businessDetails.value[0].serviceDetails.wedn : false,
        thurs: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.thurs ? businessDetails.value[0].serviceDetails.thurs : false,
        fri: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.fri ? businessDetails.value[0].serviceDetails.fri : false,
        sat: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.sat ? businessDetails.value[0].serviceDetails.sat : false,
    })


    // const [restaurantServiceDetails, setRestaurantServiceDetails] = useState({
    //     opening: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.opening ? businessDetails.value[0].serviceDetails.opening : false,
    //     closing: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.closing ? businessDetails.value[0].serviceDetails.closing : false,
    //     delivery: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.delivery ? businessDetails.value[0].serviceDetails.delivery : false,
    // })
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(addBusiness({ 'type': 'restaurant' }))
    // }, []);

    useEffect(() => {
        if (businessDetails && businessDetails.value.length > 0) {
            console.log("businessDetails", businessDetails.value)
            setGroceryServiceDetails(businessDetails.value[0].serviceDetails);
        }
    }, [businessDetails]);

    useEffect(() => {
        console.log("serviceDetails", groceryServiceDetails)
        dispatch(addBusiness({
            ...businessDetails.value[0], serviceDetails: groceryServiceDetails
        }))
    }, [groceryServiceDetails]);


    const GroceryServiceValues = e => {
        const { name, checked } = e.target;
        setGroceryServiceDetails({ ...groceryServiceDetails, [name]: checked });
    }



    return (
        businessDetails && businessDetails.value[0].type == 'Grocery' ?
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Availability of the services 
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <AiOutlineShoppingCart style={{color:'#ff802f',fontSize:'18px'}}/>
                        <FormControlLabel
                            control={
                                <IOSSwitch
                                    sx={{ m: 1 ,}}
                                    name="shopping"
                                    onChange={GroceryServiceValues}
                                    checked={groceryServiceDetails.shopping} />
                                }
                            label="In-Store-Shopping"
                            labelPlacement="start"
                        />
                    </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <TbTruckDelivery style={{color:'#344ab1',fontSize:'20px'}}/>
                            <FormControlLabel
                                control={
                                
                                    <IOSSwitch
                                        sx={{ m: 1 }}
                                        name="delivery"
                                        onChange={GroceryServiceValues}
                                        checked={groceryServiceDetails.delivery} />}
                                label="Delivery Service"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <BiWorld style={{color:'#4534b1',fontSize:'20px'}}/>
                        <FormControlLabel
                            control={<IOSSwitch
                                sx={{ m: 1 }}
                                name="web"
                                onChange={GroceryServiceValues}
                                checked={groceryServiceDetails.web} />}
                            label="WebSite Availability"
                            labelPlacement="start"
                        />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <RiParkingBoxLine style={{color:'#b13434',fontSize:'20px'}}/>
                        <FormControlLabel
                            control={<IOSSwitch
                                sx={{ m: 1 }}
                                name="parking"
                                onChange={GroceryServiceValues}
                                checked={groceryServiceDetails.parking} />}
                            label="Parking Availability"
                            labelPlacement="start"
                        />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <AiFillCalendar style={{color:'#b13434',fontSize:'20px'}}/>
                            <Typography variant="h9" gutterBottom >
                    Available Days
                    
                </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                   
                        </div>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <FormControlLabel control={<Checkbox defaultUnChecked 
                                name="mon"
                                onChange={GroceryServiceValues}
                                checked={groceryServiceDetails.mon}/>} 
                                label="Monday" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>     
                        <FormControlLabel control={<Checkbox defaultUnChecked 
                        name="tue"
                        onChange={GroceryServiceValues}
                        checked={groceryServiceDetails.tue}/>}
                        label="Tuesday" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>          
                        <FormControlLabel control={<Checkbox defaultUnChecked
                        name="wedn"
                        onChange={GroceryServiceValues}
                        checked={groceryServiceDetails.wedn} />} 
                        label="Wednesday" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>             
                        <FormControlLabel control={<Checkbox defaultUnChecked 
                        name="thurs"
                        onChange={GroceryServiceValues}
                        checked={groceryServiceDetails.thurs}
                        />} label="Thursday" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>              
                        <FormControlLabel control={<Checkbox defaultUnChecked 
                        name="fri"
                        onChange={GroceryServiceValues}
                        checked={groceryServiceDetails.fri}
                        />} label="Friday" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <FormControlLabel control={<Checkbox defaultUnChecked 
                        name="sat"
                        onChange={GroceryServiceValues}
                        checked={groceryServiceDetails.sat}
                        />} label="Saturday" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <FormControlLabel control={<Checkbox defaultUnChecked 
                        name="sun"
                        onChange={GroceryServiceValues}
                        checked={groceryServiceDetails.sun}
                        />} label="Sunday" />
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
          
                : <div></div>
    );
}