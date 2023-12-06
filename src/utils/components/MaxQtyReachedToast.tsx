import { Toast, ToastContainer } from "react-bootstrap"

export const MaxQtyReachedModal: React.FC<{ isOpen: boolean, onOpen: Function, onClose: Function }> = (props) => {


    return (
        // <Modal show={props.isOpen} onHide={()=>props.onClose()}>
        //     <Modal.Header hidden>
        //         <Modal.Title></Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <h1>The quantity of bill item can not be bigger than the available</h1>
        //     </Modal.Body>
        // </Modal>
        <ToastContainer position={'bottom-end'} className="m-1">
            <Toast bg='warning' show={props.isOpen}  onClose={() => {props.onClose()}} autohide delay={2500}>
                <Toast.Header>WARNING</Toast.Header>
                <Toast.Body as='h6'>
                    The quantity can't be larger than book available
                </Toast.Body>
            </Toast>
        </ToastContainer>

    );
}