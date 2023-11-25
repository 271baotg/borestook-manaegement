import { CustomerModel } from "./CustomerModel";

class OrderModel {
  id: number;
  createDate: string;
  username: string;
  total: number;
  customer: CustomerModel;

  constructor(
    id: number,
    createDate: string,
    username: string,
    total: number,
    customer: CustomerModel
  ) {
    this.id = id;
    this.createDate = createDate;
    this.username = username;
    this.total = total;
    this.customer = customer;
  }
}

export default OrderModel;
