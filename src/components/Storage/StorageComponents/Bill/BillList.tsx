import React from "react";
import BillItemModel from "../../../../models/BillItemModel";
import st from '../../style/bill-list-style.module.css'
import { BillItem } from "./BillItem";

export const BillList: React.FC<{
    billItem?: BillItemModel[],
    setQuantity: Function,
    removeBillItem: Function
    openMaxQtyReacedModal: Function
}> = (props) => {
    return (
        <main className={`${st.tableContainer} card`}>
            <section className={st.table__header}>
                <h1>Bill</h1>
            </section>
            <section className={`${st.table__body} card`}>
                <table className={st.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.billItem?.map((billItem) => {
                            return (<BillItem 
                                    key={billItem.book.id} 
                                    billItem={billItem}
                                    setQuantity={props.setQuantity} 
                                    removeBillItem={props.removeBillItem}
                                    openMaxQtyReacedModal={props.openMaxQtyReacedModal}
                            />)
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}