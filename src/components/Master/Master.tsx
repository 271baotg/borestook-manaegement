import React, { useContext, useEffect, useState } from "react";
import UserModel from "../../models/UserModel";
import BookModel from "../../models/BookModel";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import { AddBook } from "./MasterComponent/AddBook";
import { User } from "./MasterComponent/User";
import OrderModel from "../../models/OrderModel";
import { ImportBook } from "./MasterComponent/ImportBook";
import { ImportBookItem } from "./MasterComponent/utils/ImportBookItem";
import { ImportModel } from "../../models/ImportModel";
import { ImportDetailModel } from "../../models/ImportDetailModel";
import AuthContext from "../../auth/AuthProvider";
import sadImg from "../../images/sad.png";

const Master = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userList, setUserList] = useState<UserModel[]>([]);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [isActive, setActive] = useState<number>(1);
  const [orderList, setOrderList] = useState<OrderModel[]>();
  const [importList, setImportList] = useState<ImportModel[]>([]);
  const [userImportList, setUserImportList] = useState<ImportBookItem[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const { auth } = useContext(AuthContext);
  if (!auth?.roles.includes('admin')) {
    return (
      <div style={{display: 'flex',justifyContent:'center',flexDirection:'column', alignItems:'center', width: '100%', height: 'calc(100vh - 85px)'}}>
        <img src={sadImg} width='250px'/>
        <h3 className="mt-5"><i className="fa-solid fa-triangle-exclamation xl"></i>Your Staff account doesn't have Admin permission !</h3>
      </div>)
  }

  const getAllImportListAxios = async () => {
    try {
      const response: ImportModel[] = await axiosPrivate({
        method: "get",
        url: "http://localhost:8081/imports",
      });
      if (response) {
        console.log(response);
        setImportList(response);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const getUserListAxios = async () => {
    try {
      const response: UserModel[] = await axiosPrivate({
        method: "get",
        url: "http://localhost:8081/users",
      });
      setUserList(response);
    } catch (error) {
      console.error(error);
      setHttpError("Error loading users");
      setIsLoading(false);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { getUserListAxios() }, [])
  useEffect(() => {
    getAllImportListAxios();
  }, [])
  useEffect(() => {
    console.log(userList);
  }, [userList])

  useEffect(() => {
    console.log(isActive);
  }, [isActive])

  const [user, setUser] = useState({
    username: '',
    password: '',
    fullName: '',
  })

  useEffect(() => {
    console.log("Book state: " + JSON.stringify(user));
  }, [user])

  const handleInput = (event: any) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const url = "http://localhost:8081/category";
    const getCategory = async () => {
      try {
        const response: Category[] = await axiosPrivate.get(url);
        if (response !== null) {
          setCategory(response);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCategory();
  }, []);

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
  const getUserAxios = async (username: string | undefined) => {
    try {
      const response: UserModel = await axiosPrivate({
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
  //GetOrderAxios by username of staff
  const getOrderAxios = async (username: string | undefined) => {
    try {
      const response: OrderModel[] = await axiosPrivate({
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
  //Hàm xử lý import here
  const handleImportData = async (detailList: ImportDetailModel[], provider: string) => {
    try {
      const importData = new ImportModel(provider, detailList);
      const url = 'http://localhost:8081/imports';
      const response = await axiosPrivate.post(
        url,
        importData
      )
      getAllImportListAxios();
      setUserImportList([]);
    } catch (e) {
      console.log(e);
    }
  }


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
          <AddBook axios={axiosPrivate} category={category}></AddBook>
        </div>
        <div className="tab-pane fade m-2" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <User
            data={userList}
            isLoading={isLoading}
            handleInput={handleInput}
            submitUser={submitUser}
            currentUser={currentUser}
            orderList={orderList}
            openModelDetail={openModalDetail}></User>
        </div>
        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        <div className="tab-pane fade" id="nav-import" role="tabpanel" aria-labelledby="nav-import-tab">
          <ImportBook importList={importList} handleApplyImport={handleImportData} userImportList={userImportList} setUserImportList={setUserImportList}></ImportBook>
        </div>
      </div>

    </div>
  )
}
export default Master;