import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../../services/user.service";
import { isEmail } from "validator";
import CheckButton from "react-validation/build/button";
const required = value => {
  if (!value) {
      return (
          <div className="alert alert-danger" role="alert">
              Bạn cần nhập trường này!
          </div>
      );
  }
};
const email = value => {
  if (!isEmail(value)) {
      return (
          <div className="alert alert-danger" role="alert">
               Bạn cần nhập đúng email.
          </div>
      );
  }
};
const name = value => {
  if (value.length < 3 || value.length > 30) {
      return (
          <div className="alert alert-danger" role="alert">
              Vui lòng nhập họ và tên thật chính xác từ 3 đến 30 ký tự.
          </div>
      );
  }
};

const phone = value => {
  if (value.length < 10 || value.length > 10) {
      return (
          <div className="alert alert-danger" role="alert">
               Vui lòng nhập đúng số điện thoại.
          </div>
      );
  }
};
const vdate = value => {
  if (value.length < 0) {
      return (
          <div className="alert alert-danger" role="alert">
                Vui lòng chọn ngày sinh.
          </div>
      );
  }
};



export default class Update extends Component{
    
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.state = {
            name:"",
            username: "",
            email: "",
            phone: "",
            date: "",
            role: "",
            address: "",
            avatar: "",
            successful: false,
            message: ""
        };
      }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }
   
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }
    onChangeAddress(e) {
      this.setState({
          address: e.target.value
      });
    }
    onChangeAvatar(e) {
      this.setState({
          date: e.target.value
      });
    }
   
      componentDidMount() {
        var id = "";
        var i = 18;
       if(!(localStorage.getItem('user') === null))  while(true){
               if(localStorage.user[i] === ",")
                       break;
                   id += localStorage.user[i];
                   i++;
       }
        UserService.getEditUser(id).then(
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
      handleEdit(e) {
        e.preventDefault();
        var id = "";
        var i = 18;
        if(!(localStorage.getItem('user') === null))  while(true){
                if(localStorage.user[i] === ",")
                        break;
                    id += localStorage.user[i];
                    i++;
        }
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
           
            UserService.postEditUser(
                this.state.name,
                this.state.email,
                this.state.phone,              
                this.state.date,
                this.state.address,
                this.state.avatar, id
            ).then(
                () => {
                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }
    render() {
        return (
        <div style={{paddingLeft:"80px",backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCK6_OvKkWzBbW26doIsmwCdHwohJg6NVnkA&usqp=CAU')"}}>
                <Form
                            onSubmit={this.handleEdit}
                            ref={c => {
                            this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                              <div class='row' id='padding-top'>
                              <div class='col-md-8 col-md-offset-2'>
                                  <h1 style={{paddingBottom: "20px",paddingTop:"40px"}}>Cập nhật thông tin</h1>
                                        <div class='form-group' style={{marginBottom:"20px"}}>       

                            <div>
                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Họ và tên</label>
                                <Input type="text"  className="form-control"  name="name" value={this.state.name} onChange={this.onChangeName}   validations={[required, name]} />
                                </div>

                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label htmlFor="email">Email</label>
                                <Input type="text"className="form-control" name="email" value={this.state.email} onChange={this.onChangeEmail}validations={[required, email]} />
                                </div>

                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Điện thoại</label>
                                <Input  type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.onChangePhone} validations={[required, phone]} />
                                </div>

                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Ngày sinh</label>
                                <Input type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChangeDate} validations={[required, vdate]} />
                                 </div>

                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Địa chỉ</label>
                                <Input  type="text" className="form-control" name="address" value={this.state.address} onChange={this.onChangeAddress}  />
                                </div>

                                <div class='form-group' style={{marginBottom:"20px"}}>
                                <label style={{marginBottom:"10px"}}>Cập nhật ảnh đại diện</label>
                                <br></br>
                                <input type='file' name='fileUpload' value=''/>
                                </div>

                                <div class="row" style={{marginTop:"10px",marginBottom:"13px"}}>
                                    <div class="col-sm-auto">
                                        <Link to="/profile">
                                                <input type = "button" class="btn btn-primary" target="__blank" value="Quay lại" />
                                        </Link>
                                    </div>
                                        <div class="col-sm-auto">
                                        <button className="btn btn-primary btn-block"> Lưu thông tin</button>
                                        </div>
                                    </div>
                             </div>
                           </div>
                        </div>
                    </div>
                            )}

                          {this.state.message && (
                                        <div className="form-group">
                                            <div
                                                className={
                                                    this.state.successful
                                                        ? "alert alert-success"
                                                        : "alert alert-danger"
                                                }
                                                role="alert"
                                            >
                                                {this.state.message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={c => {
                                            this.checkBtn = c;
                                        }}
                                    />
                </Form>
			</div>
    );
    }
}
