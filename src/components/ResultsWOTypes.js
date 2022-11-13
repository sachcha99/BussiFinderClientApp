import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
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
import {FaUmbrellaBeach} from 'react-icons/fa';
import {AiOutlineWifi} from 'react-icons/ai';
import {MdOutlinePool} from 'react-icons/md';
import {RiParkingBoxLine} from 'react-icons/ri';
import {BsWind} from 'react-icons/bs';
import { addBusiness } from '../features/business';
import Grow from '@mui/material/Grow';
import { red } from "@mui/material/colors";
import {BsFilePlus} from 'react-icons/bs';  
import {GiPathDistance} from 'react-icons/gi';
import {MdWork} from 'react-icons/md';
import {IoMdSchool} from 'react-icons/io';
import {HiShoppingBag} from 'react-icons/hi';
import {RiRestaurantFill} from 'react-icons/ri';
import {GoPrimitiveDot} from 'react-icons/go';


const useStyles = makeStyles((theme) => ({
    featureTitleTxt: {
        fontSize: "16px",
        fontWeight: 600,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#5c5c5c',
        marginTop: "5px",
        textAlign: "center",
        alignSelf: "center",

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
        paddingInline: "15px",
        boxShadow: "0px 0px 5px 0px rgba(234,234,234,0.2)",
    },
    addMoreBtn:{
        color: themeColor => themeColor.status == 'light' ? '#e8e8e8' : '#3e3d3d',
        fontSize: "38px",
        fontWeight: 200,
        cursor: "pointer",
        '&:hover': {
            
        }
    },
    addMoreBtnTxt:{
        color: themeColor => themeColor.status == 'light' ? '#e8e8e8' : '#3e3d3d',
        whiteSpace:'nowrap',
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
        textAlign: "justify",
    },
    addressTxt:{
        fontSize: "13px",
        fontWeight: 200,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        alignSelf: "center",
        textAlign: "center",
    },
    
    businessBoxFlex: {
        width: 'fit-content',
        height: 'fit-content',
        boxSizing: 'border-box',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: '15px',
        gap: '10px',
        // elevation: 10,
        borderInline: '1px solid #e8e8e8',
        // transition: 'all 0.5s ease-out',
        // '&:hover': {
        //     transition: '0.5s',
        //     boxShadow:'0 7px 14px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)',
        // }
    },
    LBTitle:{
        fontSize: "25px",
        fontWeight: 700,
        color: themeColor => themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5',
        alignSelf: "center",
        marginBlock: "15px",  
    }
}));


