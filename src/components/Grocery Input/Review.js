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
import { BiWorld } from 'react-icons/bi';
import { AiOutlineShoppingCart, AiFillCalendar } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";

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
            {businessDetails && businessDetails.value[0].type == 'Grocery' ?
                <List disablePadding sx={{ paddingInline: 2 }}>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <AiOutlineShoppingCart style={{ color: '#ff802f', fontSize: '18px', marginRight: '8px' }} /> <ListItemText primary="In-Store-Shopping" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.shopping ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <TbTruckDelivery style={{ color: '#344ab1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Delivery Service" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.delivery ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <BiWorld style={{ color: '#4534b1', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="WebSite Availability" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.web ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <RiParkingBoxLine style={{ color: '#b13434', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Parking Availabily" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.parking ? `Available` : `Not Available`}</Typography>
                    </ListItem>

                    <ListItem sx={{ py: 1, px: 0 }}>
                        <AiFillCalendar style={{ color: '#34b13f', fontSize: '20px', marginRight: '8px' }} /> <ListItemText primary="Available Days" />
                    </ListItem>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.mon ? `Monday, ` : ``}</Typography>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.tue ? `Tuesday, ` : ``}</Typography>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.wedn ? `Wednesday, ` : ``}</Typography>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.thurs ? `Thursday, ` : ``}</Typography>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.fri ? `Friday, ` : ``}</Typography>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.sat ? `Saturday, ` : ``}</Typography>
                    <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.sun ? `Sunday` : ``}</Typography>

                </List> :
                businessDetails && businessDetails.value[0].type == 'restaurant' ?
                    <List disablePadding>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Opening Hours" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.opening}</Typography>
                        </ListItem>

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Closing Hours" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.closing}</Typography>
                        </ListItem>

                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary="Delivery" />
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{businessDetails.value[0].serviceDetails.delivery == 'Delivery' ? `Available` : businessDetails.value[0].serviceDetails.delivery}</Typography>
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