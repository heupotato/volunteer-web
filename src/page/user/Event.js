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
function Event({match}){
    var eventID = match.params.id;
    
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
    useEffect( 
        () => {
            console.log("Fetching event"); 
            EventService.getEvent(eventID).then( response => {
                var eventData = response.data; 
                setInfo(eventData); 
                console.log(info);
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
            })
            .catch(error => console.log(error));
            CommentService.getAllCommentsOfEvent(eventID).then(response => {
                var commentData = response.data; 
                var listComment = commentData.map((comment) => 
                    <Comment comment = {comment}></Comment>
                ); 
                setListComments(listComment)
            })
        }, []
    )
    //comment của người dùng ở đây
    var userComment = ""; 
    const handleChange = (evt) => {userComment = evt.target.value; }
    /*
    *
    */

    const handleSubmit = (evt) => {
        //xử lý sự kiện đăng cmt ở đây
        console.log("Đăng sự kiện")
        window.location.reload()
    }
    /*
    *
    */

    const handleRate = (evt) => {
        var from = info.eventEnd.split("-")
        var dateEnd = new Date(from[2], from[1], from[0])
        var today = new Date()
        console.log(today)
        console.log(dateEnd)
        if (today > dateEnd){
            //chuyển sang trang rating (này là Hiếu làm),
            //route qua kèm với project ID để đánh giá 
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
                                            <div data-toggle="tooltip" title="Đây là điểm đánh giá dành cho đơn vị tổ chức sự kiện từ trước đến nay">
                                                <i className="fa fa-info-circle" style={{float: 'right', fontSize: '30px'}}></i>
                                            </div>
                                            <h6>Điểm đánh giá về đơn vị tổ chức: </h6>
                                            <div style={{color: '#212529'}}>
                                                {info.orgPoint + " "}   
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
                                                {info.eventPoint + " "}   
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
                                            <p>Từ {moment(info.eventStart)
                                        .subtract(10, "days")
                                        .calendar()} <span id="datetime"></span> đến {moment(info.eventEnd)
                                            .subtract(10, "days")
                                            .calendar()} <span id="datetime1"></span> </p>
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
                                        <h6>5 stars rated: {info.starRated}/{info.totalRated}</h6>
                                        <i className="news-icon fa fa-share-alt-square" style={{display: 'inline-block', marginRight: '5px', fontSize:'20px'}}></i>
                                        <h6>Like/Share</h6>
                                    </div>
                                    <div className = "col">
                                        <button type="button" onClick={handleRegister}
                                        className="btn btn-info view-button">Đăng ký ngay</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            <textarea className="form-control" rows='5' value={userComment} onChange={handleChange}
                            placeholder="Để lại bình luận của bạn về sự kiện này..."></textarea>
                            <input name="comment" id="comment" class="btn btn-primary" onClick={handleSubmit}
                            type="button" value="Đăng"/>
                            <div className="blank"></div>
                           <h6>Comments ({info.commentNum})</h6> 
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