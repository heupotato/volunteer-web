import  React, { useState, useEffect} from "react";
import userService from "../../services/user.service";
import HostService from "../../services/HostService";
import EventService from "../../services/EventService";
import firebase from 'firebase';
import { useHistory } from "react-router";
import Error from '../../page/user/error';
function NewEvent(){
    const history = useHistory();
    //từ id của leader lấy các thông tin của leaderInfo và orgInfo ra 
    //axios he
    var leaderInfo = {
        name : "", 
        email: "", 
        phone: "", 
    }

    var orgInfo = {
        orgName: "", 
        orgAddress: "", 
        orgEmail: "", 
        orgPhone: "", 
        hostID: 1
    }
    /*
    * API Add
    */
    const currentUser = localStorage.getItem("id");
    
     //state dùng cho API
    const [leader, setLeader] = useState(leaderInfo); 
    const [host, setHost] = useState(orgInfo);  
    const [eventID, setID] = useState(0); 

    useEffect( 
        () => {
            if (localStorage.getItem('role') != 2) {
                alert("Bạn cần đăng nhập với tư cách host để thực hiện");
                history.push("/login");
            }
            userService.getUser(currentUser).then( response => {
                var userData = response.data; 
                setLeader(userData);   
                console.log(userData);
                //console.log(response.data);
                const hostID = userData.host
                HostService.getHostId(hostID).then( response => {
                var hostData = response.data;
                setHost({
                    orgName : hostData.orgName, 
                    orgAddress : hostData.address, 
                    orgEmail : hostData.orgEmail, 
                    orgPhone : hostData.orgPhone, 
                })
            })
            })
            EventService.getEvents().then ( response => {
                var currentID = response.data.length; 
                setID(currentID); 
            })
        }, []
    )

    //state thông tin của người dùng
    const [state, setState] = useState({
        eventName: "", 
        eventStart: "", 
        eventEnd: "", 
        eventDescription: "", 
        eventReq: "", 
        minPeople: 0, 
        maxPeople: 0, 
        deadline: "",
        address: ""

    })
    var id = eventID; 
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
        if (eventImg.image == null) {
            alert("Ảnh không được trống");
            history.push("/error");
        }
        else {
            let file = eventImg.image; 
        var storage = firebase.storage(); 
        var storageRef = storage.ref(); 
        console.log("Store fileeeee");
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
                    var newEvent = {
                        eventName: state.eventName, 
                        eventStart: state.eventStart, 
                        eventEnd: state.eventEnd, 
                        eventDescription: state.eventDescription, 
                        eventReq: state.eventReq, 
                        minPeople: state.minPeople, 
                        maxPeople: state.maxPeople, 
                        deadline: state.deadline,
                        address: state.address, 
                        eventImg: downloadURL, 
                        status: 1, 
                        user: localStorage.getItem('id')
                    }
                    EventService.createEvent(newEvent).then(() => {
                        alert("Đã xong, quay về trang chủ"); 
                        history.push("/");
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

    const isHidden = () => {
        return localStorage.getItem('role') == 2;
    }

    return(
        <div>
        {
            isHidden() ? (
                <div  className = "bg-image" style={{backgroundImage: "url('https://vicongdong.vn/wp-content/uploads/2020/02/t%C3%ACnh-nguy%E1%BB%87n-vi%C3%AAn.jpg'",
        height: '100%'}} >
            <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', paddingBottom: '20px'}}>
                <div className="d-flex justify-content-center align-items-center h-100">
                </div>
        <div className="container">
            <h2 className="h2-title text-white mb-0 " >Bắt đầu sự kiện tình nguyện của bạn</h2>
            <h4 className="text-white mb-0">1. Thông tin về trưởng đoàn tổ chức</h4>
            <form id="form-new-event" name="form-new-event" >
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
                            className="form-control" placeholder="Địa chỉ" aria-label="Địa orgAddresschỉ đơn vị tổ chức"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="email" name="OrgEmail" value={host.orgEmail} readOnly
                            className="form-control" placeholder="Email" aria-label="Email"/>
                        </div>
                        <div className="col">
                            <input type="tel" name="OrgPhone" value={host.orgPhone} readOnly
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
                            <input type="text" name="address" value={state.address} onChange={handleChange}
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
                        <input type="button" className= "btn btn-success btn-lg" onClick={handleSubmit}
                        form="form-new-event" value="Đăng ký" style={{margin: 'auto'}} />
                    </div>        
            </form> 
        </div>
    </div>
    </div>
            ) : (
                <Error />
            )
        }
        </div>
    );
}

export default NewEvent; 