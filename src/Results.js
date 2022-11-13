import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import C1 from './images/c1.png'
import C2 from './images/c2.png'
import C3 from './images/c3.png'
import C4 from './images/c4.png'
import Background from './images/bg-1.jpg'
import { useLocation } from 'react-router';

const Results = () => {
const {state} = useLocation();

    const { resultHotel, resultRes, resultPh, resultG} = state;

    console.log("resultHotel", resultHotel)
    console.log("resultRes", resultRes)
    console.log("resultPh", resultPh)
    console.log("resultG", resultG)
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', paddingTop: '20px', backgroundImage: `url(${Background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh' }}>
            <div >
                <Card style={{ marginBottom: '20px'}} sx={{ maxWidth: 545 }}>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Hotel Site Selection
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <Chip label={resultHotel ? resultHotel.data.toFixed(2)+'%' : '%'} color="success" style={{ fontSize: "1.5rem" }} />
                            </Typography>

                        </div>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small">More Details</Button>
                        <img style={{ height: '58px' }} src={C1} />
                    </CardActions>
                </Card>

                <Card style={{ marginBottom: '20px' }} sx={{ maxWidth: 545 }}>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Restaurant Site Selection
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <Chip label={resultRes ? resultRes.data.toFixed(2)+'%' : '%'}  color="error" style={{ fontSize: "1.5rem" }} />
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small">More Details</Button>
                        <img style={{ height: '58px' }} src={C2} />

                    </CardActions>
                </Card>

                <Card style={{ marginBottom: '20px' }} sx={{ maxWidth: 545 }}>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Pharmacy Site Selection
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <Chip label={resultPh ? resultPh.data.toFixed(2) + '%' : '%'}  color="warning" style={{ fontSize: "1.5rem" }} />
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small">More Details</Button>
                        <img style={{ height: '58px' }} src={C3} />

                    </CardActions>
                </Card>
                <Card style={{ marginBottom: '20px' }} sx={{ maxWidth: 545 }}>
                    <CardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Retail Store Site Selection
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                <Chip label={resultG ? resultG.data.toFixed(2) + '%' : '%'} color="info" style={{ fontSize: "1.5rem" }} />
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size="small">More Details</Button>
                        <img style={{ height: '58px' }} src={C4} />

                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default Results