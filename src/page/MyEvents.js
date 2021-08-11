import  React, { Component, useState, useEffect} from "react";
import Thumbnail from '../component/Thumbnail'; 
import EventService from "../services/EventService";

function MyEvents() 
{
    const userID = localStorage.getItem("id"); 
    const role = localStorage.getItem("role"); 
    
    var myIDs = []
    
    const [eventIDs, setEventIDs] = useState([]); 

    useEffect(
        () => {
            console.log("Fetching my ID"); 
            if (role == 2){

            }
            else 
            EventService.getEvents().then( response => {
            
            })
            .catch(error => console.log(error));
        }, []
    )

    Object.values(eventIDs).forEach(id => myIDs.push(id));

    const listIDs = myIDs.map((myID) =>
        <div style={{marginRight: '30px', display:'inline-block'}}>
            <Thumbnail id={myID} ></Thumbnail>
            <div className="blank"></div>
        </div>
    )
    
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
