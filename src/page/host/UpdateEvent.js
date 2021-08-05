import  React, { Component, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase'
import DeleteModale from "../../component/DeleteModale";
function UpdateEvent(prop){
    //var id là id của project
    var id = prop.projectID; 

    //từ id của leader lấy các thông tin của leaderInfo và orgInfo ra 
    //axios he
    var leaderInfo = {
        leaderFirstname: "Firstname", 
        leaderLastname: "Lastname", 
        leaderEmail: "Email@gmail.com", 
        LeaderPhone: "01234586", 
    }
    var orgInfo = {
        OrgName: "Organization's name", 
        OrgAddress: "Address", 
        OrgEmail: "Org@gmail.com", 
        OrgPhone: "0236012345", 
    }
    //từ id của sự kiện lấy được các thông tin của sự kiện 
    var eventInfo = {
        eventName: "Event's name", 
        eventStart: "2020-06-20", 
        eventEnd: "2020-06-20", 
        eventDescription: "This is event description", 
        eventReq: "This is event requirement", 
        minPeople: 10, 
        maxPeople: 30, 
        deadline: "2020-06-20",
        place: "Danang University of Technology", 
        imgUrl: "https://firebasestorage.googleapis.com/v0/b/volunteer-app-650f4.appspot.com/o/folder%2FPJ27961552429715654a8145ce5ea68b9e7.jpg?alt=media&token=eaae586d-cf16-406e-95a6-a29505206d15"
    }
    //state thông tin của người dùng
    const [state, setState] = useState({
        eventName: eventInfo.eventStart, 
        eventStart: eventInfo.eventStart, 
        eventEnd: eventInfo.eventEnd, 
        eventDescription: eventInfo.eventDescription, 
        eventReq: eventInfo.eventReq, 
        minPeople: eventInfo.minPeople, 
        maxPeople: eventInfo.maxPeople, 
        deadline: eventInfo.deadline,
        place: eventInfo.place
    })
    
    var projectID = "PJ" + id; 
    //state này dùng cho ảnh thui 
    const [eventImg, setEventImg] = useState({
        image : null, 
        progress: 0,
    })

    const handleChange = (evt) => 
    {
        const value = evt.target.value; 
        setState({
            ...state, 
            [evt.target.name] : value
        });
    }
    var downloadURL = eventInfo.imgUrl;
    //hàm này xử lý submit nè
    //gọi api các kiểu ở đây nè 
    //gọi hàm này để cập nhật lại thông tin sự kiện 
    const handleSubmit = (evt) => {
        if (eventImg.image == null) return
        evt.preventDefault(); 
        let file = eventImg.image; 
        var storage = firebase.storage(); 
        var storageRef = storage.ref(); 
        console.log(storageRef);
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
                    console.log("eventurl" + downloadURL);
                    console.log("realurl" + url)  ; 
                }).then(() => {
                    //đoạn này direct về trang chủ nha làm gì đó nha  
                    //biến downloadURL là link ảnh, post về API 
                    document.getElementById("eventImg").value = null;
                    console.log("res" + downloadURL)
                    alert("Đã upload xong, quay về trang chủ")
                })
            }
        )

        
    }
    /*
    *
    */
    const handleDelete = (evt) => {
        
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
                        <input type="text" name="leaderFirstname" value={leaderInfo.leaderFirstname} readOnly
                        className="form-control" placeholder="First name" aria-label="First name"/>
                    </div>
                    <div className="col">
                        <input type="text" name="leaderLastname" value={leaderInfo.leaderLastname} readOnly
                        className="form-control" placeholder="Last name" aria-label="Last name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="email" name="leaderEmail" value={leaderInfo.leaderEmail} readOnly
                        className="form-control" placeholder="Email" aria-label="Email"/>
                    </div>
                    <div className="col">
                        <input type="tel" name="leaderPhone" value={leaderInfo.LeaderPhone} readOnly
                        className="form-control" placeholder="Số điện thoại" aria-label="Số điện thoại"/>
                    </div>
                </div>
                    <h4 className="text-white mb-0">2. Thông tin về đơn vị tổ chức</h4>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="OrgName" value={orgInfo.OrgName} readOnly
                            className="form-control" placeholder="Tên đơn vị tổ chức" aria-label="Tên đơn vị tổ chức"/>
                        </div>
                    </div>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="OrgAddress" value={orgInfo.OrgAddress} readOnly
                            className="form-control" placeholder="Địa chỉ" aria-label="Địa chỉ đơn vị tổ chức"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="email" name="OrgEmail" value={orgInfo.OrgEmail} readOnly
                            className="form-control" placeholder="Email" aria-label="Email"/>
                        </div>
                        <div className="col">
                            <input type="tel" name="OrgPhone" value={orgInfo.OrgPhone} readOnly
                            className="form-control" placeholder="Số điện thoại" aria-label="Số điện thoại"/>
                        </div>
                    </div>
                    <h4 className="text-white mb-0">3. Thông tin về sự kiện</h4>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="eventName" value={state.eventName} onChange={handleChange}
                            className="form-control" placeholder="Tên sự kiện" aria-label="Tên sự kiện"/>
                        </div>
                    </div>
                    <div className= "row">
                        <div className="col">
                            <input type="text" name="place" value={state.place} onChange={handleChange}
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
                            <input type="date" name="eventStart" value={state.eventStart} onChange={handleChange}
                            className="form-control" placeholder="Ngày bắt đầu sự kiện" aria-label="Ngày bắt đầu sự kiện"/>  
                        </div>
                        <div className="col">
                            <input type="date" name="eventEnd" value={state.eventEnd} onChange={handleChange}
                            className="form-control" placeholder="Ngày kết thúc sự kiện" aria-label="Ngày kết thúc sự kiện"/>
                        </div>
                    </div> 
                    <div className="row">
                        <div className = "col">
                            <textarea className="form-control" name="eventDescription" value={state.eventDescription} onChange={handleChange}
                            id="event-des" placeholder="Mô tả sự kiện" rows="5"></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <textarea className="form-control" name="eventReq" value={state.eventReq} onChange={handleChange}
                            id="event-req" placeholder="Yêu cầu dành cho người tham gia" rows="5"></textarea>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="text"  name="minPeople" value={state.minPeople} onChange={handleChange}
                            className="form-control" placeholder="Số lượng tối thiểu" aria-label="Số lượng tối thiểu"/>
                        </div>
                        <div className="col">
                            <input type="text" name="maxPeople" value={state.maxPeople} onChange={handleChange}
                            className="form-control" placeholder="Số lượng tối đa" aria-label="Số lượng tối đa"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <h5 className="text-white mb-0">Hạn chót đăng ký: </h5>
                        </div>
                        <div className="col-10">
                            <input type="date" name="deadline" value={state.deadline} onChange={handleChange}
                            className="form-control" aria-label="Hạn chót đăng ký"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <h5 className="text-white mb-0">Ảnh của sự kiện: </h5>
                        </div>
                        <div className="col-9">
                            <img src={eventInfo.imgUrl} width="200" height="200"></img>
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
                        <DeleteModale projectID={id}></DeleteModale>
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