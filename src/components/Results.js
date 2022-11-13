import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from '@mui/styles';
import {
    useLoadScript,
    GoogleMap,
    MarkerF,
    InfoWindow
} from "@react-google-maps/api";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DirectionsTransitFilledSharpIcon from '@mui/icons-material/DirectionsTransitFilledSharp';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SystemUpdateAltRoundedIcon from '@mui/icons-material/SystemUpdateAltRounded';
import { padding } from "@mui/system";
import GaugeChart from 'react-gauge-chart'
import { Chart } from "react-google-charts";
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { AiOutlineWifi } from 'react-icons/ai';
import { MdOutlinePool } from 'react-icons/md';
import { RiParkingBoxLine } from 'react-icons/ri';
import { BsWind } from 'react-icons/bs';
import { addBusiness } from '../features/business';
import Grow from '@mui/material/Grow';
import { useSelector, useDispatch } from 'react-redux';
import { compareBusiness } from '../features/business';
import { useNavigate } from "react-router-dom";
import BGImage from '../images/vadim-bogulov-Vq-Sqr7D_7k-unsplash.jpg';
import { GiPathDistance } from 'react-icons/gi';
import { MdWork } from 'react-icons/md';
import { IoMdSchool } from 'react-icons/io';
import { HiShoppingBag } from 'react-icons/hi';
import { RiRestaurantFill } from 'react-icons/ri';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { jsPDF } from "jspdf";

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Competitors',
        },
    },
};

const labels = ['ATM', 'Gas Station', 'Hospital Count', 'HotelCount', 'Movie Theater Count', 'Restaurant Count', 'Pharmacy'];

// export const data = [
//     ["Year", "Sales"],
//     ["2014", 1000],
//     ["2015", 1170],
//     ["2016", 660],
//     ["2017", 1030],
// ];

// export const options = {


//     chartArea: {
//         backgroundColor: {
//             fill: '#FF0000',
//             fillOpacity: 0.1
//         },
//     },
//     backgroundColor: {
//         fill: '#FF0000',
//         fillOpacity: 0.8
//     },
//     chart: {
//         title: "Company Performance",
//         subtitle: "Sales, , and Profit: 2014-2017",
//     },
// };

const useStyles = makeStyles({
    titleTxt: {
        fontSize: "26px",
        fontWeight: 600,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        alignSelf: "flex-start",
    },
    subTitleTxt: {
        fontSize: "18px",
        fontWeight: 400,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',

    },
    bodyTxt: {
        fontSize: "14px",
        fontWeight: 200,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        paddingBottom: '10px'
    },
    gMap: {


    },
    featureTitleTxt: {
        fontSize: "18px",
        fontWeight: 600,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        marginBottom: "10px",
    },
    featuresBoxFlex: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-start",
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
    },
    featuresBox: {
        width: "100%",
        height: "100%",
        // backgroundColor: themeColor => themeColor.status == 'dark' ? '#3e3d3d' : '#f5f5f5',
        borderRadius: "30px",
        boxSizing: "border-box",
        overflow: "hidden",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    features: {
        width: "100%",
        height: "60px",
        backgroundColor: themeColor => themeColor.status == 'dark' ? '#4c4c4c' : '#e8e8e8',
        borderRadius: "8px",
        boxSizing: "border-box",
        display: 'inline-flex',
        gap: "10px",
        alignItems: "center",
        padding: "10px",
        boxShadow: "0px 0px 5px 0px rgba(234,234,234,0.2)",

    },
});

const CompareBtn = styled(Button)(() => ({
    height: "100px",
    width: "100%",
    fontSize: "17px",
    padding: "15px",
    backgroundImage: `url(${require('../images/priceSvg.svg').default})`,
    backgroundSize: "auto",
    backgroundPosition: "right",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#292f98",
    borderRadius: "15px",
    color: "#ffffff",
    display: "flex",
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily: "plex-sans, sans-serif",
    outline: "none",
    cursor: "pointer",
    textTransform: "none",
    elevation: "5",
    marginBottom: "16px",
    boxSizing: "border-box",
    '&:hover': {
        boxShadow: "0px 0px 5px 0px #000000",
        backgroundColor: "#323678",
    },



}));

const DownloadBtn = styled(Button)(() => ({
    height: "90px",
    width: "100%",
    fontSize: "17px",
    padding: "15px",
    borderRadius: "15px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "plex-sans, sans-serif",
    outline: "none",
    cursor: "pointer",
    textTransform: "none",
    elevation: "5",
    marginBottom: "16px",
    /* "to left" / "to right" - affects initial color */
    background: 'linear-gradient(to left, #292f98 50%, #323678 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },

    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
}));

