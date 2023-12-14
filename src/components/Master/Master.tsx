import React, { useEffect, useState } from "react";
import UserModel from "../../models/UserModel";
import BookModel from "../../models/BookModel";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import { AddBook } from "./MasterComponent/AddBook";
import { User } from "./MasterComponent/User";
import OrderModel from "../../models/OrderModel";
import { ImportBook } from "./MasterComponent/ImportBook";
import { ImportBookItem } from "./MasterComponent/utils/ImportBookItem";

const Master = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [isActive, setActive] = useState<number>(1);
  const [orderList, setOrderList] = useState<OrderModel[]>();
  const [userImportList, setUserImportList] = useState<ImportBookItem[]>([]);


  

  const getUserListAxios = async () => {
    try {
        const response: UserModel[] = await axiosPrivate ({
            method: "get",
            url: "http://localhost:8081/users",
          });
          setUserList(response);
    } catch (error) {
      console.error(error);
      setHttpError("Error loading users");
      setIsLoading(false);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {getUserListAxios()},[])

  useEffect(() => {
    console.log(userList);
  },[userList])

  useEffect(() => {
    console.log(isActive);
  }, [isActive])

  const [user, setUser] = useState({
    username: '',
    password: '',
    fullName: '',
  })

  useEffect(()=>{
    console.log("Book state: " + JSON.stringify(user));
  },[user])

  const handleInput = (event : any) => {
    setUser({...user, [event.target.name]: event.target.value});
  };

  const submitUser = async () => {
    try {
      const response: UserModel = await axiosPrivate({
        method: "post",
        url: "http://localhost:8081/auth/register",
        data: user,
      });
      getUserListAxios()
    } catch (error) {
      console.log(error);
    }
  };
//Model
const getUserAxios = async (username: string|undefined) => {
  try {
    const response: UserModel = await axiosPrivate ({
      method: "get",
      url: "http://localhost:8081/users/" + username,
    });
    console.log("CurrentUser:" + response);
    setCurrentUser(response);
    return response; // Trả về kết quả
  } catch (error) {
    console.log(error);
    throw error; // Ném lỗi để xác định lỗi
  }
  };

  const getOrderAxios = async (username: string|undefined) => {
    try {
      const response: OrderModel[] = await axiosPrivate ({
        method: "get",
        url: "http://localhost:8081/orders/username/" + username,
      });
      setOrderList(response);
      return response; // Trả về kết quả
    } catch (error) {
      console.log(error);
      throw error; // Ném lỗi để xác định lỗi
    }
    };

  const openModalDetail = async (username: string) => {
    const temp: UserModel =
      userList[userList.findIndex((user) => user.username === username)];
      setCurrentUser(temp);

    try {
      // const responseUsers = await getUserAxios(temp.username);
      const responseOrders = await getOrderAxios(temp.username);

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


  return (
    <div>
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-addbook-tab" data-bs-toggle="tab" data-bs-target="#nav-addbook" type="button" role="tab" aria-controls="nav-addbook" aria-selected="true">Add Book</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">User</button>
                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                <button className="nav-link" id="nav-import-tab" data-bs-toggle="tab" data-bs-target="#nav-import" type="button" role="tab" aria-controls="nav-import" aria-selected="false">Import</button>
            </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active m-2" id="nav-addbook" role="tabpanel" aria-labelledby="nav-addbook-tab">
            <AddBook axios={axiosPrivate}></AddBook>
        </div>
        <div className="tab-pane fade m-2" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <User 
            data={userList} 
            isLoading={isLoading} 
            handleInput={handleInput} 
            submitUser = {submitUser} 
            currentUser = {currentUser}
            orderList = {orderList}
            openModelDetail = {openModalDetail}></User>
        </div>
        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        <div className="tab-pane fade" id="nav-import" role="tabpanel" aria-labelledby="nav-import-tab">
          <ImportBook userImportList={userImportList} setUserImportList={setUserImportList}></ImportBook>
        </div>
        </div>
        
    </div>
    )
}
export default Master;