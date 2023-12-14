import BookModel from "./BookModel"
import { ImportModel } from "./ImportModel"

export class ImportDetailModel {
    id?: number;
    bookID: number;
    bookName?: string;
    unitPrice: number;
    quantity: number;
    importModel?: ImportDetailModel
    constructor(
        bookID: number,
        unitPrice: number,
        quantity: number,
        bookName?:number,
        id?: number, 
        importModel?: ImportModel) {
        this.id = id;
        bookName = bookName;
        this.bookID = bookID;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

}