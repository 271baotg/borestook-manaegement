import { BookList } from "./BookList"
import st from "../../style/book-table-style.module.css"
import { SearchBar } from "../SearchBar/SearcherBar"
import BookModel from "../../../../models/BookModel"
import { resolvePath } from "react-router-dom"
import { FillterBar } from "../Filter/FillterBar"

export const BookTable: React.FC<{ bookList: BookModel[], addToBill: Function }> = (props) => {
  return (
    <main className={st.tableContainer}>
      <section className={st.table__header}>
        <h1>Books</h1>
        <SearchBar ></SearchBar>
      </section>
      <section className={st.table__body}>
        <BookList bookList={props.bookList} addToBill={props.addToBill}></BookList>
      </section>
    </main>
  )
}