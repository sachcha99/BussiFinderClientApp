import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { darkMode,lightMode } from "../features/theme";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {FiCheck} from 'react-icons/fi';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



const PlanButton = styled(Button)(({ theme }) => ({
    width:"170px",
    marginTop:"20px",
    // backgroundColor:'#fff5fb',
    color:'#F496D1',
    borderRadius:'30px',
    textTransform:'none',
    fontSize:'12px',
    boxSizing:'border-box',
    alignSelf:'center',
    paddingBlock:'8px',
    background: 'linear-gradient(to left, #fff5fb 50%, #ffd7ef 50%) right',
    backgroundSize: '200%',
    transition: '.5s ease-out',
    '&:hover': {
        // backgroundColor: "#4c69ba",
        backgroundPosition: 'left',
    },
}));

const MostPlanButton = styled(Button)(({ theme }) => ({
  width:"170px",
  marginTop:"20px",
  // backgroundColor:'#be9d607d',
  color:'#edcd2b',
  borderRadius:'30px',
  textTransform:'none',
  fontSize:'12px',
  boxSizing:'border-box',
  alignSelf:'center',
  paddingBlock:'8px',
  /* "to left" / "to right" - affects initial color */
  background: 'linear-gradient(to left, #be9d607d 50%, #fbc1547c 50%) right',
  backgroundSize: '200%',
  transition: '.5s ease-out',
  '&:hover': {
    // backgroundColor: '#fbc1547d',
    backgroundPosition: 'left',
  },
}));