const DownloadBtn = styled(Button)(() => ({
    height: "60px",
    width: "250px",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "15px",
    color: "#ffffff",
    alignSelf: "flex-end",
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



const ResultsWOTypes = () => {
const themeColor = useSelector((state) => state.theme.value);
const classes = useStyles(themeColor);
const [checked, setChecked] = useState(true);
const businessDetails = useSelector((state) => state.business)
useEffect(() => {
    console.log(businessDetails.value)
}, []);
return (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            backgroundColor: themeColor.status == 'light' ? '#f5f5f5' : '#3e3d3d',
            boxSizing: 'border-box',
            padding: '20px',
            backgroundImage:'url(https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment:'fixed',
        }}
    >   

        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: themeColor.status == 'light' ? '#f5f5f5' : '#3e3d3d',
                boxSizing: 'border-box',
                border: '1px solid #e8e8e8',
                padding: '20px',
                borderRadius: "30px",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >    <div className={classes.LBTitle}>Loaction Base Prediction Results</div>
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: themeColor.status == 'light' ? '#f5f5f5' : '#3e3d3d',
                // display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                // gap: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                boxSizing: 'border-box',
                padding: '16px',
             
                // flexWrap: 'wrap',
            }}
        >
        <Box className={classes.businessBoxFlex}>       
                <div className={classes.titleTxt}>
                    Hotel Site Selection
                </div>
                <div className={classes.bodyTxt}>The predicted success percentage for a hotel. All the resuts are given based on the location you have given</div>
                <Box
                    sx={{
                        width: "fit-content",
                        height: "100%",
                        backgroundColor: themeColor.status == 'light' ? '#e7e7e7' : '#3f3f3f',
                        borderRadius: "30px",
                        elevation: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxSizing: 'border-box',
                        paddingBlock: '40px',
                        mt:'19px',
                        
                    }}>
                    <GaugeChart id="gauge-chart2"
                        nrOfLevels={20}
                        // arcsLength={[0.3, 0.45, 0.25]}
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        percent={businessDetails && parseInt(businessDetails.value[0].Hotelml_result) / 100}
                        arcPadding={0.02}
                        style={{width: "fit-content", height: "fit-content",boxSizing: 'border-box', }}
                        textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                        needleColor={"#1c2126cc"}
                        needleBaseColor={"#2d2d2d"}
                    />
                    </Box>
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
                                <div className={classes.features}><LocationOnRoundedIcon style={{color:'#df5e52'}}/>Location Attractiveness Places  - {businessDetails.value[0].HotelFeatures.attractionPlacesCount}</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                <div className={classes.features}><DirectionsTransitFilledSharpIcon style={{color:'#2f9f48'}}/>Transportation Modes Count - {businessDetails.value[0].HotelFeatures.transportationModesCount}</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                <div className={classes.features}><ApartmentRoundedIcon style={{color:'#ce7c39'}}/>Nearby Hotel Count  - {businessDetails.value[0].HotelFeatures.nearByHotelReviewCount}</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                <div className={classes.features}><StarRoundedIcon style={{color:'#e2da5f'}}/>Nearby Hotel Reviews Count  - {businessDetails.value[0].HotelFeatures.competitors}</div>
                            </Grow>
                            </Box>
                        </Box>
                </Box>
                
        </Box>
        <Box className={classes.businessBoxFlex}>        
                <div className={classes.titleTxt}>
                    Restaurant Site Selection
                </div>
                <div className={classes.bodyTxt}>The predicted success percentage for a restaurant. All the resuts are given based on the location you have given</div>
                <Box
                    sx={{
                        width: "fit-content",
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
                        percent={businessDetails && parseInt(businessDetails.value[0].Restaurant_ml_result)  / 100}
                        arcPadding={0.02}
                        style={{width: "fit-content", height: "fit-content",boxSizing: 'border-box', }}
                        textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                        needleColor={"#1c2126cc"}
                        needleBaseColor={"#2d2d2d"}
                    />
                    </Box>
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
                                    <div className={classes.features}><GiPathDistance style={{ color: '#df5e52',fontSize: '20px' }} />DistanceTo The City  - {businessDetails.value[0].RestaurantFeatures.distanceToCity}km</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                    <div className={classes.features}><HiShoppingBag style={{ color: '#2f9f48',fontSize: '20px' }} />Shopping Malls Count - {businessDetails.value[0].RestaurantFeatures.shoppingMallsCount}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                    <div className={classes.features}><IoMdSchool style={{ color: '#ce7c39',fontSize: '20px' }} />Education Related Places Count  - {businessDetails.value[0].RestaurantFeatures.educationRelatedPlacesCount}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                    <div className={classes.features}><MdWork style={{ color: '#4e4c2e',fontSize: '20px' }} />Work Places Count  - {businessDetails.value[0].RestaurantFeatures.workPlacesCount}</div>
                                </Grow>
                                <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                    <div className={classes.features}><RiRestaurantFill style={{ color: '#e2da5f',fontSize: '20px' }} />Competitors Count  - {businessDetails.value[0].RestaurantFeatures.competitors}</div>
                                </Grow>
                            </Box>
                        </Box>
                </Box>
                
                
                
        </Box>
        <Box className={classes.businessBoxFlex}>         
                <div className={classes.titleTxt}>
                    Pharmacy Site Selection
                </div>
                <div className={classes.bodyTxt}>The predicted success percentage for a pharmacy. All the resuts are given based on the location you have given</div>
                <Box
                    sx={{
                        width: "fit-content",
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
                        percent={'N/A'}
                        arcPadding={0.02}
                        style={{width: "fit-content", height: "fit-content",boxSizing: 'border-box', }}
                        textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                        needleColor={"#1c2126cc"}
                        needleBaseColor={"#2d2d2d"}
                    />
                    </Box>
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
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>Distance to the bus station  - N/A</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>Wheelchair Accessible  - N/A</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>N/A  - N/A</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>N/A  - N/A</div>
                            </Grow>
                            </Box>
                        </Box>
                </Box>
                
                
                
        </Box>
        <Box className={classes.businessBoxFlex}>         
                <div className={classes.titleTxt}>
                    Grocery Site Selection
                </div>
                <div className={classes.bodyTxt}>The predicted success percentage for a grocery. All the resuts are given based on the location you have given</div>
                <Box
                    sx={{
                        width: "fit-content",
                        height: "100%",
                        backgroundColor: themeColor.status == 'light' ? '#e7e7e7' : '#3f3f3f',
                        borderRadius: "30px",
                        elevation: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        boxSizing: 'border-box',
                        paddingBlock: '40px',
                        // mt:'19px',
                    }}>
                    <GaugeChart id="gauge-chart2"
                        nrOfLevels={20}
                        // arcsLength={[0.3, 0.45, 0.25]}
                        colors={['#EA4228', '#F5CD19', '#5BE12C']}
                        percent={'N/A'}
                        arcPadding={0.02}
                        style={{width: "fit-content", height: "fit-content",boxSizing: 'border-box', }}
                        textColor={themeColor.status == 'light' ? '#3e3d3d' : '#f5f5f5'}
                        needleColor={"#1c2126cc"}
                        needleBaseColor={"#2d2d2d"}
                    />
                    </Box>
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
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>Traffic flow  - N/A</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 800 } : {})} >
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>Grocery stores  - N/A</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1100 } : {})} >
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>N/A  - N/A</div>
                            </Grow>
                            <Grow in={checked} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1400 } : {})} >
                                <div className={classes.features}><GoPrimitiveDot style={{color:'#696666'}}/>N/A - N/A</div>
                            </Grow>
                            </Box>
                        </Box>
                </Box>
                
        </Box>
        </Box>
            <DownloadBtn>Download Report <SystemUpdateAltRoundedIcon /></DownloadBtn>
        </Box>
    </Box>
)
}

export default ResultsWOTypes;