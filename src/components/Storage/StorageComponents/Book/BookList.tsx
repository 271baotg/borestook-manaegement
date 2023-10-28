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

export const BookList: React.FC<{ 
  bookList: BookModel[], 
  addToBill: Function, 
  openModalDetail:Function}> = (props) => {

  return (
        <table className={st.table}>
          <thead>
            <tr>
              <th>id</th>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Copies</th>
              <th>Copies Available</th>
              <th>Choose</th>
            </tr>
          </thead>
          <tbody className={st.tbody}>
            {
              props.bookList.map((book)=>
                 (<BookItem book={book} isChecked={true} addToBill={props.addToBill} key={book.id} openModalDetail={props.openModalDetail}/>)
              )
            }
          </tbody>
        </table>

  );
}