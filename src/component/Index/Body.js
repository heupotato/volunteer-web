import React,{Component} from 'react'
import UserService from "../../services/user.service";
import {login} from "../TestLogin/TestLogin";
import { Link } from 'react-router-dom';
class Body extends Component{
  
    render() {
        return (
        <main style = {{marginBottom:'40px'}}>
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <svg class="bd-placeholder-img" width="100%" height="100%" aria-hidden="true" focusable="false">
                        <rect width="100%" height="100%" fill="#d9d4d4"/>
                        <image xlinkHref="https://3adxj44d1tf4346fm63cyw9m-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/volunteer.png"
                            x="0" y="0" height="100%" width="100%"/>
                    </svg>

                    <div class="container">
                        <div class="carousel-caption-0 text-start">
                            <h1 class="bg-light text-define" id="fit-h1">Volunteer</h1>
                            <p class="bg-primary text-light" id="fit-h1">Một trang web tìm kiếm tình nguyện viên miễn phí mang lại những giá trị tuyệt vời cho thế giới</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <svg class="bd-placeholder-img" width="100%" height="100%" aria-hidden="true" focusable="false">
                        <rect width="100%" height="100%" fill="#d9d4d4"/>
                        <image xlinkHref="https://i.pinimg.com/originals/62/02/2b/62022b20e22d6a1aa7133503122c8bb1.jpg"
                            x="0" y="0" height="100%" width="100%"/>
                    </svg>

                    <div class="container">
                        <div class="carousel-caption">
                            <h1 class="text-dark" style={{marginBottom: '20px'}} >Suy nghĩ khác biệt, kết nối toàn cầu</h1>
                            <p><Link class="btn btn-lg btn-primary" to="/search">Tìm kiếm</Link></p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <svg class="bd-placeholder-img" width="100%" height="100%" aria-hidden="true" focusable="false">
                        <rect width="100%" height="100%" fill="#d9d4d4"/>
                        <image xlinkHref="https://i.ibb.co/1RbWySV/image.png"
                            x="0" y="-10px" height="102%" width="100%"/>
                    </svg>

                    <div class="container">
                        <div class="carousel-caption-1">
                        <p style={{float: 'right' }}><Link class="btn btn-lg btn-primary" to="/search">Tìm kiếm</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev carousel-dark" id="carousel-color" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true" ></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next carousel-dark" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="container marketing">
            <div class="row">
                <div class="col-lg-4">
                    <svg class="bd-placeholder-img rounded-circle  border-button" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#fff"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        <image xlinkHref="https://i.ibb.co/GHLYxrs/volunteer-og-image.png"
                            x="0" y="-10px" height="102%" width="100%"/>
                    </svg>
                    <h2>Sự kiện</h2>
                    <p>Các sự kiện đã được đăng ký tại trang web</p>
                    <p><Link to = "event" class="btn bg-define text-light" >Xem chi tiết &raquo;</Link></p>
                </div>
                <div class="col-lg-4">
                    <svg class="bd-placeholder-img rounded-circle border-button" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#186c91"/><text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                        <image xlinkHref="https://i.ibb.co/x1R5csz/Untitled.png"
                            x="0" y="-10px" height="102%" width="100%"/>
                    </svg>
                    <h2>Tìm kiếm</h2>
                    <p>Tìm kiếm sự kiện tại đây</p>
                    <p><Link to = "/search" class="btn bg-define text-light">Xem chi tiết &raquo;</Link></p>
                </div>
                <div class="col-lg-4">
                    <svg class="bd-placeholder-img rounded-circle border-button" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#fff"/><text x="50%" y="50%" fill="#ccc6c6" dy=".3em">140x140</text>
                        <image xlinkHref="https://img.freepik.com/free-vector/group-people-illustration-set_52683-33806.jpg?size=626&ext=jpg"
                            x="0" y="-10px" height="102%" width="100%"/>
                    </svg>
                    <h2>Cộng đồng</h2>
                    <p>Xem các kênh xã hội của chúng tôi</p>
                    <p><Link class="btn bg-define text-light" to = "/">Xem chi tiết &raquo;</Link></p>
                </div>
            </div>

            <hr class="featurette-divider"></hr>

            <div class="row featurette">
                <div class="col-md-7">
                    <h2 class="featurette-heading">Khẩu hiệu: Kết nối và chia sẻ <span class="text-muted">Khác biệt</span></h2>
                    <p class="lead">Chúng tôi sử dụng công nghệ để
                     kết nối cộng đồng tình nguyện viên và chia sẻ những điều tuyệt vời cho xã hội một cách vô điều kiện.</p>
                </div>
                <div class="col-md-5">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Slogan</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        <image xlinkHref="https://images.pexels.com/photos/697243/pexels-photo-697243.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            x="0" y="-10px" height="140%" width="100%"/>
                    </svg>
                </div>
            </div>
            <hr class="featurette-divider"></hr>

            <div class="row featurette">
                <div class="col-md-7 order-md-2">
                    <h2 class="featurette-heading">Hướng đến giá trị chung<br></br><span class="text-muted">Cộng đồng lớn mạnh</span></h2>
                    <p class="lead">Đây là nơi tập hợp những cá thể đặc biệt, nhưng đến với nhau qua niềm đam mê chung,
                    đó chính là đam mê được cống hiến cho xã hội bằng cả trái tim. Hơn cả thế, tình nguyện viên không chỉ thực hiện
                    nhiệm vụ của họ mà còn có thể kết nối với nhau tạo nên một cộng đồng lớn mạnh.</p>
                </div>
                <div class="col-md-5 order-md-1">
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="480" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        <image xlinkHref="https://images.pexels.com/photos/2303781/pexels-photo-2303781.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            x="0" y="-10px" height="100%" width="100%"/>
                    </svg>
                </div>
            </div>

            <hr class="featurette-divider"></hr>

            <div class="row featurette">
                <div class="col-md-7" >
                    <h2 class="featurette-heading">Quản lý chuyên nghiệp<br /> <span class="text-muted">Quy tắc</span></h2>
                    <p class="lead">Chúng tôi có đội ngũ quản lý tầm cỡ, luôn tuân thủ các quy tắc chung để điều hành cộng đồng tình nguyện lớn mạnh.</p>
                </div>
                <div class="col-md-5"  style={{marginBottom:'50px'}}>
                    <svg class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
                        <image xlinkHref="https://i.ibb.co/x3n8CWP/image.png"
                            x="0" y="0px" height="100%" width="100%"/>
                    </svg>

                </div>
            </div>

        </div>
    
    </main>
    );
 }
}

export default Body;
