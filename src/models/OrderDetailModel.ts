import BookModel from "./BookModel";
import OrderModel from "./OrderModel";

class OrderDetailModel{
    id: number;
    order: OrderModel;
    book: BookModel;
    quantity: number;

    constructor(id: number, order: OrderModel, book: BookModel, quantity: number ) {
        this.id = id;
        this.order = order;
        this.book = book;
        this.quantity = quantity;
    }
}

export default OrderDetailModel;