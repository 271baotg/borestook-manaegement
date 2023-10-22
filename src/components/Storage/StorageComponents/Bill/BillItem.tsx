import {useState} from 'react';
import BillItemModel from "../../../../models/BillItemModel";
import st from '../../style/bill-item-styled.module.css';

export const BillItem: React.FC<{ billItem: BillItemModel, setQuantity: Function, removeBillItem:Function}> = (props) => {
    
    const book = props.billItem.book;
    
    const handleIncreaseQuantity = () => {
        props.setQuantity(book?.id, props.billItem.quantity + 1);
        // setQuantity(props.billItem.quantity + 1);
    }

    const handleDecreaseQuantity = () => {
        props.setQuantity(book?.id, props.billItem.quantity - 1);
        // setQuantity(props.billItem.quantity - 1);
    }

    const handleRemove = () => {
        props.removeBillItem(book.id);
    }

    return (
        <tr className={st.tableRow}>
            <td className={st.tableData}>{props.billItem.book?.id}</td>
            <td className={st.tableData}>{props.billItem.book?.title}</td>
            <td>{`$ ${props.billItem.book?.copies}`}</td>
            <td className={`${st.tableData}`}>
                <div className={`${st.qtyContainer}`}>

                    {props.billItem.quantity}
                    <div className={st.qtyBtnContainer}>
                        <button onClick={()=> handleIncreaseQuantity()} className={`${st.qtyBtn} + ${st.qtyBtnLeft}`}>+</button>
                        <button onClick={() => handleDecreaseQuantity()} className={`${st.qtyBtn} + ${st.qtyBtnRight}`}>-</button>
                    </div>
                </div>

            </td>
            <td>{props.billItem.amount}</td>
            <td>
                <button onClick={handleRemove}>Remove</button>
            </td>
        </tr>
    );
}