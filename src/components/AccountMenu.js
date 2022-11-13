import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { BsClockHistory } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { BsShieldLock } from 'react-icons/bs';
import { BsCreditCard2Front } from 'react-icons/bs';
import { IoIosGitBranch } from 'react-icons/io';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { darkMode, lightMode } from "../features/theme";
import { makeStyles } from '@mui/styles';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const useStyles = makeStyles((theme) => ({
  profileBox: {
    width: 'max-content',
    height: 'max-content',
    display: "flex",
    margin: '20px',
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: "10px",
  },
  profileEmail: {
    fontWeight: "200",
    color: themeColor => themeColor.status == 'dark' ? '#f5f5f5' : '#3e3d3d',
    fontFamily: "Roboto",
    fontSize: "12px",
    lineHeight: "18px",
  },
  profileName: {
    fontWeight: "500",
    color: themeColor => themeColor.status == 'dark' ? '#f5f5f5' : '#3e3d3d',
    fontFamily: "Roboto",
    fontSize: "17px",
  },
  termTxt: {
    fontWeight: "200",
    marginTop: "10px",
    fontFamily: "Roboto",
    fontSize: "12px",
    textAlign: "center",
    color: "#9e9e9e",
  },
  menuItems: {
    display: "flex",
    fontWeight: '400',
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "10px 20px",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: themeColor => themeColor.status == 'dark' ? '#3e3d3d' : '#e3e3e3',
    }
  },
  themeSwtich: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: "30px",
  }
}));

export default function AccountMenu({ name, email, onLogOut }) {
  const themeColor = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const classes = useStyles(themeColor);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [switchState, setSwitchState] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    if (event.target.checked) {
      console.log("dark")
      setSwitchState(true);
      sessionStorage.setItem("themeMode", JSON.stringify({ userTheme: "dark" }));
      dispatch(darkMode());
    } else {
      console.log("light")
      setSwitchState(false);
      sessionStorage.setItem("themeMode", JSON.stringify({ userTheme: "light" }));
      dispatch(lightMode());
    }
  };

  useEffect(() => {
    const themeMode = JSON.parse(sessionStorage.getItem("themeMode"));
    if (themeMode) {
      if (themeMode.userTheme == 'dark') {
        setSwitchState(true);
        dispatch(darkMode());
      } else {
        setSwitchState(false);
        dispatch(lightMode());
      }
    } else {
      setSwitchState(false);
      dispatch(lightMode());
    }
  }, []);


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              backgroundColor: themeColor.status == 'dark' ? '#51515138' : '#babbbb2e',
              padding: '6px 6px 6px 18px',
              borderRadius: '28px',
              color: themeColor.status == 'dark' ? '#f5f5f5' : '#3e3d3d',
              fontSize: '15px',

              /* "to left" / "to right" - affects initial color */
              // background: 'linear-gradient(to left, salmon 50%, lightblue 50%) right',
              // backgroundSize: '200%',
              // transition: '.5s ease-out',

              '&:hover': {
                backgroundColor: themeColor.status == 'dark' ? '#a195955c' : '#1e1e1e2e',
                // backgroundPosition: 'left',
              }
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >  {name ? name : 'Name'}
            <Avatar  {...stringAvatar(name ? name : 'Name')} sx={{ width: 30, height: 30, ml: 1, fontSize: '16px', }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            borderRadius: "15px",
            overflow: 'visible',
            backgroundColor: themeColor.status == 'light' ? '#f8f8f5' : '#2e2e2e',
            color: themeColor.status == 'dark' ? '#f5f5f5' : '#3e3d3d',

            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              // width: 32,
              // height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              elevation: 4,
              bgcolor: themeColor.status == 'light' ? '#f8f8f5' : '#2e2e2e',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <div className={classes.profileBox}>
          <Avatar alt={"AuserDetails.username"} src='https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' sx={{ width: 53, height: 53, borderRadius: '8px' }} variant="square" />
          <div>
            <div className={classes.profileName}>{name ? name : 'Profile'}</div>
            <div className={classes.profileEmail}>{email ? email : 'E-Mail'}</div>
          </div>
        </div>
          <Divider sx={{ borderColor: '#b5b5b51f' }} />
          <div className={classes.themeSwtich}>
            Theme Mode<sup style={{ fontStyle: 'italic', fontSize: '12px', marginLeft: '-5px' , marginBottom: '-3px' }}>({themeColor.status})</sup> <Android12Switch sx={{ m: 1 }} checked={switchState} onChange={handleChange} />
          </div>
          <Divider sx={{ borderColor: '#b5b5b51f' }} />
          <div className={classes.menuItems}>
            <ListItemIcon>
              <IoIosGitBranch style={{ color: '#956cd0', fontSize: "25px", marginLeft: 10 }} />
            </ListItemIcon>
            Subscriptions
          </div>
          <div className={classes.menuItems}>
            <ListItemIcon>
              <BsClockHistory style={{ color: '#c68228', fontSize: "25px", marginLeft: 10 }} />
            </ListItemIcon>
            History
          </div>
          <div className={classes.menuItems}>
            <ListItemIcon>
              <BsCreditCard2Front style={{ color: '#2d762e', fontSize: "23px", marginLeft: 10, }} />
            </ListItemIcon>
            Payment
          </div>
          <div className={classes.menuItems}>
            <ListItemIcon>
              <BsShieldLock style={{ color: '#3177ab', fontSize: "23px", marginLeft: 10 }} />
            </ListItemIcon>
            Security
          </div>
          <div onClick={onLogOut} className={classes.menuItems}>
            <ListItemIcon>
              <IoIosLogOut style={{ color: '#bc5959', fontSize: "26px", marginLeft: 10 }} />
            </ListItemIcon>
            Logout
          </div>
          <div className={classes.termTxt}>
            v1.389 - Term and Conditions
          </div>
      </Menu>
    </React.Fragment>
  );
}





const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
