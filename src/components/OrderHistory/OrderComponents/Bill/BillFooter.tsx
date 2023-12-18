import React, { useState } from 'react';
import { useEffect } from 'react';
import st from '../../style/bill-footer-style.module.css'
import BillItemModel from '../../../../models/BillItemModel';
import OrderDetailModel from '../../../../models/OrderDetailModel';
import { SubTitle } from 'chart.js';
export const BillFooter: React.FC<{ 
    // checkOut: Function, 
    orderDetailItem: OrderDetailModel[] }> = (props) => {
    let subtotal = 0;


    props.orderDetailItem.forEach(orderDetailItem => {
        subtotal = (subtotal + orderDetailItem.book.price * orderDetailItem.quantity) ?? 0;
    });

    const total = subtotal;

    const handleCheckOut = () => {
        // props.checkOut();
    }



    return (

        <div className={st.billFooter}>
            <p>{`Subtotal: ${subtotal}`}</p>
            <p className='text-success' style={{fontSize:20}}>{`Total: ${subtotal}`}</p>
            {/* <button className={`btn btn-success`} onClick={handleCheckOut}>Checkout</button> */}
        </div>
    )
}