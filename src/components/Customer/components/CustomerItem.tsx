import { useEffect, useState } from "react";
import styled from "styled-components";
import st from "../style/customer-item-styled.module.css"
import img from "../../images/customer.png";
import React from "react";
import { CustomerModel } from "../../../models/CustomerModel";


export const CustomerItem: React.FC<{
  customer: CustomerModel;
  openModalDetail: Function;
  setCurrentCustomer:Function
}> = (props) => {
  
  const handleOnClickItem = () => {
    props.setCurrentCustomer(props.customer);
    props.openModalDetail();
  }

  return (
    <tr onClick={handleOnClickItem} role="button" className={st.tableRow}>
      <td className={st.tableData}>{props.customer.id}</td>
      <td className={`${st.tableData} fw-bold`}>{props.customer.fullName}</td>
      <td className={`${st.tableData} text-primary`}>{props.customer.phoneNumber}</td>
      <td className={st.tableData}>{props.customer.ranking}</td>
      <td className={`${st.tableData}`}><b>$</b> {props.customer.spent}</td>
    </tr>
  );
};
