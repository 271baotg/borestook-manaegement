import { Button, Form, Modal } from "react-bootstrap";
import { CustomerModel } from "../../../models/CustomerModel";

const INIT_RANK: number = 0;
const INIT_SPENT: number = 0;
export const CustomerInforModal: React.FC<{
  isShow: boolean;
  customer: CustomerModel;
  setCustomer: Function;
  onClose: Function;
  onOpen: Function;
  onSave: Function;
  title?: string;
}> = (props) => {
  const isShow = props.isShow;
  const customer = props.customer;

  const handleOnHide = () => {
    props.onClose();
  };

  const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    props.setCustomer({ ...customer, [name]: value });
  };

  const handleOnClickCreatButton = () => {
    props.onSave();
  };

  const handleOnClickClearButton = () => {
    props.setCustomer({
      fullName: "",
      phoneNumber: "",
      spent: INIT_SPENT,
      ranking: INIT_RANK,
    });
  };
  const handleOnClickCancelButton = () => {
    props.onClose();
  };

  return (
    <Modal show={isShow} onHide={handleOnHide}>
      <Modal.Header className="d-flex justify-content-center" closeButton>
        <Modal.Title>{props.title ?? "Customer information"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="fullName"
              onChange={handleOnInputChanged}
              type="text"
              autoFocus={true}
              value={customer.fullName}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phoneNumber"
              onChange={handleOnInputChanged}
              type="number"
              value={customer.phoneNumber}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Spent ($)</Form.Label>
            <Form.Control
              name="spent"
              onChange={handleOnInputChanged}
              type="number"
              value={customer.spent}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ranking</Form.Label>
            <Form.Control
              name="ranking"
              onChange={handleOnInputChanged}
              type="text"
              value={customer.ranking}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOnClickCreatButton} variant="success">
          Create
        </Button>
        <Button onClick={handleOnClickClearButton} variant="warning">
          Clear
        </Button>
        <Button onClick={handleOnClickCancelButton} variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
