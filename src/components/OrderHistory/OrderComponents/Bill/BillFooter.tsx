import React, { useState } from 'react';
import { useEffect } from 'react';
import st from '../../style/bill-footer-style.module.css'
import BillItemModel from '../../../../models/BillItemModel';
import OrderDetailModel from '../../../../models/OrderDetailModel';
export const BillFooter: React.FC<{ 
    // checkOut: Function, 
    orderDetailItem: OrderDetailModel[] }> = (props) => {
    let subtotal = 0;


    props.orderDetailItem.forEach(orderDetailItem => {
        // subtotal += orderDetailItem.amount ?? 0;
    });

    const total = subtotal;

    const handleCheckOut = () => {
        // props.checkOut();
    }



    return (

        <div className={st.billFooter}>
            <p>{`Subtotal: ${subtotal}`}</p>
            <p className='text-success' style={{fontSize:20}}>{`Total: ${total}`}</p>
            {/* <button className={`btn btn-success`} onClick={handleCheckOut}>Checkout</button> */}
        </div>
    )
}