import React,{Component} from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../../services/user.service";

import CheckButton from "react-validation/build/button";

export default class edit extends Component{
    
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.onChangeActive = this.onChangeActive.bind(this);
      
      
        this.state = {
            active: "",
            successful: false,
            message: ""
        };
      }
    onChangeActive(e) {
        this.setState({
            active: e.target.value
        });
    }
    componentDidMount() {
    var a = window.location.href.split('/');
    UserService.getUser(a[4]).then(
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
      
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();
        var a = window.location.href.split('/');
        if (this.checkBtn.context._errors.length === 0) {
            UserService.postUser(
             !this.state.active,
              a[4]
            ).then(
                () => {
                    this.props.history.push("/admin");
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
                                  <h1 style={{paddingBottom: "20px",paddingTop:"40px"}}>Cập nhật tài khoản</h1>
                                        <div class='form-group' style={{marginBottom:"20px"}}>       

                            <div>
                                
                                <div className="form-group" style={{marginBottom:"20px"}}>
                                <label>Khóa tài khoản</label>
                                <Input  type="text" className="form-control" name="active" value={this.state.active} onChange={this.onChangeActive}  />
                                </div>


                                <div className="form-group" style={{marginBottom:"40px",marginTop:"30px"}}>
                                <button className="btn btn-primary btn-block"> Cập nhật</button>
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
