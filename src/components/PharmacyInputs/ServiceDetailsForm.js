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
import {FaRegCreditCard} from 'react-icons/fa';
import {BsFillClockFill} from 'react-icons/bs';
import {FaWheelchair} from 'react-icons/fa';
import {GrWheelchairActive} from 'react-icons/gr';
import {BsCashCoin} from 'react-icons/bs';
import {TbTruckDelivery} from 'react-icons/tb'

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 50,
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
    const [pharmacyServiceDetails, setPharmcyServiceDetails] = useState({
        open: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.open ? businessDetails.value[0].serviceDetails.open : false,
        whlentrence: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.whlentrence ? businessDetails.value[0].serviceDetails.whlentrence : false,
        whlpark: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.whlpark ? businessDetails.value[0].serviceDetails.whlpark : false,
        cash: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.cash ? businessDetails.value[0].serviceDetails.cash : false,
        card: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.card ? businessDetails.value[0].serviceDetails.card : false,
        deliver: businessDetails && businessDetails.value[0].serviceDetails && businessDetails.value[0].serviceDetails.deliver ? businessDetails.value[0].serviceDetails.deliver : false,
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (businessDetails && businessDetails.value.length > 0) {
            console.log("businessDetails", businessDetails.value)
            setPharmcyServiceDetails(businessDetails.value[0].serviceDetails);
        }
    }, [businessDetails]);

    useEffect(() => {
        console.log("serviceDetails", pharmacyServiceDetails)
        dispatch(addBusiness({
            ...businessDetails.value[0], serviceDetails: pharmacyServiceDetails
        }))
    }, [pharmacyServiceDetails]);

    const handlePharmacyChanges = e => {
        const { name, checked } = e.target;
        setPharmcyServiceDetails({ ...pharmacyServiceDetails, [name]: checked });
    }

    return (
            businessDetails && businessDetails.value[0].type == 'pharmacy' ?
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Availability of the services 
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                        <BsFillClockFill style={{color:'#ff802f',fontSize:'28px'}}/>
                        <FormControlLabel
                            control={
                                <IOSSwitch
                                    sx={{ m: 1 ,}}
                                    name="open"
                                    onChange={handlePharmacyChanges}
                                    checked={pharmacyServiceDetails.open} />
                                }
                            label="Open 24 Hours"
                            labelPlacement="start"
                        />
                    </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <TbTruckDelivery style={{color:'#800040',fontSize:'40px'}}/>
                        <FormControlLabel
                            control={<IOSSwitch
                                sx={{ m: 1 }}
                                name="deliver"
                                onChange={handlePharmacyChanges}
                                checked={pharmacyServiceDetails.deliver} />}
                            label="Delivery Service"
                            labelPlacement="start"
                        />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <FaWheelchair style={{color:'#344ab1',fontSize:'45px'}}/>
                            <FormControlLabel
                                control={
                                
                                    <IOSSwitch
                                        sx={{ m: 1 }}
                                        name="whlentrence"
                                        onChange={handlePharmacyChanges}
                                        checked={pharmacyServiceDetails.whlentrence} />}
                                label="Wheel Chair Accesible Entrance"
                                labelPlacement="start"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <GrWheelchairActive style={{color:'#9370db',fontSize:'45px'}}/>
                        <FormControlLabel
                            control={<IOSSwitch
                                sx={{ m: 1 }}
                                name="whlpark"
                                onChange={handlePharmacyChanges}
                                checked={pharmacyServiceDetails.whlpark} />}
                            label="Wheel Chair Accesible Car Park"
                            labelPlacement="start"
                        />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <BsCashCoin style={{color:'#34b13f',fontSize:'30px'}}/>
                        <FormControlLabel
                            control={<IOSSwitch
                                sx={{ m: 1 }}
                                name="cash"
                                onChange={handlePharmacyChanges}
                                checked={pharmacyServiceDetails.cash} />}
                            label="Cash Payment"
                            labelPlacement="start"
                        />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
                            <FaRegCreditCard style={{color:'#006400',fontSize:'30px'}}/>
                        <FormControlLabel
                            control={<IOSSwitch
                                sx={{ m: 1 }}
                                name="card"
                                onChange={handlePharmacyChanges}
                                checked={pharmacyServiceDetails.card} />}
                            label="Card Payment"
                            labelPlacement="start"
                        />
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>
                : <div></div>
    );
}