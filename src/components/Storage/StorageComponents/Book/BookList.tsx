import React from 'react'
import BookModel from '../../../../models/BookModel';
import { BookItem } from './BookItem';
import styled from 'styled-components';
import st from '../../style/book-list-style.module.css'
import { SearchBar } from '../SearchBar/SearcherBar';



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