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
import ContactUsBg from '../images/contactUsBg.svg'
import ContactUsEclipse from '../images/contactEclipse.svg'

const ContactUsButton = styled(Button)(({ theme }) => ({
        width:"160px",
        marginTop:"20px",
        // backgroundColor:'#fff5fb',
        color:'#fff5fb',
        borderRadius:'30px',
        textTransform:'none',
        fontSize:'15px',
        boxSizing:'border-box',
        alignSelf:'flex-end',
        paddingBlock:'10px',
        background: 'linear-gradient(to left, #ca3b3b 50%, #d34747 50%) right',
        backgroundSize: '200%',
        transition: '.5s ease-out',
        '&:hover': {
            // backgroundColor: "#4c69ba",
            backgroundPosition: 'left',
        },
}));

const useStyles = makeStyles((theme) => ({
    input: {
        flex: 1,
        height: '48px',
        boxSizing: 'border-box',
        fontSize: '16px',
        lineHeight: '24px',
        padding: '12px 16px',
        border: '1px solid #e8ebeb',
        borderRadius: '8px',
        boxShadow: 'inset 0 2px 4px rgb(0 0 0 / 5 %)',
        width: '400px',
        margin: '0px 1px 15px'
    },
    inputTxt:{
        color:'#616161',
    }
}));

const ContactUs = () => {
const classes = useStyles();
const [formDetails, setFormDetails] = useState({ username: "", email: "", description: "" })

const handleChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value })
}


const submitContactUsForm = async () => {
    // try {
    //  const response = await Axios.post('/user/validateUser', userDetails)
    //  console.log(response)
    //  dispatch(register(response.data))
    //  const user = {
    //      username: response.data.username,
    //      email: response.data.email,
    //      phone: response.data.phone,
    //      image: response.data.image,
    //  }
    //  sessionStorage.setItem("token", JSON.stringify(user));
    //  navigate('/')

    //  } catch (error) {
    //  console.log(error)
    //  }
}

return (
    <Box
    sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        p:5,
        // position:'absolute',

    }}
    >
        <Box
            sx={{
                width: 'fit-content',
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                boxSizing: 'border-box',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0px 0px 10px 0px rgb(0 0 0 / 10%)',
        
            }}>
        <h1>Contact Us</h1>
        <Box
        sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            boxSizing: 'border-box',
            padding: '20px',

        }}
        >
                <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${ContactUsEclipse})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    
                }}
                >
                    <Box
                    sx={{
                        width: '350px',
                        height: '300px',
                        position: 'relative',
                        backgroundImage: `url(${ContactUsBg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                    }}
                    >

                    </Box>
                </Box>
                <Box
                 sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2px',
                    boxSizing: 'border-box',
        
                }}
                >   
                    <div className={classes.inputTxt}>Username</div>
                    <input className={classes.input} type="text" name="username" onChange={handleChange}/>
                    <div className={classes.inputTxt}>Email</div>
                    <input className={classes.input} type="text" name="email" onChange={handleChange}/>
                    <div className={classes.inputTxt}>Description</div>
                    <input className={classes.input} type="text" name="description" onChange={handleChange}/>
                    <ContactUsButton variant="contained" onClick={() => submitContactUsForm()}>Submit </ContactUsButton>
                </Box>
        </Box>
        </Box>
    </Box>
)
}

export default ContactUs