import OrderModel from "../../../models/OrderModel";
import UserModel from "../../../models/UserModel";
import { OrderItem } from "../../OrderHistory/OrderComponents/Order/OrderItem";
import st from "../style/user_styled.module.css";
import { UserInfoModel } from "./UserInfoModel";
import { UserItem } from "./UserItem";


const ModelUser: React.FC<{
  currentUser: UserModel | undefined;
  orderList: OrderModel[] | undefined
}> = (props) => {
  if (!props.currentUser) {
    return <p>No order selected.</p>; // Thông báo khi không có currentOrder
  }
  const truncateString = (str: string, maxLength: number) => {
    if (str === null) {
      return "";
    }
    return str.length > maxLength ? `${str.substring(0, maxLength)}` : str;
  };

  return props.currentUser ? (
    <div className="row">
      <div className="col-12 mb-5">
        <h2>UserDetail</h2>
        <table className={`${st.table}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className={st.tbody}>
              <UserInfoModel user = {props.currentUser}></UserInfoModel>
          </tbody>
        </table>
      </div>
      <div className="col-12">
        <h2>Orders</h2>
        <table className={`${st.table}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>UserName</th>
              <th>Total</th>
              <th>Create Date</th>
              <th>Gift Code</th>
            </tr>
          </thead>
          <tbody className={st.tbody}>
          {props.orderList?.map((order) => {
              return (
                <tr className={st.tableRow}>
                  <td className={st.tableData}>
                    {order.id}
                  </td>
                  <td className={st.tableData}>
                    {order.customer?.fullName}
                  </td>
                  <td className={st.tableData}>
                    {order.username}
                  </td>
                  <td className={`${st.tableData} text-primary`}>
                    {order.total}
                  </td>
                  <td className={st.tableData}>
                  {truncateString(order.createDate, 10)}
                  </td>
                  <td className={st.tableData}>
                    {order.giftcode}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table> 
      </div>
    </div>
  ) : (
    <p>...Loading</p>
  );
};
export default ModelUser;
