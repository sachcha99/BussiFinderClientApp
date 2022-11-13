import React from 'react'
import InputDetails from './Hotel Input/InputDetails'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux'

const InputHotelDetails = () => {
  const themeColor = useSelector((state) => state.theme.value);

  window.onbeforeunload = function () { return "Your work will be lost."; };
  return (
      <Box
      sx={{
        width:"100%",
        height:"100%",
        background : themeColor.status == 'light' ? '#F7F7F9':'#1c1c1c',
        boxSizing:"border-box",
        // backgroundImage: `url(${require('../images/about-shape-2.svg').default})`,
        backgroundImage:'url(https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
        padding:"10px",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment:'fixed',
        

      }}
      >
        <InputDetails />
      </Box>
  )
}

export default InputHotelDetails