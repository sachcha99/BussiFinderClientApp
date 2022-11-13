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
// import { Chart } from "react-google-charts";
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
import { addBusiness, compareBusiness } from '../features/business';
import Grow from '@mui/material/Grow';
import { red } from "@mui/material/colors";
import { BsFilePlus } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GiPathDistance } from 'react-icons/gi';
import { MdWork } from 'react-icons/md';
import { IoMdSchool } from 'react-icons/io';
import { HiShoppingBag } from 'react-icons/hi';
import { RiRestaurantFill } from 'react-icons/ri';
import BGIMAGE from '../images/andrew-ridley-jR4Zf-riEjI-unsplash.jpg';

const useStyles = makeStyles((theme) => ({
    featureTitleTxt: {
        fontSize: "18px",
        fontWeight: 600,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        marginTop: "10px",
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
        fontSize: "15px",
        whiteSpace: "nowrap",
        backgroundColor: themeColor => themeColor.status == 'dark' ? '#4c4c4c' : '#e8e8e8',
        borderRadius: "8px",
        boxSizing: "border-box",
        display: 'inline-flex',
        gap: "10px",
        alignItems: "center",
        padding: "10px",
        paddingInline: "20px",
        boxShadow: "0px 0px 5px 0px rgba(234,234,234,0.2)",
    },
    addMoreBtn: {
        color: themeColor => themeColor.status == 'light' ? '#e8e8e8' : '#3e3d3d',
        fontSize: "38px",
        fontWeight: 200,
        cursor: "pointer",
        '&:hover': {

        }
    },
    addMoreBtnTxt: {
        color: themeColor => themeColor.status == 'light' ? '#e8e8e8' : '#3e3d3d',
        whiteSpace: 'nowrap',
    },
    titleTxt: {
        fontSize: "20px",
        fontWeight: 600,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        alignSelf: "center",
        marginTop: "10px",
    },
    bodyTxt: {
        fontSize: "14px",
        fontWeight: 200,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        paddingBottom: '10px',
        alignSelf: "center",
        textAlign: "center",
    },
    addressTxt: {
        fontSize: "13px",
        fontWeight: 200,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        alignSelf: "center",
        textAlign: "center",
    }
}));


