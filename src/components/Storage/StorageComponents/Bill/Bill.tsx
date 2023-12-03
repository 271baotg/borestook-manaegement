import React from 'react';
import st from '../../style/bill-style.module.css';
import { BillFooter } from './BillFooter';
import BillItemModel from '../../../../models/BillItemModel';
import { BillList } from './BillList';


export const Bill: React.FC<{ 
    billItems: BillItemModel[], 
    setQuantity:Function, 
    removeBillItem: Function, 
    onClickGoToCheckOut:Function
    openMaxQtyReachedModal: Function
    }> = (props) => {
    return (
        <div className={`${st.billContainer} card`}>
            <BillList 
                billItem={props.billItems} 
                setQuantity={props.setQuantity} 
                removeBillItem={props.removeBillItem}
                openMaxQtyReacedModal={props.openMaxQtyReachedModal}></BillList>
            <BillFooter billItem={props.billItems} onClickGoToCheckOut={props.onClickGoToCheckOut}></BillFooter>
        </div>
    );
}