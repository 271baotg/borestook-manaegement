import React, { useEffect, useState } from "react";
import { Wrapper } from "../Wrapper";
import { BookList } from "./StorageComponents/Book/BookList";
import BookModel from "../../models/BookModel";
import { Bill } from "./StorageComponents/Bill/Bill";
// import "./style.css";
import st from './style/storage-style.module.css';
import styled from "styled-components";
import BillItemModel from "../../models/BillItemModel";
import { SearchBar } from "./StorageComponents/SearchBar/SearcherBar";

export const Storage = () => {
  const [booklist, setBookList] = useState<BookModel[]>([]);
  const [checkedBookList, setCheckedBookList] = useState<BookModel[]>([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [billItems, setBillItems] = useState<BillItemModel[]>([]);

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

      }
      setBookList(tempBookList)
      setIsLoading(false);
    }
    getBookList().catch(error => {
      setIsLoading(true);
    });

  }, [])
  
  useEffect(() => {
    if (checkedBookList.length > billItems.length) {
      //thêm vào sách mới
      if (checkedBookList.length === 0) {
        return;
      }
      const newBook: BookModel = checkedBookList[checkedBookList.length - 1];
      const defaultQuantity: number = 1;
      const amount: number = newBook.copies ?? 0;//vì trong model chưa có price nên set tạm copies
      setBillItems([...billItems, new BillItemModel(newBook, defaultQuantity, amount)]);
    }
    else if (checkedBookList.length < billItems.length) {
      //xóa sách cũ đi
      if (checkedBookList.length === 0) {
        setBillItems([]);
        return;
      }
      let differenceIndex: number = -1;
      for (let i: number = 0; i < checkedBookList.length; i++) {
        if (checkedBookList[i].id !== billItems[i].book.id) {
          differenceIndex = i;
          break;
        }
      }
      if (differenceIndex === -1) {
        setBillItems([...billItems.slice(0, billItems.length - 1)])
      } else {
        setBillItems([...billItems.slice(0, differenceIndex), ...billItems.slice(differenceIndex + 1, billItems.length)])
      }
    } else {

    }


  }, [checkedBookList]);

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


  const setQuantity = (id: number, quantity: number) => {
    for (let i: number = 0; i < billItems.length; i++) {
      if (billItems[i].book.id === id) {
        billItems[i].quantity = quantity;
        billItems[i].amount = quantity * (billItems[i].book.copies ?? 1);
        break;
      }
    }
  }

  const checkOut = () => {
    billItems.forEach(element => {
      element.logInfor();
      setCheckedBookList([]);
      
    });
  }


  if (isLoading) {
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
        <BookList bookList={booklist} checkBookList={checkedBookList} checkBookHandler={handleCheckBook}/>
        <Bill billItems={billItems} setQuantity={setQuantity} checkOut={checkOut} ></Bill>
      </div>
      <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {/* Desktop */}
        <BookList bookList={booklist} checkBookList={checkedBookList} checkBookHandler={handleCheckBook}/>
        <Bill billItems={billItems} setQuantity={setQuantity} checkOut={checkOut}></Bill>
      </div>
    </>
  );
};

