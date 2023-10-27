import React, { useState } from "react";
import { Wrapper } from "../Wrapper";
import basic_css from "./style/basic.module.css";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import BookModel from "../../models/BookModel";

const ModalBookDetail: React.FC<{currentBook:BookModel|undefined}> = (props) => {
    // const id = props.id;
    // // const [book, setbook] = useState<BookModel | null>();
    // // const axios = useAxiosPrivate();
    // // setbook( new BookModel(1, 'title', 'author', 'decription', 1, 1, 'category', 'img'));
    // const book = new BookModel(1, 'title', 'author', 'decription', 1, 1, 'category', 'img');
    // //   useEffect(() => {
    //     const getBookDetail = async () => {
    //       try {
    //         const response: book = await axios({
    //           method: `get`,
    //           url: `http://localhost:8081/bookdetail/${id}`,
    //         });
    //         setbook(response);
    //       } catch (error) {
    //         console.log(`Lỗi khi lấy dữ liệu sách: ${error}`);
    //       }
    //     };
    //     getBookDetail();
    //   }, [id]);
    
    
    return (
        <Wrapper>
            {props.currentBook ? (
                <div>
                    <div
                        className={`${basic_css.color_black} container d-none d-lg-block`}
                    >
                        <div className="row mt-5">
                            <div className="col-sm-3 col-md-3">
                                <img
                                    src={props.currentBook.img}
                                    width="300"
                                    height="349"
                                    alt="book"
                                ></img>
                            </div>
                            <div className="col-4 col-md-4 container">
                                <div className="ml-2">
                                    <h2>{props.currentBook.title}</h2>
                                    <h5 className="text-primary">{props.currentBook.author}</h5>
                                    <p className={`${basic_css.font_1_0} lead`}>
                                        {props.currentBook.description}
                                    </p>
                                </div>
                            </div>
                            {/* <CheckoutAndReviewBox
                                mobile={false}
                                bookModel={book}
                            ></CheckoutAndReviewBox> */}
                        </div>
                        <hr></hr>
                    </div>
                    <div className={`${basic_css.color_black} container d-lg-none mt-5`}>
                        <div className="d-flex justify-content-center align-items-center">
                            <img

                                src={props.currentBook.img}
                                width="300"
                                height="349"
                                alt="book"
                            ></img>
                        </div>

                        <div className="mt-4">
                            <div className="ml-2">
                                <h2>{props.currentBook.title}</h2>
                                <h5 className="text-primary">{props.currentBook.author}</h5>
                                <p className="lead">{props.currentBook.description}</p>
                            </div>
                        </div>
                        {/* <CheckoutAndReviewBox mobile={true} bookModel={book} /> */}
                        <hr />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </Wrapper>
    );
};
export default ModalBookDetail;