const DownloadBtn = styled(Button)(() => ({
    height: "60px",
    width: "100%",
    fontSize: "16px",
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

const MultipleResult = () => {
    const themeColor = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const classes = useStyles(themeColor);
    const [checked, setChecked] = useState(true);
    const menuList = ['details', 'features', 'reviews', 'weather', 'price', 'map'];
    const businessDetails = useSelector((state) => state.business)
    let navigate = useNavigate();

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
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: themeColor.status == 'light' ? '#f5f5f5' : '#3e3d3d',
                backgroundImage: `url(${BGIMAGE})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                // gap: '16px',

                display: 'grid',
                gridTemplateColumns: `repeat(${businessDetails.value.length + 1}, 1fr)`,
                gridGap: '10px',
                boxSizing: 'border-box',
                padding: '30px',
                overflowX: 'auto',
            }}
        >

            {businessDetails.value[0].type == 'hotel' ?
                businessDetails.value.map((x, i) =>
                    <Box key={i}
                        sx={{
                            width: 'fit-content',
                            height: 'fit-content',
                            backgroundColor: themeColor.status == 'light' ? '#efefef' : '#393838',
                            borderRadius: "30px",
                            margin: '20px',
                            boxSizing: 'border-box',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: '10px',
                            gap: '10px',
                            elevation: 10,
                            boxShadow: '0px 0px 1.5px 0px #b5b5b5',
                            transition: 'all 0.5s ease-out',
                            '&:hover': {
                                transition: '0.5s',
                                boxShadow: '0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)',
                            }
                        }}
                    >
                        <div className={classes.titleTxt}>
                            {businessDetails.value[i].type} Site Selection
                        </div>
                        <div className={classes.bodyTxt}>The predicted success percentage for a {businessDetails.value[i].type}. All the resuts are given based on the location you have given</div>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: themeColor.status == 'light' ? '#e7e7e7' : '#3f3f3f',
                                borderRadius: "30px",
                                elevation: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxSizing: 'border-box',
                                paddingBlock: '40px',

                            }}>
                            <GaugeChart id="gauge-chart2"
                                nrOfLevels={20}
                                // arcsLength={[0.3, 0.45, 0.25]}
                                colors={['#EA4228', '#F5CD19', '#5BE12C']}
                                percent={businessDetails && parseInt(businessDetails.value[i].ml_result) / 100}
                                arcPadding={0.02}
                                style={classes.chartStyle}
                                textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                                needleColor={"#1c2126cc"}
                                needleBaseColor={"#2d2d2d"}
                            />
                        </Box>
                        <div className={classes.addressTxt}>(Location : {businessDetails.value[i].latitude},{businessDetails.value[i].longitude})</div>
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
                                        <div className={classes.features}><LocationOnRoundedIcon style={{ color: '#df5e52' }} />Location Attractiveness Places  - {businessDetails.value[i].locationFeatures.attractionPlacesCount}</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                        <div className={classes.features}><DirectionsTransitFilledSharpIcon style={{ color: '#2f9f48' }} />Transportation Modes Count - {businessDetails.value[i].locationFeatures.transportationModesCount}</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                        <div className={classes.features}><ApartmentRoundedIcon style={{ color: '#ce7c39' }} />Nearby Hotel Count  - {businessDetails.value[i].locationFeatures.competitors}</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                        <div className={classes.features}><StarRoundedIcon style={{ color: '#e2da5f' }} />Nearby Hotel Reviews Count  - {businessDetails.value[i].locationFeatures.nearByHotelReviewCount}</div>
                                    </Grow>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.featuresBoxFlex}>
                            <div className={classes.featureTitleTxt}>Service Based Features</div>
                            <Box className={classes.featuresBox}>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><AiOutlineWifi style={{ color: '#4534b1', fontSize: '20px', marginInline: '8px' }} />Free Wi-Fi Access : {businessDetails.value[i].serviceDetails.wifi ? 'Yes' : 'No'} </div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><RiParkingBoxLine style={{ color: '#b13434', fontSize: '20px', marginInline: '8px' }} />Parking Area : {businessDetails.value[i].serviceDetails.parking ? 'Yes' : 'No'}  </div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}> <FaUmbrellaBeach style={{ color: '#ff802f', fontSize: '19px', marginInline: '8px' }} />Beach Access : {businessDetails.value[i].serviceDetails.beach ? 'Yes' : 'No'}  </div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><BsWind style={{ color: '#34b13f', fontSize: '20px', marginInline: '8px' }} />A/C : {businessDetails.value[i].serviceDetails.ac ? 'Yes' : 'No'}  </div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><MdOutlinePool style={{ color: '#344ab1', fontSize: '20px', marginInline: '8px' }} /> Pool Access : {businessDetails.value[i].serviceDetails.pool ? 'Yes' : 'No'}  </div>
                                </Grow>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                paddingInline: '30px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <DownloadBtn>Download Report <SystemUpdateAltRoundedIcon /></DownloadBtn>
                        </Box>

                    </Box>)
                :
                businessDetails.value.map((x, i) =>
                    <Box key={i}
                        sx={{
                            width: 'fit-content',
                            height: 'fit-content',
                            backgroundColor: themeColor.status == 'light' ? '#efefef' : '#393838',
                            borderRadius: "30px",
                            margin: '20px',
                            boxSizing: 'border-box',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: '10px',
                            gap: '10px',
                            elevation: 10,
                            boxShadow: '0px 0px 1.5px 0px #b5b5b5',
                            transition: 'all 0.5s ease-out',
                            '&:hover': {
                                transition: '0.5s',
                                boxShadow: '0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)',
                            }
                        }}
                    >
                        <div className={classes.titleTxt}>
                            {businessDetails.value[i].type} Site Selection
                        </div>
                        <div className={classes.bodyTxt}>The predicted success percentage for a {businessDetails.value[i].type}. All the resuts are given based on the location you have given</div>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: themeColor.status == 'light' ? '#e7e7e7' : '#3f3f3f',
                                borderRadius: "30px",
                                elevation: 4,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxSizing: 'border-box',
                                paddingBlock: '40px',

                            }}>
                            <GaugeChart id="gauge-chart2"
                                nrOfLevels={20}
                                // arcsLength={[0.3, 0.45, 0.25]}
                                colors={['#EA4228', '#F5CD19', '#5BE12C']}
                                percent={businessDetails && parseInt(businessDetails.value[i].ml_result) / 100}
                                arcPadding={0.02}
                                style={classes.chartStyle}
                                textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                                needleColor={"#1c2126cc"}
                                needleBaseColor={"#2d2d2d"}
                            />
                        </Box>
                        <div className={classes.addressTxt}>(Location : {businessDetails.value[i].latitude},{businessDetails.value[i].longitude})</div>
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
                                        <div className={classes.features}><GiPathDistance style={{ color: '#df5e52', fontSize: '20px' }} />DistanceTo The City  - {businessDetails.value[i].locationFeatures.distanceToCity}km</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                        <div className={classes.features}><HiShoppingBag style={{ color: '#2f9f48', fontSize: '20px' }} />Shopping Malls Count - {businessDetails.value[i].locationFeatures.shoppingMallsCount}</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                        <div className={classes.features}><IoMdSchool style={{ color: '#ce7c39', fontSize: '20px' }} />Education Related Places Count  - {businessDetails.value[i].locationFeatures.educationRelatedPlacesCount}</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                        <div className={classes.features}><MdWork style={{ color: '#4e4c2e', fontSize: '20px' }} />Work Places Count  - {businessDetails.value[i].locationFeatures.workPlacesCount}</div>
                                    </Grow>
                                    <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                        <div className={classes.features}><RiRestaurantFill style={{ color: '#e2da5f', fontSize: '20px' }} />Competitors Count  - {businessDetails.value[i].locationFeatures.competitors}</div>
                                    </Grow>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.featuresBoxFlex}>
                            <div className={classes.featureTitleTxt}>Service Based Features</div>
                            <Box className={classes.featuresBox}>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><AiOutlineClockCircle style={{ color: '#1d7e20', fontSize: '20px', marginInline: '8px' }} />Closing Time : {businessDetails.value[i].serviceDetails.closing} </div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><AiOutlineClockCircle style={{ color: '#b13434', fontSize: '20px', marginInline: '8px' }} />Opening Time : {businessDetails.value[i].serviceDetails.opening}   </div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}> <MdOutlineDeliveryDining style={{ color: '#2f8eff', fontSize: '22px', marginInline: '8px' }} />Delivery Method : {businessDetails.value[i].serviceDetails.delivery == 'Delivery' ? `Available` : businessDetails.value[i].serviceDetails.delivery}  </div>
                                </Grow>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                                paddingInline: '30px',
                                boxSizing: 'border-box',
                            }}
                        >
                            <DownloadBtn>Download Report <SystemUpdateAltRoundedIcon /></DownloadBtn>
                        </Box>

                    </Box>)
            }

            <Box onClick={() => compareLocation()}
                sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                    backgroundColor: themeColor.status == 'light' ? '#efefef' : '#393838',
                    borderRadius: "30px",
                    margin: '20px',
                    boxSizing: 'border-box',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: '10px',
                    marginInline: '20px',
                    alignSelf: 'center',
                }}
            >


                <Box  sx={{
                    width: '100%',
                    height: 'fit-content',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    // backgroundColor:themeColor.status == 'light' ? '#efefef' : '#3e3d3d',
                    borderRadius: '30px',
                    padding: '40px',
                    paddingBlock: "150px",
                    elevation: 5,
                    boxShadow: '0px 0px 1.5px 0px #b5b5b5',
                    backgroundImage: `url(${require('../images/priceSvg.svg').default})`,
                    backgroundSize: "auto",
                    backgroundPosition: "right",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#292f98",
                    transition: 'all 0.5s ease-out',
                    '&:hover': {
                        boxShadow: "0px 0px 5px 0px #000000",
                        backgroundColor: "#323678",
                    },
                }}

                >
                    <BsFilePlus className={classes.addMoreBtn} />
                    <div className={classes.addMoreBtnTxt} >Compare With Another Location</div>

                </Box>





            </Box>




        </Box>
    )
}

export default MultipleResult