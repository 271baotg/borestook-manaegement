import { Button, Card, CardBody, CardHeader, CardImg, CardTitle, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import st from '../../../style/checkout-modal-styled.module.css';
import orderIcon from '../../../../../images/order.png'
import customerIcon from '../../../../../images/customer.png'
import BillItemModel from "../../../../../models/BillItemModel";
import { CustomerModel } from "../../../../../models/CustomerModel";
import { CustomerInforAndCheckOut } from "./components/CustomerInforAndCheckOut";
import { SearchBar } from "../../SearchBar/SearcherBar";
import { OrdersDetail } from "./components/OrdersDetail";
import { CustomerSearching } from "./components/CustomerSearching";
import { useState } from "react";

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
                <Modal.Title as='h2'>Checkout information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModalContentContainer>

                    <OrdersDetail billItems={props.billItems}></OrdersDetail>

                    <CustomerInforAndCheckOut customer={props.customer} billItems={props.billItems} onClickCheckOut={props.onClickCheckOut}></CustomerInforAndCheckOut>

                    <CustomerSearching onClickCustomer={props.onClickCustomer}
                    ></CustomerSearching>

                </ModalContentContainer>
            </Modal.Body>
        </Modal>
    </>);
}