import EventService from "../../services/EventService";
import { Link } from "react-router-dom";
import  React,{useEffect,useState} from "react";
import moment from "moment";

function Thumbnail(props) {
    const [details, setDetails] = useState({eventName:"", id:"", place:"", eventStart:"",eventEnd:"", eventImg:""})
    useEffect(() => {
        EventService.getEvent(props.id).then(res => {
                setDetails(res.data)
        }).catch(err => console.log(err))
    })
    const handleChange = event =>{
        setDetails({...details,[event.target.name]:event.target.value});
    }

    return (
        <div class="text-black rounded-article bg-article bg-gradient card">
            <div class="card-body-event"  style={{marginLeft:'50px'}}>
                <h5 class="card-title">{details.eventName.toUpperCase()}</h5>
                <p>Địa điểm: {details.place}</p>
                <p>Thời gian: Từ ngày {moment(details.eventStart)
                                        .subtract(10, "days")
                                        .calendar()}
                             đến ngày {moment(details.eventEnd)
                                        .subtract(10, "days")
                                        .calendar()}
                {}
                </p>
                <img class="card-img-bottom" src={details.eventImg} alt="" style={{ height:'300px', width:'350px'}}/>
                <Link to={`/event/${props.id}`}>
                    <button class="btn btn-primary" style={{position: 'absolute', left:'35%'}}>Xem thêm</button>
                </Link>

            </div>
        </div>
    );
}

export default Thumbnail;
