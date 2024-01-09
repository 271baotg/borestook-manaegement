import st from "../../style/book-table-style.module.css";
import { SearchBar } from "../SearchBar/SearcherBar";
import React from "react";
import OrderModel from "../../../../models/OrderModel";
import { OrderList } from "./OrderList";

export const OrderTable: React.FC<{
  orderList: OrderModel[];
  // addToBill: Function;
  searchKeyWord: string;
  setSearchKeyWord: Function;
  chooseOneOrder:Function;
  openModalDetail:Function;
}> = (props) => {
  return (
    <main className={`${st.tableContainer} card`}>
      <section className={st.table__header}>
        <h1 style={{color: '#00BFFF'}}>Orders</h1>
        <SearchBar
          searchKeyWord={props.searchKeyWord}
          setSeachKeyWord={props.setSearchKeyWord}
        ></SearchBar>
      </section>
      <section className={st.table__body}>
        <OrderList
          orderList={props.orderList}
          // addToBill={props.addToBill}
          chooseOneOrder={props.chooseOneOrder}
          openModalDetail={props.openModalDetail}
        ></OrderList>
      </section>
    </main>
  );
};
