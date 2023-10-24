import { useEffect, useState } from "react";
import { BookList } from "./StorageComponents/Book/BookList";
import BookModel from "../../models/BookModel";
import { Bill } from "./StorageComponents/Bill/Bill";
// import "./style.css";

import st from "./style/storage-style.module.css";
import BillItemModel from "../../models/BillItemModel";
import { BookTable } from "./StorageComponents/Book/BookTable";
import React from "react";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../api/useAxiosHook";

export const Storage = () => {
  const axios = useAxiosPrivate();
  const [booklist, setBookList] = useState<BookModel[]>([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [billItems, setBillItems] = useState<BillItemModel[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  useEffect(() => {
    let baseUrl: string = "http://localhost:8081/books";
    let url: string = "";

    if (searchKeyWord !== "") {
      url = `${baseUrl}/${searchKeyWord}`;
      console.log(url);
    } else {
      url = `${baseUrl}`;
    }

    const getBookById = async () => {
      const response = await fetch(url);

      const responseJson = await response.json();

      const tempBookList: BookModel[] = [];
      tempBookList.push({
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        img: responseJson.img,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
      });
      setBookList(tempBookList);
      setIsLoading(false);
    };

    // GetBookListAxios
    const getBookListAxios = async () => {
      try {
        const response: BookModel[] = await axios({
          method: "get",
          url: "http://localhost:8081/books",
        });
        console.log(response);
        const list = response as BookModel[];
        console.log("List book: " + list);
        setBookList(list);
      } catch (error) {
        console.log(error);
      }
    };

    getBookListAxios();

    // GetBookListFetch
    // const getBookList = async () => {
    //   const response = await fetch(url);

    //   const responseJson = await response.json();

    //   let tempBookList: BookModel[] = [];

    //   for (const book of responseJson) {
    //     tempBookList.push({
    //       id: book.id,
    //       title: book.title,
    //       author: book.author,
    //       img: book.img,
    //       copies: book.copies,
    //       copiesAvailable: book.copiesAvailable,
    //     });
    //   }
    //   setBookList(tempBookList);
    //   setIsLoading(false);
    // };

    // getBookList();
    if (searchKeyWord !== "") {
      getBookById().catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
    } else {
      getBookListAxios().catch((error) => {
        setIsLoading(true);
      });
    }
  }, [searchKeyWord]);

  const handleAddToBill = (book: BookModel) => {
    if (book === undefined) {
      return;
    } else {
      const index = billItems.findIndex(
        (billItem) => billItem.book.id === book.id
      );
      const alreadyInBill = index !== -1;
      if (alreadyInBill) {
        setQuantity(book.id, billItems[index].quantity + 1);
      } else {
        const newBillItem: BillItemModel = new BillItemModel(
          book,
          1,
          book.copies
        );
        setBillItems([...billItems, newBillItem]);
      }
    }
  };

  const removeBillItem = (id: number) => {
    const removed = billItems.filter((billItem) => billItem.book.id !== id);
    setBillItems(removed);
  };

  const setQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeBillItem(id);
      return;
    }
    const temp: BillItemModel[] = [...billItems];
    for (let i: number = 0; i < temp.length; i++) {
      if (temp[i].book.id === id) {
        temp[i].quantity = quantity;
        temp[i].amount = quantity * (temp[i].book.copies ?? 1);
        break;
      }
    }
    setBillItems(temp);
  };

  const checkOut = () => {
    billItems.forEach((element) => {
      element.logInfor();
    });
    setBillItems([]);
  };

  // if (isLoading) {
  //   return (
  //     <div>
  //       <h1>Is Loading ...</h1>
  //     </div>
  //   );
  // }

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

        <BookTable
          bookList={booklist}
          addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
        <Bill
          billItems={billItems}
          setQuantity={setQuantity}
          removeBillItem={removeBillItem}
          checkOut={checkOut}
        ></Bill>
      </div>
      <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {/* Desktop */}
        <BookTable
          bookList={booklist}
          addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
        <Bill
          billItems={billItems}
          setQuantity={setQuantity}
          removeBillItem={removeBillItem}
          checkOut={checkOut}
        ></Bill>
      </div>
    </>
  );
};
