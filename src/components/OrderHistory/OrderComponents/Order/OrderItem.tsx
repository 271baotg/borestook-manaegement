import { useEffect, useState } from "react";
import styled from "styled-components";
import st from "../../style/book-item.module.css";
import img from "../../images/book.png";
import React from "react";
import OrderModel from "../../../../models/OrderModel";
import { CheckOutResultModal } from "../../../Storage/StorageComponents/Modals/CheckOutResultModal/CheckOutResultModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
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

  //IsPrint states

  const [isOpenPrintModal, setIsOpenPrintModal] = useState(false);


  const truncateString = (str: string, maxLength: number) => {
    if (str === null) {
      return "";
    }
    return str.length > maxLength ? `${str.substring(0, maxLength)}` : str;
  };
  return (
    <>
      <tr onClick={handleOnClickItem} className={st.tableRow}>
      <td className={st.tableData}>{props.order.id}</td>
      <td className={st.tableData}>
        {truncateString(props.order.createDate, 10)}
      </td>
      <td className={st.tableData}>{props.order.username}</td>
      <td className={`${st.tableData} text-primary`}>
        {props.order.customer?.fullName ?? ""}
      </td>
      <td className={st.tableData}>{props.order.total}</td>
      <td className={st.tableData}>
        <button onClick={handleOpenModal} className={`btn btn-outline-primary m-1`}>
        <FontAwesomeIcon icon={icon({name: 'eye'})} />
        </button>
        <button onClick={() => setIsOpenPrintModal(true)} className={`btn btn-outline-primary m-1`}>
        <FontAwesomeIcon icon={icon({name: 'print'})} />
        </button>
      </td>
      </tr>
      {isOpenPrintModal && props.order && <CheckOutResultModal order = {props.order} isSuccess={true} isOpen={isOpenPrintModal} onClose={() => { setIsOpenPrintModal(false) }} />}
    </>
  );
};
