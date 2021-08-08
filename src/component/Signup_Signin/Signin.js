import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
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

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
              () => {
                this.props.history.push("/");
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
                  loading: false,
                  message: resMessage
                });
              }
            );
          } else {
            this.setState({
              loading: false
            });
          }
        }
      

    render() {
        return (
            <div class="login"  style = {{marginBottom:'80px'}}>
                <div class="row">
                    <div class="col-md-3 register-left" style={{ marginTop: "0px" }}>
                        <img src="https://icons-for-free.com/iconfiles/png/512/plane+icon-1320184416039486906.png" alt="" style={{ paddingTop: "20px" }} />
                        <h3>Welcome</h3>
                        <p>Together make it better</p>
                        <Link to="/register">
                            <input type="submit" name="" style={{ marginTop: "10px" }} value="Đăng kí" />
                        </Link>
                        <br />
                    </div>
                    <div class="col-md-9 login-right">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading" style={{ position: "relative", marginTop: "60px" }}>Đăng nhập</h3>

                                <Form
                                    onSubmit={this.handleLogin}
                                    ref={c => {
                                        this.form = c;
                                    }}
                                >
                                    <div class="row register-form">
                                        <div class="col-md-3" style={{ position: "relative", marginTop: "90px" }}>
                                            <label style={{ marginLeft: "50px" }}><b>Username</b></label>
                                            <label style={{ marginLeft: "50px", marginTop: "50px" }}><b>Password</b></label>
                                        </div>
                                        <div class="col-md-9" style={{ position: "relative", marginTop: "80px" }}>

                                            <div className="form-group">

                                                <Input type="text" className="form-control" name="username" style={{ width: "400px", alignItems: "center", marginLeft: "20px" }} value={this.state.username} onChange={this.onChangeUsername} validations={[required]} />
                                            </div>

                                            <div className="form-group">
                                                <Input type="password" className="form-control" name="password" style={{ width: "400px", alignItems: "center", marginLeft: "20px", marginTop: "50px" }} value={this.state.password} onChange={this.onChangePassword} validations={[required]} />
                                            </div>


                                            <input type="submit" className="btn btn-primary btn-block" disabled={this.state.loading} name="submit" value="Đăng nhập" style={{ marginRight: "80px" }} />

                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}


                                            {this.state.message && (
                                                <div className="form-group">
                                                    <div className="alert alert-danger" role="alert">
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
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}