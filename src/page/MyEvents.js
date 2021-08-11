import  React, { Component, useState, useEffect} from "react";
import Thumbnail from '../component/Thumbnail'; 
import ThumbnailHost from "../component/ThumnailHost";
import EventService from "../services/EventService";

function MyEvents() 
{
    const userID = localStorage.getItem("id"); 
    const role = localStorage.getItem("role"); 
    
    /*
    * case USER
    */
    var myIDs = []
    const [eventIDs, setEventIDs] = useState([]); 

    /*
    * case host
    */
    const [hostEvents, setHostEvent] = useState([]); 

    useEffect(
        () => {
            console.log("Fetching my ID"); 
            if (role == 2){
                EventService.getHostEvent(userID).then( response => {
                    var hostEventData = response.data; 
                    setHostEvent(hostEventData); 
                })
            }
            else 
            EventService.getEvents().then( response => {
            
            })
            .catch(error => console.log(error));
        }, []
    )
    
    const listIDs = []; 
    const listEvents = []; 
    if (role == '2'){
        listEvents = hostEvents.map((hostEvent) => 
        <div style={{marginRight: '30px', display:'inline-block'}}>
                <ThumbnailHost id={myID} ></ThumbnailHost>
                <div className="blank"></div>
            </div>
        )
    }
    else 
    {
        Object.values(eventIDs).forEach(id => myIDs.push(id));

        listIDs = myIDs.map((myID) =>
            <div style={{marginRight: '30px', display:'inline-block'}}>
                <Thumbnail eventName = {myID.eventName} eventStart = {myID.eventStart} eventEnd = {myID.eventEnd}
                            address = {myID.address} eventImg = {myID.eventImg}></Thumbnail>
                <div className="blank"></div>
            </div>
        )
    }

    
    return (
        <div>
            <div className="blank"></div>
            <h2 style={{fontStyle: 'italic', textAlign:'center'}}>{
                role == '2'
                ? "Các sự kiện của tôi..."
                : "Các sự kiện tôi đang tham gia"
            }</h2>
            <div className="blank"></div>
            <div style={{marginLeft: '20px'}}>
                {listIDs}
            </div>
            
        </div>
    ); 
}

export default MyEvents; 
