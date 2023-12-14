import { useState } from 'react';
import BillItemModel from "../../../../models/BillItemModel";
import st from '../../style/bill-item-styled.module.css';
import React from 'react';
import BookModel from '../../../../models/BookModel';

export const BillItem: React.FC<{ billItem: BillItemModel, setQuantity: Function, removeBillItem: Function, openMaxQtyReacedModal:Function }> = (props) => {

    const book:BookModel = props.billItem.book;

    const handleIncreaseQuantity = () => {
        // if(book.available !== undefined){
        //     if(props.billItem.quantity + 1 > book.available){
        //         props.openMaxQtyReacedModal();
        //         return;
        //     }
        // }else{
        //     return;
        // }
        props.setQuantity(book?.id, props.billItem.quantity + 1);
        // setQuantity(props.billItem.quantity + 1);
    }

    const handleDecreaseQuantity = () => {
        props.setQuantity(book?.id, props.billItem.quantity - 1);
        // setQuantity(props.billItem.quantity - 1);
    }

    document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
        if (!button.classList.contains('delete')) {
            button.classList.add('delete');
            setTimeout(() => button.classList.remove('delete'), 3200);
        }
        e.preventDefault();
    }));

    const handleRemove = () => {
        props.removeBillItem(book.id);

    }

    return (
        <tr className={st.tableRow}>
            <td className={st.tableData}>{props.billItem.book?.id}</td>
            <td className={st.tableData}>{props.billItem.book?.title}</td>
            <td>{`$ ${props.billItem.book?.price}`}</td>
            <td className={`${st.tableData}`}>
                <div className={`${st.qtyContainer}`}>

                    {props.billItem.quantity}
                    <div className={st.qtyBtnContainer}>
                        <button onClick={() => handleIncreaseQuantity()} className={`${st.qtyBtn} + ${st.qtyBtnLeft}`}>+</button>
                        <button onClick={() => handleDecreaseQuantity()} className={`${st.qtyBtn} + ${st.qtyBtnRight}`}>-</button>
                    </div>
                </div>

            </td>
            <td>{props.billItem.amount}</td>
            <td>
                <button className='btn btn-outline-danger' onClick={handleRemove}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}