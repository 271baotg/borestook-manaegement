import { useState } from "react";
import BillItemModel from "../../../../models/BillItemModel";
import st from "../../style/bill-item-styled.module.css";
import OrderDetailModel from "../../../../models/OrderDetailModel";

export const BillItem: React.FC<{
  orderDetailItem: OrderDetailModel;
  // setQuantity: Function, removeBillItem: Function
}> = (props) => {
  const book = props.orderDetailItem.book;

  const handleIncreaseQuantity = () => {
    // props.setQuantity(book?.id, props.billItem.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    // props.setQuantity(book?.id, props.billItem.quantity - 1);
  };

  document.querySelectorAll(".button").forEach((button) =>
    button.addEventListener("click", (e) => {
      if (!button.classList.contains("delete")) {
        button.classList.add("delete");
        setTimeout(() => button.classList.remove("delete"), 3200);
      }
      e.preventDefault();
    })
  );

  const handleRemove = () => {
    // props.removeBillItem(book.id);
  };

  return (
    <tr className={st.tableRow}>
      <td className={st.tableData}>{props.orderDetailItem.book?.id}</td>
      <td className={st.tableData}>{props.orderDetailItem.book?.title}</td>
      <td className={st.tableData}>{props.orderDetailItem.book.price}</td>
      <td className={st.tableData}>{props.orderDetailItem.quantity}</td>
      <td className={st.tableData}>
        {props.orderDetailItem.book.price * props.orderDetailItem.quantity}
      </td>
    </tr>
  );
};
