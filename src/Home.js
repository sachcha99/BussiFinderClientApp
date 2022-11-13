import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import API from './api';
import { Grid, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Background from './images/bg-1.jpg'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Map from './components/Map';
import PropertyType from './components/PropertyType';
import DetailsBox from './components/DetailsBox';
import HomePageHeader from './components/HomePageHeader';
import { useSelector } from "react-redux";
import Particles from './components/Particle';
import ContactUs from './components/ContactUs';
import Loader from './components/Loader';
//import API from '../../Backend/src/api';


const containerStyle = {
    width: '1400px',
    height: '500px'
};

const center = {
    lat: 7.8731,
    lng: 80.7718
};

function Home() {

    let navigate = useNavigate();
    const themeColor = useSelector((state) => state.theme.value);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        handleToggle()
        console.log("data", latitude, longitude)
        const result1 = await checkRestaurantSite(latitude, longitude)
        const result2 = await checkHotelSite(latitude, longitude)
        const result3 = await checkPharmacySite(latitude, longitude)
        const result4 = await checkGrocerySite(latitude, longitude)

        console.log("first",result1,result2)
        handleClose()
        navigate(`/result`, { state: { resultHotel: result1, resultRes: result2, resultPh: result3, resultG: result4}})
    }

    const checkRestaurantSite = async (latitude, longitude) => {
        let ShoppingMallsCount;
        let DistanceToCity;
        let body = {
            "latitude": latitude,
            "longitude": longitude
        }

        const r1 = API.post('restaurant/ShoppingMallsCount', body)
            .then(function (response) {

                const r2 = API.post('restaurant/DistanceToCity', body)
                    .then(function (res) {
                        ShoppingMallsCount = response.data.totalShoppingMallsCount;
                        const dis = res.data;
                        console.log("did", dis)
                        const distance = Object.keys(dis).length === 0 ? 0 : dis.split(' ')
                        DistanceToCity = distance != 0 ? distance[0] : 0
                        console.log("res", ShoppingMallsCount, DistanceToCity);

                        let restaurantDetails = {
                            "ShopingArea": Number(ShoppingMallsCount),
                            "DistanceToCity": Number(DistanceToCity)

                        }
                        const r3 = axios.post(`https://hotelsitepredictor.herokuapp.com/restaurant`, restaurantDetails).then((r) => {
                            console.log("r", r)
                            return r.data
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                        //handleClose()

                        return r3;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                return r2;
            })
            .catch(function (error) {
                console.log(error);
            });
        return r1
    };

    const checkGrocerySite = async (latitude, longitude) => {
        let Competitors = 0 ;
        let Population = 0;


        let groceryDetails = {
            "Population": Number(Population),
            "Competitors": Number(Competitors)

        }

        const r3 = axios.post(`https://hotelsitepredictor.herokuapp.com/grocery`, groceryDetails).then((r) => {
            console.log("r", r)
            return r.data
        })
            .catch(function (error) {
                console.log(error);
            });

        return r3;
    };

    const checkPharmacySite = async (latitude, longitude) => {
        let Medi_Places_Count;
        let Distance_toStation;
        var body = {
            "latitude": latitude,
            "longitude": longitude
        }
        console.log("body----", body)
        const r1 = axios.post(`http://localhost:5000/pharmacy/medicalPlaces`, body)
            // API.get("/grocery/grocerytraffci",body)
            .then((response) => {
                console.log("response", response)
                // API.get("/grocery/grocerycompetitor",body)
                const r2 = axios.post(`http://localhost:5000/pharmacy/distanceToBStation`, body)
                    .then((res) => {
                        console.log("res", res)
                        // console.log("traffic res",response.data.TraffciSummation)
                        // console.log("comp res",res.data.CompetitorCount)

                        // const dis = res.data;
                        // const distance = dis.split(' ')

                        Medi_Places_Count = Object.keys(response.data).length === 0 ? 0 :response.data.MediPlacesCount;
                        Distance_toStation = Object.keys(res.data).length === 0 ? 0 : res.data.distance;
                        console.log("resPP", Medi_Places_Count, Distance_toStation);

                        let pharmacyDetails = {
                            "Medi_Places_Count": Number(Medi_Places_Count),
                            "Distance_toStation": Number(Distance_toStation)

                        }

                        const r3 = axios.post(`https://hotelsitepredictor.herokuapp.com/pharmacy`, pharmacyDetails).then((r) => {
                            console.log("r", r)
                            return r.data
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                        //handleClose()

                        return r3;
                       
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                return r2;
            })
            .catch(function (error) {
                console.log(error);
            });

        return r1

    };



    const checkHotelSite = async (latitude, longitude) => {
        let TransportationModesCount;
        let AttractionPlacesCount;
        let body = {
            "latitude": latitude,
            "longitude": longitude
        }

        const r1 = API.post('hotel/transportationmodes', body)
            .then(function (response) {
                console.log("TransportationModesCount", response.data.transportationmodes_count)
                const r2 = API.post('hotel/attractionplaces', body)
                    .then(function (res) {

                        TransportationModesCount = response.data.transportationmodes_count;
                        AttractionPlacesCount = res.data.attractionplaces_count;
                        let hotelDetails = {
                            "AttractionPlace": Number(AttractionPlacesCount),
                            "TransportationModes": Number(TransportationModesCount)
                        }
                        const r3 = axios.post(`https://hotelsitepredictor.herokuapp.com/hotel`, hotelDetails, { withCredentials: true, crossDomain: true}).then((r) => {
                            console.log("r", r)
                            return r.data
                        })
                            .catch(function (error) {
                                console.log(error);
                            });
                        //handleClose()

                        return r3;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    return r2;
            })
            .catch(function (error) {
                console.log(error);
            });

            return r1;
    };


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
    }, []);

    return (
        <div style={{
            background : themeColor.status == 'light' ? '#F7F7F9':'#1c1c1c',
            width: '100%',
            height: '100%',
            }}>
            {isLoading && <Loader/> }
            <HomePageHeader/>
            <DetailsBox/>
            <PropertyType/>
            <ContactUs/>
        </div>

    );
}

export default Home;
