import React, { useEffect, useState } from "react";
import UserModel from "../../../models/UserModel";
import st from '../style/user_styled.module.css'
import { UserTable } from "./UserTable";
import AuthContext from "../../../auth/AuthProvider";
import { axiosPrivate } from "../../../api/axios";
import { useAxiosPrivate } from "../../../api/useAxiosHook";
import ModelUser from "./ModelUser";
import OrderModel from "../../../models/OrderModel";


interface componentProps {
  data: UserModel[]
  isLoading: boolean
  handleInput: Function;
  submitUser:Function;
  currentUser: UserModel | undefined;
  orderList: OrderModel[] | undefined ;
  openModelDetail: Function;
}

export const User: React.FC<componentProps> = (props) => {

  const closeModalDetail = () => {
    const modal: any = document.querySelector("[data-order-detail]");
    modal.close();
  };
  return (
    <div className="row m-0">
      <div className={`${st.desktop} col-12 col-md-8 col-lg-8 mb-2`}>
        {props.isLoading&&<div>Isloading</div>}
        {!props.isLoading&&<UserTable
          openModalDetail={props.openModelDetail}
          userList={props.data}
        />}
      </div>

      {/* <div className={`${st.storageDesktop} d-block d-lg-none`}>
        {props.isLoading&&<div>Isloading</div>}
        {!props.isLoading&&<UserTable
          openModalDetail={props.openModelDetail}
          userList={props.data}
        />}
      </div> */}

      <div className="card col-12 col-md-4 col-lg-4" style={{marginTop : '15px'}}>
            <div className="card-header">
                Add a User
            </div>
            <div className="card-body">
                <form>
                    <div className="row">
                        <div className="col-md-12 mb-12">
                            <label className="form-label">UserName</label>
                            <input type="text" className="form-control" name="username" required onChange={(event) => props.handleInput(event)} />
                        </div>
                        <div className="col-md-12 mb-12">
                            <label className="form-label">Password</label>
                            <input type="text" className="form-control" name="password" required onChange={(event) => props.handleInput(event)}/>
                        </div>
                        <div className="col-md-12 mb-12">
                            <label className="form-label">FullName</label>
                            <input type="text" className="form-control" name="fullName" required onChange={(event) => props.handleInput(event)}/>
                        </div>
                        <div className="col-md-12 mb-12">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" name="email" required onChange={(event) => props.handleInput(event)}/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-primary mt-3" onClick={() => props.submitUser()}>
                      Add User
                    </button>
                    </div>
                </form>
            </div>
        </div>
        
        <dialog data-order-detail className={`${st.modal}`}>
        <div className="d-flex justify-content-end ">
          <button
            type="button"
            className="btn-close"
            onClick={closeModalDetail}
            aria-label="Close"
          ></button>
        </div>
        <ModelUser
          currentUser = {props.currentUser}
          orderList = {props.orderList}
        ></ModelUser>
      </dialog>
    </div>
  );
}