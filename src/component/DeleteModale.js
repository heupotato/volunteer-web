import { Button } from 'react-bootstrap';
import  React, { Component, useState } from "react";
import EventService from '../services/EventService';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router';
function DeleteModale(prop)
{
    const [show, setShow] = useState(false);
    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        console.log(prop.projectID)
        if (reason == ""); 
        else {
            EventService.deleteEvent(prop.projectID, reason).then( () => {
                handleClose(); 
                alert("Đã xóa, về trang chủ");
                history.push("/");
                /*
                * chỗ này navigate về trang chủ luôn nhé
                */
            })   
        }
    }

    const [reason, setReason] = useState(""); 
    const handleChange = (evt) =>{
        const value = evt.target.value
        setReason(value)
    }
    return (
    <div>
        <Button variant="primary btn-lg" onClick={handleShow}>
            Xoá sự kiện
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc muốn xoá sự kiện này</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea className="form-control" rows="5" onChange={handleChange}
                placeholder="Lí do bạn muốn huỷ bỏ sự kiện? Nếu không có lí do thì không thể xoá sự kiện"></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Xoá sự kiện
                </Button>
            </Modal.Footer>
      </Modal>
    </div>)
    
}

export default DeleteModale; 