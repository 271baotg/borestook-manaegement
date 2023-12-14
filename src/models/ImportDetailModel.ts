import BookModel from "./BookModel"
import { ImportModel } from "./ImportModel"

export class ImportDetailModel {
    id?: number;
    book: BookModel;
    unitPrice: number;
    quantity: number;
    importModel?: ImportDetailModel
    constructor(book: BookModel,
        unitPrice: number,
        quantity: number, id?: number, importModel?: ImportModel) {
        this.id = id;
        this.book = book;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

}