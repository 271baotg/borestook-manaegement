import React, { useRef } from "react";
import successIcon from '../../../../../images/success.png';
import failIcon from '../../../../../images/cancel.png';
import { Img } from "@chakra-ui/react";
import OrderModel from "../../../../../models/OrderModel";
import { useReactToPrint } from "react-to-print";
import Modal from 'react-bootstrap/Modal';
import st from "../../../style/invoice-style.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

// Define the prop types for the PrintComponent
interface PrintComponentProps {
  order: OrderModel;
  isSuccess: boolean;
}

const truncateString = (str: string, maxLength: number) => {
  if (str === null) {
    return "";
  }
  return str.length > maxLength ? `${str.substring(0, maxLength)}` : str;
};

// Define the PrintComponent
const PrintComponent: React.FC<PrintComponentProps> = ({ order, isSuccess }) => {
  return (
    <div className={`${st.widthModal} container mt-3`}>
      <div className="card ml-5 mr-5">
        <div className="card-header">
          Invoice <strong>#{order.id}</strong>
          <span className="float-right"> <strong>Status:</strong> </span>
        </div>
        <div className="card-body">
         <div className="row mb-4">
            <div className={`col-sm-4`}>
              <h6 className="mb-3">Create Date:</h6>
              <h6>{truncateString(order.createDate, 10)}</h6>
            </div>
            <div className={`${st.borderLeft} col-sm-4`}>
              <h6 className="mb-3">From:</h6>
              <div>
                Name: <span className={`${st.fontInfo}`}>Boresbook</span>
              </div>
              <div>
                Address: <span className={`${st.fontInfo}`}>TPHCM</span>
              </div>
              <div>
                Email: <span className={`${st.fontInfo}`}>BaoBao@gmail.com</span>
              </div>
              <div>
                Phone: <span className={`${st.fontInfo}`}>0344033842</span>
              </div>
            </div>

            <div className={`${st.borderLeft} col-sm-4`}>
              <h6 className="mb-3">To:</h6>
              <div>
                Name: <span className={`${st.fontInfo}`}>{order.customer?.fullName ?? ''}</span>
              </div>
              <div>
                Address: <span className={`${st.fontInfo}`}>Binh Duong</span>
              </div>
              <div>
                Email: <span className={`${st.fontInfo}`}>Zues38@gmail.com</span>
              </div>
              <div>
                Phone: <span className={`${st.fontInfo}`}>{order.customer?.phoneNumber ?? ''}</span>
              </div>
            </div>
          </div>

          <hr className="mt-3 mb-3"/>

          <div className="table-responsive-sm">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Item</th>
                  <th className="right">Unit Cost</th>
                  <th className="center">Qty</th>
                  <th className="right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderDetails.map((item, index) => (
                  <tr key={index}>
                    <td className="center">{index + 1}</td>
                    <td className="left strong">{item.book.title}</td>
                    <td className="right">${item.book.price.toFixed(2)}</td>
                    <td className="center">{item.quantity}</td>
                    <td className="right">${(item.book.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row mt-5 mb-3">
            <div className="col-lg-7 col-sm-7">
            </div>
            <div className="col-lg-5 col-sm-5 ml-auto">
              <table className="table table-clear">
                <tbody>
                  <tr>
                    <td className="left">
                      <strong>Subtotal</strong>
                    </td>
                    <td className="right">${order.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Tax (0%)</strong>
                    </td>
                    <td className="right">$0.00</td>
                  </tr>
                  <tr>
                    <td className="left">
                      <strong>Total</strong>
                    </td>
                    <td className="right">
                      <strong>${order.total.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <strong>Note:</strong> Payment is due within 30 days
        </div>
      </div>
    </div>
  );
};

export const CheckOutResultModal: React.FC<{ order: OrderModel, isOpen: boolean, onClose: Function, isSuccess: boolean }> = (props) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <Modal className="wider-modal-dialog" size="xl" show={props.isOpen} onHide={() => { props.onClose() }}>
        <Modal.Header closeButton>
          <h3>Invoice</h3>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-end flex-column align-items-center">
        <button onClick={handlePrint} className="btn btn-outline-primary"><FontAwesomeIcon icon={icon({name: 'print'})} /></button>
          {/* Wrap the component you want to print in a div with a ref */}
          <div ref={componentRef}>
            <PrintComponent order={props.order} isSuccess={props.isSuccess} />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          {/* Include other modal content */}
        </Modal.Footer>
      </Modal>
    </div>

  )

  
};