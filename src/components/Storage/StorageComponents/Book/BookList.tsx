import React from 'react'
import BookModel from '../../../../models/BookModel';
import { BookItem } from './BookItem';
import styled from 'styled-components';
import st from '../../style/book-list-style.module.css'
import { SearchBar } from '../SearchBar/SearcherBar';

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

export const BookList: React.FC<{ bookList: BookModel[], checkBookList: BookModel[], checkBookHandler: Function}> = (props) => {

  return (

    <main className={st.tableContainer}>
      <section className={st.table__header}>
        <h1>Books</h1>
        <SearchBar></SearchBar>
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
            {
              props.bookList.map((book)=>{
                let isFound = false;
                props.checkBookList.forEach(bookList => {
                  if(bookList.id === book.id){
                    isFound = true;
                  }
                });

                if(isFound){
                  return (<BookItem book={book} isChecked={true} checkBookHandler={props.checkBookHandler} key={book.id} />);

                } else{
                  return (
                    <BookItem book={book} isChecked={false} checkBookHandler={props.checkBookHandler} key={book.id}/>
                  )
                }
              })
            }
          </tbody>
        </table>
      </section>
    </main>

  );
}