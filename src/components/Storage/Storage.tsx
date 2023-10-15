import React, { useEffect, useState } from "react";
import { Wrapper } from "../Wrapper";
import { BookList } from "./StorageComponents/Book/BookList";
import BookModel from "../../models/BookModel";
import { Bill } from "./StorageComponents/Bill/Bill";
// import "./style.css";
import st from './style/storage-style.module.css';
import styled from "styled-components";

export const Storage = () => {
  const [booklist, setBookList] = useState<BookModel[]>([]);
  const [checkedBookList, setCheckedBookList] = useState<BookModel[]>([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const baseUrl: string = 'http://localhost:8080/api/books';
    const key = 'books';
    const url: string = `${baseUrl}?page=0`;

    const getBookList = async () => {
      const response = await fetch(url);

      const responseJson = await response.json();

      const responeData = responseJson._embedded[key];

      let tempBookList: BookModel[] = [];

      for (const book of responeData) {
        tempBookList.push({
          id: book.id,
          title: book.title,
          author: book.author,
          img: book.img,
          copies: book.copies,
          copiesAvailable: book.copiesAvailable,

        })
        console.log(book);
      }
      setBookList(tempBookList)
      setIsLoading(false);
    }
    getBookList().catch(error => {
      setIsLoading(true);
    });

  }, [])

  const handleCheckBook = (book: BookModel, isChecked: boolean) => {
    if (isChecked) {
      setCheckedBookList([...checkedBookList, book]);
    }
    else {
      let tempList = checkedBookList.filter(item =>
        book.id !== item.id
      );
      setCheckedBookList(tempList);
    }
  }

  if(isLoading){
    return (
      <div>
        <h1>Is Loading ...</h1>
      </div>
    );
  }

  // if(httpError) {
  //   return (
  //     <div className='container m-5'>
  //         <h1>{httpError}</h1>
  //     </div>
  //   );
  // }


  return (
    <>
    <div className={`${st.storageDesktop} d-none d-lg-flex`}>
      {/* Desktop */}
      <BookList bookList={booklist} checkBookHandler={handleCheckBook} />
      <Bill checkedBookList={checkedBookList}></Bill>
    </div>
    <div className={`${st.storageDesktop} d-block d-lg-none`}>
      {/* Desktop */}
      <BookList bookList={booklist} checkBookHandler={handleCheckBook} />
      <Bill checkedBookList={checkedBookList}></Bill>
    </div>
    </>
  );
};

