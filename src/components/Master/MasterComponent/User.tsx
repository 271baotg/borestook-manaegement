import React, { ChangeEvent, useEffect, useState } from "react";
import UserModel from "../../../models/UserModel";
import st from '../style/user_styled.module.css'
import { UserTable } from "./UserTable";
import AuthContext from "../../../auth/AuthProvider";
import { axiosPrivate } from "../../../api/axios";
import { useAxiosPrivate } from "../../../api/useAxiosHook";
import ModelUser from "./ModelUser";
import OrderModel from "../../../models/OrderModel";
import { UserValidator } from "../../../utils/validators/UserValidator";


const validStyle = { fontFamily: 'monospace', fontSize: 13.5, color: 'green' };
const inValidStyle = { fontFamily: 'monospace', fontSize: 13.5, color: 'red' };

interface componentProps {
  data: UserModel[]
  isLoading: boolean
  handleInput: Function;
  submitUser: Function;
  currentUser: UserModel | undefined;
  orderList: OrderModel[] | undefined;
  openModelDetail: Function;
  user:any
}

export const User: React.FC<componentProps> = (props) => {

  const userValidator: UserValidator = new UserValidator();
  const [user, setUser] = useState<UserModel>(new UserModel('', '', ''));

  const closeModalDetail = () => {
    const modal: any = document.querySelector("[data-order-detail]");
    modal.close();
  };
  
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const property = event.currentTarget.name;
    const value = event.currentTarget.value;
    setUser({ ...user, [property]: value });
    console.log('valid', userValidator.isValid(user));
    props.handleInput(event);
  }

  const handleOnSubmitUser = () => {
    props.submitUser();
  }


  return (
    <div className="row m-0">
      <div className={`${st.desktop} col-12 col-md-8 col-lg-8 mb-2`}>
        {props.isLoading && <div>Isloading</div>}
        {!props.isLoading && <UserTable
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

      <div className="card col-12 col-md-4 col-lg-4" style={{ marginTop: '15px' }}>
        <div className="card-header">
          Add a User
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-12 mb-12">
                <label className="form-label">UserName</label>
                <input type="text" className="form-control" name="username" required onChange={(event) => handleInput(event)} />
                {
                  <>
                    <p className="m-0" style={userValidator.userNameValidator.isLongEnough(user.username ?? '') ? validStyle : inValidStyle}>(*) Username have to has least 8 characters</p>
                    <p className="m-0" style={userValidator.userNameValidator.notContainSpecialChar(user.username ?? '') ? validStyle : inValidStyle}>(*) Username can not contain special charater</p>
                  </>
                }
              </div>
              <div className="col-md-12 mb-12">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" required onChange={(event) => handleInput(event)} />
                {
                  <>
                    <p className="m-0" style={userValidator.passwordValidator.isLongEnough(user.password ?? '') ? validStyle : inValidStyle}>(*) Password have to has at least 8 character</p>
                    <p className="m-0" style={userValidator.passwordValidator.isContainerNumber(user.password ?? '') ? validStyle : inValidStyle}>(*) Password have to has at least a number</p>
                    <p className="m-0" style={userValidator.passwordValidator.isContaineSpecialCharacter(user.password ?? '') ? validStyle : inValidStyle}>(*) Password have to has at least a special charater</p>
                  </>
                }
              </div>
              <div className="col-md-12 mb-12">
                <label className="form-label">FullName</label>
                <input type="text" className="form-control" name="fullName" required onChange={(event) => handleInput(event)} />
                <>
                  <p className="m-0" style={userValidator.nameValidator.isLongEnough(user.fullName ?? '') ? validStyle : inValidStyle}>(*) Fullname have to has at least 3 charater</p>
                </>
              </div>
              <div className="col-md-12 mb-12">
                <label className="form-label">Email</label>
                <input type="text" className="form-control" name="email" onChange={(event) => handleInput(event)} />
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button type="submit" disabled={userValidator.isValid(user) ? false: true} className="btn btn-primary mt-3" onClick={handleOnSubmitUser}>
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
          currentUser={props.currentUser}
          orderList={props.orderList}
        ></ModelUser>
      </dialog>
    </div>
  );
}