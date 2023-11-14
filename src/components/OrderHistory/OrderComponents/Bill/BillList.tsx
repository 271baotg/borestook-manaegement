import BillItemModel from "../../../../models/BillItemModel";
import OrderDetailModel from "../../../../models/OrderDetailModel";
import st from '../../style/bill-list-style.module.css'
import { BillItem } from "./BillItem";

export const BillList: React.FC<{ orderDetailItem?: OrderDetailModel[]
    // , setQuantity: Function, removeBillItem:Function
}
    > = (props) => {
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
                        </tr>
                    </thead>
                    <tbody>
                        {props.orderDetailItem?.map((orderDetailItem) => {
                            return(<BillItem key={orderDetailItem.book.id} orderDetailItem={orderDetailItem} 
                                // setQuantity={props.setQuantity} removeBillItem={props.removeBillItem}
                                />)
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}