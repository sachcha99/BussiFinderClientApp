import React,{useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { darkMode,lightMode } from "../features/theme";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import HotelImg from '../images/homeHeaderImg.jpg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { addNewBusiness } from './../features/business';


const GetStarted = styled(Button)(() => ({
    height: "45px",
    width: "160px",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "20px",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "plex-sans, sans-serif",
    outline: "none",
    cursor: "pointer",
    textTransform: "none",
    elevation: "2",
    marginBlock: "20px",
    /* "to left" / "to right" - affects initial color */
    background: 'linear-gradient(to left, #302954 50%, #252744 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },
}));

const useStyles = makeStyles({
    descriptionBoxBackImg:{
        height:"650px",
       
    },
    descriptionBoxFrontImg:{
        height:"450px",
        '@media only screen and (max-width: 760px)': {
            //   width:"fit-content",
              height:"300px",
        },
    },
    titleTopBar:{
        width:"170px",
        height:"5px",
        backgroundColor:"#3317ba",
        marginBottom:"5px",
    },
    bodyText:{
        textAlign:"left",
        opacity:0.6,
        color:themeColor => themeColor.status == 'dark' ? '#f5f5f5':'#1e1d1d',
    },
    titleTxt:{
        color:'#231D4F',
        fontSize:'29px',
        fontWeight:'600',
        marginBottom:'1rem'
    },
    subTxt:{
        color:'#888888',
        fontSize:'14px',
        fontWeight:'400',
        marginBottom:'1rem'
    },
});

const BusinessTypePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme);
    const classes = useStyles(theme);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigateToHInputForm = () => {
        console.log("first")
        dispatch(addNewBusiness({ 'type': 'hotel' }))
        navigate(`/inputHotel`);
    }
    
    const navigateToRInputForm = () => {
        dispatch(addNewBusiness({ 'type': 'restaurant' }))
        navigate(`/inputHotel`)
    }

    const navigateToLocationBasedPredic = () => {
        dispatch(addNewBusiness({ 'type': 'locationBased' }))
        navigate(`/locationBasedPredict`)
    }
