import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { Bill } from "./StorageComponents/Bill/Bill";
import st from "./style/storage-style.module.css";
import BillItemModel from "../../models/BillItemModel";
import { BookTable } from "./StorageComponents/Book/BookTable";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import ModalBookDetail from "../BookDetail/ModalBookDetail";
import { useDebounce } from "../../hooks/useDebounce";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardImg, CardSubtitle, CardTitle, Col, Form, InputGroup, ListGroup, ListGroupItem, Modal, Row, Table } from "react-bootstrap";
import { CustomerModel } from "../../models/CustomerModel";
import { SearchBar } from "../Customer/CustomerComponents/SearcherBar";
import { CustomerTable } from "../Customer/CustomerComponents/CustomerTable";
import { BillItem } from "./StorageComponents/Bill/BillItem";
import customerIcon from "../../images/customer.png"
import orderIcon from "../../images/order.png"
import AuthContext from "../../auth/AuthProvider";
import InputGroupText from "react-bootstrap/esm/InputGroupText";


export const Storage = () => {
  useAxiosPrivate();
  //Book states
  const [bookList, setBookList] = useState<BookModel[]>([]);
  const [currentBook, setCurrentBook] = useState<BookModel>();
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const debounce = useDebounce<string>(searchKeyWord);

  //Bill states
  const [isLoading, setIsLoading] = useState(true);
  const [billItems, setBillItems] = useState<BillItemModel[]>([]);
  const [isOpenCheckOutModal, setIsOpenCheckOutModal] = useState<boolean>(false);

  //Customer states
  const [customerList, setCustomerList] = useState<CustomerModel[]>([]);
  const [customer, setCustomer] = useState<CustomerModel>({});
  const [customerSearchKeyWord, setCustomerSearchKeyWord] = useState<string>("");
  const customerDebounce = useDebounce<string>(customerSearchKeyWord);

  console.log(customerList);
  console.log(customerDebounce);
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

  //GET CUSTOMER HERE
  const loadAllCustomer = async () => {
    const url: string = 'http://localhost:8081/customers';
    try {
      const response: CustomerModel[] = await axiosPrivate({
        method: 'get',
        url: url,
      });
      setCustomerList(response);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const loadCustomerByQuery = async (query: string) => {
      const url: string = 'http://localhost:8081/customers/search';
      if (query === "" || query === null || query.trim() === "") {
        return;
      }

      try {
        const response: CustomerModel[] = await axiosPrivate({
          method: 'get',
          url: url,
          params: {
            query: query,
          }
        })
        setCustomerList(response);
      } catch (error) {
        console.log(error);
      }
    }

    if (customerSearchKeyWord === "") {
      loadAllCustomer();
    }
    loadCustomerByQuery(customerSearchKeyWord);
  }, [customerDebounce])

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
    const temp: BookModel = bookList[bookList.findIndex((book) => book.id === id)];
    setCurrentBook(temp);
    const modal: any = document.querySelector('[data-book-detail]');
    modal.showModal();
  }

  const closeModalDetail = () => {
    const modal: any = document.querySelector('[data-book-detail]');
    modal.close();
  }

  const checkOut = () => {
    console.log(`Bill: ${Math.floor(Math.random() * 100)}`)

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
          bookList={bookList}
          addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
          openModalDetail={openModalDetail}
        />
        <Bill
          billItems={billItems}
          setQuantity={setQuantity}
          removeBillItem={removeBillItem}
          openCheckOutModal={() => { setIsOpenCheckOutModal(true) }}
        ></Bill>
      </div>
      <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {/* Desktop */}
        <BookTable
          bookList={bookList}
          addToBill={handleAddToBill}
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
          openModalDetail={openModalDetail}
        />
        <Bill
          billItems={billItems}
          setQuantity={setQuantity}
          removeBillItem={removeBillItem}
          openCheckOutModal={() => { setIsOpenCheckOutModal(true) }}
        ></Bill>
      </div>

      <dialog data-book-detail className={`${st.modal} m-5`}>
        <div className=" d-flex justify-content-end">
          <button type="button" className="btn-close" onClick={closeModalDetail} aria-label="Close"></button>
        </div>
        <ModalBookDetail currentBook={currentBook}></ModalBookDetail>
      </dialog>
      <div></div>
      <Modal size="xl" show={isOpenCheckOutModal} onHide={() => setIsOpenCheckOutModal(false)}>
        <Modal.Header>
          <Modal.Title as='h2'>Checkout information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={st.modalBodyContainer}>
            <div>
              <Card border="1em">
                <Card.Header className="d-flex align-items-center">
                  <CardImg variant="left" src={orderIcon} width={50} height='auto'></CardImg>
                  <CardTitle as='h3'>Order detail</CardTitle>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billItems.map((item) => {
                        return (
                          <tr>
                            <td>{item.book.title}</td>
                            <td>${item.book.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.quantity * item.book.price}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
            </div>
            <div className={`${st.checkoutSection}`}>
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <div className={`${st.customerInforSection}`}>
                    <ListGroup variant="flush" as='ol'>
                      <ListGroupItem style={{ textAlign: 'left' }} as='li'>Username: {' Temporary username'}</ListGroupItem>
                      <ListGroupItem style={{ textAlign: 'left' }}>Customer: {' Nguyễn Quang An'}</ListGroupItem>
                      <ListGroupItem style={{ textAlign: 'left' }}>Phone: {' 0123456789'}</ListGroupItem>
                      <ListGroupItem style={{ textAlign: 'left' }}>Ranking: {' 1'}</ListGroupItem>
                    </ListGroup>
                    <InputGroup size="sm" className="mb-3">
                      <InputGroup.Text>GIFTCODE</InputGroup.Text>
                      <Form.Control
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                      />
                      <Button variant="success">APPLY</Button>
                    </InputGroup>
                  </div>
                  <div className="checkoutSection d-flex">
                    <h4>{`Subtotal: $1000`}</h4>
                    <h4 className='text-success'>{`Total: $999`}</h4>
                    <button className={`btn btn-success`}>Checkout</button>
                  </div>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="d-flex align-items-center">
                  <CardImg variant="left" src={customerIcon} width={50} height='auto'></CardImg>
                  <CardTitle as='h3' className="ms-2">Customer</CardTitle>
                </CardHeader>
                <CardBody>
                  <SearchBar searchKeyWord={customerSearchKeyWord} setSeachKeyWord={setCustomerSearchKeyWord}></SearchBar>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phonenumber</th>
                        <th>Ranking</th>
                        <th>Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerList.map((cus) => {
                        return (
                          <tr>
                            <td>{cus.fullName}</td>
                            <td>{cus.phoneNumber}</td>
                            <td>{cus.ranking}</td>
                            <td>${cus.spent}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};
