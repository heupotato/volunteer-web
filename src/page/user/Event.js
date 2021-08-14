import  React, { useEffect, useRef, useState} from "react";
import moment  from "moment";
import Collapsible from "react-collapsible";
import Comment from "../../component/Comment"
import Thumbnail from "../../component/Thumbnail"
import Map from "../../component/Map"
import HostService from "../../services/HostService";
import EventService from "../../services/EventService";
import userService from "../../services/user.service";
import CommentService from "../../services/CommentService";
import { useHistory } from "react-router";
import voteServices from "../../services/vote.services";
function Event({match}){
    var eventID = match.params.id;
    const history = useHistory();
    const [info, setInfo] = useState({
        eventName: "", 
        commentNum: 0, //số lượng cmt select count 
        eventStart: '', 
        eventEnd: '', 
        eventImg: "", 
        starRated: 0, 
        totalRated: 0, 
        eventDescription: "", 
        eventReq: "", 
        address: "", //địa điểm diễn ra sự kiện để gọi google api 
        maxPeople: 0, 
        nowRegistered: 0, //số lượng người hiện tại đã đăng ký 
        deadline: "", 
    })
    const [contact, setContact] = useState({
        orgName: "orgName", 
        address: "address", 
        orgEmail: "orgEmail", 
        orgPhone: "orgPhone", 
    })
    const [leader, setLeader] = useState({
        name: "",
        address: "", 
        email: "", 
        phone: "", 
    })
    const [listComments, setListComments] = useState([]); 
    const [disabled, setDisable] = useState(false);
    const [status, setStatus] = useState(0); 
    const [rateLeader, setRateLeader] = useState(0.0); 
    const [rateEvent, setRateEvent] = useState({point: 0.0, maxRate: 0, totalRate: 0}); 
    useEffect( 
        () => {
            console.log("Fetching event"); 
            EventService.getEvent(eventID).then( response => {
                var eventData = response.data; 
                var leaderID = eventData.user; 
                setInfo(eventData); 
                console.log(info);
                
                /*Kiểm tra trạng thái của sự kiện
                * 0: chưa diễn ra 
                * 1: đã bị huỷ
                * 2: đang diễn ra 
                * 3: đã kết thúc
                */
                var from = moment(eventData.deadline).format('YYYY-MM-DD').split("-");
                console.log("deadline" + from)
                var deadlineDate = new Date(from[0], from[1] - 1, from[2], 0, 0 , 0 , 0);
                console.log("deadlineDate" + deadlineDate)
                from = moment(eventData.eventStart).format('YYYY-MM-DD').split("-"); 
                console.log("eventstart" + from)
                var startDate = new Date(from[2], from[1] - 1, from[0]);
                from = moment(eventData.eventEnd).format('YYYY-MM-DD').split("-"); 
                var endDate = new Date(from[2], from[1] - 1, from[0]);
                var today = new Date();
                console.log("startDate: ", startDate, "    ", eventData.eventStart);
                console.log("endDate: ", endDate);
                console.log("toDate: ", today);
                if (today <= deadlineDate) setDisable(true);
                    else setDisable(false);

                var stat = eventData.status; 
                if (stat == 1) setStatus(stat); 
                else {
                    if (today < startDate) setStatus(0); 
                    else if (today >= startDate && today <=endDate) setStatus(2); 
                    else if (today > endDate) setStatus(3); 
                }

                var host = eventData.user; 
                HostService.getHostId(host).then( response => {
                    var hostData = response.data;
                    setContact(hostData)
                });
                userService.getUser(host).then( response => {
                    var userData = response.data;
                    setLeader(userData)
                    console.log("userdata" + userData.name);
                });
                CommentService.getAllCommentsOfEvent(eventID).then(response => {
                    var commentData = response.data; 
                    console.log(response.data);
                    var listComment = commentData.map((comment) => 
                        <Comment comment = {comment}></Comment>
                    ); 
                    setListComments(listComment)
                })
                voteServices.getVoteLeader(leaderID).then(response => {
                    var voteData = response.data; 
                    console.log(voteData); 
                    var avgPoint = 0.0; 
                    voteData.forEach(vote => {
                        avgPoint = avgPoint + vote.vote_project; 
                    });
                    avgPoint = avgPoint/voteData.length; 
                    setRateLeader(avgPoint); 
                })
                voteServices.getVoteProject(eventID).then(response => {
                    var voteData = response.data;
                    console.log(voteData);  
                    var avgPoint = 0.0; 
                    var maxRate = 0; 
                    voteData.forEach(vote => {
                        avgPoint = avgPoint + vote.vote_user; 
                        if (vote.poin == 5.0) maxRate ++; 
                    });
                    avgPoint = avgPoint/voteData.length; 
                    setRateEvent({point: avgPoint, maxRate: maxRate, totalRate: voteData.length}); 
                })
            })
            .catch(error => console.log(error));
        }, []
    )
    //comment của người dùng ở đây
    const [userComment, setUserComment] = useState(""); 
    const handleChange = (evt) => {
        console.log(evt.target.value); 
        setUserComment(evt.target.value); 
    }
    /*
    *
    */

    const handleSubmit = (evt) => {
        if (localStorage.getItem('user') == null) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này");
            history.push("/");
        }
        //xử lý sự kiện đăng cmt ở đây
        console.log("Đăng sự kiện")
        var newComment = {
            content : userComment, 
            eventId: eventID, 
            createdDate: Date.now().toString(), 
            username: localStorage.getItem("username")
        }
        CommentService.addComment(newComment).then(response => {
            alert("Đã đăng cmt thành công"); 
            /*
            * Khi nào comment được thì mình mở cái dòng window.location.reload() nha pà
            */
            //window.location.reload()
        })
       .catch(error => console.log(error))
    }
    /*
    *
    */

    const handleRate = (evt) => {
        var from = moment(info.eventEnd).format('YYYY-MM-DD').split("-"); 
        var dateEnd = new Date(from[2], from[1], from[0])
        var today = new Date()
        console.log(today)
        console.log(dateEnd)
        if (today > dateEnd){
            history.push("/review/" + eventID);
            console.log("Đã được đánh giá")
        }
        else {
            console.log("Chưa được đánh giá")
            alert("Sự kiện vẫn đang diễn ra, bạn chưa được đánh giá sự kiện này! Vui lòng thử lại sau khi sự kiện kết thúc")
        }
    }

    /*
    *
    */ 
    const handleRegister = (evt) => {
        if (localStorage.getItem('user') == null) {
            alert("Bạn cần đăng nhập để thực hiện thao tác này");
            history.push("/login");
        }
        history.push("/registerEvent/" + eventID);
        //Chuyển sang trang register
    }
    /*
    *
    */
    

    const recentPosts = [1, 2, 3, 4, 5]; //lấy xuống top 5 event được post gần đây nhất
    const listPosts  = recentPosts.map((post) =>
        <div>
             <Thumbnail id = {post}></Thumbnail>
             <div className="blank"></div>
        </div>  
    )
    //jump to comment
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    return(
        <div className="container" style={{paddingBottom: '50px'}}>
            <div className="row">
                <div className="col-9">
                    <div style={{paddingTop: '25px'}}>
                        <h4 className="web-text">{info.eventName}</h4>
                        <i className="fa fa-street-view" id="icon-location" style={{ fontSize: '20px', marginTop: '10px', marginRight: '5px'}}></i>
                        <label className="web-text" htmlFor ="icon-location">{info.address}</label>
                        <div className="row">
                            <div className="col news-text">
                                <ul className="no-bullets">
                                    <li className="list-line">
                                        <div className="list-content">
                                            <i className="news-icon fa fa-thumbs-up" style={{fontSize: '36px'}}></i>
                                            <div data-toggle="tooltip" title="Đây là điểm đánh giá dành cho trưởng đoàn từ trước đến nay">
                                                <i className="fa fa-info-circle" style={{float: 'right', fontSize: '30px'}}></i>
                                            </div>
                                            <h6>Điểm đánh giá về trưởng đoàn: </h6>
                                            <div style={{color: '#212529'}}>
                                                {rateLeader+ " "}   
                                                <span className="fa fa-star"></span>
                                                <button type="button" onClick={handleRate}
                                                className="btn btn-info view-button">Rate</button>  
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-line">
                                        <div className="list-content">
                                            <i className="news-icon fa fa-check-circle" style={{fontSize: '36px'}}></i>
                                            <div data-toggle="tooltip" title="Đây là điểm đánh giá dành cho sự kiện này">
                                                <i className="fa fa-info-circle" style={{float: 'right', fontSize: '30px'}}></i> 
                                            </div>
                                            <h6>Điểm đánh giá sự kiện: </h6>
                                            <div style={{color: '#212529'}}>
                                                {rateEvent.point + " "}   
                                                <span className="fa fa-star"></span>
                                                <button type="button" onClick={handleRate}
                                                className="btn btn-info view-button">Rate</button> 
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-line">
                                        <div className="list-content">
                                            <i className="news-icon fa fa-comment" style={{fontSize: '36px'}}></i>
                                            <div data-toggle="tooltip" title="Các comment của tình nguyện viên và người tham dự trong sự kiện lần này">
                                                <i className="fa fa-info-circle" style={{float: 'right', fontSize: '30px'}}></i>
                                            </div>
                                            <h6>Đánh giá cụ thể: </h6>
                                            <div style={{color: '#212529'}}>
                                                <h6 style={{display: 'inline-block'}}>{listComments.length} comment(s)</h6>
                                                <button type="button" onClick={executeScroll}
                                                className="btn btn-info view-button">View</button>          
                                            </div> 
                                        </div> 
                                    </li>
                                    <li className="list-line">
                                        <i className="news-icon fa fa-clock-o" style={{fontSize: '36px'}}></i>
                                        <div data-toggle="tooltip" title="Thời gian diễn ra sự kiện tình nguyện">
                                            <i className="fa fa-info-circle" style={{float: 'right', fontSize: '30px'}}></i>
                                        </div>
                                        <h6>Thời gian diễn ra sự kiện</h6>
                                        <div style={{color: '#212529'}}>
                                            <p>Từ {moment(info.eventStart).format('YYYY-MM-DD')} <span id="datetime"></span> 
                                            đến {moment(info.eventEnd).format('YYYY-MM-DD')} <span id="datetime1"></span> </p>
                                        </div>
                                    </li>
                                    <li className="list-line">
                                        <i className="news-icon fa fa-user-circle-o" style={{fontSize: '36px'}}></i>
                                        <div data-toggle="tooltip" title="Số lượng người đã tham gia hoặc đang đăng ký cho sự kiện này">
                                            <i className="fa fa-info-circle" style={{float: 'right', fontSize: '30px'}}></i>
                                        </div>
                                        <h6>Số lượng người tham gia</h6>
                                        <div style={{color: '#212529'}}>
                                            <div style={{color: '#212529'}}>
                                                <h6 style={{display: 'inline-block'}}>{info.nowRegistered} người</h6>
                                            </div> 
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col">
                                <div className="img-polaroid">
                                    <div className="overflow-hidden position-relative">
                                        <img width="300px" height="200px" style={{marginBottom: '0%'}} src={info.eventImg}></img>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <i className="news-icon fa fa-heart" style={{display: 'inline-block', marginRight: '5px', fontSize:'20px'}}></i>
                                        <h6>5 points rated: {rateEvent.maxRate}/{rateEvent.totalRate}</h6>
                                        <i className="news-icon fa fa-share-alt-square" style={{display: 'inline-block', marginRight: '5px', fontSize:'20px'}}></i>
                                        <h6>Like/Share</h6>
                                    </div>
                                    <div className = "col">
                                        <button type="button" disabled={disabled} onClick={handleRegister}
                                        className="btn btn-info view-button">Đăng ký ngay</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blank"></div>
                    {
                        status == 0 
                        ? <button type="button"  disabled={true} class="btn btn-block btn-success btn-lg">Sự kiện sắp diễn ra</button>
                        :[
                            status == 1 
                            ? <button type="button"  disabled={true} class="btn btn-block btn-danger btn-lg">Sự kiện đã bị huỷ</button>
                            : [
                                status == 2
                                ? <button type="button"  disabled={true} className="btn btn-block btn-info btn-lg">Sự kiện đang diễn ra</button>
                                : <button type="button"  disabled={true} class="btn btn-block btn-primary btn-lg">Sự kiện đã kết thúc</button>
                            ]
                        ]
                    }
                    <div className="blank"></div>
                    <Collapsible trigger="CHI TIẾT VỀ SỰ KIỆN" className="Collapsible">
                        <div className="collapse-container">   
                            <h6 style={{fontStyle: 'italic'}}>MÔ TẢ VỀ SỰ KIỆN</h6> 
                            <p> 
                                {info.eventDescription}
                            </p> 
                            <h6 style={{fontStyle: 'italic'}}>YÊU CẦU DÀNH CHO NGƯỜI THAM GIA</h6> 
                            <p> 
                                {info.eventReq}
                            </p>
                            <h6 style={{fontStyle: 'italic'}}>SỐ LƯỢNG NGƯỜI ĐĂNG KÝ TỐI THIỂU</h6> 
                            <p>
                                {info.maxPeople} người
                            </p>
                            <h6 style={{fontStyle: 'italic'}}>SỐ LƯỢNG NGƯỜI ĐÃ ĐĂNG KÝ</h6> 
                            <p>
                                {info.nowRegistered} người
                            </p>
                        </div>
                       
                    </Collapsible>
                    <div className="blank"></div>
                    <Collapsible trigger="LIÊN HỆ" className="Collapsible">
                        <div className="collapse-container">
                            <h6 style={{fontStyle: 'italic'}}>VỀ TRƯỞNG ĐOÀN: </h6> 
                            <p> - Họ và tên: {leader.name} </p> 
                            <p> - Số điện thoại: {leader.phone} </p> 
                            <p> - Email: {leader.email} </p>
                            
                            <h6 style={{fontStyle: 'italic'}}>VỀ ĐƠN VỊ TỔ CHỨC: </h6> 
                            <p> - Tên đơn vị tổ chức: {contact.orgName} </p>
                            <p> - Số điện thoại: {contact.orgPhone} </p>
                            <p> - Email: {contact.orgEmail}  </p>
                            <p> - Địa chỉ: {contact.address} </p>
                        </div>
                        
                    </Collapsible>
                    <div className="blank"></div>
                    <Collapsible trigger="ĐỊA ĐIỂM" className="Collapsible">
                        <div className="collapse-container" >
                            <Map address={info.address}></Map>
                        </div>
                       
                    </Collapsible>
                    <div className="blank"></div>
                    <Collapsible trigger="BÌNH LUẬN" className="Collapsible">
                        <div ref={myRef} className="collapse-container">
                            <textarea className="form-control" rows='5' value = {userComment} onChange={handleChange}
                            placeholder="Để lại bình luận của bạn về sự kiện này..."></textarea>
                            <input name="comment" id="comment" class="btn btn-primary" onClick={handleSubmit}
                            type="button" value="Đăng"/>
                            <div className="blank"></div>
                           <h6>Comments ({listComments.length})</h6> 
                           {listComments}
                        </div>
                    </Collapsible>
                </div>
                <div className="col-3" >
                    <div className="blank"></div>
                    <div >

                        <h6 className="container-post">Most recent...</h6>
                        {listPosts}
                    </div>
                    

                </div>
            </div>
            <div className="blank"></div>
        </div>
    );
}

export default Event;