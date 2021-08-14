import React,{Component} from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../../services/user.service";
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
const oldPassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Mật khẩu chưa đủ mạnh, phải có ký tự chữ số, chữ hoa, thường hoặc ký tự đặc biệt.
            </div>
        );
    }
};
const newPassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Mật khẩu phải có từ 6-40 ký tự.
            </div>
        );
    }
};
const vpassword = value => {
    if (value.length < 6 || value.length > 40 ) {
        return (
            <div className="alert alert-danger" role="alert">
                Mật khẩu phải có từ 6-40 ký tự.
            </div>
        );
    } 
    if (value != document.getElementById("password").value)  {
        return (
            <div className="alert alert-danger" role="alert">
                Mật khẩu xác nhận không chính xác.
            </div>
        );
    }
   
};
export default class Update extends Component{
    
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
      
        this.state = {
            newPassword: "",
            oldPassword: "",
            password: "",
            successful: false,
            message: ""
        };
      }
    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        });
    }
    onChangeNewPassword(e){
        this.setState({
            newPassword: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
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
            UserService.postUpdatePassword(
              this.state.oldPassword,
              this.state.newPassword,
              this.state.password, id
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
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
                                  <h1 style={{paddingBottom: "20px",paddingTop:"40px"}}>Đổi mật khẩu</h1>
                                        <div class='form-group' style={{marginBottom:"20px"}}>       

                            <div>
                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Mật khẩu hiện tại</label>
                                <Input type="password"  className="form-control"  name="oldpassword" value={this.state.oldPassword} onChange={this.onChangeOldPassword}   validations={[required, oldPassword]} />
                                </div>

                                

                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Mật khẩu mới</label>
                                <Input id="password" type="password" className="form-control" name="newpassword" value={this.state.newPassword} onChange={this.onChangeNewPassword} validations={[required, newPassword]} />
                                </div>


                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Xác nhận mật khẩu</label>
                                <Input  type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required, vpassword]}  />
                                </div>


                                <div className="form-group" style={{marginBottom:"40px",marginTop:"30px"}}>
                                <button className="btn btn-primary btn-block"> Cập nhập</button>
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
