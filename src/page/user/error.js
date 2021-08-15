import { Link } from "react-router-dom";
function Error(){
    
    return(
        <div class="container" style={{marginTop:'40px'}}>
        <div class="row">
            <div class="col-md-12">
                <div style={{padding: '40px, 15px', textAlign: 'center'}}>
                    <h1>
                        Oops!</h1>
                    <h2>Đã có lỗi xảy ra</h2>
                    <div class="error-details">
                        Bạn vui lòng quay về trang chủ bằng cách nhấn nút bên dưới
                    </div>
                    <div style={{marginTop: '15px', marginBottom: '45px'}}>
                        <Link to = "/" class="btn btn-success"><span class="glyphicon glyphicon-home"></span>
                            Về trang chủ </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
				
    )
}
export default Error;