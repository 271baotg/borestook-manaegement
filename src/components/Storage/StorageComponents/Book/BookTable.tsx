import React from "react";
import { BookList } from "./BookList";
import st from "../../style/book-table-style.module.css";
import { SearchBar } from "../SearchBar/SearcherBar";
import BookModel from "../../../../models/BookModel";
import { FillterBar } from "../Filter/FillterBar";
import { useNavigate } from "react-router-dom";


export const BookTable: React.FC<{
  bookList: BookModel[];
  addToBill: Function;
  searchKeyWord: string;
  setSearchKeyWord: Function;
  openModalDetail: Function;
  categoryList: Category[];
  currentCategory: number
  setCurrentCategory: Function
}> = props => {
  const navigate = useNavigate();
  // console.log('BookTable.tsx', props.bookList);

  return (
    <main className={`${st.tableContainer} card`}>
      <section className={st.table__header}>
        <h1 className="ms-3">Books</h1>
        <div className={`${st.searchAndFilter}`}>
          <SearchBar
            searchKeyWord={props.searchKeyWord}
            setSeachKeyWord={props.setSearchKeyWord}
          />
          <FillterBar 
            categoryList={props.categoryList} 
            currentCategory={props.currentCategory} 
            setCurrentCategory={props.setCurrentCategory}/>
        </div>

      </section>
      <section className={st.table__body}>
        <BookList
          bookList={props.bookList}
          addToBill={props.addToBill}
          openModalDetail={props.openModalDetail}
        />
      </section>
    </main>
  );
};
