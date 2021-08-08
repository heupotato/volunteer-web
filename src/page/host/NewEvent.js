import  React, { Component, useState } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import firebase from 'firebase'
function NewEvent(){
    //từ id của leader lấy các thông tin của leaderInfo và orgInfo ra 
    //axios he
    var leaderInfo = {
        leaderName: "Name",
        leaderEmail: "Email@gmail.com", 
        LeaderPhone: "01234586", 
    }
    var orgInfo = {
        OrgName: "Organization's name", 
        OrgAddress: "Address", 
        OrgEmail: "Org@gmail.com", 
        OrgPhone: "0236012345", 
    }
    //state thông tin của người dùng
    const [state, setState] = useState({
        eventName: "", 
        eventStart: "2020-06-20", 
        eventEnd: "2020-06-20", 
        eventDescription: "", 
        eventReq: "", 
        minPeople: 0, 
        maxPeople: 0, 
        deadline: "2020-06-20",
        place: ""

    })
    var id = parseInt("1") + 1; //SELECT TOP 1 * FROM Project ORDER BY ProjectID DESC - Dùng câu lệnh này để lấy id cuối cùng của mảng
    //xâu "1" là 
    var projectID = "PJ" + id; 
    console.log(projectID);
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
    var downloadURL = null
    //hàm này xử lý submit nè
    //gọi api các kiểu ở đây nè 
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
            <h2 className="h2-title text-white mb-0 " >Bắt đầu sự kiện tình nguyện của bạn</h2>
            <h4 className="text-white mb-0">1. Thông tin về trưởng đoàn tổ chức</h4>
            <form id="form-new-event" name="form-new-event" onSubmit={handleSubmit} method="POST">
                <div className="row">
                    <div className="col">
                        <input type="text" name="leaderName" value={leaderInfo.leaderName} readOnly
                        className="form-control" placeholder="Họ và tên" aria-label="Họ và tên"/>
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
                            <h5 className="text-white mb-0">Thêm ảnh của sự kiện: </h5>
                        </div>
                        <div className="col-9">
                            <input type="file" name="eventImg" id="eventImg"  onChange={handleUpload}
                            style={{color: 'white'}}  accept="image/*"/>
                            {/* <img src={state.urlImge}></img> */}
                        </div>
                    </div>
                    <div className="container-button">
                        <button type="submit" className= "btn btn-success btn-lg" 
                        form="form-new-event" value="Submit" style={{margin: 'auto'}}>Tạo event mới</button>
                    </div>        
            </form> 
        </div>
    </div>
    </div>
    );
}

export default NewEvent; 