import React,{useEffect} from 'react'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles';
import { FaFacebookF } from 'react-icons/fa'
import { GrTwitter } from 'react-icons/gr';
import { BsGoogle } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs';
import FooterBGImg from '../images/footer-bg.svg';
import FooterBGImgLight from '../images/footer-bgLight.svg';
import Logo from '../images/logo-new-dark.png';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
    footerBox: {
        height: '230px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '10px',
        backgroundColor: '#b8bdc99e',
        padding: '30px',
        minWidth: '200px',
        borderRadius: '3px',
        color: '#fff',
        fontFamily: 'plex-sans, sans-serif',
        '@media only screen and (max-width: 540px)': {
            flex: 1,
        },
    },
    footerBoxTitle: {
        fontSize: '18px',
        fontWeight: '700',
        color: themeColor => themeColor.status == 'dark' ? '#f5f5f5' : '#1e1d1d',
    },
    footerBoxSubTitle: {
        fontSize: '14px',
        fontWeight: '200',
        color: themeColor => themeColor.status == 'dark' ? '#f5f5f5' : '#1e1d1d',
        '&:hover': {
            color: '#2d4381',
        }
    },
    footerIconBorder: {
        width: '20px',
        height: '20px',
        padding: '10px',
        border: '1px solid #fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    footerIcon: {
        fontSize: '16px',
        color: '#fff',
    }
})
const Footer = () => {
    const themeColor = useSelector((state) => state.theme.value);
    const classes = useStyles(themeColor);
    let navigate = useNavigate();
    const headerVisibility = useSelector((state) => state.header)

    useEffect(() => {

        console.log("headerVisibilityeee", headerVisibility.value)
    }, [headerVisibility]);

    return (
        <>
        {headerVisibility.value[0].header &&
        <Box
            sx={{
                width: "100%",
                height: "100%",
                background: themeColor.status == 'light' ? '#F7F7F9' : '#1c1c1c',
                backgroundImage: themeColor.status == 'dark' ? `url(${FooterBGImg})` : `url(${FooterBGImgLight})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
                boxSizing: 'border-box',
            }}>
            <Box sx={{
                width: "100%",
                height: "100%",
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '24px',
                boxSizing: "border-box",
            }}>
                <Box
                    sx={{
                        height: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        alignItems: 'flex-start',
                        gap: '10px',
                        pr: '50px',
                        minWidth: '200px',
                        borderRadius: '3px',
                        color: '#fff',
                        alignSelf: 'flex-start',
                        fontFamily: 'plex-sans, sans-serif',
                        '@media only screen and (max-width: 540px)': {
                            flex: 1,
                        },
                    }}
                >
                    {/* <Box 
            sx={{
                height:'90px',
                width:'250px',
                backgroundImage:`url(${Logo})`,
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                marginLeft:'-20px',
            }}
            ></Box> */}
                    <img onClick={() => { navigate(`/`) }} src={Logo} style={{
                        width: '250px',cursor:'pointer'
                    }} alt="logo" />
                    <div className={classes.footerBoxTitle}>Take Deliveroo with you</div>
                    <Box
                        sx={{
                            width: "100%",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '24px',
                        }}
                    >
                        <div className={classes.footerIconBorder}>
                            <FaFacebookF className={classes.footerIcon} />
                        </div>
                        <div className={classes.footerIconBorder}>
                            <GrTwitter className={classes.footerIcon} />
                        </div>
                        <div className={classes.footerIconBorder}>
                            <BsGoogle className={classes.footerIcon} />
                        </div>
                        <div className={classes.footerIconBorder}>
                            <BsLinkedin className={classes.footerIcon} />
                        </div>

                    </Box>
                    <div style={{ color: '#fff', fontSize: '14px', fontWeight: '200' }}>© 2022 BussiFinder</div>
                </Box>
                <Box className={classes.footerBox}>
                    <div className={classes.footerBoxTitle}>Discover Deliveroo</div>
                    <div className={classes.footerBoxSubTitle}>Investors</div>
                    <div className={classes.footerBoxSubTitle}>About us</div>
                    <div className={classes.footerBoxSubTitle}>Takeaway</div>
                    <div className={classes.footerBoxSubTitle}>More</div>
                    <div className={classes.footerBoxSubTitle}>Newsroom</div>
                    <div className={classes.footerBoxSubTitle}>Foodscene blog</div>
                    <div className={classes.footerBoxSubTitle}>Engineering blog</div>
                    <div className={classes.footerBoxSubTitle}>Design blog</div>
                </Box>
                <Box className={classes.footerBox}>
                    <div className={classes.footerBoxTitle}>Legal</div>
                    <div className={classes.footerBoxSubTitle}>Terms and conditions</div>
                    <div className={classes.footerBoxSubTitle}>Privacy</div>
                    <div className={classes.footerBoxSubTitle}>Cookies</div>
                    <div className={classes.footerBoxSubTitle}>Modern Slavery Statement</div>
                    <div className={classes.footerBoxSubTitle}>Tax Strategy</div>
                    <div className={classes.footerBoxSubTitle}>Section 172 Statement</div>
                </Box>
                <Box className={classes.footerBox}>
                    <div className={classes.footerBoxTitle}>Help</div>
                    <div className={classes.footerBoxSubTitle}>Contact</div>
                    <div className={classes.footerBoxSubTitle}>FAQs</div>
                    <div className={classes.footerBoxSubTitle}>Cuisines</div>
                    <div className={classes.footerBoxSubTitle}>Brands</div>
                </Box>


            </Box>
            {/* <div style={{width:"90%",height:"1px",backgroundColor:"#fff"}} ></div> */}

            </Box>}
        </>
       
    )
}

export default Footer