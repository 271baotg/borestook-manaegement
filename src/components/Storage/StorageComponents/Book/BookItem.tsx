import { useEffect, useState } from "react";
import BookModel from "../../../../models/BookModel";
import styled from "styled-components";
import st from "../../style/book-item.module.css";
import img from "../../images/book.png";
import React from "react";

export const BookItem: React.FC<{
  book: BookModel;
  isChecked: boolean;
  addToBill: Function;
  openModalDetail: Function
}> = (props) => {
  const handleAddToBill = (e: any) => {
    e.stopPropagation(); //Chặn sự kiện tiếp tục trên parent của nó
    props.addToBill(props.book);
  };
  
  const handleOnClickItem = () => {
    props.openModalDetail(props.book.id);
  }

  let categoryNames = "";
  props.book.categoryList?.forEach(element => {
    categoryNames += `, ${element.categoryName}`
  });
  while(categoryNames[0] == ',' || categoryNames[0] == ' ' ){
    categoryNames = categoryNames.slice(1);
  }


  return (
    <tr onClick={handleOnClickItem} className={st.tableRow}>
      <td className={st.tableData}>{props.book.id}</td>
      <td className={st.tableData}>
        <img className={""} src={props.book.img} />
      </td>
      <td className={st.tableData}>{props.book.title}</td>
      <td className={st.tableData}>{categoryNames}</td>
      <td className={`${st.tableData} text-primary`}>{props.book.author}</td>
      <td className={st.tableData}>${props.book.price}</td>
      <td className={st.tableData}>{props.book.available}</td>
      <td className={st.tableData}>
        <button
          className={`${""} btn btn-outline-primary`}
          style={{ borderWidth: "2px" }}
          onClick={handleAddToBill}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </td>
    </tr>
  );
};
