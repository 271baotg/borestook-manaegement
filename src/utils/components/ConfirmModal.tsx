import { Button, Form, Modal } from "react-bootstrap"

export const ConfirmModal: React.FC<{ content: React.ReactNode, isOpen: boolean, onClose: Function, onOpen:Function, onConfirm:Function }> = (props) => {

    const handleOnHide = () => {
        props.onClose();

    }

    const handleOnClickCancelButton = () => {
        props.onClose();
    }

    const handleOnClickConfirm = () => {
        props.onConfirm();
        props.onClose();
    }
    return (
        <Modal show={props.isOpen} onHide={handleOnHide}>
            <Modal.Header className="d-flex justify-content-center" closeButton >
                <Modal.Title>Make sure the information is correct</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {props.content}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleOnClickConfirm} variant="primary">All information is correct</Button>
                <Button onClick={handleOnClickCancelButton} variant="secondary">No let me check</Button>
            </Modal.Footer>
        </Modal>
    )
}