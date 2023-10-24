import BillItemModel from "../../../../models/BillItemModel";
import st from '../../style/bill-list-style.module.css'
import { BillItem } from "./BillItem";

export const BillList: React.FC<{ billItem?: BillItemModel[], setQuantity: Function, removeBillItem:Function}> = (props) => {
    return (
        <main className={st.tableContainer}>
            <section className={st.table__header}>
                <h1>Bill</h1>
            </section>
            <section className={st.table__body}>
                <table className={st.table}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>title</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.billItem?.map((billItem) => {
                            return(<BillItem key={billItem.book.id} billItem={billItem} 
                                setQuantity={props.setQuantity} removeBillItem={props.removeBillItem}/>)
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}