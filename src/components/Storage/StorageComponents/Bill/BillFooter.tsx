import React, { useState } from 'react';
import {useEffect} from 'react';
import st from '../../style/bill-footer-style.module.css'
import BillItemModel from '../../../../models/BillItemModel';
export const BillFooter:React.FC<{checkOut: Function, billItem: BillItemModel[]}> = (props) => {
    let total = 0;

    props.billItem.forEach(billItem => {
        total += billItem.amount??0;
    });
    
    const handleCheckOut = () => {
        props.checkOut();
    }
    


    return (

        <div className={st.sticky}>
            <p>{`Total: ${total}`}</p>
            <button className={`${st.button} btn btn-success`} onClick={handleCheckOut}>Check out</button>
        </div>
    )
}