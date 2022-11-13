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
import { darkMode, lightMode } from "../features/theme";
import { useNavigate } from "react-router-dom";
import { addBusiness } from './../features/business';
import { RiHotelLine } from 'react-icons/ri';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdOutlineMedicalServices } from 'react-icons/md';
import { IoStorefrontOutline } from 'react-icons/io5';
import { addNewBusiness } from './../features/business';

const useStyles = makeStyles({

  typeHeading: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
  },

  typeBox: {
    flex: '1 1 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    paddingBlock: '50px',
    boxSizing: 'border-box',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff',
    borderRadius: '18px',
    boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
    cursor: 'pointer',
    transition: 'all 0.5s ease-out !important',
    '&:hover': {
      transition: '0.4s !important',
      boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2), 0 5px 5px rgba(0, 0, 0, 0.18)',
    }
  },
  typeBoxText: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#000',
    cursor: "pointer",
  },
  backClip: {
    width: "130px",
    height: "130px",
    backgroundImage: `url(${require('../images/servicesShape.svg').default})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "absolute",
    cursor: "pointer",
    transition: 'all 0.55s ease-out',
  },
  frontClip: {
    width: "85px",
    height: "85px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "32px",
    fontWeight: 200,
    position: "relative",
    padding: 3,

  },
  iconClip: {

  },
  typeClip: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      '& $backClip': {
        transform: 'rotate(45deg)',
        transition: 'all 1s ease-in-out',
      },
      transform: 'translateY(-10px)',
      transition: 'all 1s ease-in-out',
    },
    transition: 'all 0.55s ease-out',
  },
});

const PropertyType = () => {


  let navigate = useNavigate();
  const classes = useStyles();
  const themeColor = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  const [checked, setChecked] = React.useState(true);



  const navigateToHInputForm = () => {
    dispatch(addNewBusiness({ 'type': 'hotel' }))
    navigate('/inputHotel');
  }

  const navigateToRInputForm = () => {
    dispatch(addNewBusiness({ 'type': 'restaurant' }))
    navigate(`/inputHotel`)
  }

  //Navigate to pharmacy input forms in home
  const pharmacyInputFormNavigation = () => {
    dispatch(addBusiness({ 'type': 'pharmacy' }))
    navigate(`/inputPharmacy`)
  }

  //Grocery navigation
  const groceryNavigate = () => {
    dispatch(addBusiness({ 'type': 'Grocery' }))
    navigate('/inputGrocery');
  }

  return (
    <div>

      <Box sx={{
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        p: 5,
      }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            boxSizing: 'border-box',
            padding: '20px',
            paddingInline: '90px',
            // borderRadius: '15px',
            // boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
          }}>
          <div className={classes.typeHeading}>
            <Grow
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 300 } : {})}>
              <div style={{ height: "35px", fontSize: "26px", color: themeColor.fontColor }}>Featured Business Type</div>
            </Grow>
            <Grow
              in={checked}
              style={{ transformOrigin: '0 0 0' }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <div style={{ height: "15px", fontSize: "16px", color: themeColor.subFontColor }}> Select a business type that you hope to predict the succes rate.</div>
            </Grow>
          </div>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              boxSizing: 'border-box',
              flexWrap: 'wrap',
              "& :nth-child(1)": {
                "& :nth-child(1)": {
                  "& :nth-child(2)": {
                    backgroundImage: `url(${require('../images/services-shape-1.svg').default})`,
                  }
                }
              },
              "& :nth-child(2)": {
                "& :nth-child(1)": {
                  "& :nth-child(2)": {
                    backgroundImage: `url(${require('../images/services-shape-3.svg').default})`,
                  }
                }
              },
              "& :nth-child(3)": {
                "& :nth-child(1)": {
                  "& :nth-child(2)": {
                    backgroundImage: `url(${require('../images/services-shape-2.svg').default})`,
                  }
                }
              },
              "& :nth-child(4)": {
                "& :nth-child(1)": {
                  "& :nth-child(2)": {
                    backgroundImage: `url(${require('../images/services-shape-4.svg').default})`,
                  }
                }
              },
            }}
          >
            <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
              <Box className={classes.typeBox} onClick={() => navigateToHInputForm()} >
                <div className={classes.typeClip}>
                  <div className={classes.backClip}></div>
                  <div className={classes.frontClip}><RiHotelLine className={classes.iconClip} /></div>
                </div>
                <div className={classes.typeBoxText}>
                  Hotel Site Selection
                </div>
              </Box>
            </Zoom>

            <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
              <Box className={classes.typeBox} onClick={() => navigateToRInputForm()} >
                <div className={classes.typeClip}>
                  <div className={classes.backClip}></div>
                  <div className={classes.frontClip}><IoRestaurantOutline className={classes.iconClip} /></div>
                </div>
                <div className={classes.typeBoxText}>
                  Restaurant Site Selection
                </div>
              </Box>
            </Zoom>
            <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
              <Box className={classes.typeBox} onClick={() => pharmacyInputFormNavigation()} >
                <div className={classes.typeClip}>
                  <div className={classes.backClip}></div>
                  <div className={classes.frontClip}><MdOutlineMedicalServices className={classes.iconClip} /></div>
                </div>
                <div className={classes.typeBoxText}>
                  Pharmacy Site Selection
                </div>
              </Box>
            </Zoom>
            <Zoom in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
              <Box className={classes.typeBox} onClick={() => groceryNavigate()} >
                <div className={classes.typeClip}>
                  <div className={classes.backClip}></div>
                  <div className={classes.frontClip}><IoStorefrontOutline className={classes.iconClip} /></div>
                </div>
                <div className={classes.typeBoxText}>
                  Retail Store Selection
                </div>
              </Box>
            </Zoom>
          </Box>

        </Box>
      </Box>





    </div>
  );
};
export default PropertyType;