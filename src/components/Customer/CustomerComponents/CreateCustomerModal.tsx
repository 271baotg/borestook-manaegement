import { useEffect, useState } from "react";
import { CustomerModel } from "../../../models/CustomerModel";
import st from '../style/new_cus_modal_styled.module.css'
import { Modal, Button, Form } from "react-bootstrap";
import { ConfirmModal } from "../../../utils/components/ConfirmModal";
import { CustomerInforModal } from "./CustomerInforModal";
const INIT_RANK: string = 'C';
const INIT_SPENT: number = 0;

export const CreateCusModal: React.FC<{ createCustomer: Function, isShowInputInforModal: boolean, setIsShowInputInforModal: Function }> = (props) => {
    
    const [customer, setCustomer] = useState<CustomerModel>({ ranking: INIT_RANK, spent: INIT_SPENT });
    const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false);

    const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCustomer({ ...customer, [name]: value });
    };
    const handleOnClickConfirmButton = () => {
        if (!(customer.fullName && customer.phoneNumber && customer.ranking && (customer.spent != null))) {
            alert('Please fill all the information');
        } else {
            props.createCustomer(customer);
            setCustomer({
                fullName: '',
                phoneNumber: '',
                spent: INIT_SPENT,
                ranking: INIT_RANK,
            });
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

    const handleOnClickCreatButton = () => {
        props.setIsShowInputInforModal(false);
        setIsShowConfirmModal(true);
    }

    const handleOnClickCancelButton = () => {
        props.setIsShowInputInforModal(false);
    }

    return (
        <>
            <CustomerInforModal 
            customer={customer}
            setCustomer={setCustomer}
            isShow={props.isShowInputInforModal} 
            onOpen={() => props.setIsShowInputInforModal(true)}
            onClose={()=> props.setIsShowInputInforModal(false)}
            onSave={handleOnClickCreatButton}
            title="Create new customer"
            ></CustomerInforModal>

            <ConfirmModal
                content={<>
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
                </>}
                onClose={() => setIsShowConfirmModal(false)}
                onOpen={()=> setIsShowConfirmModal(true)}
                isOpen={isShowConfirmModal}
                onConfirm={handleOnClickConfirmButton}
            ></ConfirmModal>
        </>
    )
}