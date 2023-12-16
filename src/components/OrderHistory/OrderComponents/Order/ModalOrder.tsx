import OrderDetailModel from "../../../../models/OrderDetailModel";
import OrderModel from "../../../../models/OrderModel";
import st from "../../style/book-item.module.css";
// import { format } from 'date-fns';
// import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import { BillItem } from "../Bill/BillItem";

const ModalOrder: React.FC<{
  currentOrder: OrderModel | undefined;
  orderDetailItems: OrderDetailModel[];
}> = (props) => {
  if (!props.currentOrder) {
    return <p>No order selected.</p>; // Thông báo khi không có currentOrder
  }

  // Define the timezone for Vietnam (Asia/Ho_Chi_Minh)
  // const vietnamTimeZone = 'Asia/Ho_Chi_Minh';

  // // Assuming props.order.checkoutDate is a JavaScript Date object
  // const checkoutDate = props.currentOrder.checkoutDate;
  // const createCustomerDate = props.currentOrder.customer.createDate;
  // // Convert to Vietnam timezone
  // const checkoutDateInVietnamTime = utcToZonedTime(checkoutDate, vietnamTimeZone);
  // const createCustomerDateInVietnamTime = utcToZonedTime(createCustomerDate, vietnamTimeZone);

  // // Convert the zoned time to UTC time
  // const utcDate = zonedTimeToUtc(checkoutDateInVietnamTime, vietnamTimeZone);
  // const customerDate = zonedTimeToUtc(createCustomerDateInVietnamTime, vietnamTimeZone);

  // // Format the date
  // const formattedDate = format(utcDate, 'dd-MM-yyyy HH:mm:ss');
  // const formattedCustomerDate = format(customerDate, 'dd-MM-yyyy HH:mm:ss');
  
const truncateString = (str: string, maxLength: number) => {
  if (str === null) {
    return "";
  }
  return str.length > maxLength ? `${str.substring(0, maxLength)}` : str;
};

  return props.currentOrder ? (
    
    <div className="row">
      <div style={{fontSize : '22px'}}>Name: <span className={`${st.fontInfo}`}>{props.currentOrder.username}</span></div>
      <div className="mb-3" style={{fontSize : '22px'}}>Create Date: <span className={`${st.fontInfo}`}>{truncateString(props.currentOrder.createDate, 10)}</span></div>
      <div className="col-12 mb-5">
        <h2>Book</h2>
        <table className={`${st.table}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className={st.tbody}>
            {props.orderDetailItems?.map((orderDetailItem) => {
              return (
                <BillItem
                  key={orderDetailItem.book.id}
                  orderDetailItem={orderDetailItem}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <h2>Customer</h2>
        <table className={`${st.table}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Spend</th>
              <th>Phone</th>
              <th>Full Name</th>
              <th>Ranking</th>
              <th>Create Date</th>
            </tr>
          </thead>
          <tbody className={st.tbody}>
            {props.currentOrder.customer != null && (
              <tr className={st.tableRow}>
                <td className={st.tableData}>
                  {props.currentOrder.customer.id}
                </td>
                <td className={st.tableData}>
                  {props.currentOrder.customer?.spent}
                </td>
                <td className={st.tableData}>
                  {props.currentOrder.customer?.phoneNumber}
                </td>
                <td className={`${st.tableData} text-primary`}>
                  {props.currentOrder.customer?.fullName}
                </td>
                <td className={st.tableData}>
                  {props.currentOrder.customer?.ranking}
                </td>
                <td className={st.tableData}>"14/11/2023"</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p>...Loading</p>
  );
};
export default ModalOrder;
