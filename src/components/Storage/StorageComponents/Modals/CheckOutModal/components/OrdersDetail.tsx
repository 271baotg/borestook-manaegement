import { Card, CardImg, CardTitle, Table } from "react-bootstrap";
import BillItemModel from "../../../../../../models/BillItemModel";
import orderIcon from '../../../../../../images/order.png';
import st from '../../../../style/orders-detail-styled.module.css';

export const OrdersDetail: React.FC<{billItems:BillItemModel[]}> = (props) => {
    return (
        <Card border="1em" style={{ overflow: "hidden" }}>
            <Card.Header className="d-flex align-items-center">
                <CardImg variant="left" src={orderIcon} width={30} height='auto'></CardImg>
                <CardTitle as='h5' className="m-0 ms-3 mt-1">Orders detail</CardTitle>
            </Card.Header>
            <Card.Body className="p-2">
                <section className={st.table__body}>
                    <Table striped bordered hover >
                        <thead>
                            <tr style={{height:'30px'}}>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody >
                            {props.billItems.map((item) => {
                                return (
                                    <tr style={{ maxHeight: '40px', padding: 0 }}>
                                        <td>{item.book.title}</td>
                                        <td>${item.book.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.quantity * item.book.price}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </section>
            </Card.Body>
            <Card.Footer></Card.Footer>
        </Card>
    )
}