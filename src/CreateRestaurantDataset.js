import axios from 'axios';
import React from 'react'
import CSVReader from 'react-csv-reader'
import API from './api';
import { CSVLink } from "react-csv";
// import { ExportToCsv } from 'export-to-csv-file';

function CreateRestaurantDataset() {
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    let fields = []
    let headers = []

    // const csvExporter = new ExportToCsv(options);

    const handleForce = async (data, fileInfo) => {
        let ShoppingMallsCount;
        let DistanceToCity;
        let Rating;
        let RatingCount;
        let lat;
        let lng;
        let latitude;
        let longitude;
        let placeId;
        let Closing;
        let Opening;
        let Delivery;
        let Competitors;
        let EducationRelatedPlacesCount;
        let WorkPlacesCount;
        let PhoneNo;
        let Address;
        let Website;
        let StarRating;
        let count = 0;



        for (let i = 0; i < data.length; i++) {
            if (i == 2) {
                continue;
            }
        }
        for (let i = 0; i < data.length; i++) {
            console.log("data[i].name", data[i])

            API.post('restaurant/LocationDetails', { name: data[i].name })
                .then(function (result) {
                    lat = result.data.latitude;
                    lng = result.data.longitude;
                    placeId = result.data.place_id;

                    console.log("placeId", placeId)
                    console.log("latlng", lat, lng)

                    let body = {
                        "latitude": lat,
                        "longitude": lng
                    }
                    if (lat && lng) {
                    API.post('restaurant/PlaceDetails', { placeId: placeId }).then(function (placeDetails) {
                        API.post('restaurant/Competitors', body).then(function (competitors) {
                            API.post('restaurant/Education', body).then(function (education) {
                                API.post('restaurant/WorkPlaces', body)
                                .then(function (workPlaces) {
        
        
        
                                    // console.log("PlaceDetails_Opening_Closing", Opening, Closing)
        
                                
                                        API.post('restaurant/ShoppingMallsCount', body)
                                            .then(function (response) {
                                                console.log("ShoppingMallsCount", response.data.totalShoppingMallsCount)
                                                API.post('restaurant/DistanceToCity', body)
                                                    .then(function (res) {
        
                                                        Delivery = data[i].delivery ;
                                                        Competitors = competitors.data.totalRestaurantsCount;
                                                        EducationRelatedPlacesCount = education.data.totalEducationRelatedPlacesCount;
                                                        WorkPlacesCount = workPlaces.data.totalWorkPlacesCount;
                                                        PhoneNo = placeDetails.data.phoneNo;
                                                        Address = placeDetails.data.address;
                                                        Website = placeDetails.data.website;
                                                        StarRating = result.data.rating;
                                                        console.log("DistanceToCity", res.data)
                                                        latitude = result.data.latitude
                                                        longitude = result.data.longitude;
                                                        ShoppingMallsCount = response.data.totalShoppingMallsCount;
                                                        DistanceToCity = res.data;
                                                        RatingCount = Number(result.data.rating_count)
        
                                                        if (placeDetails.data.openTime == "24 hours") {
                                                            Opening = "24 hours"
                                                        } else {
                                                            if (placeDetails.data.openTime < 1200) {
                                                                Opening = "Morning"
                                                            } else {
                                                                Opening = "Evening"
                                                            }
                                                        }
                                                        if (placeDetails.data.closeTime == "24 hours") {
                                                            Closing = "24 hours"
                                                        } else {
                                                            if (placeDetails.data.closeTime < 600) {
                                                                Closing = "Late Night"
                                                            } else {
                                                                Closing = "Night"
                                                            }
                                                        }
        
                                                        if (Number(RatingCount) > 1000) {
                                                            Rating = Number(result.data.rating) * 20;
                                                        } else if (Number(RatingCount) > 200) {
                                                            Rating = Number(result.data.rating) * 0.8 * 20;
                                                        } else if (Number(RatingCount) > 50) {
                                                            Rating = Number(result.data.rating) * 0.6 * 20;
                                                        } else {
                                                            Rating = Number(result.data.rating) * 0.3 * 20;
                                                        }
        
                                                        // Rating = result.data.rating;
                                                        // const dis = DistanceToCity.split(' ')
                                                        fields.push({ Name: data[i].name, Latitude: latitude, Longitude: longitude, Address: Address, PhoneNo: PhoneNo, RatingCount: RatingCount, StarRating: StarRating, CompetitorsCount: Competitors, ShoppingMallsCount: ShoppingMallsCount, EducationRelatedPlacesCount: EducationRelatedPlacesCount, WorkPlacesCount: WorkPlacesCount, DistanceToCity: DistanceToCity, OpeningHours: Opening, ClosingHours: Closing, Delivery: Delivery, Website: Website, Rating: Number(Rating) })
                                                        if ((fields.length + count) == data.length) {
                                                            console.log("fields", fields)
                                                            // csvExporter.generateCsv(fields);
                                                        }
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    });
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            }).catch(function (error) {})
                        }).catch(function (error) {})
                    }).catch(function (error) {});
                }
                else {
                    count++;
                }
                })
            
                .catch(function (error) {
                    console.log(error);
                });
        }

        headers = [
            { label: "Name", key: "name" },
            { label: "Latitude", key: "latitude" },
            { label: "Longitude", key: "longitude" },
            { label: "ShoppingMallsCount", key: "shoppingMallsCount" },
            { label: "DistanceToCity", key: "distanceToCity" },
        ];
    };

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    return (
        <div className="container">
            <CSVReader
                cssClass="react-csv-input"
                label="Select CSV with secret Death Star statistics"
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
            />
            <CSVLink data={fields} headers={headers}>
                Download me
            </CSVLink>;
        </div>
    )
}

export default CreateRestaurantDataset