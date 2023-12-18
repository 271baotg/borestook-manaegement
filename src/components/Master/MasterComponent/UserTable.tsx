import React from "react";
import { DialogHTMLAttributes, useEffect, useState } from "react";
import { Console, error } from "console";
import { title } from "process";
import UserModel from "../../../models/UserModel";
import st from '../style/user_styled.module.css'
import { UserList } from "./UserList";


export const UserTable: React.FC<{
    userList: UserModel[];
    openModalDetail: Function;
}> = (props) =>{
    return (
        <main className={`${st.tableContainer} card`}>
      <section className={st.table__header}>
        <h1 style={{margin : '0 0 0 30px'}}>Users</h1>
      </section>
      <section className={st.table__body}>
        <UserList
          userList={props.userList}
          openModalDetail={props.openModalDetail}
        />
      </section>
    </main>
    );
}
