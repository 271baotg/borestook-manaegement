import { Link, useParams } from "react-router-dom";
import basic_css from './style/basic.module.css';
import { useEffect } from "react";
import axios from "axios";
import BookModel from "../../models/BookModel";
export const CheckoutAndReviewBox:React.FC<{mobile: boolean, bookModel: BookModel}> = (props) =>{

    return(
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className={`${basic_css.font_1_2} card-body container`}>
                <div className="mt-3">
                    <p>
                        <b>0/5</b> &nbsp;
                        books checked out
                    </p>
                    <hr/>
                    <h4 className="text-success">
                        Available
                    </h4>
                    <div className="row">
                        <p className="col-6 lead">
                            ${props.bookModel.price}
                        </p>
                        <p className="col-6 lead">
                            {props.bookModel.available} available
                        </p>
                    </div>
                </div>
                <Link to='/#' className='btn btn-success btn-lg'>Check out</Link>
                <hr/>
                <p className="mt-3">
                    This number can change until placing order has been complete.
                </p>
            </div>
        </div>
    );
}