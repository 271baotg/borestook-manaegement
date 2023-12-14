import React from 'react'
import styled from 'styled-components';
import st from "../../Storage/style/book-list-style.module.css";
import UserModel from '../../../models/UserModel';
import { UserItem } from './UserItem';



export const UserList: React.FC<{ 
  userList: UserModel[], 
  openModalDetail:Function,
}> = (props) => {
    
  return (
        <table className={st.table}>
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
            {
              props.userList.map((user)=>(
              <UserItem 
                user={user} 
                key={user.id} 
                  openModalDetail={props.openModalDetail}
                />
                )
              )
            }
          </tbody>
        </table>

  );
}