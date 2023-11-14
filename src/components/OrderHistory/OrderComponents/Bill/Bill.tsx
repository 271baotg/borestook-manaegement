import React from 'react';
import st from '../../style/bill-style.module.css';
import { BillFooter } from './BillFooter';
import BillItemModel from '../../../../models/BillItemModel';
import { BillList } from './BillList';
import OrderDetailModel from '../../../../models/OrderDetailModel';



export const Bill: React.FC<{ orderDetailItems: OrderDetailModel[], 
    // setQuantity:Function, checkOut:Function, removeBillItem: Function
}> = (props) => {
    return (
        <div className={`${st.billContainer} card`}>
            <BillList orderDetailItem={props.orderDetailItems} 
            // setQuantity={props.setQuantity} removeBillItem={props.removeBillItem}
            ></BillList>
            <BillFooter 
            // checkOut={props.checkOut} 
            orderDetailItem={props.orderDetailItems}></BillFooter>
        </div>
    );
}