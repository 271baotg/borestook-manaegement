import { useEffect, useState } from "react";
import styled from "styled-components";
import st from "../../Storage/style/book-item.module.css";
import img from "../../images/customer.png";
import React from "react";
import { CustomerModel } from "../../../models/CustomerModel";


export const CustomerItem: React.FC<{
  customer: CustomerModel;
  openModalDetail: Function;
  setCurrentCustomer:Function
}> = (props) => {
  
  const handleOnClickItem = () => {
    props.openModalDetail(props.customer.id);
    props.setCurrentCustomer(props.customer);
  }

  return (
    <tr onClick={handleOnClickItem} className={st.tableRow}>
      <td className={st.tableData}>{props.customer.id}</td>
      <td className={st.tableData}>{props.customer.fullName}</td>
      <td className={`${st.tableData} text-primary`}>{props.customer.phoneNumber}</td>
      <td className={st.tableData}>{props.customer.ranking}</td>
      <td className={st.tableData}>{props.customer.spent}</td>
    </tr>
  );
};
