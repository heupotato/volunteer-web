import  React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
const containerStyle = {
    width: '100%', 
    height: '400px'
}

var center = {
    lat: 16.073801,
    lng: 108.14914
}

function Map(prop){
    const [data, setData] = useState([{lat: 0, lng: 0}]); 
    const address = prop.address; 
    useEffect(() => {
        axios.get("https://open.mapquestapi.com/geocoding/v1/address?key=TETmPNAGrSsGs5AMz2vpaGXTc0jdCR5N&location=" + address)
      .then(res => {
        const dataPlace = res.data; 
        const latLng = dataPlace.results[0].locations[0].latLng; 
        console.log(latLng); 
        setData(latLng); 
        console.log(data); 
      })
      .catch(error => console.log(error));
    }, [])


    return(
        <div>
            <h5 style={{fontStyle: 'italic'}}>Địa chỉ: {prop.address}</h5>
            <div>
                <img alt='static Mapbox map of address' 
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${data.lng},${data.lat},11,0/600x400@2x?access_token=pk.eyJ1IjoiaGV1cG90YXRvIiwiYSI6ImNrcmU5M3ppMDF6bnMybmxxdWZybnhnZ2EifQ.HipNHpiJeyatsN3dj4-zvA`}/>
            </div>
        </div>
    ); 
}

export default Map; 