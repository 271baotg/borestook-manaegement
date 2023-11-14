import { useEffect, useState } from "react";
import styled from "styled-components";
import st from "../../style/book-item.module.css";
import img from "../../images/book.png";
import React from "react";
import OrderModel from "../../../../models/OrderModel";
// import { format } from 'date-fns';
// import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export const OrderItem: React.FC<{
  order: OrderModel;
  isChecked: boolean;
  // addToBill: Function;
  chooseOneOrder: Function;
  openModalDetail: Function;
}> = (props) => {
  // const [isChecked, setIsChecked] = useState(false);
  // useEffect(()=> {
  //     props.checkBookHandler(props.book, isChecked);
  // }, [isChecked])

  // const [isChecked, setIsChecked] = useState(props.isChecked);
  // useEffect(() => {
  //     props.checkBookHandler(props.book, isChecked);
  // }, [isChecked])
  const handleAddToBill = (e: any) => {
    e.stopPropagation(); //Chặn sự kiện tiếp tục trên parent của nó
    // props.addToBill(props.order);
  };

  const handleOnClickItem = () => {
    props.chooseOneOrder(props.order.id);
  };

  const handleOpenModal = (e: any) => {
    e.stopPropagation(); //Chặn sự kiện tiếp tục trên parent của nó
    props.openModalDetail(props.order.id);
  };

  // // Define the timezone for Vietnam (Asia/Ho_Chi_Minh)
  // const vietnamTimeZone = "Asia/Ho_Chi_Minh";

  // // Assuming props.order.checkoutDate is a JavaScript Date object
  // const checkoutDate = props.order.checkoutDate;

  // // Convert to Vietnam timezone
  // const checkoutDateInVietnamTime = utcToZonedTime(
  //   checkoutDate,
  //   vietnamTimeZone
  // );

  // // Convert the zoned time to UTC time
  // const utcDate = zonedTimeToUtc(checkoutDateInVietnamTime, vietnamTimeZone);

  // // Format the date
  // const formattedDate = format(utcDate, "dd-MM-yyyy HH:mm:ss");

  return (
    <tr onClick={handleOnClickItem} className={st.tableRow}>
      <td className={st.tableData}>{props.order.id}</td>
      <td className={st.tableData}>14/11/2023</td>
      <td className={st.tableData}>{props.order.username}</td>
      <td className={`${st.tableData} text-primary`}>
        {props.order.customer.fullName}
      </td>
      <td className={st.tableData}>{props.order.total}</td>
      <td className={st.tableData}>
        <button onClick={handleOpenModal} className={`btn btn-success`}>
          View
        </button>
      </td>
    </tr>
  );
};
