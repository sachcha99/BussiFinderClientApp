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
import { FaUmbrellaBeach } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { MdOutlinePool } from 'react-icons/md';
import { RiParkingBoxLine } from 'react-icons/ri';
import { BsWind } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from './../../features/business';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';

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

    // useEffect(() => {
    //     dispatch(addBusiness({ 'type': 'restaurant' }))
    // }, []);

    useEffect(() => {
        if (businessDetails && businessDetails.value.length > 0) {
            console.log("businessDetails", businessDetails.value)
        }
    }, [businessDetails]);

    const { isLoaded } = useLoadScript({
        // Enter your own Google Maps API key
        googleMapsApiKey: "AIzaSyC_mV5GkYx8ULNDqXgwBobTczkM7j6T0uc"
    });

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Summary
            </Typography>
            {businessDetails && businessDetails.value[0].type == 'hotel' ?
                <List disablePadding sx={{ paddingInline: 2 }}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <FaUmbrellaBeach style={{ color: '#ff802f', fontSize: '18px', marginRight: '8px' }} /> <ListItemText primary="Beach Access" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.beach ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <MdOutlinePool style={{ color: '#344ab1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Pool Availabily" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.pool ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <AiOutlineWifi style={{ color: '#4534b1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="WiFi Availabily" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.wifi ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <RiParkingBoxLine style={{ color: '#b13434', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Parking Availabily" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.parking ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <BsWind style={{ color: '#34b13f', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="A/C Availabily" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.ac ? `Available` : `Not Available`}</Typography>
                    </ListItem>
                </List> :
                businessDetails && businessDetails.value[0].type == 'restaurant' ?
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <AiOutlineClockCircle style={{ color: '#1d7e20', fontSize: '20px', marginRight: '8px' }} />  <ListItemText primary="Opening Hours" />

                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.opening}</Typography>
                        </ListItem>

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <AiOutlineClockCircle style={{ color: '#ff462f', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Closing Hours" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.closing}</Typography>
                        </ListItem>

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <MdOutlineDeliveryDining style={{ color: '#2f8eff', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Delivery" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.delivery == 'Delivery' ? `Available` : businessDetails.value[0].serviceDetails.delivery}</Typography>
                        </ListItem>


                    </List>
                    : <div></div>}
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h6" gutterBottom sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        Location : {position && (
                            <div style={{ fontSize: "12px", marginTop: '5px', color: '#c4c2c0', fontStyle: 'italic' }}>
                                ({position.lat}, {position.lng})
                            </div>
                        )}
                    </Typography>
                    <div>
                        {isLoaded ?
                            <div>
                                <GoogleMap
                                    // onClick={e => setClickedLatLng(e.latLng.toJSON())}
                                    center={center}
                                    zoom={zoom}
                                    mapContainerStyle={{
                                        height: "35vh",
                                    }}
                                >
                                    {position &&
                                        <MarkerF
                                            position={position}

                                        // Not required, but if you want a custom icon:
                                        />}


                                </GoogleMap>

                                {/* Our center position always in state */}
                                {/* <h3>
            Center {center.lat}, {center.lng}
          </h3> */}

                                {/* Position of the user's map click */}
                                {/* {position && (
                                    <div>
                                        <h3>
                                            Coordinates of the Selected Location:</h3> <span> {position.lat}, {position.lng}</span>
                                    </div>
                                )} */}

                                {/* Position of the user's map click */}
                                {/* {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>} */}
                            </div> : <div>Loading...</div>}
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}