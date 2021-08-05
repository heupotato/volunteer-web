import React,{Component} from 'react'
import { Link } from 'react-router-dom';

function HeaderUser() {
    return (
        <header style={{ height: '140px' }}>
        <div class="row-article">
            <div class="col-sm-9">
                <Link to="/">
                    <img src="Image/logo.png" class="img-responsive" style={{display: 'inline-block'}}></img>
                </Link>
            </div>
            <div class="col-sm-auto">
                <Link to="#" style={{ textDecoration:'none', color:'black'}}>
                    <div class="navbar-user-item">
                        <div class="navbar-user-icon" style={{alignItems: 'center'}}>
                            <i class="fa fa-heart " style={{fontSize:'36px', marginTop: '15px', marginLeft: '17px'}}>
                        </i>
                        </div>
                    </div>
                    <div class="navbar-user-text" style={{alignItems: 'center'}}>Yêu thích</div>
                </Link>
            </div>
            <div class="col-sm-auto">
                    <Link to="/signup">
                        <button class="btn btn-join" type="button" ><strong>Hello, {localStorage.getItem('username')}</strong></button>
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
                            <Link class="nav-Link text-light" style={{fontSize: '18px',textDecoration: 'none'}} to="#">Cách hoạt động</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-Link text-light"  style={{fontSize: '18px',textDecoration: 'none'}} to="#">Tổ chức sự kiện</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-Link dropdown-toggle text-light" to="#" id="navbarDropdown" style={{fontSize: '18px',textDecoration: 'none'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">Phản hồi</Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link class="dropdown-item" to="#"  style={{fontSize: '15px',textDecoration: 'none'}}>Quyên góp</Link></li>
                                <li><Link class="dropdown-item" to="#" style={{fontSize: '15px',textDecoration: 'none'}}>Feedback</Link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-Link dropdown-toggle text-light" to="#" id="navbarDropdown" style={{fontSize: '18px',textDecoration: 'none'}} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cộng đồng
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link class="dropdown-item" to="#"style={{fontSize: '15px',textDecoration: 'none'}}>Facebook</Link></li>
                                <li><Link class="dropdown-item" to="#"style={{fontSize: '15px',textDecoration: 'none'}}>Instagram</Link></li>
                                <li><Link class="dropdown-item" to="#"style={{fontSize: '15px',textDecoration: 'none'}}>Chatwork</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
}

export default HeaderUser;
