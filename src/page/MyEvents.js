import  React, { useState, useEffect} from "react";
import Thumbnail from '../component/Thumbnail'; 
import ThumbnailHost from "../component/ThumnailHost";
import EventService from "../services/EventService";
import RegisterProject from "../services/registrationproject.service";
import Error from "../page/user/error";
import { useHistory } from "react-router";

function MyEvents() 
{
    const userID = localStorage.getItem("id"); 
    const role = localStorage.getItem("role"); 
    const history = useHistory();
    /*
    * case USER
    */
    var myIDs = []
    const [eventIDs, setEventIDs] = useState([]); 

    /*
    * case host
    */
    const [hostEvents, setHostEvent] = useState([]); 
    console.log("USID" + userID);
    useEffect(
        () => {
            console.log("Fetching my ID"); 
            
            if (localStorage.getItem('user') == null) {
                alert("Bạn cần đăng nhập để thực hiện thao tác này")
                history.push("/login");
            }

            if (role == '2'){
                EventService.getHostEvent(userID).then( response => {
                    console.log(response.data);
                    var hostEventData = response.data; 
                    setHostEvent(hostEventData); 
                })
                .catch(error => console.log(error));
            }
            else {
                RegisterProject.getRegisterProject(userID).then (response => {

                    console.log(response.data);
                    var projectsData = response.data; 
                    var projectIDs = projectsData.map((project) => project.id); 
                    setEventIDs(projectIDs); 
                })
            }
        }, []
    )
    
    var listIDs = []; 
    var listEvents = []; 
    if (role == '2'){
        console.log("htvent")
        console.log(hostEvents);
        listEvents =  Object.values(hostEvents).map((hostEvent) => 
        <div style={{marginRight: '30px', display:'inline-block'}}>
                <ThumbnailHost id={hostEvent.id}  eventName = {hostEvent.eventName} eventStart = {hostEvent.eventStart} 
                eventEnd = {hostEvent.eventEnd} address = {hostEvent.address} eventImg = {hostEvent.eventImg}></ThumbnailHost>
                <div className="blank"></div>
            </div>
        )
    }
    else 
    {
        Object.values(eventIDs).forEach(id => myIDs.push(id));
        listIDs = myIDs.map((myID) =>
            <div style={{marginRight: '30px', display:'inline-block'}}>
                <Thumbnail id={myID}></Thumbnail>
                <div className="blank"></div>
            </div>
        )
    }

    const isHidden = () => {
        return localStorage.getItem('user') != null;
    }
    
    return (
        <div>
            {
                isHidden() ? 
                (
                    <div>
            <div className="blank"></div>
            <h2 style={{fontStyle: 'italic', textAlign:'center'}}>{
                role == '2'
                ? "Các sự kiện của tôi..."
                : "Các sự kiện tôi đang tham gia"
            }</h2>
            <div className="blank"></div>
            <div style={{marginLeft: '20px'}}>
                { role == '2'
                ? listEvents
                : listIDs
                }
            </div>
            
        </div>
                ) :
                (
                    <Error />
                )
            }
        </div>
    ); 
}

export default MyEvents; 
