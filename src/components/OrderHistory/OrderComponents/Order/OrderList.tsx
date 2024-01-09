import React from 'react'
import styled from 'styled-components';
import st from '../../style/book-list-style.module.css'
import { SearchBar } from '../SearchBar/SearcherBar';
import OrderModel from '../../../../models/OrderModel';
import { OrderItem } from './OrderItem';

const BaseMain = ({ className, children }: { className?: string, children: any }) => (
  <main className={`table list ${className}`}>
    {children}
  </main>
)

const Main = styled(BaseMain)`
    grid-area: list;

    width: 70vw;
    height: 90vh;
    background-color: #fff5;
    backdrop-filter: blur(7px);
    box-shadow: 0 .4rem .8rem ;
    border-radius: .8rem;
    overflow: hidden;

    border-collapse: collapse;


`;

export const OrderList: React.FC<{ 
  orderList: OrderModel[], 
  // addToBill: Function, 
  chooseOneOrder:Function,
  openModalDetail:Function
}> = (props) => {

  return (
        <table className={st.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Checkout Date</th>
              <th>Employee Name</th>
              <th>Customer Name</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className={st.tbody} style={{cursor: 'pointer'}}>
            {
              props.orderList.map((order)=>
                 (<OrderItem order={order} isChecked={true} 
                  // addToBill={props.addToBill} 
                  key={order.id} 
                  chooseOneOrder={props.chooseOneOrder}
                  openModalDetail={props.openModalDetail}
                  />)
              )
            }
          </tbody>
        </table>

  );
}