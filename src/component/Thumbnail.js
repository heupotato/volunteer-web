import React, { Component } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import EventService from "../services/EventService";

function Thumbnail(props) {
    console.log(props.id);

    const [postInfo, setPostInfo] = useState({
                                            name: "Event's name",
                                            place: "Event's place",
                                            start: '15-6-2019',
                                            end: '15-8-2019',
                                            img: "https://i.pinimg.com/originals/55/f9/64/55f964e6a39c4b6794ed3ad466091349.png"
                                        }); 
    const eventID = prop.id; 
    useEffect(
        () => {
            console.log("Fetching data for event's thumnail"); 
            EventService.getEvent(eventID).then( response => {
                var eventData = response.data; 
                setPostInfo({
                    name: eventData.eventName, 
                    place: eventData.eventPlace, 
                    start: eventData.eventStart, 
                    end: eventData.eventEnd,
                    img: eventData.eventImg
                }); 
            })
            .catch(error => console.log(error));
        }, []
    )

    return (
        <div class="text-black rounded-article bg-article bg-gradient card">
            <div class="card-body-article">
                <h5 class="card-title">{postInfo.name.toUpperCase()}</h5>
                <p>Địa điểm: {postInfo.place}</p>
                <p>Thời gian: Từ ngày {postInfo.start} đến ngày {postInfo.end}</p>
                <img class="card-img-bottom" src={postInfo.img} alt="" />
                <Link to={`/event/${props.id}`}>
                    <button class="btn btn-primary">Xem thêm</button>
                </Link>

            </div>
        </div>
    );
}

export default Thumbnail;
