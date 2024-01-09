import React from "react";
import st from "../../Storage/style/book-table-style.module.css";
import { CustomerModel } from "../../../models/CustomerModel";
import { CustomerList } from "./CustomerList";
import { SearchBar } from "./SearcherBar";

export const CustomerTable: React.FC<{
  customerList: CustomerModel[];
  searchKeyWord: string;
  setSearchKeyWord: Function;
  openModalDetail: Function;
  setCurrentCustomer: Function
}> = props => {

  return (
    <main className={`${st.tableContainer} card`}>
      <section className={st.table__header}>
        <h1 className="ms-3" style={{color: '#00BFFF'}}>Customers</h1>
        <SearchBar
          searchKeyWord={props.searchKeyWord}
          setSeachKeyWord={props.setSearchKeyWord}
        ></SearchBar>
      </section>
      <section className={st.table__body}>
        <CustomerList
          customerList={props.customerList}
          openModalDetail={props.openModalDetail}
          setCurrentCustomer={props.setCurrentCustomer}
        />
      </section>
    </main>
  );
};
