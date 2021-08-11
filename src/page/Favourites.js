import  React, { Component, useState, useEffect} from "react";
import Thumbnail from '../component/Thumbnail'; 
import EventService from "../services/EventService";

function Favourites() 
{
    var favouritesIDs = []
    
    const [eventIDs, setEventIDs] = useState([]); 

    useEffect(
        () => {
            console.log("Fetching most favourite events' ID"); 
            /*
            Chưa có API cho event được yêu thích nhất nên lấy tạm get all event để test
            */
            EventService.getEvents().then( response => {
                var listEvents = response.data; 
                let ids = listEvents.map(event => event.id);
                setEventIDs(ids); 
            })
            .catch(error => console.log(error));
        }, []
    )

    Object.values(eventIDs).forEach(id => favouritesIDs.push(id));

    const listFavourites = favouritesIDs.map((favouritesID) =>
        <div style={{marginRight: '30px', display:'inline-block'}}>
            <Thumbnail id={favouritesID} ></Thumbnail>
            <div className="blank"></div>
        </div>
    )
    
    return (
        <div>
            <div className="blank"></div>
            <h2 style={{fontStyle: 'italic', textAlign:'center'}}>Các bài viết được yêu thích nhất...</h2>
            <div className="blank"></div>
            <div style={{marginLeft: '20px'}}>
                {listFavourites}
            </div>
            
        </div>
    ); 
}

export default Favourites; 