return (
    <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',
            width:'100%',
            backgroundColor:'#E4E6F1',
            padding:'2rem',
            paddingInline:'10rem',
            boxSizing:'border-box',
        }}
    >   
    <TabContext value={value}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            boxSizing:'border-box',
            width:'100%',
            height:'100%',
    }}
    >
        <div className={classes.titleTxt}>Predict, the success of your new business</div>
        <div className={classes.subTxt}>Select a method from below two types according to your need.</div>
        <Box sx={{ 
            backgroundColor:'#fff',
            borderRadius:'40px',
            height:'40px',
        }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" indicatorColor="" >
                <Tab 
                indicatorColor="secondary"
                sx={{
                    elevation: 5,
                    minHeight:'40px',
                    fontSize:'10px',
                    fontWeight:'200',
                    paddingInline:'20px',
                    paddingBlock:'5px',
                    borderRadius:'30px',
                    textTransform:'Uppercase',
                    alignSelf:'flex-end',
                    '&.Mui-selected': {
                        backgroundColor:'#3a31a1',
                        color:'#dab23b',
                        fontWeight:'400',
                    },

                }} 
                label="Location Based" value="1" />
                <Tab 
                    indicatorColor="secondary"
                    sx={{
                    elevation: 5,
                    minHeight:'40px',
                    fontSize:'10px',
                    fontWeight:'200',
                    paddingInline:'20px',
                    paddingBlock:'5px',
                    borderRadius:'30px',
                    textTransform:'Uppercase',
                    alignSelf:'flex-end',
                    '&.Mui-selected': {
                        backgroundColor:'#3a31a1',
                        color:'#dab23b',
                        fontWeight:'400',
                    },
                    }}label="Location And Business Type Based" value="2" />
                </TabList>
            </Box>
        </Box>
        <TabPanel value="1">
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            height:'100%',
            width:'100%',
            backgroundColor:'#E4E6F1',
            padding:'2rem',
            boxSizing:'border-box',
        }}>
            <Box
            sx={{
                borderRadius:'10px',
                backgroundColor:'#fff',
                width:'100%',
                height:'100%',
                padding:'2rem',
                boxSizing:'border-box',
                m:10,
            }}
            >
                <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        display:'grid',
                        gridTemplateColumns:'1fr 1fr',
                        gridTemplateRows:'1fr',
                        gridGap:'10px',
                        boxSizing:'border-box',
                    }}
                >
                    <Box
                        sx={{
                            width:'100%',
                            height:'100%',
                            boxSizing:'border-box',
                            backgroundImage:`url(${require('../images/HomeVector.svg').default})`,
                            backgroundSize:'contain',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            
                            
                        }}
                    >
                        <Box 
                        sx={{
                            width:'60%',
                            height:'60%',
                            boxSizing:'border-box',
                            backgroundImage:`url(${HotelImg})`,
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                        }}>
                        </Box>
                        
                    </Box>
                    <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        boxSizing:'border-box',
                        paddingBlock:'1rem',
                    }}>
                            <div className={classes.titleTopBar}></div>
                            <div>
                                <div style={{color:theme.textColor,fontSize:"34px",fontWeight:700}}>LOCATION BASED <br/>
                                    <span style={{fontWeight:400,}}>BUSINESS TYPE ANALYSIS</span>
                                </div>
                            </div>
                            <div className={classes.bodyText}>
                                We make sure your website looks the way you want it to where ever it is viewed. In this day and age there smart devices populate our entire life, We strive to ensure that the websites we create are always up to standard with the new devices releasing all the time. We develop dynamic websites based on our client requests such as Content Management System (CMS), E-commerce websites (Shopping carts), Online Bookings, Web Portals, Payment Gateways etc. There are many uses of having a dynamic site.
                            </div>
                            <GetStarted variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={() => navigateToLocationBasedPredic()} >
                                Get Started
                            </GetStarted>
                    </Box>
                 </Box>
            </Box>

        </Box>
    </TabPanel>
    <TabPanel value="2">
    <Box sx={{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:'100%',
    width:'100%',
    backgroundColor:'#E4E6F1',
    padding:'2rem',
    boxSizing:'border-box',
    }}>
        <Box
            sx={{
                borderRadius:'10px',
                backgroundColor:'#fff',
                width:'100%',
                height:'100%',
                padding:'2rem',
                boxSizing:'border-box',
                m:2,
            }}
        >
                 <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        display:'grid',
                        gridTemplateColumns:'1fr 1fr',
                        gridTemplateRows:'1fr',
                        gridGap:'10px',
                        boxSizing:'border-box',
                       
                    }}
                 >
                    <Box
                      sx={{
                        width:'100%',
                        height:'100%',
                        boxSizing:'border-box',
                        paddingBlock:'1rem',
                    }}>
                            <div className={classes.titleTopBar}></div>
                            <div>
                                <div style={{color:theme.textColor,fontSize:"34px",fontWeight:700}}>HOTEL SITES <br/>
                                    <span style={{fontWeight:400,}}>SELECTION</span>
                                </div>
                            </div>
                            <div className={classes.bodyText}>
                            location has a big impact on the demand your hotel will generate, and therefore will influence the price you can ask in the market for your rooms. Hence when starting a new hotel, the site selection process is a key step that should not be taken too lightly. In the evaluation of a hotel’s location, nine key characteristics that make up a hotel's location were chosen in order to build prediction models that can evaluate a potential hotel site on each characteristic. These attributes are location attraction, transportation modes count, competitors, nearby hotel reviews count, beach access, availability of Wi-Fi, Parking, A/C, Pool
                            </div>
                            <GetStarted variant="contained"  onClick={() => navigateToHInputForm()} endIcon={<ArrowForwardIosIcon />}>
                                Get Started
                            </GetStarted>
                    </Box>
                    <Box
                        sx={{
                            width:'100%',
                            height:'100%',
                            boxSizing:'border-box',
                            backgroundImage:`url(${require('../images/HomeVector.svg').default})`,
                            backgroundSize:'contain',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            
                            
                        }}
                    >
                        <Box 
                         sx={{
                            width:'60%',
                            height:'60%',
                            boxSizing:'border-box',
                            backgroundImage:'url(https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)',
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                        }}>
                        </Box>
                        
                    </Box>
                 </Box>
                 
            </Box>


            <Box
            sx={{
                borderRadius:'10px',
                backgroundColor:'#fff',
                width:'100%',
                height:'100%',
                padding:'2rem',
                boxSizing:'border-box',
                m:10,
            }}
        >
                 <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        display:'grid',
                        gridTemplateColumns:'1fr 1fr',
                        gridTemplateRows:'1fr',
                        gridGap:'10px',
                        boxSizing:'border-box',
                       
                    }}
                 >
                     <Box
                        sx={{
                            width:'100%',
                            height:'100%',
                            boxSizing:'border-box',
                            backgroundImage:`url(${require('../images/HomeVector.svg').default})`,
                            backgroundSize:'contain',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            
                            
                        }}
                    >
                        <Box 
                         sx={{
                            width:'60%',
                            height:'60%',
                            boxSizing:'border-box',
                            backgroundImage:`url(https://images.unsplash.com/photo-1584536286788-78ae81c2c54e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FmZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60)`,
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                        }}>
                        </Box>
                        
                    </Box>
                    <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        boxSizing:'border-box',
                        paddingBlock:'1rem',
                    }}>
                            <div className={classes.titleTopBar}></div>
                            <div>
                                <div style={{color:theme.textColor,fontSize:"34px",fontWeight:700}}>RESTAURANT SITE<br/>
                                    <span style={{fontWeight:400,}}>SELECTION</span>
                                </div>
                            </div>
                            <div className={classes.bodyText}>
                            Site selection of a restaurant is one of the first steps of setting up restaurant. The success of a restaurant is heavily dependent on the location, and must be chosen carefully. Much thought and planning need to go into deciding the location, and many factors need to be considered before selecting the site. These key factors are reachability to the shopping areas, distance to the nearest city, competitors, education related places count, work related places count, availability of delivery service, restaurant opening and closing hours.
                            </div>
                            <GetStarted variant="contained" onClick={() => navigateToRInputForm()}  endIcon={<ArrowForwardIosIcon />}>
                                Get Started
                            </GetStarted>
                    </Box>
                </Box>
            </Box>



            <Box
            sx={{
                borderRadius:'10px',
                backgroundColor:'#fff',
                width:'100%',
                height:'100%',
                padding:'2rem',
                boxSizing:'border-box',
                m:10,
            }}
        >
                 <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        display:'grid',
                        gridTemplateColumns:'1fr 1fr',
                        gridTemplateRows:'1fr',
                        gridGap:'10px',
                        boxSizing:'border-box',
                       
                    }}
                 >
                    <Box
                      sx={{
                        width:'100%',
                        height:'100%',
                        boxSizing:'border-box',
                        paddingBlock:'1rem',
                    }}>
                            <div className={classes.titleTopBar}></div>
                            <div>
                                <div style={{color:theme.textColor,fontSize:"34px",fontWeight:700}}>PHARMACY SITE<br/>
                                    <span style={{fontWeight:400,}}>SELECTION</span>
                                </div>
                            </div>
                            <div className={classes.bodyText}>
                                We make sure your website looks the way you want it to where ever it is viewed. In this day and age there smart devices populate our entire life, We strive to ensure that the websites we create are always up to standard with the new devices releasing all the time. We develop dynamic websites based on our client requests such as Content Management System (CMS), E-commerce websites (Shopping carts), Online Bookings, Web Portals, Payment Gateways etc. There are many uses of having a dynamic site.
                            </div>
                            <GetStarted variant="contained" endIcon={<ArrowForwardIosIcon />}>
                                Get Started
                            </GetStarted>
                    </Box>
                    <Box
                        sx={{
                            width:'100%',
                            height:'100%',
                            boxSizing:'border-box',
                            backgroundImage:`url(${require('../images/HomeVector.svg').default})`,
                            backgroundSize:'contain',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            
                            
                        }}
                    >
                        <Box 
                         sx={{
                            width:'60%',
                            height:'60%',
                            boxSizing:'border-box',
                            backgroundImage:`url(https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60)`,
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                        }}>
                        </Box>
                        
                    </Box>
                 </Box>
                 
            </Box>




            <Box
            sx={{
                borderRadius:'10px',
                backgroundColor:'#fff',
                width:'100%',
                height:'100%',
                padding:'2rem',
                boxSizing:'border-box',
                m:10,
            }}
        >
                 <Box
                    sx={{
                        width:'100%',
                        height:'100%',
                        display:'grid',
                        gridTemplateColumns:'1fr 1fr',
                        gridTemplateRows:'1fr',
                        gridGap:'10px',
                        boxSizing:'border-box',
                       
                    }}
                 >
                     <Box
                        sx={{
                            width:'100%',
                            height:'100%',
                            boxSizing:'border-box',
                            backgroundImage:`url(${require('../images/HomeVector.svg').default})`,
                            backgroundSize:'contain',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            
                            
                        }}
                    >
                        <Box 
                         sx={{
                            width:'60%',
                            height:'60%',
                            boxSizing:'border-box',
                            backgroundImage:`url(https://images.unsplash.com/photo-1580674287405-80cd77a2fee2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60)`,
                            backgroundSize:'cover',
                            backgroundRepeat:'no-repeat',
                            backgroundPosition:'center',
                        }}>
                        </Box>
                        
                    </Box>
                    <Box
                      sx={{
                        width:'100%',
                        height:'100%',
                        boxSizing:'border-box',
                        paddingBlock:'1rem',
                    }}>
                            <div className={classes.titleTopBar}></div>
                            <div>
                                <div style={{color:theme.textColor,fontSize:"34px",fontWeight:700}}>GROCERY SITE<br/>
                                    <span style={{fontWeight:400,}}>SELECTION</span>
                                </div>
                            </div>
                            <div className={classes.bodyText}>
                                The location you choose for your business is a monumental decision that needs to be carefully considered. The more favorable the location, the higher possibility of the business succeeding. For each type of business, you need to consider different types of factors to find the best location for the particular business. "BussFinder" analyze the given location and generate an accurate business solution for the user. Users can use this tool to determine whether a place is good for a grocery, a restaurant, a pharmacy, or a hotel.
                            </div>
                            <GetStarted variant="contained" endIcon={<ArrowForwardIosIcon />}>
                                Get Started
                            </GetStarted>
                    </Box>
                 </Box>
            </Box>



            
    </Box>
    </TabPanel>
    </TabContext>

       


            
    </Box>
)
}

export default BusinessTypePage