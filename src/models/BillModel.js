"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BillModel {
    constructor(items, subtotal, discount, total, time) {
        this.items = items;
        this.subtotal = subtotal;
        this.discount = discount;
        this.total = total;
        this.time = time;
    }
}
exports.default = BillModel;
