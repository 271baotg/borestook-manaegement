import { useEffect, useState } from "react";
import BookModel from "../../../../models/BookModel";
import styled from "styled-components";
import st from '../../style/book-item.module.css';
import img from '../../images/book.png';




// export const BookItem: React.FC<{ book: BookModel }> = (props) => {
//     return (
//         <div className="item-container card ">
//             <img className="img" src={props.book.img} />
//             <div className="infor">
//                 <div className="id">
//                     ID: {props.book.id}
//                 </div>
//                 <div className="title">
//                     Title: {props.book.title}
//                 </div>
//                 <div className="price">
//                     Price: 0$
//                 </div>
//             </div>
//             <div className="function d-flex align-items-center">
//                 <div className="d-flex align-items-center">
//                     <button className="btn btn-outline-danger" >-</button>
//                     <input
//                         type="number"
//                         className="form-control text-center mx-2"
//                         style={{ width: '50px' }}  // This is to make the input field narrower
//                     />
//                     <button className="btn btn-outline-primary">+</button>
//                 </div>
//                 <div>
//                     <label style={{marginRight: "90px"}}>Copies: {props.book.copies}</label>
//                     <label>Available: {props.book.copiesAvailable}</label>
//                 </div>

//             </div>
//             <div className="check-box">
//                 <input className="form-check-input" type="checkbox" value="" />
//             </div>

//         </div>
//     );
// }


// const BaseTableData = ({className, children}:{className?:string, children:any}) =>(
//     <td className={`${className}`}>
//         {children}
//     </td>
// )

// const BaseTableRow = ({className, children}:{className?:string, children:any}) =>(
//     <tr className={`${className}`}>
//         {children}
//     </tr>
// )

// const TableData = styled(BaseTableData)`
//     padding: 1rem;
//     border-collapse: collapse;

//     width: 36px;
//     height: 36px;

//     margin-right: .5rem;
//     vertical-align: middle;
// `;

// const TableRow = styled(BaseTableRow)`
//     width: 100%;
//     background-color: #fff4;
// `;

export const BookItem: React.FC<{ book: BookModel, isChecked: boolean, addToBill: Function}> = (props) => {
    // const [isChecked, setIsChecked] = useState(false);
    // useEffect(()=> {
    //     props.checkBookHandler(props.book, isChecked);
    // }, [isChecked])

    // const [isChecked, setIsChecked] = useState(props.isChecked);
    // useEffect(() => {
    //     props.checkBookHandler(props.book, isChecked);
    // }, [isChecked])
    

    const handleAddToBill = () =>{
        props.addToBill(props.book);
    }


    return (
        <tr className={st.tableRow}>
            <td className={st.tableData}>{props.book.id}</td>
            <td className={st.tableData}>
                <img className={''} src={props.book.img} />
            </td>
            <td className={st.tableData}>{props.book.title}</td>
            <td className={st.tableData}>{props.book.author}</td>
            <td className={st.tableData}>{props.book.copies}</td>
            <td className={st.tableData}>{props.book.copiesAvailable}</td>
            <td className={st.tableData}>
                <button className={`${''} btn btn-primary`} onClick={handleAddToBill}>Add</button>
            </td>
        </tr>
    );
}