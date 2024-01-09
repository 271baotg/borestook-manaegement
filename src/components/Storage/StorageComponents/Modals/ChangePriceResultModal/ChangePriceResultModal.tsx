import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import successIcon from '../../../../../images/success.png';
import failIcon from '../../../../../images/cancel.png';
import { Img } from "@chakra-ui/react";
import AuthContext from "../../../../../auth/AuthProvider";

export const ChangePriceResultModal: React.FC<{ isOpen: boolean, onClose: Function, isSuccess: boolean }> = (props) => {

  const { auth } = useContext(AuthContext);
  setTimeout(() => {
    props.onClose();
  }, 2500);

  if (!auth?.roles.includes('admin')) {
    return (
      <Modal show={props.isOpen} onHide={() => { props.onClose() }}>
        <Modal.Header closeButton>
          <h3>Infor</h3>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center flex-column align-items-center">
          <Img src={failIcon} width={100} height={100}></Img>
          <h5 className="m-3">Your account doen't have permission to access</h5>
        </Modal.Body>
      </Modal>)
  }

  return (
    <Modal show={props.isOpen} onHide={() => { props.onClose() }}>
      <Modal.Header closeButton>
        <h3>Infor</h3>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center flex-column align-items-center">
        <Img src={props.isSuccess ? successIcon : failIcon} width={100} height={100}></Img>
        <h5 className="m-3">The price has been updated</h5>
      </Modal.Body>
    </Modal>
  )
}