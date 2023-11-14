import CustomerModel from "./CustomerModel";

class OrderModel{
    id: number;
    checkoutDate: Date;
    username: string;
    total: number;
    customer: CustomerModel

    constructor(id: number, checkoutDate: Date, username: string, total: number, customer: CustomerModel ) {
        this.id = id;
        this.checkoutDate = checkoutDate;
        this.username = username;
        this.total = total;
        this.customer = customer;
    }
}

export default OrderModel;