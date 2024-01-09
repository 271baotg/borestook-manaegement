import { useEffect, useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel";
import st from "../style/new_cus_modal_styled.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import { ConfirmModal } from "../../../utils/components/ConfirmModal";
import { CustomerInforModal } from "./CustomerInforModal";
const INIT_RANK: number = 0;
const INIT_SPENT: number = 0;

export const CreateCusModal: React.FC<{
  createCustomer: Function;
  isShowInputInforModal: boolean;
  setIsShowInputInforModal: Function;
}> = (props) => {
  const [customer, setCustomer] = useState<CustomerModel>({
    ranking: INIT_RANK,
    spent: INIT_SPENT,
  });
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

  const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCustomer({ ...customer, [name]: value });
  };
  const handleOnClickConfirmButton = () => {
    if (
      !customer.fullName &&
      customer.phoneNumber &&
      customer.ranking &&
      customer.spent
    ) {
      alert("Please fill all the information");
    } else {
      props.createCustomer(customer);
      setCustomer({
        fullName: "",
        phoneNumber: "",
        spent: INIT_SPENT,
        ranking: INIT_RANK,
      });
    }
  };

  const handleOnClickClearButton = () => {
    setCustomer({
      fullName: "",
      phoneNumber: "",
      spent: INIT_SPENT,
      ranking: INIT_RANK,
    });
  };

  const handleOnClickCreatButton = () => {
    props.setIsShowInputInforModal(false);
    setIsShowConfirmModal(true);
  };

  const handleOnClickCancelButton = () => {
    props.setIsShowInputInforModal(false);
  };

  return (
    <>
      {/* <Modal show={props.isShowInputInforModal} onHide={() => props.setIsShowInputInforModal(false)}>
                <Modal.Header className="d-flex justify-content-center" closeButton>
                    <Modal.Title>Create new customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="fullName" onChange={handleOnInputChanged} type="text" autoFocus={true} value={customer.fullName}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name="phoneNumber" onChange={handleOnInputChanged} type="number" value={customer.phoneNumber}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Spent ($)</Form.Label>
                            <Form.Control name="spent" onChange={handleOnInputChanged} type="number" value={customer.spent}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ranking</Form.Label>
                            <Form.Control name="ranking" onChange={handleOnInputChanged} type="text" value={customer.ranking}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleOnClickCreatButton} variant="success">Create</Button>
                    <Button onClick={handleOnClickClearButton} variant="warning">Clear</Button>
                    <Button onClick={handleOnClickCancelButton} variant="secondary">Cancel</Button>
                </Modal.Footer>
            </Modal> */}

      <CustomerInforModal
        customer={customer}
        setCustomer={setCustomer}
        isShow={props.isShowInputInforModal}
        onOpen={() => props.setIsShowInputInforModal(true)}
        onClose={() => props.setIsShowInputInforModal(false)}
        onSave={handleOnClickCreatButton}
        title="Create new customer"
      ></CustomerInforModal>

      <ConfirmModal
        content={
          <>
            <div className="preview-customer">
              <div>Fullname: {customer.fullName ?? "empty"}</div>
              <div>Phone number: {customer.phoneNumber ?? "empty"}</div>
              <div>Ranking: {customer.ranking}</div>
              <div>Spent: {customer.spent ?? 0}</div>
            </div>
          </>
        }
        onClose={() => setIsShowConfirmModal(false)}
        onOpen={() => setIsShowConfirmModal(true)}
        isOpen={isShowConfirmModal}
        onConfirm={handleOnClickConfirmButton}
      ></ConfirmModal>
    </>
  );

  return (
    <>
      <div
        className="modal"
        id="createCustomerModal"
        aria-hidden="true"
        aria-labelledby="createCustomerModalLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCustomerModalLabel">
                Modal 1
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="w-100"
                action=""
                method="post"
                style={{ backgroundColor: "white" }}
                id="create_customer_form"
              >
                <fieldset>
                  {/* <!-- Form Name --> */}
                  <legend>Customer Information</legend>

                  {/* <!-- Text input--> */}

                  <div className="form-group d-flex m-1">
                    <label className="col-md-4 control-label">Fullname</label>
                    <div className="col-md-4 inputGroupContainer">
                      <div className="input-group">
                        <input
                          className="form-control"
                          name="fullName"
                          value={customer?.fullName}
                          type="text"
                          onChange={handleOnInputChanged}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Text input--/> */}

                  <div className="form-group d-flex m-1">
                    <label className="col-md-4 control-label">Phone #</label>
                    <div className="col-md-4 inputGroupContainer">
                      <div className="input-group">
                        <input
                          name="phoneNumber"
                          value={customer?.phoneNumber}
                          className="form-control"
                          type="text"
                          onChange={handleOnInputChanged}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Text input--> */}

                  <div className="form-group d-flex m-1">
                    <label className="col-md-4 control-label">Spent</label>
                    <div className="col-md-4 inputGroupContainer">
                      <div className="input-group">
                        <input
                          name="spent"
                          value={customer?.spent}
                          className="form-control"
                          type="text"
                          onChange={handleOnInputChanged}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Text input--> */}

                  <div className="form-group d-flex m-1">
                    <label className="col-md-4 control-label">Ranking</label>
                    <div className="col-md-4 inputGroupContainer">
                      <div className="input-group">
                        <input
                          name="ranking"
                          value={customer?.ranking}
                          className="form-control"
                          type="text"
                          onChange={handleOnInputChanged}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              {/* FOOTER */}

              {/* <!-- Button --> */}

              <button
                type="button"
                className="btn btn-success"
                onClick={handleOnClickCreatButton}
              >
                Create
              </button>

              {/* <!-- Button --> */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnClickClearButton}
                aria-label="Clear"
              >
                Clear
              </button>

              {/* <!-- Button --> */}
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Close
              </button>

              {/* <button className="btn btn-primary" >Open second modal</button> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="createCustomerConfirmModal"
        aria-hidden="true"
        aria-labelledby="createCutomerConfirmLabel"
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4
                className="modal-title text-danger"
                id="createCutomerConfirmLabel"
              >
                Confirm
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Are you sure all the information is correct ?</h5>
              <div className="preview-customer">
                <div>Fullname: {customer.fullName ?? "empty"}</div>
                <div>Phone number: {customer.phoneNumber ?? "empty"}</div>
                <div>Ranking: {customer.ranking}</div>
                <div>Spent: {customer.spent ?? 0}</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                style={{ minWidth: "100px" }}
                onClick={handleOnClickConfirmButton}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                style={{ minWidth: "100px" }}
                data-bs-target="#createCustomerModal"
                data-bs-toggle="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
