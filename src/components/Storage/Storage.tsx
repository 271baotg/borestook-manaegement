import { useEffect, useState } from "react";
import { BookList } from "./StorageComponents/Book/BookList";
import BookModel from "../../models/BookModel";
import { Bill } from "./StorageComponents/Bill/Bill";
// import "./style.css";
import st from './style/storage-style.module.css';
import BillItemModel from "../../models/BillItemModel";

export const Storage = () => {
  const [booklist, setBookList] = useState<BookModel[]>([]);
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


  const handleAddToBill = (book: BookModel) => {
    if (book === undefined) {
      return;
    } else {
      const index = billItems.findIndex((billItem) => billItem.book.id === book.id)
      const alreadyInBill = index !== -1;
      if (alreadyInBill) {
        setQuantity(book.id, billItems[index].quantity + 1);
        
      }else{
        const newBillItem:BillItemModel = new BillItemModel(book, 1, book.copies);
        setBillItems([...billItems, newBillItem]);
      }

    }
  }

  const removeBillItem = (id:number) => {
    
  }

  const setQuantity = (id: number, quantity: number) => {
    const temp:BillItemModel[] = [...billItems];
    for (let i: number = 0; i < temp.length; i++) {
      if (temp[i].book.id === id) {
        temp[i].quantity = quantity;
        temp[i].amount = quantity * (temp[i].book.copies ?? 1);
        break;
      }
    }
    setBillItems(temp);
  }

  const checkOut = () => {
    billItems.forEach(element => {
      element.logInfor();
    });
    setBillItems([]);
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
        <BookList bookList={booklist} addToBill={handleAddToBill} />
        <Bill billItems={billItems} setQuantity={setQuantity} removeBillItem={removeBillItem} checkOut={checkOut} ></Bill>
      </div>
      <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {/* Desktop */}
        <BookList bookList={booklist} addToBill={handleAddToBill} />
        <Bill billItems={billItems} setQuantity={setQuantity} removeBillItem={removeBillItem} checkOut={checkOut}></Bill>
      </div>
    </>
  );
};

