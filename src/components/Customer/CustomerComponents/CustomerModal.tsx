import { HtmlHTMLAttributes, ReactEventHandler, useRef, useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel"
import styled from "styled-components";


export const CustomerModal: React.FC<{ customer: CustomerModel, closeModal: Function, setCurrentCustomer: Function, updateCustomer:Function}> = (props) => {
    
    console.log('customer modal render')
    //HANDLE FUNCTION
    const handleOnClickCloseButton = () => {
        props.closeModal();
    }
    const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        props.setCurrentCustomer({ ...props.customer, [name]: value })
    };
    const handleOnSendButton = () => {
        props.updateCustomer();
    }
    return (
        <>
            <dialog data-customer-form className={`m-5 w-50`}>
                <div className="container" >
                    <form className="w-100 m-4" action="" method="post" style={{ backgroundColor: 'white' }} id='customer_form'>
                        <fieldset>

                            {/* <!-- Form Name --> */}
                            <legend>Customer Information</legend>

                            {/* <!-- Text input--> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">ID</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input
                                            name="ID"
                                            value={props.customer.id}
                                            className="form-control"
                                            type="text" />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Text input--> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">Fullname</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input className="form-control" name="fullName" value={props.customer.fullName} type="text"
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
                                            value={props.customer.phoneNumber}
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
                                        <input name="spent" value={props.customer.spent} className="form-control" type="text" onChange={handleOnInputChanged} />
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Text input--> */}

                            <div className="form-group d-flex m-1">
                                <label className="col-md-4 control-label">Ranking</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <input name="ranking" value={props.customer.ranking} className="form-control" type="text" onChange={handleOnInputChanged} />
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
                                <button type="button" onClick={handleOnSendButton} className="btn btn-warning" >Update <span className="glyphicon glyphicon-send"></span></button>
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