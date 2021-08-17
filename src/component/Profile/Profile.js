import React,{Component } from 'react'
import { Link } from 'react-router-dom';
import '../CSS/profile.css'
import UserService from "../../services/user.service";
export default class Profile extends Component  {
    constructor(props) {
        super(props);
    
        this.state = {
            content: "",
            name: "",
            username: "",
            email: "",
            phone: "",
            date: "",
            role: "",
            address: "",
            avatar: "",
        };
      }
        
      componentDidMount() {  
          var a = "";
          var i = 18;
          if(!(localStorage.getItem('user') === null))  while(true){
                if(localStorage.user[i] === ",")
                        break;
                    a += localStorage.user[i];
                    i++;
          }
              
        
        UserService.getEditUser(a).then(
            response => {
              this.setState(response.data);
              
            },
            error => {
              this.setState({
                content:
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString()
              });
            }
          );
       
      }
      
    render() {
        const { currentUser } = this.state;  

        return (
            <div style={{backgroundColor:"#e2e8f0"}}>
                <div class="container"  >
                    <div class="main-body" style={{paddingTop:"60px",paddingBottom:"60px"}}>
                        <div class="row gutters-sm">
                            <div class="col-md-4 mb-3">
                            <div class="card" style={{height:"22.5rem"}}>
                                <div class="card-body">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src={this.state.avatar} alt="Admin" class="rounded-circle" width="150" />
                                    <div class="mt-3">
                                    <h4>{this.state.name}</h4>
                                    <p class="text-secondary mb-1">{this.state.role == 1 ? 'User' : this.state.role == 2 ? 'Host' : 'Admin'}</p>
                                    <p class="text-muted font-size-sm">{this.state.address}</p>
                                    <button class="btn btn-primary">Message</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="card mt-3">
                                <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><img width="24" height="24px" src="https://static.thenounproject.com/png/3078657-200.png" style={{marginRight:"10px"}}/>Ngày sinh</h6>
                                    <span class="text-secondary" >{this.state.date}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><img width="24" height="24px" src="https://freesvg.org/img/abstract-user-flat-1.png" style={{marginRight:"10px"}}/>Tên đăng nhập</h6>
                                    <span class="text-secondary">{this.state.username}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><img width="24" height="24px" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/gender-2571413-2149433.png" style={{marginRight:"10px"}}/>Giới tính</h6>
                                    <span class="text-secondary">{this.state.gender}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><img width="24" height="24px" src="https://static.thenounproject.com/png/1589836-200.png" style={{marginRight:"10px"}}/>Vai trò</h6>
                                    <span class="text-secondary">{this.state.role == 3 ? 'Admin' : this.state.role == 2 ? 'Host' : 'User'}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                    <h6 class="mb-0"><img width="24" height="24px" src="https://kindycity.edu.vn/wp-content/uploads/2018/05/facebook-icon.png" style={{marginRight:"10px"}}/>Facebook</h6>
                                    <span class="text-secondary">facebook</span>
                                </li>
                                </ul>
                            </div>
                            </div>
                            <div class="col-md-8">
                            <div class="card mb-3">
                                <form>
                                    <div class="card-body">
                                        <div class="row" style={{marginTop:"18px",marginBottom:"18px"}}>
                                            <div class="col-sm-3">
                                            <h6 class="mb-0">Họ và tên</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary" >
                                            <input type="h6" style={{border:"none",borderColor: "transparent",borderWidth :"0px",width:"500px"}} class="text-secondary" value={this.state.name} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row" style={{marginTop:"18px",marginBottom:"18px"}}>
                                            <div class="col-sm-3">
                                            <h6 class="mb-0">Email</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                            <input type="h6" style={{border:"none",borderColor: "transparent",borderWidth :"0px",width:"500px"}} class="text-secondary" value={this.state.email} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row" style={{marginTop:"18px",marginBottom:"18px"}}>
                                            <div class="col-sm-3">
                                            <h6 class="mb-0">Số điện thoại</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                            <input type="h6" style={{border:"none",borderColor: "transparent",borderWidth :"0px",width:"500px"}} class="text-secondary" value={this.state.phone} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row" style={{marginTop:"18px",marginBottom:"18px"}}>
                                            <div class="col-sm-3">
                                            <h6 class="mb-0">Địa chỉ</h6>
                                            </div>
                                            <div class="col-sm-9 text-secondary">
                                            <input style={{border:"0",borderWidth :"0px",width:"500px", display:"inline"}} class="text-secondary" value={this.state.address}  />
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row" style={{marginTop:"20px",marginBottom:"13px"}}>
                                            <div class="col-sm-12">
                                            <Link to="/updateProfile">
                                            <input type = "submit" class="btn btn-primary" target="__blank" value="Cập nhật" />
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
                </div>
        
    );
    }
}

