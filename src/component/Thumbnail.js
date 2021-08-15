import EventService from "../services/EventService";
import  React,{useEffect,useState} from "react";
import moment from "moment";
import { useHistory } from "react-router";

function Thumbnail(props) {
    const [details, setDetails] = useState({eventName:"", id:"", address:"", eventStart:"",eventEnd:"", eventImg:"", user:""})
    const history = useHistory();
    const [link, setLink] = useState("");
    useEffect(() => {
        EventService.getEvent(props.id).then(res => {
                setDetails(res.data)
        }).catch(err => console.log(err))
    })
    const handleChange = event =>{
        setDetails({...details,[event.target.name]:event.target.value});
    }

    const handleButton = () => {
        if (localStorage.getItem('id') == details.user) {
            history.push("/eventHost/" + props.id);
        }
        else {
            history.push("/event/" + props.id);
        }
    }

    return (
        <div class="text-black rounded-article bg-article bg-gradient card">
            <div class="card-body-event"  style={{marginLeft:'50px'}}>
                <h5 class="card-title">{details.eventName.toUpperCase()}</h5>
                <p>Địa điểm: {details.address}</p>
                <p>Thời gian: Từ ngày {moment(details.eventStart)
                                        .subtract(10, "days")
                                        .calendar()} 
                             đến ngày {moment(details.eventEnd)
                                        .subtract(10, "days")
                                        .calendar()}
                {}
                </p>
                <img class="card-img-bottom" src={details.eventImg} alt="" style={{ height:'300px', width:'350px'}}/>
                <button onClick={handleButton} class="btn btn-primary" style={{position: 'absolute', left:'35%'}}>Xem thêm</button>

            </div>
        </div>
    );
}

export default Thumbnail;