import React from 'react'
import styled from 'styled-components';
import st from "../../Storage/style/book-list-style.module.css";
import { CustomerItem } from './CustomerItem';
import { CustomerModel } from '../../../models/CustomerModel';



export const CustomerList: React.FC<{ 
  customerList: CustomerModel[], 
  openModalDetail:Function,
  setCurrentCustomer:Function}> = (props) => {

  return (
        <table className={st.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone number</th>
              <th>Ranking</th>
              <th>Spent</th>
            </tr>
          </thead>
          <tbody className={st.tbody}>
            {
              props.customerList.map((customer)=>(
              <CustomerItem customer={customer} 
                  key={customer.id} 
                  openModalDetail={props.openModalDetail}
                  setCurrentCustomer={props.setCurrentCustomer}/>)
              )
            }
          </tbody>
        </table>

  );
}