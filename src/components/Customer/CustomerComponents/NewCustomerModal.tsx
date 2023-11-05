import { useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel";
import st from '../style/new_cus_modal_styled.module.css'

const INIT_RANK = 'C';

export const NewCustomerModal: React.FC<{ closeModal: Function, createCustomer: Function }> = (props) => {
    const [customer, setCustomer] = useState<CustomerModel>({ ranking: INIT_RANK });
    const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCustomer({ ...customer, [name]: value });
    };
    const handleOnCreateButton = () => {
        props.createCustomer(customer);
    }

    const handleOnClickCloseButton = () => {
        props.closeModal();
    }
    return (
        <>
            {false && <dialog data-create-customer-form className={`${st.modal} m-5 w-50`}>
                <div className="container" >
                    <form className="w-100 m-4" action="" method="post" style={{ backgroundColor: 'white' }} id='customer_form'>
                        <fieldset>

                            {/* <!-- Form Name --> */}
                            <legend>Customer Information</legend>

                            {/* <!-- Text input--> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">Fullname</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input className="form-control" name="fullName" value={customer?.fullName} type="text"
                                            onChange={handleOnInputChanged} />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Text input--/> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">Phone #</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input name="phoneNumber"
                                            value={customer?.phoneNumber}
                                            className="form-control" type="text"
                                            onChange={handleOnInputChanged} />
                                    </div>
                                </div>
                            </div>


                            {/* <!-- Text input--> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">Spent</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input name="spent" value={customer?.spent} className="form-control" type="text" onChange={handleOnInputChanged} />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Text input--> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">Ranking</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input name="ranking" value={customer?.ranking} className="form-control" type="text" onChange={handleOnInputChanged} />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    <div className="d-flex justify-content-center">
                        {/* <!-- Button --> */}
                        <div className="form-group m-1">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <button type="button" onClick={handleOnCreateButton} className="btn btn-success" >Create <span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>

                        {/* <!-- Button --> */}
                        <div className="form-group m-1">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <button type="button" onClick={handleOnClickCloseButton} className="btn btn-danger" >Close <span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>
                    </div>
                </div>

            </dialog >}
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="w-100" action="" method="post" style={{ backgroundColor: 'white' }} id='customer_form'>
                                <fieldset>

                                    {/* <!-- Form Name --> */}
                                    <legend>Customer Information</legend>

                                    {/* <!-- Text input--> */}

                                    <div className="form-group d-flex m-1">
                                        <label className="col-md-4 control-label">Fullname</label>
                                        <div className="col-md-4 inputGroupContainer">
                                            <div className="input-group">
                                                <input className="form-control" name="fullName" value={customer?.fullName} type="text"
                                                    onChange={handleOnInputChanged} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Text input--/> */}

                                    <div className="form-group d-flex m-1">
                                        <label className="col-md-4 control-label">Phone #</label>
                                        <div className="col-md-4 inputGroupContainer">
                                            <div className="input-group">
                                                <input name="phoneNumber"
                                                    value={customer?.phoneNumber}
                                                    className="form-control" type="text"
                                                    onChange={handleOnInputChanged} />
                                            </div>
                                        </div>
                                    </div>


                                    {/* <!-- Text input--> */}

                                    <div className="form-group d-flex m-1">
                                        <label className="col-md-4 control-label">Spent</label>
                                        <div className="col-md-4 inputGroupContainer">
                                            <div className="input-group">
                                                <input name="spent" value={customer?.spent} className="form-control" type="text" onChange={handleOnInputChanged} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Text input--> */}

                                    <div className="form-group d-flex m-1">
                                        <label className="col-md-4 control-label">Ranking</label>
                                        <div className="col-md-4 inputGroupContainer">
                                            <div className="input-group">
                                                <input name="ranking" value={customer?.ranking} className="form-control" type="text" onChange={handleOnInputChanged} />
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* FOOTER */}

                            {/* <!-- Button --> */}

                            <button type="button" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn btn-success" >Create <span className="glyphicon glyphicon-send"></span></button>

                            {/* <!-- Button --> */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>


                            {/* <button className="btn btn-primary" >Open second modal</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalToggleLabel2">Modal 2</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Are you sure all the information is correct?</h5>
                            <div className="preview-customer">
                                <div>
                                    Fullname: {customer.fullName?? "empty"}
                                </div>
                                <div>
                                    Phone number: {customer.phoneNumber ?? "empty"}
                                </div>
                                <div>
                                    Ranking: {customer.ranking}
                                </div>
                                <div>
                                    Spent: {customer.spent ?? 0}
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" style={{minWidth:'100px'}} onClick={handleOnCreateButton}>Save</button>
                            <button className="btn btn-secondary" style={{minWidth:'100px'}} data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}