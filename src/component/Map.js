import  React, { Component, useState } from "react";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Geocode from "react-geocode";

const containerStyle = {
    width: '100%npm install --save react-geocode', 
    height: '400px'
}

var center = {
    lat: 16.073801,
    lng: 108.14914
}

function Map(prop){
    Geocode.setApiKey("AIzaSyBaipkMWy_EAdUwc76DR04db6d32NWCnoA")
    Geocode.enableDebug();
    Geocode.fromAddress(prop.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          center.lat = lat
          center.lng = lng
        },
        (error) => {
          console.error(error);
        }
      );
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBaipkMWy_EAdUwc76DR04db6d32NWCnoA" 
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <></>
        </GoogleMap>
    ) : <></>

}

export default Map; 