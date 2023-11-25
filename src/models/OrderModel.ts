import { CustomerModel } from "./CustomerModel";
import OrderDetailModel from "./OrderDetailModel";

class OrderModel {
  id: number;
  createDate: string;
  username: string;
  total: number;
  customer: CustomerModel;
  orderDetails: OrderDetailModel[];
  giftcode: string;

  constructor(
    id: number,
    createDate: string,
    username: string,
    total: number,
    customer: CustomerModel,
    orderDetails: OrderDetailModel[],
    giftcode: string
  ) {
    this.id = id;
    this.createDate = createDate;
    this.username = username;
    this.total = total;
    this.customer = customer;
    this.orderDetails = orderDetails;
    this.giftcode = giftcode;
    
  }
}

export default OrderModel;
