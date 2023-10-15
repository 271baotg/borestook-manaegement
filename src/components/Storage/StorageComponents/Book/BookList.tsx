import React from 'react'
import BookModel from '../../../../models/BookModel';
import { BookItem } from './BookItem';
import styled from 'styled-components';
import st from '../../style/book-list-style.module.css'

const BaseMain = ({className, children}:{className?:string, children: any}) => (
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

export const BookList: React.FC<{ bookList: BookModel[], checkBookHandler: Function }> = (props) => {
  return (
      <main className={st.tableContainer}>
        <section className={st.table__header}>
          <h1>Books</h1>
        </section>
        <section className={st.table__body}>
          <table className={st.table}>
            <thead>
              <tr>
                <th>id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Copies</th>
                <th>Copies Available</th>
                <th>Description</th>
                <th>Choose</th>
              </tr>
            </thead>
            <tbody>
              {props.bookList.map(book => (
                <BookItem book={book} checkBookHandler={props.checkBookHandler}></BookItem>
              ))}

            </tbody>
          </table>
        </section>
      </main>
  );
}