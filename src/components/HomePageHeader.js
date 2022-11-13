import React from 'react'
import Box from "@mui/material/Box";
import MainBgImage from '../images/mainBgSvg.svg'
import { darkMode,lightMode } from "../features/theme";
import { useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import Typed from "react-typed";
import GlitchClip from 'react-glitch-effect/core/GlitchClip';
import Logo from '../images/logo.png'
import Particle from './Particle';


const useStyles = makeStyles ({
    logoImg:{
        width:"100px",
        height:"100px",
        backgroundImage:`url(${Logo})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",

    },
    titleTxt:{
        color:"#fff",
        fontSize:"80px",
        fontWeight:"bold",
        textAlign:"center",
        paddingTop:"20px",


    },
    subTitleTxt:{
        color:"#fff",
        fontSize:"30px",
        fontWeight:"bold",
        textAlign:"center",
    },
    vectorImg:{
        marginTop:"-80px",
        position:"absolute",
        height:"450px",
        zIndex:1,
        boxSizing:"border-box",
    },
    vectorImgSvg:{
        marginTop:"-80px",
        height:"300px",
        zIndex:2,
        boxSizing:"border-box",
    },
    particle:{
        zIndex:1,
        opacity:0.2,
        overflow:"hidden",
        position:"absolute",
        width:"100%",
        height:"100px",
    }
})

const HomePageHeader = () => {
    const themeColor = useSelector((state) => state.theme.value);
    const classes = useStyles();

    return (
        <Box sx={{
            width: "100%",
            height: "60vh",
            backgroundColor:themeColor.status == 'light' ? '#070939':'#020212',
            // backgroundImage: `url(${MainBgImage})`,
            // backgroundSize: "cover",
            // backgroundPosition: "top",
            // backgroundRepeat: "no-repeat",
            // backgroundBlendMode: "overlay",
            display: "flex",
            justifyContent:"space-evenly",
            alignItems:"center",
            boxSizing:"border-box",
            padding:"20px",
            // flexWrap:"wrap",

        }}>
                <Box sx={{
                    width: "fit-content",
                    height: "100%",
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    boxSizing:"border-box",
                }}> 
                    <GlitchClip duration={8000}><div className={classes.titleTxt}>BussiFinder</div></GlitchClip>
                    <div className={classes.subTitleTxt}><Typed strings={["Explore Your Business"]} typeSpeed={40} /></div>
                </Box>
            

                <Box 
                sx={{ 
                    position: "relative",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    boxSizing:"border-box",
                    '@media only screen and (max-width: 760px)': {
                        display:"none",
                    },
                }}>
                    <img className={classes.vectorImg} src={require('../images/HomeVector.svg').default} alt="HomeVector"/>
                    <img className={classes.vectorImgSvg} src={require('../images/headerPic.png')} alt="HomeVector"/>
            
                </Box>
                <div  className={classes.particle}><Particle/></div>
                

        </Box>
    )
}

export default HomePageHeader