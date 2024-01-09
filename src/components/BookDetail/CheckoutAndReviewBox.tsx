import BookModel from "../../models/BookModel";
import { Button, Card, InputGroup, Form } from "react-bootstrap";
import styled from "styled-components";
import { useState } from "react";
import st from './style/CheckoutAndReviewBox.module.css';


const Cursive = styled.span`
    font-family: cursive;
`

export const CheckoutAndReviewBox: React.FC<{
    mobile: boolean,
    bookModel: BookModel,
    setBook: Function,
    isChangingPrice: boolean,
    setIsChangingPrice: Function
    changePrice: Function
    cancel:Function
}> = (props) => {

    const [isChangingPrice, setIsChangingPrice] = useState<boolean>(false);

    const handleOnInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        console.log(value);
        props.setIsChangingPrice(true);
        props.setBook({ ...props.bookModel, price: Number(value) });

    };

    const handleOnClickApplyPrice = () => {
        const isSuccess = props.changePrice();
        if (isSuccess) {
            setIsChangingPrice(false);
        }
    }

    const handleOnClickCancel = () =>{
        props.cancel();
    }


    return (
        // <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
        //     <div className={`${basic_css.font_1_2} card-body container`}>

        //         <div className="mt-3">
        //             <p>
        //                 <b>0/5</b> &nbsp;
        //                 books checked out
        //             </p>
        //             <hr/>
        //             <h4 className="text-success">
        //                 Available
        //             </h4>
        //             <div className="row">
        //                 <p className="col-6 lead">
        //                     ${props.bookModel.price}
        //                 </p>
        //                 <p className="col-6 lead">
        //                     {props.bookModel.available} available
        //                 </p>
        //             </div>
        //         </div>
        //         <Link to='/#' className='btn btn-success btn-lg'>Check out</Link>
        //         <hr/>
        //         <p className="mt-3">
        //             This number can change until placing order has been complete.
        //         </p>
        //     </div>
        // </div>
        <>
            <Card style={{ height: '100%' }} className={props.mobile ? 'd-flex mt-5' : 'col-3 d-flex mb-5 p-0'}>
                <Card.Header className="d-flex align-items-center">
                    <Card.Title as='h5'>INFOR</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex flex-column">
                        <div className={``}>
                            <InputGroup size="sm" className="mb-3 mt-3">
                                <InputGroup.Text style={{ width: 100 }}>AVAILABLE</InputGroup.Text>
                                <Form.Control
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={props.bookModel.available}
                                    contentEditable={false}
                                />
                            </InputGroup>
                            <hr></hr>
                            <InputGroup size="sm" className="mb-3 mt-3">
                                <InputGroup.Text>Price($)</InputGroup.Text>
                                <Form.Control
                                    className={st.hideArrow}
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    type="number"
                                    value={props.bookModel.price}
                                    onChange={handleOnInputChanged}
                                />
                                <Button onClick={handleOnClickApplyPrice} variant={props.isChangingPrice ? 'success' : 'outline-success'} style={{ width: '70px' }}>Apply</Button>
                                <Button onClick={handleOnClickCancel} variant="outline-danger">Cancel</Button>
                            </InputGroup>
                        </div>

                    </div>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
        </>
    );
}