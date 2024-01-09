import { Modal } from "react-bootstrap";
import styled from "styled-components";
import BillItemModel from "../../../../../models/BillItemModel";
import { CustomerModel } from "../../../../../models/CustomerModel";
import { CustomerInforAndCheckOut } from "./components/CustomerInforAndCheckOut";
import { OrdersDetail } from "./components/OrdersDetail";
import { CustomerSearching } from "./components/CustomerSearching";

const ModalContentContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 50vh 30vh;
    grid-template-areas: 
    "ORDERSDETAIL CHECKOUT"
    "CUSTOMERSEARCHING CHECKOUT"
    ;
    column-gap: 10px;
    row-gap: 10px;
`

export const CheckOutModal: React.FC<{
    isOpen: boolean,
    billItems: BillItemModel[],
    customer: CustomerModel,
    onClickCustomer:Function,
    onOpen: Function,
    onClose: Function,
    onClickCheckOut:Function
}> = (props) => {


    return (<>

        <Modal size="xl" show={props.isOpen} onHide={() => { props.onClose() }}>
            <Modal.Header>
                <Modal.Title as='h2' style={{color: 'var(--blue-color)'}}>Checkout information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalContentContainer>

                    <OrdersDetail billItems={props.billItems}/>

                    <CustomerInforAndCheckOut customer={props.customer} billItems={props.billItems} onClickCheckOut={props.onClickCheckOut}/>

                    <CustomerSearching onClickCustomer={props.onClickCustomer}/>

                </ModalContentContainer>
            </Modal.Body>
        </Modal>
    </>);
}