import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {
    useLoadScript,
    GoogleMap,
    MarkerF,
    InfoWindow
} from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from '../../features/business';
import { FaRegCreditCard } from 'react-icons/fa';
import { BsFillClockFill } from 'react-icons/bs';
import { FaWheelchair } from 'react-icons/fa';
import { GrWheelchairActive } from 'react-icons/gr';
import { BsCashCoin } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb'

export default function Review() {
    const businessDetails = useSelector((state) => state.business)
    const [center, setCenter] = useState({
        lat: businessDetails && businessDetails.value[0].latitude ? businessDetails.value[0].latitude : '',
        lng: businessDetails && businessDetails.value[0].longitude ? businessDetails.value[0].longitude : '',
    });
    const [position, setPosition] = useState({
        lat: businessDetails && businessDetails.value[0].latitude ? businessDetails.value[0].latitude : '',
        lng: businessDetails && businessDetails.value[0].longitude ? businessDetails.value[0].longitude : '',

    });
    const [zoom, setZoom] = useState(9);
    const [clickedLatLng, setClickedLatLng] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (businessDetails && businessDetails.value.length > 0) {
            console.log("businessDetails", businessDetails.value)
        }
    }, [businessDetails]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyC_mV5GkYx8ULNDqXgwBobTczkM7j6T0uc"
    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Summary
            </Typography>
            {businessDetails && businessDetails.value[0].type == 'pharmacy' ?
                <List disablePadding sx={{ paddingInline: 2 }}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <BsFillClockFill style={{ color: '#ff802f', fontSize: '18px', marginRight: '8px' }} /> <ListItemText primary="Open 24 Hours" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.open ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <TbTruckDelivery style={{ color: '#800040', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Delivery Service" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.deliver ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <FaWheelchair style={{ color: '#344ab1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Wheel Chair Accesible Entrance" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.whlentrence ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <GrWheelchairActive style={{ color: '#9370db', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Wheel Chair Accesible Car Park" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.whlpark ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <BsCashCoin style={{ color: '#34b13f', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Cash Payment" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.cash ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <FaRegCreditCard style={{ color: '#006400', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Card Payment" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.card ? `Available` : `Not Available`}</Typography>
                    </ListItem>
                </List>
                : <div></div>}
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        Location {position && (
                            <div style={{ fontSize: "12px", marginTop: '5px', color: '#c4c2c0', fontStyle: 'italic' }}>
                                ({position.lat}, {position.lng})
                            </div>
                        )}
                    </Typography>
                    <div>
                        {isLoaded ?
                            <div>
                                <GoogleMap
                                    center={center}
                                    zoom={zoom}
                                    mapContainerStyle={{
                                        height: "35vh",
                                    }}
                                >
                                    {position &&
                                        <MarkerF
                                            position={position}
                                        />}
                                </GoogleMap>
                            </div> : <div>Loading...</div>}
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}