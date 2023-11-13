import { useEffect, useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel"
import styled from "styled-components";
import { CustomerInforModal } from "./CustomerInforModal";
import { ConfirmModal } from "../../../utils/components/ConfirmModal";


export const UpdateCustomerModal: React.FC<{
    customer: CustomerModel,
    setCurrentCustomer: Function,
    updateCustomer: Function,
    isShowUpdateCustomerModal: boolean,
    setIsShowUpdateCustomerModal: Function
}> = (props) => {
    const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

    const handleOnClickConfirmButton = () => {
        props.updateCustomer();
        setIsShowConfirmModal(false);
    }

    const handleOnClickSaveButton = () => {
        props.setIsShowUpdateCustomerModal(false);
        setIsShowConfirmModal(true);
    }


    return (
        <>
            <CustomerInforModal customer={props.customer}
                setCustomer={props.setCurrentCustomer}
                onOpen={() => props.setIsShowUpdateCustomerModal(true)}
                onClose={() => props.setIsShowUpdateCustomerModal(false)}
                onSave={handleOnClickSaveButton}
                isShow={props.isShowUpdateCustomerModal}
            ></CustomerInforModal>

            <ConfirmModal
                content={<>
                    <div className="preview-customer">
                        <div>
                            Fullname: {props.customer.fullName ?? "empty"}
                        </div>
                        <div>
                            Phone number: {props.customer.phoneNumber ?? "empty"}
                        </div>
                        <div>
                            Ranking: {props.customer.ranking}
                        </div>
                        <div>
                            Spent: {props.customer.spent ?? 0}
                        </div>
                    </div>
                </>}
                onClose={() => setIsShowConfirmModal(false)}
                onOpen={() => setIsShowConfirmModal(true)}
                isOpen={isShowConfirmModal}
                onConfirm={handleOnClickConfirmButton}
            ></ConfirmModal>
        </>
    )
}

