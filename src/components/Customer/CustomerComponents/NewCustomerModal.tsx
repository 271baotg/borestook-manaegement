import { useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel";
import st from '../style/new_cus_modal_styled.module.css'

const INIT_RANK = 'C';

export const NewCustomerModal:React.FC<{closeModal:Function, createCustomer:Function}> = (props) => {
    const [customer, setCustomer] = useState<CustomerModel>({ranking:INIT_RANK});
    const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCustomer({...customer, [name]:value});
    };
    const handleOnCreateButton = () =>{
        props.createCustomer(customer);
    }

    const handleOnClickCloseButton = () => {
        props.closeModal();
    }
    return(
        <>
            <dialog data-create-customer-form className={`${st.modal} m-5 w-50`}>
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
                    <div className="d-flex">
                        {/* <!-- Button --> */}
                        <div className="form-group m-1">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <button type="button" onClick={handleOnCreateButton} className="btn btn-warning" >Create <span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>

                        {/* <!-- Button --> */}
                        <div className="form-group m-1">
                            <label className="col-md-4 control-label"></label>
                            <div className="col-md-4">
                                <button type="button" onClick={handleOnClickCloseButton} className="btn btn-warning" >Close <span className="glyphicon glyphicon-send"></span></button>
                            </div>
                        </div>
                    </div>
                </div>

            </dialog >
        </>
    )
}