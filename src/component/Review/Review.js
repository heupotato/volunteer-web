import { useHistory } from 'react-router';
import voteServices from '../../services/vote.services';

function Review({match}){
    var project1, project2, project3;
    var leader1, leader2, leader3;
    const history = useHistory();

    const handleChangeProjectValue1 = (e1) => {
        project1 = e1.target.value;
        console.log(project1);
    };

    const handleChangeProjectValue2 = e2 => {
        project2 = e2.target.value;
        console.log(project2);
    };

    const handleChangeProjectValue3 = e3 => {
        project3 = e3.target.value;
        console.log(project3);
    };

    const handleChangeLeaderValue1 = e1 => {
        leader1 = e1.target.value;
        console.log(leader1);
    };

    const handleChangeLeaderValue2 = e2 => {
        leader2 = e2.target.value;
        console.log(leader2);
    };

    const handleChangeLeaderValue3 = e3 => {
        leader3 = e3.target.value;
        console.log(leader3);
    };

      const handleSubmit = () => {
        var averageProject = (parseInt(project1) + parseInt(project2) + parseInt(project3))/3;
        var averageLeader = (parseInt(leader1) + parseInt(leader2) + parseInt(leader3))/3;
        var leaderID = localStorage.getItem("id"); 
        var eventID = match.params.id; 
        voteServices.postVote(eventID, leaderID, averageProject, averageLeader).then( () => {
            alert("Đánh giá thành công");
            history.push("/");
        }) 
        .catch(error => console.log(error))
      }
      
    return(
        <form style={{marginTop:"40px"}}>
        <h3 class="text-center" style={{marginLeft:"110px",marginBottom:"20px"}}>Đánh giá hoạt động</h3>
           <div class="cmt-3 mb-4">
                    <div class="row" style={{alignItems:"center",marginLeft:"80px"}}>
                        <div class="col-sm-3">
                            <h5>Tiêu chuẩn đánh giá</h5>
                        </div>
                        <div class="col-sm-9">
                            <label class="col-sm-2">Rất không hài lòng</label>
                            <label class="col-sm-2" style={{marginLeft:"40px"}}>Không hài lòng</label>
                            <label class="col-sm-2" style={{marginLeft:"30px"}}>Bình thường</label>
                            <label class="col-sm-2" style={{marginLeft:"20px"}}>Hài lòng</label>
                            <label class="col-sm-2" style={{marginLeft:"0px"}}>Rất hài lòng</label>
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Hoạt động hữu ích với bạn không?</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radioPrj1"   value="1" onChange={handleChangeProjectValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radioPrj1"  value="2" onChange={handleChangeProjectValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radioPrj1"  value="3" onChange={handleChangeProjectValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radioPrj1"  value="4" onChange={handleChangeProjectValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radioPrj1"  value="5" onChange={handleChangeProjectValue1} />
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Hoạt động này có nên được tổ chức thường xuyên không</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radioPrj2" id="flexRadioDefault1" value="1" onChange={handleChangeProjectValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radioPrj2" id="flexRadioDefault2" value="2" onChange={handleChangeProjectValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radioPrj2" id="flexRadioDefault3" value="3" onChange={handleChangeProjectValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radioPrj2" id="flexRadioDefault4" value="4" onChange={handleChangeProjectValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radioPrj2" id="flexRadioDefault5" value="5" onChange={handleChangeProjectValue2} />
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Hoạt động này có nên được tổ chức rộng rãi nhiều người tham gia không?</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radioPrj3" id="flexRadioDefault1" value="1" onChange={handleChangeProjectValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radioPrj3" id="flexRadioDefault2" value="2" onChange={handleChangeProjectValue3} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radioPrj3" id="flexRadioDefault3" value="3" onChange={handleChangeProjectValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radioPrj3" id="flexRadioDefault4" value="4" onChange={handleChangeProjectValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radioPrj3" id="flexRadioDefault5" value="5" onChange={handleChangeProjectValue3}/>
                        </div>
                    </div>

            </div>

            <h3 class="text-center" style={{marginLeft:"110px",marginBottom:"20px"}}>Đánh giá nhà tổ chức</h3>
           <div class="cmt-3 mb-4">
                    <div class="row" style={{alignItems:"center",marginLeft:"80px"}}>
                        <div class="col-sm-3">
                            <h5>Tiêu chuẩn đánh giá</h5>
                        </div>
                        <div class="col-sm-9">
                            <label class="col-sm-2">Rất không hài lòng</label>
                            <label class="col-sm-2" style={{marginLeft:"40px"}}>Không hài lòng</label>
                            <label class="col-sm-2" style={{marginLeft:"30px"}}>Bình thường</label>
                            <label class="col-sm-2" style={{marginLeft:"20px"}}>Hài lòng</label>
                            <label class="col-sm-2" style={{marginLeft:"0px"}}>Rất hài lòng</label>
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Nhà tổ chức có hoạt động chuyên nghiệp không?</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radioLeader1"   value="1" onChange={handleChangeLeaderValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radioLeader1"  value="2" onChange={handleChangeLeaderValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radioLeader1"  value="3" onChange={handleChangeLeaderValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radioLeader1"  value="4" onChange={handleChangeLeaderValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radioLeader1"  value="5" onChange={handleChangeLeaderValue1} />
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Nhà tổ chức có tạo điều kiện tốt nhất cho tình nguyện viên không?</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radioLeader2" id="flexRadioDefault1" value="1" onChange={handleChangeLeaderValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radioLeader2" id="flexRadioDefault2" value="2" onChange={handleChangeLeaderValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radioLeader2" id="flexRadioDefault3" value="3" onChange={handleChangeLeaderValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radioLeader2" id="flexRadioDefault4" value="4" onChange={handleChangeLeaderValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radioLeader2" id="flexRadioDefault5" value="5" onChange={handleChangeLeaderValue2} />
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Bạn có tham gia vào những hoạt động tiếp theo của họ không?</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radioLeader3" id="flexRadioDefault1" value="1" onChange={handleChangeLeaderValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radioLeader3" id="flexRadioDefault2" value="2" onChange={handleChangeLeaderValue3} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radioLeader3" id="flexRadioDefault3" value="3" onChange={handleChangeLeaderValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radioLeader3" id="flexRadioDefault4" value="4" onChange={handleChangeLeaderValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radioLeader3" id="flexRadioDefault5" value="5" onChange={handleChangeLeaderValue3}/>
                        </div>
                    </div>

            </div>
            <div class="border border-light p-3 mb-4">
                <div class="text-center">
                <button type="button" style={{marginLeft:"8rem"}} class="btn btn-primary" onClick={handleSubmit}>Đánh giá</button>
                </div>
            </div>
        </form>
				
    )
}
export default Review;