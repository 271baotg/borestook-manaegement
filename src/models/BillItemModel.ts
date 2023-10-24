import BookModel from "./BookModel"

class BillItemModel {
    book: BookModel;
    quantity: number;
    amount?: number;
    constructor(book: BookModel, quantity: number, amount?: number){
        this.book = book;
        this.quantity = quantity;
        this.amount = amount;
    }

    logInfor = () => {
        console.log(`book: ${this.book.title}`);
        console.log(`qty: ${this.quantity}`);
        console.log(`amount: ${this.amount}`);
    }
}

export default BillItemModel;