const useStyles = makeStyles((theme) => ({
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
  pricingBox:{
    width:'100%',
    height:'100%',
    boxSizing:'border-box',
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    gap:'5px',
    padding:'10px',
    paddingInline:'20px',


  },
  priceMonthTxt:{
    color:'#888888',
    fontSize:'1rem',
  },
  priceTxt:{
    color:'#231D4F',
    fontSize:'28px',
    fontWeight:'500',
  },
  planTypeTxt:{
    color:'#231D4F',
    fontSize:'19px',
    fontWeight:'600',
  },
  planDescTxt:{
    color:'#888888',
    fontSize:'14px',
    marginBottom:'10px'
  },
  planItems:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:'10px',
    marginBlock:'5px',

  },
  planIcon:{
    color:'#5243C2',
    backgroundColor:'#5243C210',
    padding:'3px',
    borderRadius:'50%',
  },
  planItemTxt:{
    color:'#888888',
    fontSize:'14px',
  },


  pricingBoxMost:{
    width:'100%',
    height:'100%',
    boxSizing:'border-box',
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    gap:'5px',
    paddingInline:'20px',
    backgroundColor:'#435FC2',
    borderRadius:'20px',
    paddingBlock:'15px',
    boxShadow:'0px 1px 10px 0px #888888',
    marginBottom:'10px',
    backgroundImage: `url(${require('../images/priceSvg.svg').default})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',

  },
  priceMonthTxtMost:{
    color:'#E4E6F1',
    fontSize:'1rem',
  },
  priceTxtMost:{
    color:'#E4E6F1',
    fontSize:'28px',
    fontWeight:'500',
  },
  planDescTxtMost:{
    color:'#fff',
    fontSize:'14px',
    marginBottom:'10px'
  },
  planItemsMost:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap:'10px',
    marginBlock:'5px',

  },
  planIconMost:{
    color:'#E4E6F1',
    backgroundColor:'#adadad3b',
    padding:'3px',
    borderRadius:'50%',
  },
  planItemTxtMost:{
    color:'#E4E6F1',
    fontSize:'14px',
  },
  planTypeTxtMost:{
    color:'#E4E6F1',
    fontSize:'19px',
    fontWeight:'600',
  },
  popularTxtMost:{
    color:'#dab23b',
    fontSize:'10px',
    fontWeight:'200',
    backgroundColor:'#3a31a1',
    paddingInline:'10px',
    paddingBlock:'5px',
    borderRadius:'30px',
    textTransform:'Uppercase',
    alignSelf:'flex-end',
  },
}));

const Pricing = () => {
  const themeColor = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const classes = useStyles(themeColor);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      height:'100%',
      width:'fit-content',
      backgroundColor:'#E4E6F1',
      padding:'2rem',
      paddingInline:'13rem',
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
          <div className={classes.titleTxt}>Simple, transparent pricing</div>
          <div className={classes.subTxt}>No contracts. No surprise fees.</div>
          <Box sx={{ 
            backgroundColor:'#fff',
            borderRadius:'40px',
            height:'30px',
           }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" 
                      indicatorColor="" >
                <Tab 
                indicatorColor="secondary"
                sx={{
                  elevation: 5,
                  minHeight:'30px',
                  fontSize:'10px',
                  fontWeight:'200',
                  paddingInline:'10px',
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
                label="Monthly" value="1" />
                <Tab 
                  indicatorColor="secondary"
                  sx={{
                    elevation: 5,
                    minHeight:'30px',
                    fontSize:'10px',
                    fontWeight:'200',
                    paddingInline:'10px',
                    paddingBlock:'5px',
                    borderRadius:'30px',
                    textTransform:'Uppercase',
                    alignSelf:'flex-end',
                    '&.Mui-selected': {
                      backgroundColor:'#3a31a1',
                      color:'#dab23b',
                      fontWeight:'400',
                    },
                  }}label="Yearly" value="2" />
              </TabList>
          </Box>
      </Box>
      <TabPanel value="1">
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:'45px',
        backgroundColor:'#FFFFFF',
        width:"100%",
        height:'100%',
        borderRadius:'1rem',
        boxSizing:'border-box',
        gap:'10px',


      }}>
        <Box className={classes.pricingBox}>
          <div className={classes.priceMonthTxt}><span className={classes.priceTxt} >20$</span> /month</div>
          <div className={classes.planTypeTxt}>Intro</div>
          <div className={classes.planDescTxt}>For most businesses that want to otpimize web queries</div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <PlanButton> Choose Plan </PlanButton>
        </Box>
        <Box className={classes.pricingBox} >
          <div className={classes.priceMonthTxt}><span className={classes.priceTxt} >20$</span> /month</div>
          <div className={classes.planTypeTxt}>Intro</div>
          <div className={classes.planDescTxt}>For most businesses that want to otpimize web queries</div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <PlanButton> Choose Plan </PlanButton>
        </Box>
        <Box className={classes.pricingBoxMost} >
          <div className={classes.popularTxtMost}>Most popular</div>
          <div className={classes.priceMonthTxtMost}><span className={classes.priceTxtMost} >100$</span> /month</div>
          <div className={classes.planTypeTxtMost}>Pro</div>
          <div className={classes.planDescTxtMost}>For most businesses that want to otpimize web queries</div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
          </div>
          <div className={classes.planItemsMost}>
            <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
          </div>
          <MostPlanButton> Choose Plan </MostPlanButton>
        </Box>
        <Box className={classes.pricingBox} >
          <div className={classes.priceMonthTxt}><span className={classes.priceTxt} >20$</span> /month</div>
          <div className={classes.planTypeTxt}>Intro</div>
          <div className={classes.planDescTxt}>For most businesses that want to otpimize web queries</div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <div className={classes.planItems}>
            <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
          </div>
          <PlanButton> Choose Plan </PlanButton>
        </Box>
      </Box>
        </TabPanel>
        <TabPanel value="2">
            <Box sx={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            padding:'45px',
            backgroundColor:'#FFFFFF',
            width:"100%",
            height:'100%',
            borderRadius:'1rem',
            boxSizing:'border-box',
            gap:'10px',


          }}>
            <Box className={classes.pricingBox}>
              <div className={classes.priceMonthTxt}><span className={classes.priceTxt} >20$</span> /year</div>
              <div className={classes.planTypeTxt}>Intro</div>
              <div className={classes.planDescTxt}>For most businesses that want to otpimize web queries</div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <PlanButton> Choose Plan </PlanButton>
            </Box>
            <Box className={classes.pricingBox} >
              <div className={classes.priceMonthTxt}><span className={classes.priceTxt} >20$</span> /year</div>
              <div className={classes.planTypeTxt}>Intro</div>
              <div className={classes.planDescTxt}>For most businesses that want to otpimize web queries</div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <PlanButton> Choose Plan </PlanButton>
            </Box>
            <Box className={classes.pricingBoxMost} >
              <div className={classes.popularTxtMost}>Most popular</div>
              <div className={classes.priceMonthTxtMost}><span className={classes.priceTxtMost} >100$</span> /year</div>
              <div className={classes.planTypeTxtMost}>Pro</div>
              <div className={classes.planDescTxtMost}>For most businesses that want to otpimize web queries</div>
              <div className={classes.planItemsMost}>
                <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
              </div>
              <div className={classes.planItemsMost}>
                <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
              </div>
              <div className={classes.planItemsMost}>
                <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
              </div>
              <div className={classes.planItemsMost}>
                <FiCheck className={classes.planIconMost}/><div className={classes.planItemTxtMost}>Free forever</div>
              </div>
              <MostPlanButton> Choose Plan </MostPlanButton>
            </Box>
            <Box className={classes.pricingBox} >
              <div className={classes.priceMonthTxt}><span className={classes.priceTxt} >20$</span> /year</div>
              <div className={classes.planTypeTxt}>Intro</div>
              <div className={classes.planDescTxt}>For most businesses that want to otpimize web queries</div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <div className={classes.planItems}>
                <FiCheck className={classes.planIcon}/><div className={classes.planItemTxt}>Free forever</div>
              </div>
              <PlanButton> Choose Plan </PlanButton>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default Pricing