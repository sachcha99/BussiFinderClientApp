import React from 'react'
import InputDetailsPharmacy from './PharmacyInputs/InputDetails'
import { Box } from '@mui/system'

const InputPharmacyDetails = () => {
  return (
      <Box
      sx={{
        width:"100%",
        height:"100%",
        backgroundColor:'#E4E6F1',
        boxSizing:"border-box",
        backgroundImage: `url(${require('../images/about-shape-2.svg').default})`,
        padding:"0px",
        backgroundRepeat: 'repeat',
        backgroundSize: 'contain',


      }}
      >
        <InputDetailsPharmacy />
      </Box>
  )
}

export default InputPharmacyDetails