const Results = () => {
    const themeColor = useSelector((state) => state.theme.value);
    const classes = useStyles(themeColor);
    const dispatch = useDispatch();
    const [center, setCenter] = useState({
        lat: 60.192059,
        lng: 24.945831,
    });
    const [position, setPosition] = useState({
        lat: 60.192059,
        lng: 24.945831,
    });
    const [zoom, setZoom] = useState(9);
    const [hotelData, setHotelData] = useState(['sd', 'sdf', 'sdf', 'sd', 'sdf',]);
    const businessDetails = useSelector((state) => state.business)
    let navigate = useNavigate();


    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: businessDetails && businessDetails.value[0].businessCount ? [businessDetails.value[0].businessCount.atmCount, businessDetails.value[0].businessCount.gasStationCount, businessDetails.value[0].businessCount.hospitalCount, businessDetails.value[0].businessCount.hotelCount, businessDetails.value[0].businessCount.movieTheaterCount, businessDetails.value[0].businessCount.restaurantCount, businessDetails.value[0].pharmacy] : [],
                backgroundColor: 'rgba(25, 0, 168, 0.5)',
            },

        ],
    };

    useEffect(() => {
        if (businessDetails) {
            console.log("businessDetailsResssss", businessDetails)
            setPosition({ lat: businessDetails.value[0].latitude, lng: businessDetails.value[0].longitude })
            setCenter({ lat: businessDetails.value[0].latitude, lng: businessDetails.value[0].longitude })
        }
    }, [businessDetails]);

    const { isLoaded } = useLoadScript({
        // Enter your own Google Maps API key
        googleMapsApiKey: "AIzaSyC_mV5GkYx8ULNDqXgwBobTczkM7j6T0uc"
    });

    const [checked, setChecked] = useState(true);

    const compareLocation = () => {
        dispatch(compareBusiness({
            length: businessDetails.value.length
        }))

        if (businessDetails.value[businessDetails.value.length - 1].type == 'hotel') {
            dispatch(addBusiness({ 'type': 'hotel' }))
            navigate('/inputHotel');
        } else if (businessDetails.value[businessDetails.value.length - 1].type == 'restaurant') {
            dispatch(addBusiness({ 'type': 'restaurant' }))
            navigate('/inputHotel');
        }


    }

    const downloadReport = () => {
        const doc = new jsPDF();
        if (businessDetails.value[0].type == 'hotel') {


            doc.setFontSize(22);
            doc.setFont("courier", "bolditalic");
            doc.text("Hotel Success Precentage Prediction", 105, 8, null, null, "center");
            doc.setFont("helvetica", "normal");
            doc.setFontSize(16);
            doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
            doc.text(`Latitude : ${businessDetails.value[0].latitude}`, 20, 40);
            doc.text(`Longitude : ${businessDetails.value[0].longitude}`, 20, 50);
            doc.text(`AttractionPlaces Count : ${businessDetails.value[0].locationFeatures.attractionPlacesCount}`, 20, 60);
            doc.text(`Transportation Modes Count : ${businessDetails.value[0].locationFeatures.transportationModesCount}`, 20, 70);
            doc.text(`Nearby Hotel Review Count : ${businessDetails.value[0].locationFeatures.nearByHotelReviewCount}`, 20, 80);
            doc.setFont("helvetica", "bold");
            doc.text(`Final Prediction : ${businessDetails.value[0].ml_result}%`, 20, 90);
            doc.save("Report.pdf");
        } else if (businessDetails.value[0].type == 'restaurant') {


            doc.setFontSize(22);
            doc.setFont("courier", "bolditalic");
            doc.text("Restaurant Success Percentage Prediction", 105, 8, null, null, "center");
            doc.setFont("helvetica", "normal");
            doc.setFontSize(16);
            doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(16);
            doc.text(`Type : ${businessDetails.value[0].type}`, 20, 30);
            doc.text(`Latitude : ${businessDetails.value[0].latitude}`, 20, 40);
            doc.text(`Longitude : ${businessDetails.value[0].longitude}`, 20, 50);
            doc.text(`Distance to city : ${businessDetails.value[0].locationFeatures.distanceToCity} km`, 20, 60);
            doc.text(`Education Related Places Count : ${businessDetails.value[0].locationFeatures.educationRelatedPlacesCount}`, 20, 70);
            doc.text(`Office Related Places Count : ${businessDetails.value[0].locationFeatures.workPlacesCount}`, 20, 80);
            doc.text(`Shopping Malls Count : ${businessDetails.value[0].locationFeatures.shoppingMallsCount}`, 20, 90);
            doc.text(`Competitors Count : ${businessDetails.value[0].locationFeatures.competitors}`, 20, 100);
            doc.setFont("helvetica", "bold");
            doc.text(`Final Prediction : ${businessDetails.value[0].ml_result}%`, 20, 110);
            doc.save("Report.pdf");
        }






    }
    return (
        <Box sx={{
            width: "100%",
            boxSizing: "border-box",
            backgroundColor: themeColor.status == 'light' ? '#1e2936' : '#3e3d3d',
            height: "150vh",
            display: "grid",
            gridTemplateColumns: "6fr 3fr",
            gap: "30px",
            padding: "50px 70px 50px 70px",
            backgroundImage: `url(${BGImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'overlay',


        }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: themeColor.status == 'light' ? '#ecedef' : '#3a3939',
                    borderRadius: "30px",
                    elevation: 4,
                    display: "flex",
                    // gridTemplateRows: "auto 3fr 2fr",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "30px",
                    p: 3,
                    boxSizing: "border-box",
                }}
            >
                <div className={classes.titleTxt}>
                    {businessDetails && businessDetails.value[0].type == 'hotel' ? `Hotel` : businessDetails.value[0].type == 'restaurant' ? `Restaurant` : businessDetails.value[0].type == 'pharmacy' ? `Pharmacy` : `Grocery`} Site Selection
                </div>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: 'flex',
                        flexDirection: "column",
                        boxSizing: "border-box",
                    }}>
                    <div className={classes.subTitleTxt}>The predicted success percentage for a {businessDetails && businessDetails.value[0].type == 'hotel' ? `Hotel` : businessDetails.value[0].type == 'restaurant' ? `Restaurant` : businessDetails.value[0].type == 'pharmacy' ? `Pharmacy` : `Grocery`} </div>
                    <div className={classes.bodyTxt}>All the results are given based on the location you have given</div>
                    {isLoaded &&
                        <GoogleMap
                            // onClick={e => setClickedLatLng(e.latLng.toJSON())}
                            center={center}
                            zoom={zoom}
                            mapContainerStyle={{
                                height: "400px",
                                borderRadius: '8px',
                            }}
                            className={classes.gMap}
                        >
                            {position &&
                                <MarkerF
                                    position={position}

                                // Not required, but if you want a custom icon:
                                />}


                        </GoogleMap>}

                </Box>
                {businessDetails && businessDetails.value[0].type == 'hotel' ?
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",
                            boxSizing: "border-box",

                        }}>
                        <Box className={classes.featuresBoxFlex}>
                            <div className={classes.featureTitleTxt}>Location Based Features</div>
                            <Box className={classes.featuresBox}>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 500 } : {})} >
                                    <div className={classes.features}><LocationOnRoundedIcon style={{ color: '#df5e52' }} />Location Attractiveness Places  - {businessDetails && businessDetails.value[0].locationFeatures.attractionPlacesCount}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                    <div className={classes.features}><DirectionsTransitFilledSharpIcon style={{ color: '#2f9f48' }} />Transportation Modes Count - {businessDetails && businessDetails.value[0].locationFeatures.transportationModesCount}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><ApartmentRoundedIcon style={{ color: '#ce7c39' }} />Nearby Hotel Count  - {businessDetails && businessDetails.value[0].locationFeatures.competitors}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                    <div className={classes.features}><StarRoundedIcon style={{ color: '#e2da5f' }} />Nearby Hotel Reviews Count  - {businessDetails && businessDetails.value[0].locationFeatures.nearByHotelReviewCount}</div>
                                </Grow>
                            </Box>
                        </Box>

                        <Box className={classes.featuresBoxFlex}>
                            <div className={classes.featureTitleTxt}>Service Based Features</div>
                            <Box className={classes.featuresBox}>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><AiOutlineWifi style={{ color: '#4534b1', fontSize: '20px', marginInline: '8px' }} />Free Wi-Fi Access : {businessDetails && businessDetails.value[0].serviceDetails.wifi ? 'Yes' : 'No'}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><RiParkingBoxLine style={{ color: '#b13434', fontSize: '20px', marginInline: '8px' }} />Parking Area : {businessDetails && businessDetails.value[0].serviceDetails.parking ? 'Yes' : 'No'}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}> <FaUmbrellaBeach style={{ color: '#ff802f', fontSize: '19px', marginInline: '8px' }} />Beach Access : {businessDetails && businessDetails.value[0].serviceDetails.beach ? 'Yes' : 'No'}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><BsWind style={{ color: '#34b13f', fontSize: '20px', marginInline: '8px' }} />A/C : {businessDetails && businessDetails.value[0].serviceDetails.ac ? 'Yes' : 'No'}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><MdOutlinePool style={{ color: '#344ab1', fontSize: '20px', marginInline: '8px' }} /> Pool Access : {businessDetails && businessDetails.value[0].serviceDetails.pool ? 'Yes' : 'No'}</div>
                                </Grow>
                            </Box>
                        </Box>
                    </Box>
                    : businessDetails && businessDetails.value[0].type == 'restaurant' ?
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "20px",
                                boxSizing: "border-box",

                            }}>
                            <Box className={classes.featuresBoxFlex}>
                                <div className={classes.featureTitleTxt}>Location Based Features</div>
                                <Box className={classes.featuresBox}>
                                    <div className={classes.features}><GiPathDistance style={{ color: '#df5e52', fontSize: '20px' }} />Distance to city  - {businessDetails && businessDetails.value[0].locationFeatures.distanceToCity}</div>
                                    <div className={classes.features}><HiShoppingBag style={{ color: '#2f9f48', fontSize: '20px' }} />Education Related Places Count - {businessDetails && businessDetails.value[0].locationFeatures.educationRelatedPlacesCount}</div>
                                    <div className={classes.features}><IoMdSchool style={{ color: '#ce7c39', fontSize: '20px' }} />Shopping Malls Count  - {businessDetails && businessDetails.value[0].locationFeatures.shoppingMallsCount}</div>
                                    <div className={classes.features}><MdWork style={{ color: '#4e4c2e', fontSize: '20px' }} />Shopping Malls Count  - {businessDetails && businessDetails.value[0].locationFeatures.workPlacesCount}</div>
                                    <div className={classes.features}><RiRestaurantFill style={{ color: '#e2da5f', fontSize: '20px' }} />Competitors Count  - {businessDetails && businessDetails.value[0].locationFeatures.competitors}</div>
                                </Box>
                            </Box>

                            <Box className={classes.featuresBoxFlex}>
                                <div className={classes.featureTitleTxt}>Service Based Features</div>
                                <Box className={classes.featuresBox}>
                                    <div className={classes.features}><AiOutlineClockCircle style={{ color: '#1d7e20', fontSize: '20px', marginInline: '8px' }} />Opening Hours : {businessDetails && businessDetails.value[0].serviceDetails.opening}</div>
                                    <div className={classes.features}><AiOutlineClockCircle style={{ color: '#b13434', fontSize: '20px', marginInline: '8px' }} />Closing Hours : {businessDetails && businessDetails.value[0].serviceDetails.closing}</div>
                                    <div className={classes.features}><MdOutlineDeliveryDining style={{ color: '#2f8eff', fontSize: '22px', marginInline: '8px' }} />Delivery : {businessDetails && businessDetails.value[0].serviceDetails.delivery}</div>
                                </Box>
                            </Box>
                        </Box>
                        :
                        <div>
                        </div>}

            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    // backgroundColor: "red",
                    borderRadius: "30px",
                    display: "grid",
                    gridTemplateRows: "1fr 1fr 1fr",
                    gap: "30px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: themeColor.status == 'light' ? '#ecedef' : '#3a3939',
                        borderRadius: "30px",
                        elevation: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                    <GaugeChart id="gauge-chart5"
                        nrOfLevels={420}
                        arcsLength={[0.3, 0.45, 0.25]}
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        percent={businessDetails && parseInt(businessDetails.value[0].ml_result) / 100}
                        arcPadding={0.02}
                        textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                        needleColor={"#1c2126cc"}
                        needleBaseColor={"#2d2d2d"}
                    />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: themeColor.status == 'light' ? '#ecedef' : '#3a3939',
                        borderRadius: "30px",
                        elevation: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        boxSizing: "border-box",
                    }}>
                    {/* <Bar options={options} data={data} /> */}
                    {/* <Chart
                        chartType="Bar"
                        // width="100%"
                        // height="400px"
                        
                        data={data}
                        options={options}
                    /> */}
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        flexDirection: "column",
                        paddingInline: '10%',
                        boxSizing: "border-box",
                    }}>
                    <CompareBtn onClick={() => compareLocation()}>Compare With Another Location <ArrowForwardIosIcon /></CompareBtn>
                    <DownloadBtn onClick={() => downloadReport()}>Download Report <SystemUpdateAltRoundedIcon /></DownloadBtn>

                </Box>
            </Box>
        </Box>
    )
}

export default Results