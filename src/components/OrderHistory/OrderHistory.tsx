import { DialogHTMLAttributes, useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
// import "./style.css";

import st from "./style/storage-style.module.css";
import BillItemModel from "../../models/BillItemModel";
import React from "react";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import BookDetail from "../BookDetail/BookDetail";
import ModalBookDetail from "../BookDetail/ModalBookDetail";
import OrderModel from "../../models/OrderModel";
import { OrderTable } from "./OrderComponents/Order/OrderTable";
import { Bill } from "./OrderComponents/Bill/Bill";
import OrderDetailModel from "../../models/OrderDetailModel";
import ModalOrder from "./OrderComponents/Order/ModalOrder";

export const OrderHistory = () => {
  const axios = useAxiosPrivate();
  const [orderList, setOrderList] = useState<OrderModel[]>([]);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetailItems, setOrderDetailItems] = useState<OrderDetailModel[]>(
    []
  ); //OrderItem=OrderdetailModel
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [currentOrder, setCurrentOrder] = useState<OrderModel>();

  useEffect(() => {
    let baseUrl: string = "http://localhost:8081/orders";
    let url: string = "";

    if (searchKeyWord !== "") {
      url = `${baseUrl}/${searchKeyWord}`;
      console.log(url);
    } else {
      url = `${baseUrl}`;
    }

    const getOrderById = async () => {
      const response = await fetch(url);

      const responseJson = await response.json();

      const tempOrderList: OrderModel[] = [];
      tempOrderList.push({
        id: responseJson.id,
        createDate: responseJson.createDate,
        username: responseJson.username,
        customer: responseJson.customer,
        total: responseJson.total,
      });
      setOrderList(tempOrderList);
      setIsLoading(false);
    };

    // GetOrderListAxios
    const getOrderListAxios = async () => {
      try {
        const response: OrderModel[] = await axios({
          method: "get",
          url: "http://localhost:8081/orders",
        });
        console.log(response);
        const list = response as OrderModel[];
        console.log("List order: " + list);
        setOrderList(list);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderListAxios();

    // GetOrderDetailItemsAxios
    // const getOrderDetailItemsAxios = async (id:number) => {
    //   try {
    //     const response: OrderDetailModel[] = await axios({
    //       method: "get",
    //       url: "http://localhost:8081/orderdetail/" + id,
    //     });
    //     console.log(response);
    //     const list = response as OrderDetailModel[];
    //     console.log("List orderDetail: " + list);
    //     setOrderDetailItems(list);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

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

    // getOrderList();
    if (searchKeyWord !== "") {
      getOrderById().catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
    } else {
      getOrderListAxios().catch((error) => {
        setIsLoading(true);
      });
    }
  }, [searchKeyWord]);

  // const handleAddToBill = (book: BookModel) => {
  //   if (book === undefined) {
  //     return;
  //   } else {
  //     const index = billItems.findIndex(
  //       (billItem) => billItem.book.id === book.id
  //     );
  //     const alreadyInBill = index !== -1;
  //     if (alreadyInBill) {
  //       setQuantity(book.id, billItems[index].quantity + 1);
  //     } else {
  //       const newBillItem: BillItemModel = new BillItemModel(
  //         book,
  //         1,
  //         book.copies
  //       );
  //       setBillItems([...billItems, newBillItem]);
  //     }
  //   }
  // };

  // const removeBillItem = (id: number) => {
  //   const removed = billItems.filter((billItem) => billItem.book.id !== id);
  //   setBillItems(removed);
  // };

  // const setQuantity = (id: number, quantity: number) => {
  //   if (quantity === 0) {
  //     removeBillItem(id);
  //     return;
  //   }
  //   const temp: BillItemModel[] = [...billItems];
  //   for (let i: number = 0; i < temp.length; i++) {
  //     if (temp[i].book.id === id) {
  //       temp[i].quantity = quantity;
  //       temp[i].amount = quantity * (temp[i].book.copies ?? 1);
  //       break;
  //     }
  //   }
  //   setBillItems(temp);
  // };

  const openModalDetail = async (id: number) => {
    const temp: OrderModel =
      orderList[orderList.findIndex((order) => order.id === id)];
    setCurrentOrder(temp);

    try {
      const response = await getOrderDetailItemsAxios(temp.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    if (temp != null) {
      const modal: any = document.querySelector("[data-order-detail]");
      modal.showModal();
    } else {
      // Xử lý khi đối tượng là null hoặc undefined
    }
  };

  const closeModalDetail = () => {
    const modal: any = document.querySelector("[data-order-detail]");
    modal.close();
  };

  // GetOrderDetailItemsAxios
  const getOrderDetailItemsAxios = async (id: number) => {
    try {
      const response: OrderDetailModel[] = await axios({
        method: "get",
        url: "http://localhost:8081/orderdetail/" + id,
      });
      console.log(response);
      const list = response as OrderDetailModel[];
      console.log("List orderDetail: " + JSON.stringify(list));
      setOrderDetailItems(list);
      return list; // Trả về kết quả
    } catch (error) {
      console.log(error);
      throw error; // Ném lỗi để xác định lỗi
    }
  };
  const chooseOneOrder = async (id: number) => {
    const temp: OrderModel =
      orderList[orderList.findIndex((order) => order.id === id)];
    if (temp) {
      setCurrentOrder(temp);
      console.log(temp);

      try {
        const response = await getOrderDetailItemsAxios(temp.id);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={`${st.storageDesktop} d-none d-lg-flex`}>
        {/* Desktop */}

        <OrderTable
          orderList={orderList}
          // addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
          chooseOneOrder={chooseOneOrder}
          openModalDetail={openModalDetail}
        />
        <Bill
          orderDetailItems={orderDetailItems}
          // setQuantity={setQuantity}
          // removeBillItem={removeBillItem}
          // checkOut={checkOut}
        ></Bill>
      </div>
      <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {/* Desktop */}
        <OrderTable
          orderList={orderList}
          // addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
          chooseOneOrder={chooseOneOrder}
          openModalDetail={openModalDetail}
        />
        <Bill
          orderDetailItems={orderDetailItems}
          // setQuantity={setQuantity}
          // removeBillItem={removeBillItem}
          // checkOut={checkOut}
        ></Bill>
      </div>

      <dialog data-order-detail className={`${st.modal} m-5 `}>
        <div className=" d-flex justify-content-end ">
          <button
            type="button"
            className="btn-close"
            onClick={closeModalDetail}
            aria-label="Close"
          ></button>
        </div>
        <ModalOrder
          currentOrder={currentOrder}
          orderDetailItems={orderDetailItems}
        ></ModalOrder>
      </dialog>
    </>
  );
};
export default OrderHistory;
