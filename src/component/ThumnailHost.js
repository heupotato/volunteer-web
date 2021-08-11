import EventService from "../services/EventService";
import { Link } from "react-router-dom";
import  React,{useEffect,useState} from "react";
import moment from "moment";

function ThumbnailHost(props) {
   
    const handleChange = event =>{
        //setDetails({...details,[event.target.name]:event.target.value});
    }

    return (
        <div class="text-black rounded-article bg-article bg-gradient card">
            <div class="card-body-event"  style={{marginLeft:'50px'}}>
                <h5 class="card-title">{props.eventName.toUpperCase()}</h5>
                <p>Địa điểm: {props.address}</p>
                <p>Thời gian: Từ ngày {moment(props.eventStart)
                                        .subtract(10, "days")
                                        .calendar()} 
                             đến ngày {moment(props.eventEnd)
                                        .subtract(10, "days")
                                        .calendar()}
                {}
                </p>
                <img class="card-img-bottom" src={props.eventImg} alt="" style={{ height:'300px', width:'350px'}}/>
                {/* Chỗ này sửa link về eventHost nha */}
                <Link to={`/event/${props.id}`}>
                    <button class="btn btn-primary" style={{position: 'absolute', left:'35%'}}>Xem thêm</button>
                </Link>

            </div>
        </div>
    );
}

export default ThumbnailHost;