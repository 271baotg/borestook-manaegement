import { Button, Form, Modal } from "react-bootstrap";
import { CustomerModel } from "../../../models/CustomerModel";
import { CustomerValidator } from "../../../utils/validators/CustomerValidator";
import { useState } from "react";

const INIT_RANK: number = 0;
const INIT_SPENT: number = 0;

const validStyle = { fontFamily: 'monospace', fontSize: 13.5, color: 'green'};
const inValidStyle = { fontFamily: 'monospace', fontSize: 13.5, color: 'red' };

export const CustomerInforModal: React.FC<{
  isShow: boolean;
  customer: CustomerModel;
  setCustomer: Function;
  onClose: Function;
  onOpen: Function;
  onSave: Function;
  validation?: boolean;
  title?: string;

}> = (props) => {
  const { validation = true } = props;
  const isShow = props.isShow;
  const customer = props.customer;
  const [customerValidator] = useState<CustomerValidator>(new CustomerValidator());

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
            {validation &&
              <>
                <p className="m-0" style={customerValidator.nameValidator.isLongEnough(props.customer.fullName ?? '') ? validStyle : inValidStyle}>(*) Name must contain more than 3 characters.</p>
              </>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phoneNumber"
              onChange={handleOnInputChanged}
              type="number"
              value={customer.phoneNumber}
            ></Form.Control>
            {validation &&
              <>
                <p className="m-0" style={customerValidator.phoneValidator.isLongEnough(props.customer.phoneNumber ?? '') ? validStyle : inValidStyle}>(*) Phonenumber length is exactly 10.</p>
                <p className="m-0" style={customerValidator.phoneValidator.isRightFormat(props.customer.phoneNumber ?? '') ? validStyle : inValidStyle}>(*) Phonenumber have start with 0 (e.g. 0xxx...).</p>
              </>
            }
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
        <Button onClick={handleOnClickCreatButton} variant="success" disabled={customerValidator.isValid(customer) ? false : true}>
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
