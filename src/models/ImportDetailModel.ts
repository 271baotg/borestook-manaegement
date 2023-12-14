import BookModel from "./BookModel"
import { ImportModel } from "./ImportModel"

export class ImportDetailModel {
    id?: number;
    bookID: number;
    bookName?: string;
    unitPrice: number;
    quantity: number;
    constructor(
        bookID: number,
        unitPrice: number,
        quantity: number,
        bookName?:string,
        id?: number) {
        this.id = id;
        bookName = bookName;
        this.bookID = bookID;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

}