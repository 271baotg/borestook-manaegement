import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Wrapper } from "../Wrapper";
import bookImg from "../../Images/dacnhantam.jpg";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import basic_css from "./style/basic.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookModel from "../../models/BookModel";
import { useAxiosPrivate } from "../../api/useAxiosHook";

const BookDetail = () => {
  const { id } = useParams();
  const [BookModel, setBookModel] = useState<BookModel | null>();
  const axios = useAxiosPrivate();

  useEffect(() => {
    const getBookDetail = async () => {
      try {
        const response: BookModel = await axios({
          method: `get`,
          url: `http://localhost:8081/bookdetail/${id}`,
        });
        setBookModel(response);
      } catch (error) {
        console.log(`Lỗi khi lấy dữ liệu sách: ${error}`);
      }
    };
    getBookDetail();
  }, [id]);

  return (<></>
    // <Wrapper>
    //   {BookModel ? (
    //     <div>
    //       <div
    //         className={`${basic_css.color_black} container d-none d-lg-block`}
    //       >
    //         <div className="row mt-5">
    //           <div className="col-sm-3 col-md-3">
    //             <img
    //               src={BookModel.img}
    //               width="300"
    //               height="349"
    //               alt="book"
    //             ></img>
    //           </div>
    //           <div className="col-4 col-md-4 container">
    //             <div className="ml-2">
    //               <h2>{BookModel.title}</h2>
    //               <h5 className="text-primary">{BookModel.author}</h5>
    //               <p className={`${basic_css.font_1_0} lead`}>
    //                 {BookModel.description}
    //               </p>
    //             </div>
    //           </div>
    //           <CheckoutAndReviewBox
    //             mobile={false}
    //             bookModel={BookModel}
    //           ></CheckoutAndReviewBox>
    //         </div>
    //         <hr></hr>
    //       </div>
    //       <div className={`${basic_css.color_black} container d-lg-none mt-5`}>
    //         <div className="d-flex justify-content-center align-items-center">
    //           <img
    //             src={BookModel.img}
    //             width="300"
    //             height="349"
    //             alt="book"
    //           ></img>
    //         </div>

    //         <div className="mt-4">
    //           <div className="ml-2">
    //             <h2>{BookModel.title}</h2>
    //             <h5 className="text-primary">{BookModel.author}</h5>
    //             <p className="lead">{BookModel.description}</p>
    //           </div>
    //         </div>
    //         <CheckoutAndReviewBox mobile={true} bookModel={BookModel} />
    //         <hr />
    //       </div>
    //     </div>
    //   ) : (
    //     <div>Loading...</div>
    //   )}
    // </Wrapper>
  );
};
export default BookDetail;
