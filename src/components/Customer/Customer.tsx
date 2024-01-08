import React, { ReactEventHandler, useContext, useEffect, useState } from "react";
import { CustomerModel } from "../../models/CustomerModel";
import { axiosPrivate } from "../../api/axios";
import AuthContext from "../../auth/AuthProvider";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import st from './style/customer_styled.modul.css'
import { CustomerTable } from "./components/CustomerTable";
import { UpdateCustomerModal } from "./components/UpdateCustomerModal";
import { CreateCusModal } from "./components/CreateCustomerModal";
import { useDebounce } from "../../hooks/useDebounce";
import Papa from "papaparse";



export const Customer = () => {
  //ALL HOOKS HERE
  const { auth } = useContext(AuthContext);
  const [exportUrl, setExportUrl] = useState<string>('');
  const [customerList, setCustomerList] = useState<CustomerModel[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [currentCustomer, setCurrentCustomer] = useState<CustomerModel | null>(null);
  const [isShowUpdateInforModal, setIsShowUpdateInforModal] = useState<boolean>(false);
  const [isShowInputInforModal, setIsShowInputInforModal] = useState<boolean>(false);
  const debouned = useDebounce(searchKeyWord);
  useAxiosPrivate();


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
        setCustomerList(response)
      } catch (error) {
        console.log(error);
      }
    }

    if (searchKeyWord === "") {
      loadAllCustomer();
    }
    loadCustomerByQuery(searchKeyWord);
  }, [debouned])

  // useEffect(() => {
  //   const modal: HTMLDialogElement | null = document.querySelector('[data-customer-form]');
  //   if (modal != null) {
  //     if (isShowUpdateInforModal) {
  //       modal.showModal();
  //     }
  //     else {
  //       modal.close();
  //     }
  //   }

  // }, [isShowUpdateInforModal])

  //HANDLE FUNCTION HERE
  const openModalDetail = () => {
    setIsShowUpdateInforModal(true);
  }

  const closeModalDetail = () => {
    setIsShowUpdateInforModal(false);
  }

  const handleOnClickExportCustomer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(customerList.length === 0) {
      return;
    } 
    const data = customerList.map((customer)=>[
      customer.id,
      customer.fullName,
      customer.phoneNumber,
      customer.ranking,
      customer.spent,

    ])
    const fields = ['ID', 'NAME','PHONENUMBER', 'RANKING', 'SPENT'];

    const csv = Papa.unparse({
      data,
      fields
    })
    const blob:Blob = new Blob([csv]);
    const a:HTMLAnchorElement = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'customers.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
  }

  const updateCustomer = async () => {
    const url: string = 'http://localhost:8081/customers';
    const response = await axiosPrivate.put(
      url,
      currentCustomer
    )
    loadAllCustomer();
    console.log(response);
  }

  const createCustomer = async (customer: CustomerModel) => {
    const url: string = 'http://localhost:8081/customers';
    const response = await axiosPrivate.post(
      url,
      customer
    )
    loadAllCustomer();
  }

  return (<>
    <div className={`${st.storageDesktop} d-none d-xl-flex`}>
      {/* Desktop */}

      <CustomerTable
        customerList={customerList}
        setCurrentCustomer={setCurrentCustomer}
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        openModalDetail={openModalDetail}
      />

    </div>
    <div className={`${st.storageDesktop} d-block d-xl-none`}>
      {/* Desktop */}
      <CustomerTable
        customerList={customerList}
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        setCurrentCustomer={setCurrentCustomer}
        openModalDetail={openModalDetail}
      />

    </div>
    {currentCustomer &&
      <UpdateCustomerModal customer={currentCustomer} setCurrentCustomer={setCurrentCustomer} isShowUpdateCustomerModal={isShowUpdateInforModal} setIsShowUpdateCustomerModal={setIsShowUpdateInforModal} updateCustomer={updateCustomer} />}
    <CreateCusModal isShowInputInforModal={isShowInputInforModal} setIsShowInputInforModal={setIsShowInputInforModal} createCustomer={createCustomer} />
    <div className="d-flex flex-column" style={{ position: 'fixed', bottom: 30, right: 30 }}>
      <button className="btn btn-success p-2" onClick={() => { setIsShowInputInforModal(true) }}><i className="fa-solid fa-plus fa-xl"></i></button>
      <button className="btn btn-primary p-2 mt-2" onClick={handleOnClickExportCustomer} id="btnExportCustomer"><i className="fa-solid fa-file-export fa-xl"></i></button>
    </div>

  </>
  );
};
