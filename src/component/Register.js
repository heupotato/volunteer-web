import  React, { Component, useState } from "react";
import { mockComponent } from "react-dom/test-utils";
import { Link } from 'react-router-dom';


function Register(props){
    //từ props gọi props.id là id của project
    //dùng axios để lấy tên project
    var projectName = "Project's Name"; 
    const [details, setDetails] = useState({name:"", email:"", phone:"", gender:"", date:"", reason: ""});
    const handleSubmit = e =>{
        e.preventDefault();
        console.log(details);
    }
    const userID = localStorage.getItem('user'); 
    //dùng axios để lấy thông tin user theo ID 
    var userInfo = {
        name: "full name", 
        DoB: "2000-10-30", //chỗ này là theo định dạng YYYY-MM-DD mới được nha BLong
        email: "a@gmail.com", 
        phone: "01234567", 
        gender: "male"
    }
    
    var viewGuest = (
        <div className="register" style={{marginBottom:"100px"}}>
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
                        <h3 className="register-heading">Đăng ký sự kiện {projectName}</h3>
                        <form onSubmit={handleSubmit} >
                            <div className="row register-form" >
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Tên *" value={userInfo.name} readOnly></input>
                                    </div>
                                    <div className="maxl">
                                        <label className="radio inline" style={{marginRight: '10px'}} > 
                                            <input type="radio" value="male" checked = {userInfo.gender === "male"} disabled="true" />
                                            <span> Nam </span> 
                                        </label>
                                        <label className="radio inline" style={{marginRight: '10px'}} > 
                                            <input type="radio" value="female" checked={userInfo.gender === "female"}  disabled="true" />
                                            <span> Nữ </span> 
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Email" value={userInfo.email} readOnly/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" minLength="10" maxLength="10" name="txtEmpPhone" className="form-control" placeholder="Số điện thoại *" value={userInfo.phone} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" name="dateOfBirth" className="form-control"   value={userInfo.DoB}  readOnly/>
                                    </div> 
                                </div>
                                <textarea rows="7" placeholder="Trình bày lý do bạn muốn tham gia sự kiện này" onChange={e => setDetails({...details,reason: e.target.value})} value={details.reason}></textarea>
                                <div className="col-md-6"></div>
                                <div className="col-md-6">
                                    <input type="submit" className="btnRegister"  value="Đăng ký"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
    var viewUser = (
        <div className="register" style={{marginBottom:"100px"}}>
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
                        <h3 className="register-heading">Đăng ký sự kiện {projectName}</h3>
                        <form onSubmit={handleSubmit} >
                            <div className="row register-form" >
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Tên *" onChange={e => setDetails({...details,name: e.target.value})} value={details.name}></input>
                                    </div>
                                    <div className="maxl">
                                        <label className="radio inline" style={{marginRight: '10px'}} > 
                                            <input type="radio" value="male" checked = {details.gender === "male"} onChange={(e) => setDetails({...details,gender:e.target.value})}  />
                                            <span> Nam </span> 
                                        </label>
                                        <label className="radio inline" style={{marginRight: '10px'}} > 
                                            <input type="radio" value="female" checked={details.gender === "female"}  onChange={(e) => setDetails({...details,gender:e.target.value})} />
                                            <span> Nữ </span> 
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="email" className="form-control" placeholder="Email"  onChange={e => setDetails({...details,email: e.target.value})} value={details.email}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" minLength="10" maxLength="10" name="txtEmpPhone" className="form-control" placeholder="Số điện thoại *" onChange={e => setDetails({...details,phone: e.target.value})} value={details.phone} />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" name="dateOfBirth" className="form-control"  onChange={(e) => setDetails({...details,date:e.target.value})} value={details.date} />
                                    </div> 
                                </div>
                                <textarea rows="7" placeholder="Trình bày lý do bạn muốn tham gia sự kiện này" onChange={e => setDetails({...details,reason: e.target.value})} value={details.reason}></textarea>
                                <div className="col-md-6"></div>
                                <div className="col-md-6">
                                    <input type="submit" className="btnRegister"  value="Đăng ký"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    ); 
    if (userID != null) return viewUser; 
    else return viewGuest; 
}

export default Register; 