import  React, { Component, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase'
import EventService from "../../services/EventService";
import HostService from "../../services/HostService"; 
import DeleteModale from "../../component/DeleteModale";
import userService from "../../services/user.service";
function UpdateEvent({match}){
    //var id là id của project
    console.log(match.params.id);
    const eventID = match.params.id; 
    var leaderInfo = {
        name : "", 
        email: "", 
        phone: "", 
    }

    var orgInfo = {
        OrgName: "", 
        OrgAddress: "", 
        orgEmail: "", 
        orgPhone: "", 
        hostID: 1
    }
   
    var eventInfo = {
        eventName: "Event's name", 
        eventStart: "2020-06-20", 
        eventEnd: "2020-06-20", 
        eventDescription: "This is event description", 
        eventReq: "This is event requirement", 
        minPeople: 10, 
        maxPeople: 30, 
        deadline: "2020-06-20",
        address: "Danang University of Technology", 
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/volunteer-app-650f4.appspot.com/o/folder%2FPJ27961552429715654a8145ce5ea68b9e7.jpg?alt=media&token=eaae586d-cf16-406e-95a6-a29505206d15"
    }
    /*
    * API Update
    */
    const currentUser = localStorage.getItem("id");

     //state dùng cho API 
    const [leader, setLeader] = useState(leaderInfo); 
    const [host, setHost] = useState(orgInfo); 
    const [event, setEvent] = useState(eventInfo)
    useEffect( 
        () => {
            userService.getUser(currentUser).then( response => {
                var userData = response.data; 
                setLeader(userData);   
                console.log(response.data);
                const hostID = userData.host
                HostService.getHostId(hostID).then( response => {
                var hostData = response.data;
                setHost({
                    orgName : hostData.orgName, 
                    orgAddress : hostData.orgAddress, 
                    orgEmail : hostData.orgEmail, 
                    orgPhone : hostData.orgPhone, 
                })
            })
            })
            console.log("Fetching event"); 
            EventService.getEvent(eventID).then( response => {
                var eventData = response.data; 
                setEvent(eventData); 
            })
            .catch(error => console.log(error));
            
        }, []
    )
    
    
    var projectID = "PJ" + eventID; 
    //state này dùng cho ảnh thui 
    const [eventImg, setEventImg] = useState({
        image : null, 
        progress: 0,
    })

    const handleChange = (evt) => 
    {
        const value = evt.target.value; 
        setEvent({
            ...event, 
            [evt.target.name] : value
        });
    }
    var downloadURL = eventInfo.imgUrl;


    //hàm này xử lý submit nè
    //gọi api các kiểu ở đây nè 
    //gọi hàm này để cập nhật lại thông tin sự kiện 
    const handleSubmit = (evt) => {
        if (eventImg.image == null) {
            var newEvent = {
                eventName: event.eventStart, 
                eventStart: event.eventStart, 
                eventEnd: event.eventEnd, 
                eventDescription: event.eventDescription, 
                eventReq: event.eventReq, 
                minPeople: event.minPeople, 
                maxPeople: event.maxPeople, 
                deadline: event.deadline,
                address: event.address, 
            }
            EventService.updateEvent(eventID, newEvent).then(() => {
                alert("Đã update xong, quay về trang chủ"); 
                /*
                * Chỗ này cho nó back về trang trước hoặc về local host giufm tui nha pà
                */
            })
        }
        else 
        {
            evt.preventDefault(); 
            let file = eventImg.image; 
            var storage = firebase.storage(); 
            var storageRef = storage.ref(); 
            var uploadTask = storageRef.child('folder/' + projectID + file.name).put(file); 

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes))*100
                    setEventImg({
                        ...eventImg, 
                        progress: progress
                    })
                }, (error) =>{
                    console.log(error)
                },  () => {
                    uploadTask.snapshot.ref.getDownloadURL().then( (url) => {
                        downloadURL = url;
                    }).then(() => {
                        //đoạn này direct về trang chủ và sử dụng API 
                        //biến downloadURL là link ảnh, post về API 
                        document.getElementById("eventImg").value = null;
                        var newEvent = {
                            eventName: event.eventStart, 
                            eventStart: event.eventStart, 
                            eventEnd: event.eventEnd, 
                            eventDescription: event.eventDescription, 
                            eventReq: event.eventReq, 
                            minPeople: event.minPeople, 
                            maxPeople: event.maxPeople, 
                            deadline: event.deadline,
                            address: event.address, 
                            eventImg: downloadURL
                        }
                        EventService.updateEvent(eventID, newEvent).then(() => {
                            alert("Đã update xong, quay về trang chủ"); 
                            /*
                            * Chỗ này cho nó back về trang trước hoặc về local host giufm tui nha pà
                            */
                        })
                    })
                }
            )

        }
    }
    
    const handleUpload = (evt) => {
        if (evt.target.files[0]){
            setEventImg({
                ...eventImg, 
                image: evt.target.files[0]
            })
            //console.log(eventImg); 
        }
    }
    console.log(host);
    return(
        <div className = "bg-image" style={{backgroundImage: "url('https://vicongdong.vn/wp-content/uploads/2020/02/t%C3%ACnh-nguy%E1%BB%87n-vi%C3%AAn.jpg'",
        height: '100%'}} >
            <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingBottom: '20px'}}>
                <div className="d-flex justify-content-center align-items-center h-100">
                </div>
        <div className="container">
            <h2 className="h2-title text-white mb-0 " >Cập nhật sự kiện tình nguyện của bạn</h2>
            <h4 className="text-white mb-0">1. Thông tin về trưởng đoàn tổ chức</h4>
            <form id="form-new-event" name="form-new-event">
                <div className="row">
                    <div className="col">
                        <input type="text" name="leaderName" value={leader.name} readOnly
                        className="form-control" placeholder="Họ và tên" aria-label="Họ và tên"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="email" name="leaderEmail" value={leader.email} readOnly
                        className="form-control" placeholder="Email" aria-label="Email"/>
                    </div>
                    <div className="col">
                        <input type="tel" name="leaderPhone" value={leader.phone} readOnly
                        className="form-control" placeholder="Số điện thoại" aria-label="Số điện thoại"/>
                    </div>
                </div>
                    <h4 className="text-white mb-0">2. Thông tin về đơn vị tổ chức</h4>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="orgName" value={host.orgName} readOnly
                            className="form-control" placeholder="Tên đơn vị tổ chức" aria-label="Tên đơn vị tổ chức"/>
                        </div>
                    </div>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="orgAddress" value={host.orgAddress} readOnly
                            className="form-control" placeholder="Địa chỉ" aria-label="Địa chỉ đơn vị tổ chức"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="email" name="orgEmail" value={host.orgEmail} readOnly
                            className="form-control" placeholder="Email" aria-label="Email"/>
                        </div>
                        <div className="col">
                            <input type="tel" name="orgPhone" value={host.orgPhone} readOnly
                            className="form-control" placeholder="Số điện thoại" aria-label="Số điện thoại"/>
                        </div>
                    </div>
                    <h4 className="text-white mb-0">3. Thông tin về sự kiện</h4>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="eventName" value={event.eventName} onChange={handleChange}
                            className="form-control" placeholder="Tên sự kiện" aria-label="Tên sự kiện"/>
                        </div>
                    </div>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="address" value={event.address} onChange={handleChange}
                            className="form-control" placeholder="Địa điểm" aria-label="Địa điểm"/>
                        </div>
                    </div>
                    <div className="row form-floating mb-3">
                        <div className="col">
                            <h5 className="text-white mb-0">Bắt đầu từ ngày:</h5>   
                        </div>
                        <div className="col">
                            <h5 className="text-white mb-0">đến ngày:</h5>
                        </div>
                    </div>
                    <div className="row form-floating mb-3">
                        <div className="col">
                            <input type="date" name="eventStart" value={event.eventStart} onChange={handleChange}
                            className="form-control" placeholder="Ngày bắt đầu sự kiện" aria-label="Ngày bắt đầu sự kiện"/>  
                        </div>
                        <div className="col">
                            <input type="date" name="eventEnd" value={event.eventEnd} onChange={handleChange}
                            className="form-control" placeholder="Ngày kết thúc sự kiện" aria-label="Ngày kết thúc sự kiện"/>
                        </div>
                    </div> 
                    <div className="row">
                        <div className = "col">
                            <textarea className="form-control" name="eventDescription" value={event.eventDescription} onChange={handleChange}
                            id="event-des" placeholder="Mô tả sự kiện" rows="5"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <textarea className="form-control" name="eventReq" value={event.eventReq} onChange={handleChange}
                            id="event-req" placeholder="Yêu cầu dành cho người tham gia" rows="5"></textarea>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="text"  name="minPeople" value={event.minPeople} onChange={handleChange}
                            className="form-control" placeholder="Số lượng tối thiểu" aria-label="Số lượng tối thiểu"/>
                        </div>
                        <div className="col">
                            <input type="text" name="maxPeople" value={event.maxPeople} onChange={handleChange}
                            className="form-control" placeholder="Số lượng tối đa" aria-label="Số lượng tối đa"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <h5 className="text-white mb-0">Hạn chót đăng ký: </h5>
                        </div>
                        <div className="col-10">
                            <input type="date" name="deadline" value={event.deadline} onChange={handleChange}
                            className="form-control" aria-label="Hạn chót đăng ký"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <h5 className="text-white mb-0">Ảnh của sự kiện: </h5>
                        </div>
                        <div className="col-9">
                            <img src={event.eventImg} width="200" height="200"></img>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <div className="row">
                        <div className="col-3">
                            <h5 className="text-white mb-0">Chỉnh sửa ảnh của sự kiện: </h5>
                        </div>
                        <div className="col-9">
                            <input type="file" name="eventImg" id="eventImg"  onChange={handleUpload}
                            style={{color: 'white'}}  accept="image/*"/>
                        </div>
                    </div>
                    <div className="blank"></div>
                    <div className="container text-center" style={{alignContent: 'center', }}>
                        <button type="button" className= "btn btn-success btn-lg" onClick={handleSubmit}
                        form="form-new-event">Cập nhật</button>
                        <div className="blank"></div>
                        <DeleteModale projectID={eventID}></DeleteModale>
                        {/* <button type="button" onClick={handleDelete}
                        className="btn btn-lg btn-danger">Xoá sự kiện</button> */}
                    </div>        
            </form> 
        </div>
    </div>
    </div>
    );
}

export default UpdateEvent; 