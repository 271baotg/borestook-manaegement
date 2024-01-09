import { Button, Form, Modal } from "react-bootstrap";
import { CustomerModel } from "../../../models/CustomerModel";
import { CustomerValidator } from "../../../utils/validators/CustomerValidator";
import { useContext, useState } from "react";
import AuthContext from "../../../auth/AuthProvider";

const INIT_RANK: number = 1;
const INIT_SPENT: number = 0;

const validStyle = { fontFamily: "monospace", fontSize: 13.5, color: "green" };
const inValidStyle = { fontFamily: "monospace", fontSize: 13.5, color: "red" };

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
  const { auth } = useContext(AuthContext);
  const { validation = true } = props;
  const isShow = props.isShow;
  const customer = props.customer;
  const [customerValidator] = useState<CustomerValidator>(
    new CustomerValidator()
  );

  const handleOnHide = () => {
    props.onClose();
  };

  const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "spent" && !auth?.roles.includes("admin")) {
      return;
    }
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
        <Modal.Title style={{ color: "var(--blue-color)" }}>
          {props.title ?? "Customer information"}
        </Modal.Title>
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
            {validation && (
              <div className="ms-2">
                <p
                  className="m-0"
                  style={
                    customerValidator.nameValidator.isLongEnough(
                      customer.fullName ?? ""
                    )
                      ? validStyle
                      : inValidStyle
                  }
                >
                  (*) Name must contain more than 3 characters.
                </p>
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="phoneNumber"
              onChange={handleOnInputChanged}
              type="number"
              value={customer.phoneNumber}
            ></Form.Control>
            {validation && (
              <div className="ms-2">
                <p
                  className="m-0"
                  style={
                    customerValidator.phoneValidator.isLongEnough(
                      props.customer.phoneNumber ?? ""
                    )
                      ? validStyle
                      : inValidStyle
                  }
                >
                  (*) Phonenumber length is exactly 9.
                </p>
                <p
                  className="m-0"
                  style={
                    customerValidator.phoneValidator.isRightFormat(
                      props.customer.phoneNumber ?? ""
                    )
                      ? validStyle
                      : inValidStyle
                  }
                >
                  (*) Phonenumber have start with 0 (e.g. 0xxx...).
                </p>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Spent ($)</Form.Label>
            <div className="d-inline-block ms-2">
              <p style={{ fontFamily: "monospace", fontSize: 13.5 }}>
                (Only admin can change this field)
              </p>
            </div>
            <Form.Control
              disabled={!auth?.roles.includes("admin")}
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
              disabled
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleOnClickCreatButton}
          variant="success"
          disabled={customerValidator.isValid(customer) ? false : true}
        >
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
