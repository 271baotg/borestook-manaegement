import { useEffect, useState } from "react";
import styled from "styled-components";
import st from "../../Storage/style/book-item.module.css";
import img from "../../images/customer.png";
import React from "react";
import UserModel from "../../../models/UserModel";


export const UserInfoModel: React.FC<{
  user: UserModel;
}> = (props) => {
  
  return (
    <tr className={st.tableRow}>
      <td className={st.tableData}>{props.user.id}</td>
      <td className={`${st.tableData} text-primary`}>{props.user.username}</td>
      <td className={st.tableData}>{props.user.fullName}</td>
      <td className={st.tableData}>21521883@gm.uit.edu.vn</td>
      <td className={st.tableData}>Staff</td>
    </tr>
  );
};
