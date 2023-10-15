import BillItemModel from "./BillItemModel";

class BillModel{
    items: BillItemModel[];
        subtotal?: number;
        discount?: number;
        total?: number;
        time?: Date;
    constructor(
        items: BillItemModel[],
        subtotal?: number,
        discount?: number,
        total?: number,
        time?: Date){
            this.items = items;
            this.subtotal = subtotal;
            this.discount = discount;
            this.total = total;
            this.time= time;
        }
}

export default BillModel;