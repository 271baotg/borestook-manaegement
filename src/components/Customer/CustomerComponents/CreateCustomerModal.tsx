import {  useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel";
import st from '../style/new_cus_modal_styled.module.css'

const INIT_RANK: string = 'C';
const INIT_SPENT: number = 0;

export const CreateCusModal: React.FC<{ createCustomer: Function }> = (props) => {
    const [customer, setCustomer] = useState<CustomerModel>({ ranking: INIT_RANK, spent: INIT_SPENT });
    const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCustomer({ ...customer, [name]: value });
    };
    const handleOnClickCreateButton = () => {
        if (!(customer.fullName && customer.phoneNumber && customer.ranking && (customer.spent!=null))) {
            alert('Please fill all the information');
        } else {
            props.createCustomer(customer);
        }
    }

    const handleOnClickClearButton = () => {
        setCustomer({
            fullName: '',
            phoneNumber: '',
            spent: INIT_SPENT,
            ranking: INIT_RANK,
        });
    }

    return (
        <>
            <div className="modal" id="createCustomerModal" aria-hidden="true" aria-labelledby="createCustomerModalLabel" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createCustomerModalLabel">Modal 1</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="w-100" action="" method="post" style={{ backgroundColor: 'white' }} id='create_customer_form'>
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

                            <button type="button" data-bs-target="#createCustomerConfirmModal" data-bs-toggle="modal" data-bs-dismiss="modal" className="btn btn-success" >Create</button>

                            {/* <!-- Button --> */}
                            <button type="button" className="btn btn-primary" onClick={handleOnClickClearButton} aria-label="Clear">Clear</button>

                            {/* <!-- Button --> */}
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Close</button>


                            {/* <button className="btn btn-primary" >Open second modal</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="createCustomerConfirmModal" aria-hidden="true" aria-labelledby="createCutomerConfirmLabel" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-danger" id="createCutomerConfirmLabel">Confirm</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>Are you sure all the information is correct ?</h5>
                            <div className="preview-customer">
                                <div>
                                    Fullname: {customer.fullName ?? "empty"}
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
                            <button className="btn btn-primary" style={{ minWidth: '100px' }} onClick={handleOnClickCreateButton}>Save</button>
                            <button className="btn btn-secondary" style={{ minWidth: '100px' }} data-bs-target="#createCustomerModal" data-bs-toggle="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}