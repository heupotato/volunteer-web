import { Table } from "react-bootstrap";
import  React, { useState, useEffect } from "react";
import ReasonModal from "../../component/ReasonModal";
import registrationprojectService from "../../services/registrationproject.service";
import userService from "../../services/user.service";
function ListParticipants(prop)
{
    var projectID = prop.projectID; 
    //từ projectID lấy ra projectName 
    var projectName = ""; 

    //từ projectID lấy ra danh sách người dùng đăng ký vào sự kiện projectID
    var participants = [];

    var checkdata = {
        name: "", 
        DoB: "", 
        email: "", 
        tel: "", 
        reason: ""
    } //cái checkdata này để test, có api thì xoá đi 
    const [details, setDetails] = useState([{
        user: 0,
        project: 0,
        id: 0
    }])
    const [listUsers, setListUsers] = useState([{
        name: "",
        email: "",
        phone: ""
    }])
    const[listParticipants, setListParticipants] = useState(); 
    useEffect(() => {
        console.log('useEffect has been called!');
        registrationprojectService.getAllRegisterProject(1).then(response => {
            var listParticipants = response.data;
            setDetails(listParticipants);
            var listUser = []
            listParticipants.map(x => userService.getUser(x.user).then( res =>
                {
                    listUser.push(res.data);
                },
                setListUsers(listUser,
                    setListParticipants(listUsers.map((participant, index) =>
                    {
                        return (
                        <tr>
                            <th key={index}>{index}</th>
                            <th>{participant.name}</th>
                            {/* <th>{participant.DoB}</th> */}
                            <th>{participant.email}</th>
                            <th>{participant.phone}</th>
                            <th><ReasonModal index={index} name={checkdata.name} reason={checkdata.reason}></ReasonModal></th>
                        </tr>
                        )
                    }))
                ),
                console.log(listUsers),
            ))
          })
        .finally()
      }, []);

     
    

    // if (listUsers.length == 0)
    // return (
    //     <div style={{ 
    //         backgroundImage: `url("https://i.pinimg.com/originals/56/94/72/569472665b47e718976d4a25c3ef8327.png")` , 
    //         height: '100vh',
    //         backgroundSize: '800px 45vw'
    //       }}>
    //         <div className="blank"></div>
    //         <div className="blank"></div>
    //         <h2 style={{textAlign: 'center'}}>Rất tiếc, hiện tại chưa có ai đăng ký sự kiện {projectName}</h2>
    //     </div>
        
    // )
    
    return(
        <div className="form-control" style={{padding:"20px"}}>
            <h2 style={{textAlign: 'center'}}>Danh sách đăng ký sự kiện {projectName}</h2>
            <div className="blank"></div>
            <Table striped bordered hover variant="dark" style={{width:'100%'}}>
            <colgroup>
            
            </colgroup>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên</th>
                    {/* <th>Ngày sinh</th> */}
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Lí do tham gia sự kiện</th>
                </tr>
            </thead>
            <tbody>
                {listParticipants}
            </tbody>
            </Table>
        </div>
    )
}

export default ListParticipants; 