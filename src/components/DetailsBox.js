import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { darkMode,lightMode } from "../features/theme";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

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
    marginBlock: "16px",
    /* "to left" / "to right" - affects initial color */
    background: 'linear-gradient(to left, #302954 50%, #252744 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },
}));

const useStyles = makeStyles ({

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
        width:"25%",
        backgroundColor:"#3317ba",
        height:"5px",
    },
    bodyText:{
        textAlign:"left",
        opacity:0.6,
        color:themeColor => themeColor.status == 'dark' ? '#f5f5f5':'#1e1d1d',
    }
});
const DetailsBox =() => {
    const themeColor = useSelector((state) => state.theme.value);
    const classes = useStyles(themeColor);
    const navigate = useNavigate();

        return (
            <Box sx={{ 
                
                    width:"100%",
                    boxSizing:"border-box",
                    bgcolor: themeColor.primaryColor ,
                    maxHeight: "auto" ,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    p:10,
                }}>
                    <Box 
                    sx={{ 
                        position:"absolute",
                        zIndex:1,
                        right:"0",
                        '@media only screen and (max-width: 760px)': {
                            display:"none",
                        },
                    }}>
                        <img className={classes.descriptionBoxBackImg} src={require('../images/about-shape-1.svg').default} alt="shape" />
                    </Box>
                    <Box  sx={{
                        width:"fit-content",
                        boxSizing:"border-box",
                        display:"grid",
                        gridTemplate: 'auto/repeat(2,1fr)',
                        '@media only screen and (max-width: 760px)': {
                            gridTemplateColumns: '1fr',
                        },
                    }}>
                        <Box
                        sx={{
                            display:"flex",
                            flexDirection:"column",
                            gap:"10px",
                            justifyContent:"center",
                            padding:"10px",
                            zIndex:2,
                        }}
                        >
                            <span className={classes.titleTopBar}></span>
                            <div>
                                <div style={{color:themeColor.textColor,fontSize:"34px",fontWeight:700}}>  PREDICT YOUR DREAM BUSINESS <br/>
                                    <span style={{fontWeight:400,}}>WITH BUSSIFINDER</span>
                                </div>
                            </div>
                            <div className={classes.bodyText}>
                                The location you choose for your business is a monumental decision that needs to be carefully considered. The more favorable the location, the higher possibility of the business succeeding. For each type of business, you need to consider different types of factors to find the best location for the particular business. "BussFinder" analyze the given location and generate an accurate business solution for the user. Users can use this tool to determine whether a place is good for a grocery, a restaurant, a pharmacy, or a hotel.
                            </div>
                            <GetStarted variant="contained" onClick={() => navigate('/Service')} endIcon={<ArrowForwardIosIcon />}>
                                Get Started
                            </GetStarted>
                        </Box>
                        <div >
                            <img  className={classes.descriptionBoxFrontImg} src={require('../images/about2.svg').default} alt="about" />
                        </div>
                    </Box>
                
            </Box>
                
        );
   
}

export default DetailsBox;