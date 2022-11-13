import React from 'react'
import CSVReader from 'react-csv-reader'
import API from './api';
import { CSVLink } from "react-csv";
// import { ExportToCsv } from 'export-to-csv-file';

function CreateHotelDataset() {
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
        // let transportationModesCount;
        // let attractionPlacesCount;
        // let rating;
        // let ratingCount;
        // let lat;
        // let lng;
        // let latitude;
        // let longitude;
        // let placeId;
        // let phoneNo;
        // let address;
        // let website;
        // let starRating;
        // let hotelName;
        // let features ={}
        // let wifi;
        // let parking;
        // let pool;
        // let airCondition;
        // let nearByHotelReviewCount;
        // let competitors;
        let count = 0;

        for (let i = 0; i < data.length; i++) {
            if (i == 2) {
                continue;
            }
        }

        for (let i = 0; i < data.length; i++) {
            API.post('restaurant/LocationDetails', { name: data[i].name })
                .then(function (result) {
                    let lat = result.data.latitude
                    let lng = result.data.longitude;
                    let placeId = result.data.place_id;

                    console.log("placeId", placeId)
                    console.log("latlng", lat, lng)

                    let body = {
                        "latitude": lat,
                        "longitude": lng
                    }
                    if (lat && lng) {
                        API.post('hotel/placefulldetails', { placeId: placeId }).then(function (placeDetails) {
                            API.post('hotel/transportationmodes', body).then(function (transportModesResult) {
                                API.post('hotel/attractionplaces', body).then(function (attractionplacesResult) {
                                    API.post('hotel/nearbyhotel', body)
                                        .then(function (nearByHotelResult) {
                                            console.log("details", placeDetails)
                                            let phoneNo = placeDetails.data.phoneNo;
                                            let address = placeDetails.data.address;
                                            let website = placeDetails.data.website;
                                            let starRating = result.data.rating;
                                            let latitude = lat;
                                            let longitude = lng;
                                            let transportationModesCount = transportModesResult.data.transportationmodes_count;
                                            let attractionPlacesCount = attractionplacesResult.data.attractionplaces_count;
                                            let nearByHotelReviewCount = nearByHotelResult.data.rating_count;
                                            let competitors = nearByHotelResult.data.hotel_count;
                                            let rating;
                                            let ratingCount = Number(result.data.rating_count);
                                            let features = {
                                                "f1": data[i].features_1,
                                                "f2": data[i].features_2,
                                                "f3": data[i].features_3,
                                                "f4": data[i].features_4,
                                            }
                                            let avFeatures = {
                                                "wifi": "No",
                                                "parking": "No",
                                                "pool": "No",
                                                "airCondition": "No",
                                                "beach": "No",
                                            }
                                            if (features.f1 === "Air-conditioned" || features.f2 === "Air-conditioned" || features.f3 === "Air-conditioned" || features.f4 === "Air-conditioned") {
                                                avFeatures.airCondition = "Yes";
                                            }
                                            if (features.f1 === "Wifi" || features.f2 === "Wifi" || features.f3 === "Wifi" || features.f4 === "Wifi") {
                                                avFeatures.wifi = "Yes";
                                            }
                                            if (features.f1 === "Free Wi-Fi" || features.f2 === "Free Wi-Fi" || features.f3 === "Free Wi-Fi" || features.f4 === "Free Wi-Fi") {
                                                avFeatures.wifi = "Free";
                                            }
                                            if (features.f1 === "Free parking" || features.f2 === "Free parking" || features.f3 === "Free parking" || features.f4 === "Free parking") {
                                                avFeatures.parking = "Yes";
                                            }
                                            if (features.f1 === "Pool" || features.f2 === "Pool" || features.f3 === "Pool" || features.f4 === "Pool") {
                                                avFeatures.pool = "Yes";
                                            }
                                            if (features.f1 === "Beach access" || features.f2 === "Beach access" || features.f3 === "Beach access" || features.f4 === "Beach access") {
                                                avFeatures.beach = "Yes";
                                            }
                                            console.log(avFeatures);

                                            if (Number(ratingCount) > 1000) {
                                                rating = Number(result.data.rating) * 20;
                                            } else if (Number(ratingCount) > 200) {
                                                rating = Number(result.data.rating) * 0.8 * 20;
                                            } else if (Number(ratingCount) > 50) {
                                                rating = Number(result.data.rating) * 0.6 * 20;
                                            } else {
                                                rating = Number(result.data.rating) * 0.3 * 20;
                                            }
                                            console.log("fields")
                                            fields.push({ Name: data[i].name, Latitude: latitude, Longitude: longitude, Address: address, PhoneNo: phoneNo, RatingCount: ratingCount, StarRating: starRating, CompetitorsCount: competitors, TransportationModes: transportationModesCount, AttractionPlacesCount: attractionPlacesCount, NearByHotelReviewCount: nearByHotelReviewCount, Website: website, Wifi: avFeatures.wifi, Pool: avFeatures.pool, AC: avFeatures.airCondition, Parking: avFeatures.parking, Beach: avFeatures.beach, Rating: Number(rating) })

                                            if ((fields.length + count) == data.length) {
                                                console.log("fields", fields)
                                                // csvExporter.generateCsv(fields);
                                            }

                                        }).catch(function (error) {
                                            return error;
                                        });
                                }).catch(function (error) {
                                    return error;
                                })
                            }).catch(function (error) {
                                return error;
                            })
                        }).catch(function (error) {
                            return error;
                        })

                    } else {
                        count++;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }

        headers = [
            { label: "Name", key: "name" },
            { label: "Latitude", key: "latitude" },
            { label: "Longitude", key: "longitude" },
            { label: "TransportationModesCount", key: "transportationModesCount" },
            { label: "DistanceToCity", key: "attractionPlacesCount" },
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

export default CreateHotelDataset