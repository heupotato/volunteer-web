import { Button } from 'react-bootstrap';
import  React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
function ReasonModal(prop)
{
    var reason = prop.reason; 
    var name = prop.name
    var index = prop.index
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div>
        <Button variant="primary btn-lg" onClick={handleShow}>
            Xem thêm
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>STT: {index} Họ và tên: {name} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Lí do muốn tham gia sự kiện:</h6>
                <textarea className="form-control" rows="5" value={reason} readOnly></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
      </Modal>
    </div>)
    
}

export default ReasonModal; 