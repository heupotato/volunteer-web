import React,{useState} from 'react'

function Review(){
    //const [event, setEvent] = useState({idEvent:"",name:"1 cái tên nào đó"})
    const [name1, setName1] = useState({value1:"value1_1star"})
    const [name2, setName2] = useState({value2:"value1_1star"})
    const [name3, setName3] = useState({value3:"value1_1star"})
    //thay link dưới bằng link api của mình
   /*useEffect(() => {
        const fetchData = async () => {
          const result = await axios(

            'https://60bc8f5eb8ab37001759f3b3.mockapi.io/api/users',
          );
            console.log(event);
          setEvent(result.data[0]);
        };
        
        fetchData();
      }, []);*/
      const handleChangeValue1 = e1 => {
        setName1({[e1.target.name]:e1.target.value});
        console.log(name1);
      };
      const handleChangeValue2 = e2 => {
        setName2({[e2.target.name]:e2.target.value});
        console.log(name2);
      };
      const handleChangeValue3 = e3 => {
        setName3({[e3.target.name]:e3.target.value});
        console.log(name3);
      };
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
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radio1"   value="value1_1star" onChange={handleChangeValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radio1"  value="value1_2star" onChange={handleChangeValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radio1"  value="value1_3star" onChange={handleChangeValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radio1"  value="value1_4star" onChange={handleChangeValue1} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radio1"  value="value1_5star" onChange={handleChangeValue1} />
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Hoạt động này có nên được tổ chức thường xuyên không</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radio2" id="flexRadioDefault1" value="value2_1star" onChange={handleChangeValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radio2" id="flexRadioDefault2" value="value2_2star" onChange={handleChangeValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radio2" id="flexRadioDefault3" value="value2_3star" onChange={handleChangeValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radio2" id="flexRadioDefault4" value="value2_4star" onChange={handleChangeValue2} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radio2" id="flexRadioDefault5" value="value2_5star" onChange={handleChangeValue2} />
                        </div>
                    </div>
                    <div class="row" style={{alignItems:"center",marginLeft:"80px",marginTop:"20px"}}>
                        <div class="col-sm-3">
                            <h6>Hoạt động này có nên được tổ chức rộng rãi nhiều người tham gia không?</h6>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-check-input col-sm-2" style={{marginLeft:"55px"}} type="radio" name="radio3" id="flexRadioDefault1" value="value3_1star" onChange={handleChangeValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"165px"}} type="radio" name="radio3" id="flexRadioDefault2" value="value3_2star" onChange={handleChangeValue3} />
                            <input class="form-check-input col-sm-2" style={{marginLeft:"160px"}} type="radio" name="radio3" id="flexRadioDefault3" value="value3_3star" onChange={handleChangeValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"140px"}} type="radio" name="radio3" id="flexRadioDefault4" value="value3_4star" onChange={handleChangeValue3}/>
                            <input class="form-check-input col-sm-2" style={{marginLeft:"145px"}} type="radio" name="radio3" id="flexRadioDefault5" value="value3_5star" onChange={handleChangeValue3}/>
                        </div>
                    </div>

            </div>
            <div class="border border-light p-3 mb-4">
                <div class="text-center">
                <button type="button" style={{marginLeft:"8rem"}} class="btn btn-primary">Đánh giá</button>
                </div>
            </div>
        </form>
				
    )
}
export default Review;