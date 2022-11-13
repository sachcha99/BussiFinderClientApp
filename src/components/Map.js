import React, { useState, Fragment, useEffect, useLayoutEffect } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow
} from "@react-google-maps/api";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from 'react-redux';
import { addBusiness } from '../features/business';

function Map() {
  const dispatch = useDispatch();
  const businessDetails = useSelector((state) => state.business)
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center, setCenter] = useState({ lat: 6.413355013047455, lng: 80.65627172543137 });
  const [position, setPosition] = useState({});
  const [zoom, setZoom] = useState(9);
  const [clickedLatLng, setClickedLatLng] = useState({
    lat: businessDetails && businessDetails.value[0].latitude ? businessDetails.value[0].latitude : '',
    lng: businessDetails && businessDetails.value[0].longitude ? businessDetails.value[0].longitude : '',
  });
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    // Enter your own Google Maps API key
    googleMapsApiKey: "AIzaSyC_mV5GkYx8ULNDqXgwBobTczkM7j6T0uc"
  });


  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    // setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 15) {
      setZoom(15);
    }

    // if you want to center the selected Marker
    setCenter(place)
  };






  useEffect(() => {
    if (clickedLatLng) {
      console.log('sqqqqqqqqqqqqqqqqqqqq')
      setPosition(clickedLatLng)
      console.log("clickedLatLng", clickedLatLng, businessDetails.value[0].type)
      dispatch(addBusiness({
        ...businessDetails.value[0],
        latitude: clickedLatLng.lat,
        longitude: clickedLatLng.lng
      }))
    }

  }, [clickedLatLng]);


  // useEffect(() => {
  //   dispatch(addBusiness({ 'type': 'restaurant' }))
  // }, []);

  useEffect(() => {
    if (businessDetails && businessDetails.value.length > 0) {
      console.log("businessDetails", businessDetails.value)
    }
  }, [businessDetails]);


  return (
    <div>
      {isLoaded ?
        <div>
          <GoogleMap
            onClick={e => setClickedLatLng(e.latLng.toJSON())}
            center={center}
            zoom={zoom}
            mapContainerStyle={{
              height: "70vh",
              borderRadius: '8px',
            }}
          >
            {position &&
              <MarkerF
                position={position}
                onLoad={marker => markerLoadHandler(marker, position)}
                onClick={event => markerClickHandler(event, position)}
              // Not required, but if you want a custom icon:
              />}


            {infoOpen && selectedPlace && (
              <InfoWindow
                anchor={markerMap[selectedPlace.id]}
                onCloseClick={() => setInfoOpen(false)}
              >
                <div>
                  <h3>{selectedPlace.id}</h3>
                  <div>This is your info window content</div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          {/* Our center position always in state */}
          {/* <h3>
            Center {center.lat}, {center.lng}
          </h3> */}

          {/* Position of the user's map click */}
          {clickedLatLng && (
            <div>
              {clickedLatLng.lat && clickedLatLng.lng &&
                <Box
                  sx={{
                    width: "fit-content",
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // background: "#0f4bfb4d",
                    borderRadius: "8px",
                    paddingInline: "10px",
                    mt: "10px",
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 200, marginLeft: "5px", width: 'fit-content' }}> Coordinates of the Selected Location </div>
                  <Box
                    sx={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      p: 1,
                      gap: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: "fit-content",
                        height: "fit-content",
                        background: "radial-gradient(circle, rgba(84,111,185,0.8074580173866421) 0%, rgba(53,141,198,0.7682423311121324) 100%)",
                        borderRadius: "15px",
                        boxShadow: 1,
                        padding: '5px',
                        paddingInline: '15px',
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: '400',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                      }}
                    >
                      Latitude : <div style={{ fontSize: '12px', fontWeight: 200, marginLeft: "5px" }}> {clickedLatLng.lat} </div>
                    </Box>
                    <Box
                      sx={{
                        width: "fit-content",
                        height: "fit-content",
                        background: "radial-gradient(circle, rgba(84,111,185,0.8074580173866421) 0%, rgba(53,141,198,0.7682423311121324) 100%)",
                        borderRadius: "15px",
                        boxShadow: 1,
                        padding: '5px',
                        paddingInline: '15px',
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: '400',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Longitude : <div style={{ fontSize: '12px', fontWeight: 200, marginLeft: "5px" }}> {clickedLatLng.lng} </div>
                    </Box>
                  </Box>
                </Box>}
            </div>
          )}

          {/* Position of the user's map click */}
          {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>}
        </div> : <div>Loading...</div>}
    </div>
  )
}

export default Map