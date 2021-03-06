import React,{Component} from 'react'
import { Link } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import logo from "../../img/logo.png"
import { isCompositeComponentWithType } from 'react-dom/test-utils';
export default class Header extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          redirect: null,
          userReady: false,
          currentUser: { username: "" }
        };
      }
      
      componentDidMount() {
        const currentUser = AuthService.getCurrentUser();  
        this.setState({ currentUser: currentUser, userReady: true })
      }
      logOut() {
        AuthService.logout();
      }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
          const { currentUser } = this.state;   
         
                                
    return (
        <div>
            {currentUser ? (
                <div>  
                <header style={{ height: '125px' }}>
                    <div class="row-article">
                        <div class="col-sm-9">
                                <img src={logo} class="img-responsive" style={{display: 'inline-block'}}></img>
                        </div>    
                
                        <div class="col-sm-auto">
                            <Link to="/event" style={{ textDecoration:'none', color:'black'}}>
                                <div class="navbar-user-item">
                                    <div class="navbar-user-icon" style={{alignItems: 'center'}}>
                                        <i class="fa fa-heart " style={{fontSize:'36px', marginTop: '15px', marginLeft: '20px'}}>
                                    </i>
                                    </div>
                                </div>
                                <div class="navbar-user-text" style={{alignItems: 'right', marginLeft:'50x'}}>Các Sự kiện</div>
                            </Link>
                        </div>

                    <div class="col-sm-auto" style={{marginTop:"20px"}}>
                        <ul class='navbar-nav navbar-brand me-auto mb-2 mb-lg-0'>
                        <li class='nav-item dropdown'>
                            <h6 class='nav-link dropdown-toggle text-dark' id='navbarDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false' >
                                Chào {currentUser.username}
                                
                            </h6>
                            <ul class='dropdown-menu' aria-labelledby='navbarDropdown'>
                                <li><Link class='dropdown-item' to='/profile'>Thông tin chung</Link></li>
                                <li hidden={localStorage.getItem('role') != '2'}><Link class='dropdown-item' to='/newEvent'>Tạo bài đăng</Link></li>
                                <li hidden={localStorage.getItem('role') != '3'}><Link class='dropdown-item' to='/admin'>Quản lý người dùng</Link></li>
                                <li hidden={localStorage.getItem('role') != '2'}><Link class='dropdown-item' to='/myEvents'>Xem sự kiện đã tạo</Link></li>
                                <li hidden={localStorage.getItem('role') != '1'}><Link class='dropdown-item' to='/myEvents'>Xem sự kiện đã tham gia</Link></li>
                                <li><Link class='dropdown-item' to='/password'>Đổi mật khẩu</Link></li>
                                <li><hr class='dropdown-divider' /></li>
                                <li class='dropdown-item' >
                                    <a href="/" className="nav-link" onClick={this.logOut}>
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </li>
                        </ul>
                    
                    </div>
                    </div>
                        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div class="container-fluid underline">
                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="navbar-nav navbar-brand me-auto mb-2 mb-lg-0">
                                        <li class="nav-item">
                                            <Link to="/" class="nav-Link text-light" style={{fontSize: '18px', textDecoration: 'none'}} aria-current="page">Trang chủ</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/newEvent" class="nav-Link text-light" style={{fontSize: '18px', textDecoration: 'none'}} aria-current="page">Tổ chức sự kiện</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link to="/about" class="nav-Link text-light" style={{fontSize: '18px', textDecoration: 'none'}} aria-current="page">Về chúng tôi</Link>
                                        </li>
                                        <li class="nav-item dropdown">
                                            <Link to = "/" class="nav-Link dropdown-toggle text-light" id="navbarDropdown" style={{fontSize: '18px',textDecoration: 'none'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Cộng đồng
                                            </Link>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link to = "/" class="dropdown-item"style={{fontSize: '15px',textDecoration: 'none'}}>Facebook</Link></li>
                                                <li><Link to = "/" class="dropdown-item"style={{fontSize: '15px',textDecoration: 'none'}}>Instagram</Link></li>
                                                <li><Link to = "/" class="dropdown-item"style={{fontSize: '15px',textDecoration: 'none'}}>Chatwork</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                </div>
                ) : (
                <div>  
                    <header style={{ height: '125px' }}>
                        <div class="row-article">
                            <div class="col-sm-9">
                                    <img src={logo} class="img-responsive" style={{display: 'inline-block'}}></img>
                            </div>    
                        
                            <div class="col-sm-auto">
                                <Link to="/event" style={{ textDecoration:'none', color:'black'}}>
                                    <div class="navbar-user-item">
                                        <div class="navbar-user-icon" style={{alignItems: 'center'}}>
                                            <i class="fa fa-heart " style={{fontSize:'36px', marginTop: '15px', marginLeft: '20px'}}>
                                        </i>
                                        </div>
                                    </div>
                                    <div class="navbar-user-text" style={{alignItems: 'center'}}>Các sự kiện</div>
                                </Link>
                            </div>
                            <div class="col-sm-auto">
                                    <Link to="/login" style={{ textDecoration:'none', color:'black'}}>
                                        <div class="navbar-user-item">
                                            <div class="navbar-user-icon">
                                                <i class="fa fa-user" style={{ fontSize:'36px', marginTop: '15px', marginLeft: '9px'}}></i>
                                            </div>
                                            <div class="navbar-user-text" style={{alignItems: 'center'}}> Login</div>
                                        </div>
                                    </Link>
                            </div>
                                <div class="col-sm-auto">
                                    <Link to="/register">
                                        <button class="btn btn-join" type="button" ><strong>Đăng ký</strong></button>
                                    </Link>
                                </div>
                            </div>
                                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                                    <div class="container-fluid underline">
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul class="navbar-nav navbar-brand me-auto mb-2 mb-lg-0">
                                                <li class="nav-item">
                                                    <Link to="/" class="nav-Link text-light" style={{fontSize: '18px', textDecoration: 'none'}} aria-current="page">Trang chủ</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link to = "/newEvent" class="nav-Link text-light"  style={{fontSize: '18px',textDecoration: 'none'}}>Tổ chức sự kiện</Link>
                                                </li>
                                                <li class="nav-item dropdown">
                                                <Link to = "/about" class="nav-Link text-light"  style={{fontSize: '18px',textDecoration: 'none'}}>Về chúng tôi</Link>
                                                </li>
                                                <li class="nav-item dropdown">
                                                    <Link to = "/" class="nav-Link dropdown-toggle text-light" id="navbarDropdown" style={{fontSize: '18px',textDecoration: 'none'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    Cộng đồng
                                                    </Link>
                                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <li><Link to = "/" class="dropdown-item"style={{fontSize: '15px',textDecoration: 'none'}}>Facebook</Link></li>
                                                        <li><Link to = "/" class="dropdown-item"style={{fontSize: '15px',textDecoration: 'none'}}>Instagram</Link></li>
                                                        <li><Link to = "/" class="dropdown-item"style={{fontSize: '15px',textDecoration: 'none'}}>Chatwork</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </header>
                        </div>
                        
                        )} 
                </div>
    );
}
}

// export default Header;
