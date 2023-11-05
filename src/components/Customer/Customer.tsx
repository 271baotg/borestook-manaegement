import React, { useContext, useEffect, useState } from "react";
import { Wrapper } from "../Wrapper";
import { CustomerModel } from "../../models/CustomerModel";
import { axiosPrivate } from "../../api/axios";
import AuthContext from "../../auth/AuthProvider";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import st from './style/customer_styled.modul.css'
import { CustomerTable } from "./CustomerComponents/CustomerTable";
import ModalBookDetail from "../BookDetail/ModalBookDetail";
import { CustomerModal } from "./CustomerComponents/CustomerModal";
import { NewCustomerModal } from "./CustomerComponents/NewCustomerModal";


export const Customer = () => {
  //ALL HOOKS HERE
  const { auth } = useContext(AuthContext);
  const [customerList, setCustomerList] = useState<CustomerModel[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [currentCustomer, setCurrentCustomer] = useState<CustomerModel | null>(null);
  const [isShowDetailModal, setIsShowDetailModal] = useState<boolean>(false);
  const [isShowCreateModal, setIsShowCreateModal] = useState<boolean>(false);
  useAxiosPrivate();

  //GET CUSTOMER HERE
  const loadCustomer = async () => {
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
    loadCustomer();
  }, [])

  useEffect(() => {
    const modal: HTMLDialogElement|null = document.querySelector('[data-customer-form]');
    if(modal != null){
      if (isShowDetailModal) {
        modal.showModal();
      }
      else{
        modal.close();
      }
    }
    
  }, [isShowDetailModal])

  useEffect(() => {
    const modal: HTMLDialogElement|null = document.querySelector('[data-create-customer-form]');
    if(modal){
      if (isShowCreateModal) {
        modal.showModal();
      }
      else{
        modal.close();
      }
    }
    
  }, [isShowCreateModal])

  //HANDLE FUNCTION HERE
  const openModalDetail = () => {
    setIsShowDetailModal(true);
  }

  const closeModalDetail = () => {
    setIsShowDetailModal(false);
  }
  
  const openCreateNewModal = () => {
    setIsShowCreateModal(true);
  }

  const closeCreateNewModal = () => {
    setIsShowCreateModal(false);
  }

  const updateCustomer =  async () => {
    const url: string = 'http://localhost:8081/customers';
      const response = await axiosPrivate.put(
        url,
        currentCustomer
      )
      loadCustomer();
      console.log(response);
  }

  const createCustomer =async (customer:CustomerModel) => {
    const url: string = 'http://localhost:8081/customers';
    const response = await axiosPrivate.post(
      url, 
      customer
    )
    loadCustomer();
  }

  return (<>
    <div className={`${st.storageDesktop} d-none d-lg-flex`}>
      {/* Desktop */}

      <CustomerTable
        customerList={customerList}
        setCurrentCustomer={setCurrentCustomer}
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        openModalDetail={openModalDetail}
      />

    </div>
    <div className={`${st.storageDesktop} d-block d-lg-none`}>
      {/* Desktop */}
      <CustomerTable
        customerList={customerList}
        searchKeyWord={searchKeyWord}
        setSearchKeyWord={setSearchKeyWord}
        setCurrentCustomer={setCurrentCustomer}
        openModalDetail={openModalDetail}
      />

    </div>
    {isShowDetailModal && currentCustomer && <CustomerModal customer={currentCustomer}
      setCurrentCustomer={setCurrentCustomer} 
      closeModal={closeModalDetail}
      updateCustomer={updateCustomer}
      ></CustomerModal>}

      {true && <NewCustomerModal createCustomer={createCustomer} closeModal={closeCreateNewModal}/>}
    {/* <button className="btn btn-success p-3" onClick={openCreateNewModal} style={{position:'fixed', bottom:30, right:30}}>ADD</button> */}
    <button className="btn btn-success p-3" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" style={{position:'fixed', bottom:30, right:30}}>ADD</button>
  </>
  );
};
