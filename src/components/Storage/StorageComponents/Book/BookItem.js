"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const book_item_module_css_1 = __importDefault(require("../../style/book-item.module.css"));
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
const BookItem = (props) => {
    const [isChecked, setIsChecked] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        props.checkBookHandler(props.book, isChecked);
    }, [isChecked]);
    return ((0, jsx_runtime_1.jsxs)("tr", { className: book_item_module_css_1.default.tableRow, children: [(0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: props.book.id }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: (0, jsx_runtime_1.jsx)("img", { className: '', src: props.book.img }) }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: props.book.title }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: props.book.author }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: props.book.copies }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: props.book.copiesAvailable }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: props.book.description }), (0, jsx_runtime_1.jsx)("td", { className: book_item_module_css_1.default.tableData, children: (0, jsx_runtime_1.jsx)("input", { onClick: () => { setIsChecked(!isChecked); }, className: "check-box", type: "checkbox", value: "", checked: isChecked }) })] }));
};
exports.BookItem = BookItem;
