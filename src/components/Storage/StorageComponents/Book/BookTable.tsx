import React from "react";
import { BookList } from "./BookList";
import st from "../../style/book-table-style.module.css";
import { SearchBar } from "../SearchBar/SearcherBar";
import BookModel from "../../../../models/BookModel";


export const BookTable: React.FC<{
  bookList: BookModel[];
  addToBill: Function;
  searchKeyWord: string;
  setSearchKeyWord: Function;
  openModalDetail:Function
}> = props => {

  // console.log('BookTable.tsx', props.bookList);

  return (
    <main className={`${st.tableContainer} card`}>
      <section className={st.table__header}>
        <h1>Books</h1>
        <SearchBar
          searchKeyWord={props.searchKeyWord}
          setSeachKeyWord={props.setSearchKeyWord}
        ></SearchBar>
      </section>
      <section className={st.table__body}>
        <BookList
          bookList={props.bookList}
          addToBill={props.addToBill}
          openModalDetail={props.openModalDetail}
        ></BookList>
      </section>
    </main>
  );
};
