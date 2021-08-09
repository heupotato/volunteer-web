import  React, { useEffect, useState } from "react";
import axios from "axios";

const containerStyle = {
    width: '100%', 
    height: '400px'
}

var center = {
    lat: 16.073801,
    lng: 108.14914
}

// function removeAccents(str) {
//     return str.normalize('NFD')
//               .replace(/[\u0300-\u036f]/g, '')
//               .replace(/đ/g, 'd').replace(/Đ/g, 'D');
//   }


function Map(prop){
    const [data, setData] = useState([{lat: 0, lng: 0}]); 
    var address = prop.address; 
    //const strAddress = removeAccents(address); 
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