import { useState } from "react";
import { Modal } from "react-bootstrap";
import successIcon from '../../../../../images/success.png';
import failIcon from '../../../../../images/cancel.png';
import { Img } from "@chakra-ui/react";

export const CheckOutResultModal:React.FC<{isOpen:boolean, onClose:Function, isSuccess:boolean}> = (props) => {
    
    
    setTimeout(()=>{
      props.onClose();
    }, 1500) ;

    return (
        <Modal show={props.isOpen} onHide={()=>{props.onClose()}}>
        <Modal.Header closeButton>
          <h3>Infor</h3>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center flex-column align-items-center">
          <Img src={props.isSuccess ? successIcon: failIcon} width={100} height={100}></Img>
          <h5 className="m-3">You have successfuly checkout</h5>

        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
        <div>
              <div>Bill ID  :</div>
              <div>Staff:</div>
              <div>Customer: </div>
              <div>Total:</div>
            </div>
        </Modal.Footer>
      </Modal>
    )
}