import { useEffect, useState } from "react";
import styled from "styled-components";
import st from "../../Storage/style/book-item.module.css";
import img from "../../images/customer.png";
import React from "react";
import UserModel from "../../../models/UserModel";


export const UserItem: React.FC<{
  user: UserModel;
  openModalDetail: Function;
}> = (props) => {
  console.log(props.user);
  const handleOpenModal = (e: any) => {
    e.stopPropagation(); //Chặn sự kiện tiếp tục trên parent của nó
    props.openModalDetail(props.user.username);
  };
  let listRole = '';
  props.user.roles.forEach((role) =>{
    listRole += `, ${role.name}`;
  })

  listRole = listRole.slice(1);
  return (
    <tr onClick={handleOpenModal} role="button" className={st.tableRow}>
      <td className={st.tableData}>{props.user.id}</td>
      <td className={`${st.tableData} text-primary`}>{props.user.username}</td>
      <td className={st.tableData}>{props.user.fullName}</td>
      <td className={st.tableData}>21521883@gm.uit.edu.vn</td>
      <td className={st.tableData}>{listRole}</td>
    </tr>
  );
};
