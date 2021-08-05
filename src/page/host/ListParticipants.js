import { Table } from "react-bootstrap";
import  React, { Component, useState } from "react";
import ReasonModal from "../../component/ReasonModal";
function ListParticipants(prop)
{
    var projectID = prop.projectID; 
    //từ projectID lấy ra projectName 
    var projectName = "projectName"; 

    //từ projectID lấy ra danh sách người dùng đăng ký vào sự kiện projectID
    var participants = [];

    var checkdata = {
        name: "user's name", 
        DoB: "20-10-2020", 
        email: "abc@gmail.com", 
        tel: "0123456", 
        reason: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    } //cái checkdata này để test, có api thì xoá đi 
    for (var i = 0; i< 10; i++) participants.push(checkdata)
    const listParticipants = participants.map((participant, index) =>
    {
        console.log(participant); 
        return (
        <tr>
            <th key={index}>{index}</th>
            <th>{participant.name}</th>
            <th>{participant.DoB}</th>
            <th>{participant.email}</th>
            <th>{participant.tel}</th>
            <th><ReasonModal index={index} name={checkdata.name} reason={checkdata.reason}></ReasonModal></th>
        </tr>
        )
    }
    )

    if (participants.length == 0)
    return (
        <div style={{ 
            backgroundImage: `url("https://i.pinimg.com/originals/56/94/72/569472665b47e718976d4a25c3ef8327.png")` , 
            height: '100vh',
            backgroundSize: '800px 45vw'
          }}>
            <div className="blank"></div>
            <div className="blank"></div>
            <h2 style={{textAlign: 'center'}}>Rất tiếc, hiện tại chưa có ai đăng ký sự kiện {projectName}</h2>
        </div>
        
    )
    
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
                    <th>Ngày sinh</th>
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