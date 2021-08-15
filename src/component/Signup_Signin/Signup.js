
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";

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
const vusername = value => {
    if (value.length < 3 || value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                Tên đăng nhập phải có từ 3-30 ký tự.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Vui lòng nhập mật khẩu dài 6-40 ký tự, có ký tự chữ số, chữ hoa và chữ thường
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
const gender = value => {
    if (value.length < 0) {
        return (
            <div className="alert alert-danger" role="alert">
                Vui lòng chọn giới tính.
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



export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            phone: "",
            gender: "male",
            date: "",
            role: "1",
            successful: false,
            message: ""
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }
    onChangeGender(e) {
        console.log(e.target.value);
        this.setState({
            gender: e.target.value
        });
    }
    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }
    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }
    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.name,
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.phone,
                this.state.gender,  
                this.state.date,
                this.state.role,
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
            <div class="register" style={{marginBottom:'80px'}} >
                <div class="row">
                    <div class="col-md-3 register-left">
                        <img src="https://icons-for-free.com/iconfiles/png/512/plane+icon-1320184416039486906.png" alt="" />
                        <h3>Welcome</h3>
                        <p>Together make it better</p>
                        <Link to="/login">
                            <input type="submit" name="" value="Đăng nhập" />
                        </Link>
                        <br />
                    </div>
                    <div class="col-md-9 register-right">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Đăng Ký</h3>

                                <Form
                                    onSubmit={this.handleRegister}
                                    ref={c => {
                                        this.form = c;
                                    }}
                                >
                                    {!this.state.successful && (
                                        <div class="row register-form">
                                            <div class="col-md-6">
                                                <div className="form-group">

                                                    <Input type="text" className="form-control" placeholder="Họ và tên *" name="name" value={this.state.name} onChange={this.onChangeName} validations={[required, name]} />
                                                </div>
                                                <div className="form-group">

                                                    <Input type="text" className="form-control" placeholder="Tên đăng nhập *" name="username" value={this.state.username} onChange={this.onChangeUsername} validations={[required, vusername]} />
                                                </div>
                                                <div className="form-group">

                                                    <Input type="password" className="form-control" placeholder="Mật khẩu *" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required, vpassword]} />
                                                </div>

                                                <div class="maxl" >
                                                
                                                    <label class="radio inline" style={{ marginRight: '10px' }} >
                                                        <input type="radio"  value="Nam"  name="gender" onChange={this.onChangeGender} validations={[required, gender]} />
                                                        <span> Nam </span>
                                                    </label>
                                                    <label class="radio inline" style={{ marginRight: '10px' }} >
                                                        <input type="radio" value="Nữ"  name="gender" onChange={this.onChangeGender} validations={[required, gender]} />
                                                        <span> Nữ </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div className="form-group">

                                                    <Input type="text" className="form-control" name="email" placeholder="Email *" value={this.state.email} onChange={this.onChangeEmail} validations={[required, email]} />
                                                </div>
                                                <div className="form-group">

                                                    <Input type="text" className="form-control" name="phone"  placeholder="Số điện thoại *" value={this.state.phone} onChange={this.onChangePhone} validations={[required, phone]} />
                                                </div>


                                                <div className="form-group">

                                                    <Input type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChangeDate} validations={[required, vdate]} />
                                                </div>
                                                <div className="form-group">
                                                    <select class="form-control" value={this.state.role} onChange={this.onChangeRole} >
                                                <option value = "1" selected={true}>Tình nguyện viên</option>
                                                <option value = "2" >Nhà tổ chức</option>
                                                </select>

                                                </div>


                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">Đăng kí</button>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}