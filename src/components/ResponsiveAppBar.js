import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Logo from './../images/logo-new.png'
import { darkMode, lightMode } from "../features/theme";
import { styled } from '@mui/material/styles';
import AccountMenu from './AccountMenu';
import { makeStyles } from '@mui/styles';
import jwt_decode from "jwt-decode";
import { login, logout } from '../features/user';

const useStyles = makeStyles((theme) => ({
  menuTabs: {
    color: themeColor => themeColor.status == 'dark' ? '#f5f5f5' : '#3e3d3d',
    '&:hover': {
      color: '#070939',
    }
  }
}));

const pages = ['Home', 'Service', 'Pricing','Factor Details', 'Contact Us', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const themeColor = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const headerVisibility = useSelector((state) => state.header)


  const userDetails = useSelector((state) => state.user)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      let decodedToken = jwt_decode(token)
      dispatch(login({ 'fullName': decodedToken.fullName, 'email': decodedToken.email }))
    }
  }, []);

  useEffect(() => {
    console.log("headerVisibility[0].header", headerVisibility.value[0].header)
  }, [headerVisibility]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    navigate(event.currentTarget.innerText);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("dark")
      dispatch(darkMode());
    } else {
      console.log("light")
      dispatch(lightMode());
    }
  };

  const onLogOut = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  }

  return (
    <>
      {headerVisibility.value[0].header ?
        <AppBar position="stick" sx={{ background: themeColor.status == 'light' ? '#f7f7f7' : '#070939'}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>

              {/* <Box 
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 1,
                  height: '60px',
                  width: '180px',
                  backgroundImage: `url(${Logo})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',


                }} /> */}
              <img onClick={() => { navigate(`/`) }} src={Logo}
                style={{ width: '200px', cursor: 'pointer' }} alt="logo" />



              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon style={{ color: themeColor.status == 'dark' ? '#f5f5f5' : '#070939', }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },

                  }}
                >
                  {pages.map((page) => (
                    <div key={page} onClick={handleCloseNavMenu} className={classes.menuTabs}>
                      <Typography textAlign="center">{page}</Typography>
                    </div>
                  ))}
                </Menu>
              </Box>
              {/* <Box onClick={() => { navigate(`/`) }}
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  height: '70px',
                  width: '200px',
                  backgroundImage: `url(${Logo})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',

                }} /> */}

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      display: 'block',
                      color: themeColor.status == 'dark' ? '#f5f5f8' : '#3e3d3d',
                      textTransform: 'None',
                      fontSize: '16px',
                      fontWeight: "400",
                      '&:hover': {
                        // color:'#f5f5f5',
                      }
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              {userDetails.value.length > 0 ?
                < AccountMenu sx={{zIndex:10 }} onLogOut={onLogOut} name={userDetails.value.length > 0 && userDetails.value[0].fullName} email={userDetails.value.length > 0 && userDetails.value[0].email} />
                :
                <Button sx={{zIndex:10 }} onClick={() => navigate(`/signIn`)}>Sign In</Button>
              }
            </Toolbar>
          </Container>
        </AppBar> :
        <div style={{ display: 'none' }}>
        </div>
      }
    </>
  );
};
export default ResponsiveAppBar;


