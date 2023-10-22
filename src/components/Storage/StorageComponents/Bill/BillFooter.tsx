import React from 'react';
import {useEffect} from 'react';
import st from '../../style/bill-footer-style.module.css'
import BillItemModel from '../../../../models/BillItemModel';
export const BillFooter:React.FC<{checkOut: Function, billItem: BillItemModel[]}> = (props) => {
    const handleCheckOut = () => {
        props.checkOut();
    }
    let total:number = 0;
    useEffect(()=>{
        props.billItem.forEach(billItem => {
            total += billItem.amount??0;
        });
    }, [props.billItem])

    return (

        <div className={st.sticky}>
            <p>{`Total: ${total}`}</p>
            <button onClick={handleCheckOut}>Check out</button>
        </div>
    )
}