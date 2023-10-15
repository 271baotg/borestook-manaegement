import BookModel from "./BookModel"

class BillItemModel {
    book: BookModel;
    quantity: number;
    amount: number;
    constructor(book: BookModel, quantity: number, amount: number){
        this.book = book;
        this.quantity = quantity;
        this.amount = amount;
    }
}

export default BillItemModel;

