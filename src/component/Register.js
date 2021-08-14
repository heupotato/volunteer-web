import  React, {useState, useEffect } from "react";
import EventService from "../services/EventService";
import userService from "../services/user.service";
import { useHistory } from "react-router";
import registrationprojectService from "../services/registrationproject.service";

function Register(props){
    const history = useHistory();
    const eventId = props.match.params.id;
    //từ props gọi props.id là id của project
    //dùng axios để lấy tên project
    const [details, setDetails] = useState({name:"", email:"", phone:"", date:"", reason: ""});
    const [event, setEvent] = useState({id: "", eventName:""});

    const handleChange = e => {
        setDetails({...details,reason: e.target.value})
    }

    const userID = localStorage.getItem('id'); 

    const handleSubmit = () => {
        var postInfo = {
            user: userID,
            project: eventId,
            reason: details.reason
        }
        if (postInfo.reason == null) {
            alert("Bạn cần điền lý do tham gia");
            history.push("/registerEvent/" + eventId);
        }
        else{
            registrationprojectService.registProject(postInfo).then(
                console.log("ok"),
                alert("Đã đăng ký thành công")
            )
            .catch(e => console.log(e));
        }
        
    }
    useEffect( () => {
        if (localStorage.getItem('id') == null){
            alert("Bạn cần đăng nhập để thực hiện thao tác này");
            history.push("/login");
        }
        EventService.getEvent(eventId).then(response => {
            setEvent(response.data);
        })
        .catch(e => {
            console.log(e);
        });
        userService.getEditUser(userID).then(response => {
            setDetails(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

    return (
        <div className="register" style={{marginBottom:"250px"}}>
        <div className="row">
            <div className="col-md-3 register-left">
                <img src="https://icon-library.com/images/participate-icon/participate-icon-11.jpg" alt=""/>
                <h3>Join us</h3>
                <p>Build community by giving things.</p>
                <br/>
            </div>
            <div className="col-md-9 register-right" >
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 className="register-heading">Đăng ký sự kiện {event.eventName}</h3>
                            <div className="row register-form" >
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Tên *"  value={details.name} disabled></input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Email"  value={details.email} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" minLength="10" maxLength="10" name="txtEmpPhone" className="form-control" placeholder="Số điện thoại *"  value={details.phone} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="dateOfBirth" className="form-control"  value={details.date} disabled />
                                    </div> 
                                </div>
                                <textarea style={{marginTop:'20px'}} rows="7" placeholder="Trình bày lý do bạn muốn tham gia sự kiện này" onChange={handleChange} value={details.reason}></textarea>
                                <div className="col-md-6"></div>
                                <div className="col-md-6">
                                    <input type="submit" className="btnRegister"  value="Đăng ký" onClick={handleSubmit} />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register; 