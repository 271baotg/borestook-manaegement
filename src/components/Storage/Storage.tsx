import { useContext, useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { Bill } from "./StorageComponents/Bill/Bill";
import st from "./style/storage-style.module.css";
import BillItemModel from "../../models/BillItemModel";
import { BookTable } from "./StorageComponents/Book/BookTable";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import ModalBookDetail from "../BookDetail/ModalBookDetail";
import { useDebounce } from "../../hooks/useDebounce";
import { CustomerModel } from "../../models/CustomerModel";
import AuthContext from "../../auth/AuthProvider";
import { CheckOutModal } from "./StorageComponents/Modals/CheckOutModal/CheckOutModal";
import OrderModel from "../../models/OrderModel";
import OrderDetailModel from "../../models/OrderDetailModel";
import { MaxQtyReachedModal } from "../../utils/components/MaxQtyReachedToast";

export const Storage = () => {
  useAxiosPrivate();

  const { auth } = useContext(AuthContext);
  //Book states
  const [bookList, setBookList] = useState<BookModel[]>([]);
  const [filteredBookList, setFilterBookList] = useState<BookModel[]>([]);
  const [currentBook, setCurrentBook] = useState<BookModel>();
  const [category, setCategory] = useState<Category[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<number>(0);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const debounce = useDebounce<string>(searchKeyWord);


  //Bill states
  const [isLoading, setIsLoading] = useState(true);
  const [billItems, setBillItems] = useState<BillItemModel[]>([]);
  const [isOpenCheckOutModal, setIsOpenCheckOutModal] = useState<boolean>(false);
  const [isOpenMaxQtyReachedModal, setIsOpenMaxQtyReacedModal] = useState<boolean>(false);


  //Customer states
  const [customer, setCustomer] = useState<CustomerModel>({});


  //useEffects
  useEffect(() => {
    const search = async (query: string) => {
      try {
        if (query === "") {
          const loadBook = async () => {
            try {
              const response: BookModel[] = await axiosPrivate({
                method: "get",
                url: "http://localhost:8081/books",
              });
              const list = response as BookModel[];
              setBookList(list);
            } catch (error) {
              console.log(error);
            }
          };

          loadBook();
          return;
        }

        const response: BookModel[] = await axiosPrivate({
          method: "get",
          url: "http://localhost:8081/books/search",
          params: {
            query: query,
          },
        });
        // console.log("Search result: " + JSON.stringify(response));
        setBookList(response);
      } catch (error) {
        console.log(error);
      }
    };
    search(searchKeyWord);
  }, [debounce]);

  useEffect(() => {
    const url = 'http://localhost:8081/category'
    const getCategory = async () => {
      const response: Category[] = await axiosPrivate.get(
        url
      );

      if (response !== null) {
        setCategory(response);
      }
    }
    getCategory();
  }, [])
  
  useEffect(()=>{
    if(bookList.length === 0)
      return;
    setFilterBookList(bookList);
  },[bookList])

  useEffect(() => {
    const filterBookListByCategory = (id: number) => {
      if (id == 0) {
        setFilterBookList(bookList);
        return;
      }

      let tempBookList: BookModel[] = [];
      bookList.forEach((item) => {
        const itemCategory: Category[] = item.categoryList;
        //Kiểm tra xem trong itemCategory này có category nào trùng id với id được truyền vào không;
        for(let i = 0; i < itemCategory.length; i++){
          if(itemCategory[i].id == id){
            tempBookList.push(item);
          }
        }
      });
      if(tempBookList.length !== 0) {
        setFilterBookList(tempBookList);
      }
    }
    filterBookListByCategory(currentCategoryId);
  }, [currentCategoryId])

  const handleClickGoToCheckOut = () => {
    if (billItems.length === 0) {
      alert("You have not added any product into cart");
      return;
    }
    setIsOpenCheckOutModal(true);
  };
  const handleOnClickCustomer = (cus: CustomerModel) => {
    setCustomer(cus);
  };
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
          book.price
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
        temp[i].amount = quantity * (temp[i].book.price ?? 1);
        break;
      }
    }
    setBillItems(temp);
  };

  const openModalDetail = (id: number) => {
    const temp: BookModel =
      bookList[bookList.findIndex((book) => book.id === id)];
    setCurrentBook(temp);
    const modal: any = document.querySelector("[data-book-detail]");
    modal.showModal();
  };

  const closeModalDetail = () => {
    const modal: any = document.querySelector("[data-book-detail]");
    modal.close();
  };

  const checkOut = async () => {
    console.log("Customer", customer.fullName);
    console.log(`Bill: ${Math.floor(Math.random() * 100)}`);
    const listOrderDetails: OrderDetailModel[] = [];
    let total: number = 0;
    billItems.forEach((element) => {
      element.logInfor();
      listOrderDetails.push(
        new OrderDetailModel(element.book, element.quantity)
      );
    });

    listOrderDetails.forEach((element, idx) => {
      total += element.book.price * element.quantity;
    })

    const order = new OrderModel(
      "",
      auth?.username ?? "",
      total,
      customer ?? null,
      listOrderDetails,
      ""
    );

    try {
      const response = await axiosPrivate.post(
        "http://localhost:8081/orders",
        order
      );
      console.log(response);
    } catch (e) { }

    setBillItems([]);
    setIsOpenCheckOutModal(false);
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
          bookList={filteredBookList}
          addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
          openModalDetail={openModalDetail}
          categoryList={category}
          currentCategory={currentCategoryId}
          setCurrentCategory={setCurrentCategoryId}
        />
        <Bill
          billItems={billItems}
          setQuantity={setQuantity}
          removeBillItem={removeBillItem}
          onClickGoToCheckOut={handleClickGoToCheckOut}
          openMaxQtyReachedModal={() => { setIsOpenMaxQtyReacedModal(true) }}
        ></Bill>
      </div>
      <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {/* Desktop */}
        <BookTable
          bookList={filteredBookList}
          addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
          openModalDetail={openModalDetail}
          categoryList={category}
          currentCategory={currentCategoryId}
          setCurrentCategory={setCurrentCategoryId}
        />
        <Bill
          billItems={billItems}
          setQuantity={setQuantity}
          removeBillItem={removeBillItem}
          onClickGoToCheckOut={handleClickGoToCheckOut}
          openMaxQtyReachedModal={() => { setIsOpenMaxQtyReacedModal(true) }}
        ></Bill>
      </div>

      <dialog data-book-detail className={`${st.modal} m-5`}>
        <div className=" d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            onClick={closeModalDetail}
            aria-label="Close"
          ></button>
        </div>
        <ModalBookDetail currentBook={currentBook}></ModalBookDetail>
      </dialog>
      <CheckOutModal
        billItems={billItems}
        customer={customer}
        onClickCustomer={handleOnClickCustomer}
        isOpen={isOpenCheckOutModal}
        onOpen={() => {
          setIsOpenCheckOutModal(true);
        }}
        onClose={() => {
          setIsOpenCheckOutModal(false);
        }}
        onClickCheckOut={checkOut}
      ></CheckOutModal>

      <MaxQtyReachedModal isOpen={isOpenMaxQtyReachedModal} onOpen={() => { setIsOpenMaxQtyReacedModal(true) }} onClose={() => { setIsOpenMaxQtyReacedModal(false) }} />
    </>
  );
};
