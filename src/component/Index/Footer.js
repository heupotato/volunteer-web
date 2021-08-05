import React,{Component} from 'react';
import { Link } from 'react-router-dom';
function Footer(){
    return(
        <div class="footer-basic">
        <footer>
            <div class="row">
                <div class="col-sm-6 col-md-3 item">
                    <h3 style={{paddingLeft: '100px'}}>Dịch vụ</h3>
                    <ul style={{textAlign:'left', paddingLeft: '90px', fontSize: '1rem'}}>
                        <li><Link href="#">Đội ngũ phát triển</Link></li>
                        <li><Link href="#">Hosting</Link></li>
                    </ul>
                </div>
                <div class="col-sm-6 col-md-3 item">
                    <h3 style={{paddingLeft: '10px'}}>Thông tin</h3>
                    <ul style={{textAlign:'left', fontSize: '1rem'}}>
                        <li><Link href="/about">Tổ chức</Link></li>
                        <li><Link href="#">Nhóm</Link></li>
                        <li><Link href="#">Cơ hội việc làm</Link></li>
                    </ul>
                </div>
                <div class="col-md-6 item text">
                    <h3>Bản quyền</h3>
                    <p style={{fontSize: '1rem'}}>Bản quyền thuộc về nhóm PBL5<br/>Mọi vấn đề liên quan đến việc sử dụng vui lòng liên hệ <br /> thông tin đội ngũ phát triển</p>
                </div>
            </div>
            <div class="social" style={{paddingTop: '20px'}}>
                <Link href="#"><i class="fa fa-facebook"></i></Link>
                <Link href="#"><i class="fa fa-instagram"></i></Link>
                <Link href="#"><i class="fa fa-twitter"></i></Link>
                <Link href="#"><i class="fa fa-github"></i></Link>
            </div>
            <ul class="list-inline">
                <li class="list-inline-item"><Link href="#">Home</Link></li>
                <li class="list-inline-item"><Link href="#">Services</Link></li>
                <li class="list-inline-item"><Link to="/about">About</Link></li>
                <li class="list-inline-item"><Link href="#">Terms</Link></li>
                <li class="list-inline-item"><Link href="#">Privacy Policy</Link></li>
            </ul>
            <p class="copyright">Volunteer PBL5 © 2021</p>
        </footer>
    </div>
    );
}
export default Footer;