import React, { useEffect, useState } from "react";
import { Wrapper } from "../Wrapper";
import basic_css from "./style/basic.module.css";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import BookModel from "../../models/BookModel";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { axiosPrivate } from "../../api/axios";

const ModalBookDetail: React.FC<{ currentBook: BookModel | undefined }> = (props) => {
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

    const [book, setBook] = useState<BookModel|undefined>();
    const [isChangingPrice, setIsChangingPrice] = useState<boolean>(false);

    useEffect(() => {
        const getBook: Function = async (id: number) => {
            if(id === undefined){
                return;
            }
            try {
                const url = `http://localhost:8081/books/${id}`
                const response: BookModel = await axiosPrivate.get(
                    url
                )
                setBook(response as BookModel);
            } catch (e) {
                console.log(e);
            }
        }
        getBook(props.currentBook?.id);
    }, [props.currentBook])

    useEffect(()=>{
        if(book?.price != props.currentBook?.price){
            setIsChangingPrice(true);
        } else{
            setIsChangingPrice(false);
        }
    },[book?.price])
    //FUNCTIONS
    const changePrice = () => {
        console.log(book?.id, book?.price);
        return true;
    }

    const cancel = () =>{
        setBook(props.currentBook);
    }

    let categoryNames = "";
    props.currentBook?.categoryList?.forEach(element => {
        categoryNames += `, ${element.categoryName}`
    });
    while (categoryNames[0] == ',' || categoryNames[0] == ' ') {
        categoryNames = categoryNames.slice(1);
    }

    return (
        <Wrapper>
            {book ? (
                <div>
                    <div className={`${basic_css.color_black} container d-none d-lg-block`}>
                        <div className="row mt-5">
                            <div className="col-sm-2 col-md-3">
                                <img
                                    src={book.img}
                                    width="300"
                                    height="349"
                                    alt="book"
                                ></img>
                            </div>
                            <div className="col-4 col-md-4 container">
                                <div>
                                    <h2>{book.title}</h2>
                                    <h5 className="text-primary">{book.author}</h5>
                                    <h5>{categoryNames}</h5>
                                    <p className={`${basic_css.font_1_0} lead`}>
                                        {book.description}
                                    </p>
                                </div>
                            </div>
                            <CheckoutAndReviewBox
                                mobile={false}
                                bookModel={book}
                                setBook={setBook}
                                isChangingPrice={isChangingPrice}
                                setIsChangingPrice={setIsChangingPrice}
                                changePrice={changePrice}
                                cancel={cancel}/>
                        </div>
                        <hr></hr>
                    </div>
                    <div className={`${basic_css.color_black} container d-lg-none mt-5`}>
                        <div className="d-flex justify-content-center align-items-center">
                            <img

                                src={book.img}
                                width="300"
                                height="349"
                                alt="book"
                            ></img>
                        </div>

                        <div className="mt-4">
                            <div className="ml-2">
                                <h2>{book.title}</h2>
                                <h5 className="text-primary">{book.author}</h5>
                                <p className="lead">{book.description}</p>
                            </div>
                        </div>
                        <CheckoutAndReviewBox mobile={true} bookModel={book} setBook={setBook}isChangingPrice={isChangingPrice}
                                setIsChangingPrice={setIsChangingPrice}
                                changePrice={changePrice}
                                cancel={cancel}/>
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
